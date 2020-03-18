"use strict";

var _netlifyCmsCore = require("netlify-cms-core");

var _netlifyCmsBackendGithub = require("netlify-cms-backend-github");

var _netlifyCmsBackendGitlab = require("netlify-cms-backend-gitlab");

var _netlifyCmsBackendGitGateway = require("netlify-cms-backend-git-gateway");

var _netlifyCmsBackendBitbucket = require("netlify-cms-backend-bitbucket");

var _netlifyCmsBackendTest = require("netlify-cms-backend-test");

var _netlifyCmsBackendProxy = require("netlify-cms-backend-proxy");

var _netlifyCmsWidgetString = _interopRequireDefault(require("netlify-cms-widget-string"));

var _netlifyCmsWidgetNumber = _interopRequireDefault(require("netlify-cms-widget-number"));

var _netlifyCmsWidgetText = _interopRequireDefault(require("netlify-cms-widget-text"));

var _netlifyCmsWidgetImage = _interopRequireDefault(require("netlify-cms-widget-image"));

var _netlifyCmsWidgetFile = _interopRequireDefault(require("netlify-cms-widget-file"));

var _netlifyCmsWidgetSelect = _interopRequireDefault(require("netlify-cms-widget-select"));

var _netlifyCmsWidgetMarkdown = _interopRequireDefault(require("netlify-cms-widget-markdown"));

var _netlifyCmsWidgetList = _interopRequireDefault(require("netlify-cms-widget-list"));

var _netlifyCmsWidgetObject = _interopRequireDefault(require("netlify-cms-widget-object"));

var _netlifyCmsWidgetRelation = _interopRequireDefault(require("netlify-cms-widget-relation"));

var _netlifyCmsWidgetBoolean = _interopRequireDefault(require("netlify-cms-widget-boolean"));

var _netlifyCmsWidgetMap = _interopRequireDefault(require("netlify-cms-widget-map"));

var _netlifyCmsWidgetDate = _interopRequireDefault(require("netlify-cms-widget-date"));

var _netlifyCmsWidgetDatetime = _interopRequireDefault(require("netlify-cms-widget-datetime"));

var _netlifyCmsWidgetCode = _interopRequireDefault(require("netlify-cms-widget-code"));

var _netlifyCmsEditorComponentImage = _interopRequireDefault(require("netlify-cms-editor-component-image"));

var locales = _interopRequireWildcard(require("netlify-cms-locales"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Core
// Backends
// Widgets
// Editor Components
// Locales
// Register all the things
_netlifyCmsCore.NetlifyCmsCore.registerBackend('git-gateway', _netlifyCmsBackendGitGateway.GitGatewayBackend);

_netlifyCmsCore.NetlifyCmsCore.registerBackend('github', _netlifyCmsBackendGithub.GitHubBackend);

_netlifyCmsCore.NetlifyCmsCore.registerBackend('gitlab', _netlifyCmsBackendGitlab.GitLabBackend);

_netlifyCmsCore.NetlifyCmsCore.registerBackend('bitbucket', _netlifyCmsBackendBitbucket.BitbucketBackend);

_netlifyCmsCore.NetlifyCmsCore.registerBackend('test-repo', _netlifyCmsBackendTest.TestBackend);

_netlifyCmsCore.NetlifyCmsCore.registerBackend('proxy', _netlifyCmsBackendProxy.ProxyBackend);

_netlifyCmsCore.NetlifyCmsCore.registerWidget([_netlifyCmsWidgetString.default.Widget(), _netlifyCmsWidgetNumber.default.Widget(), _netlifyCmsWidgetText.default.Widget(), _netlifyCmsWidgetImage.default.Widget(), _netlifyCmsWidgetFile.default.Widget(), _netlifyCmsWidgetSelect.default.Widget(), _netlifyCmsWidgetMarkdown.default.Widget(), _netlifyCmsWidgetList.default.Widget(), _netlifyCmsWidgetObject.default.Widget(), _netlifyCmsWidgetRelation.default.Widget(), _netlifyCmsWidgetBoolean.default.Widget(), _netlifyCmsWidgetMap.default.Widget(), _netlifyCmsWidgetDate.default.Widget(), _netlifyCmsWidgetDatetime.default.Widget(), _netlifyCmsWidgetCode.default.Widget()]);

_netlifyCmsCore.NetlifyCmsCore.registerEditorComponent(_netlifyCmsEditorComponentImage.default);

_netlifyCmsCore.NetlifyCmsCore.registerEditorComponent({
  id: 'code-block',
  label: 'Code Block',
  widget: 'code',
  type: 'code-block'
});

Object.keys(locales).forEach(locale => {
  _netlifyCmsCore.NetlifyCmsCore.registerLocale(locale, locales[locale]);
});