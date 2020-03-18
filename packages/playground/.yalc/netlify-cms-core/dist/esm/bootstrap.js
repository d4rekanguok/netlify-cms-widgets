"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reactRouterRedux = require("react-router-redux");

var _history = _interopRequireDefault(require("./routing/history"));

var _redux = _interopRequireDefault(require("./redux"));

var _config = require("./actions/config");

var _phrases = require("./lib/phrases");

var _config2 = require("./reducers/config");

var _reactPolyglot = require("react-polyglot");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _UI = require("./components/UI");

var _App = _interopRequireDefault(require("./components/App/App"));

require("./components/EditorWidgets");

require("./mediaLibrary");

require("what-input");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ROOT_ID = 'nc-root';

const TranslatedApp = ({
  locale
}) => {
  return (0, _core.jsx)(_reactPolyglot.I18n, {
    locale: locale,
    messages: (0, _phrases.getPhrases)(locale)
  }, (0, _core.jsx)(_UI.ErrorBoundary, {
    showBackup: true
  }, (0, _core.jsx)(_reactRouterRedux.ConnectedRouter, {
    history: _history.default
  }, (0, _core.jsx)(_reactRouterDom.Route, {
    component: _App.default
  }))));
};

const mapDispatchToProps = state => {
  return {
    locale: (0, _config2.selectLocale)(state.config)
  };
};

const ConnectedTranslatedApp = (0, _reactRedux.connect)(mapDispatchToProps)(TranslatedApp);

function bootstrap(opts = {}) {
  const {
    config
  } = opts;
  /**
   * Log the version number.
   */

  if (typeof "2.22.0" === 'string') {
    console.log("netlify-cms-core ".concat("2.22.0"));
  }
  /**
   * Get DOM element where app will mount.
   */


  function getRoot() {
    /**
     * Return existing root if found.
     */
    const existingRoot = document.getElementById(ROOT_ID);

    if (existingRoot) {
      return existingRoot;
    }
    /**
     * If no existing root, create and return a new root.
     */


    const newRoot = document.createElement('div');
    newRoot.id = ROOT_ID;
    document.body.appendChild(newRoot);
    return newRoot;
  }
  /**
   * Dispatch config to store if received. This config will be merged into
   * config.yml if it exists, and any portion that produces a conflict will be
   * overwritten.
   */


  if (config) {
    _redux.default.dispatch((0, _config.mergeConfig)(config));
  }
  /**
   * Create connected root component.
   */


  const Root = () => (0, _core.jsx)(_react.default.Fragment, null, (0, _core.jsx)(_netlifyCmsUiDefault.GlobalStyles, null), (0, _core.jsx)(_reactRedux.Provider, {
    store: _redux.default
  }, (0, _core.jsx)(ConnectedTranslatedApp, null)));
  /**
   * Render application root.
   */


  (0, _reactDom.render)((0, _core.jsx)(Root, null), getRoot());
}

var _default = bootstrap;
exports.default = _default;