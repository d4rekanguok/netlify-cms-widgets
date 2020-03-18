"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDefaults = applyDefaults;
exports.configLoaded = configLoaded;
exports.configLoading = configLoading;
exports.configFailed = configFailed;
exports.configDidLoad = configDidLoad;
exports.mergeConfig = mergeConfig;
exports.detectProxyServer = detectProxyServer;
exports.handleLocalBackend = handleLocalBackend;
exports.loadConfig = loadConfig;
exports.CONFIG_MERGE = exports.CONFIG_FAILURE = exports.CONFIG_SUCCESS = exports.CONFIG_REQUEST = void 0;

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _immutable = require("immutable");

var _auth = require("./auth");

var publishModes = _interopRequireWildcard(require("../constants/publishModes"));

var _configSchema = require("../constants/configSchema");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG_REQUEST = 'CONFIG_REQUEST';
exports.CONFIG_REQUEST = CONFIG_REQUEST;
const CONFIG_SUCCESS = 'CONFIG_SUCCESS';
exports.CONFIG_SUCCESS = CONFIG_SUCCESS;
const CONFIG_FAILURE = 'CONFIG_FAILURE';
exports.CONFIG_FAILURE = CONFIG_FAILURE;
const CONFIG_MERGE = 'CONFIG_MERGE';
exports.CONFIG_MERGE = CONFIG_MERGE;

const getConfigUrl = () => {
  const validTypes = {
    'text/yaml': 'yaml',
    'application/x-yaml': 'yaml'
  };
  const configLinkEl = document.querySelector('link[rel="cms-config-url"]');
  const isValidLink = configLinkEl && validTypes[configLinkEl.type] && (0, _get2.default)(configLinkEl, 'href');

  if (isValidLink) {
    const link = (0, _get2.default)(configLinkEl, 'href');
    console.log("Using config file path: \"".concat(link, "\""));
    return link;
  }

  return 'config.yml';
};

const defaults = {
  publish_mode: publishModes.SIMPLE
};

function applyDefaults(config) {
  return (0, _immutable.Map)(defaults).mergeDeep(config).withMutations(map => {
    // Use `site_url` as default `display_url`.
    if (!map.get('display_url') && map.get('site_url')) {
      map.set('display_url', map.get('site_url'));
    } // Use media_folder as default public_folder.


    const defaultPublicFolder = "/".concat((0, _trimStart2.default)(map.get('media_folder'), '/'));

    if (!map.get('public_folder')) {
      map.set('public_folder', defaultPublicFolder);
    } // default values for the slug config


    if (!map.getIn(['slug', 'encoding'])) {
      map.setIn(['slug', 'encoding'], 'unicode');
    }

    if (!map.getIn(['slug', 'clean_accents'])) {
      map.setIn(['slug', 'clean_accents'], false);
    }

    if (!map.getIn(['slug', 'sanitize_replacement'])) {
      map.setIn(['slug', 'sanitize_replacement'], '-');
    } // Strip leading slash from collection folders and files


    map.set('collections', map.get('collections').map(collection => {
      const folder = collection.get('folder');

      if (folder) {
        if (collection.has('path') && !collection.has('media_folder')) {
          // default value for media folder when using the path config
          collection = collection.set('media_folder', '');
        }

        if (collection.has('media_folder') && !collection.has('public_folder')) {
          collection = collection.set('public_folder', collection.get('media_folder'));
        }

        return collection.set('folder', (0, _trimStart2.default)(folder, '/'));
      }

      const files = collection.get('files');

      if (files) {
        return collection.set('files', files.map(file => {
          return file.set('file', (0, _trimStart2.default)(file.get('file'), '/'));
        }));
      }
    }));
  });
}

function mergePreloadedConfig(preloadedConfig, loadedConfig) {
  const map = (0, _immutable.fromJS)(loadedConfig) || (0, _immutable.Map)();
  return preloadedConfig ? preloadedConfig.mergeDeep(map) : map;
}

function parseConfig(data) {
  const config = _jsYaml.default.safeLoad(data);

  if (typeof CMS_ENV === 'string' && config[CMS_ENV]) {
    Object.keys(config[CMS_ENV]).forEach(key => {
      config[key] = config[CMS_ENV][key];
    });
  }

  return config;
}

async function getConfig(file, isPreloaded) {
  const response = await fetch(file, {
    credentials: 'same-origin'
  }).catch(err => err);

  if (response instanceof Error || response.status !== 200) {
    if (isPreloaded) return parseConfig('');
    throw new Error("Failed to load config.yml (".concat(response.status || response, ")"));
  }

  const contentType = response.headers.get('Content-Type') || 'Not-Found';
  const isYaml = contentType.indexOf('yaml') !== -1;

  if (!isYaml) {
    console.log("Response for ".concat(file, " was not yaml. (Content-Type: ").concat(contentType, ")"));
    if (isPreloaded) return parseConfig('');
  }

  return parseConfig((await response.text()));
}

function configLoaded(config) {
  return {
    type: CONFIG_SUCCESS,
    payload: config
  };
}

function configLoading() {
  return {
    type: CONFIG_REQUEST
  };
}

function configFailed(err) {
  return {
    type: CONFIG_FAILURE,
    error: 'Error loading config',
    payload: err
  };
}

function configDidLoad(config) {
  return dispatch => {
    dispatch(configLoaded(config));
  };
}

function mergeConfig(config) {
  return {
    type: CONFIG_MERGE,
    payload: config
  };
}

async function detectProxyServer(localBackend) {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    let proxyUrl;

    if (localBackend === true) {
      proxyUrl = 'http://localhost:8081/api/v1';
    } else if ((0, _isPlainObject2.default)(localBackend)) {
      proxyUrl = localBackend.url;
    }

    try {
      console.log("Looking for Netlify CMS Proxy Server at '".concat(proxyUrl, "'"));
      const {
        repo,
        publish_modes,
        type
      } = await fetch("".concat(proxyUrl), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'info'
        })
      }).then(res => res.json());

      if (typeof repo === 'string' && Array.isArray(publish_modes) && typeof type === 'string') {
        console.log("Detected Netlify CMS Proxy Server at '".concat(proxyUrl, "' with repo: '").concat(repo, "'"));
        return {
          proxyUrl,
          publish_modes,
          type
        };
      }
    } catch {
      console.log("Netlify CMS Proxy Server not detected at '".concat(proxyUrl, "'"));
    }
  }

  return {};
}

async function handleLocalBackend(mergedConfig) {
  if (mergedConfig.has('local_backend')) {
    const {
      proxyUrl,
      publish_modes,
      type
    } = await detectProxyServer(mergedConfig.toJS().local_backend);

    if (proxyUrl) {
      mergedConfig = mergePreloadedConfig(mergedConfig, {
        backend: {
          name: 'proxy',
          proxy_url: proxyUrl
        }
      });

      if (mergedConfig.has('publish_mode') && !publish_modes.includes(mergedConfig.get('publish_mode'))) {
        const newPublishMode = publish_modes[0];
        console.log("'".concat(mergedConfig.get('publish_mode'), "' is not supported by '").concat(type, "' backend, switching to '").concat(newPublishMode, "'"));
        mergedConfig = mergePreloadedConfig(mergedConfig, {
          publish_mode: newPublishMode
        });
      }
    }
  }

  return mergedConfig;
}

function loadConfig() {
  if (window.CMS_CONFIG) {
    return configDidLoad((0, _immutable.fromJS)(window.CMS_CONFIG));
  }

  return async (dispatch, getState) => {
    dispatch(configLoading());

    try {
      const preloadedConfig = getState().config;
      const configUrl = getConfigUrl();
      const isPreloaded = preloadedConfig && preloadedConfig.size > 1;
      const loadedConfig = preloadedConfig && preloadedConfig.get('load_config_file') === false ? {} : await getConfig(configUrl, isPreloaded);
      /**
       * Merge any existing configuration so the result can be validated.
       */

      let mergedConfig = mergePreloadedConfig(preloadedConfig, loadedConfig);
      (0, _configSchema.validateConfig)(mergedConfig.toJS());
      mergedConfig = await handleLocalBackend(mergedConfig);
      const config = applyDefaults(mergedConfig);
      dispatch(configDidLoad(config));
      dispatch((0, _auth.authenticateUser)());
    } catch (err) {
      dispatch(configFailed(err));
      throw err;
    }
  };
}