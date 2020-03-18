"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPreviewStyle = registerPreviewStyle;
exports.getPreviewStyles = getPreviewStyles;
exports.registerPreviewTemplate = registerPreviewTemplate;
exports.getPreviewTemplate = getPreviewTemplate;
exports.registerWidget = registerWidget;
exports.getWidget = getWidget;
exports.getWidgets = getWidgets;
exports.resolveWidget = resolveWidget;
exports.registerEditorComponent = registerEditorComponent;
exports.getEditorComponents = getEditorComponents;
exports.registerWidgetValueSerializer = registerWidgetValueSerializer;
exports.getWidgetValueSerializer = getWidgetValueSerializer;
exports.registerBackend = registerBackend;
exports.getBackend = getBackend;
exports.registerMediaLibrary = registerMediaLibrary;
exports.getMediaLibrary = getMediaLibrary;
exports.getEventListeners = getEventListeners;
exports.registerEventListener = registerEventListener;
exports.invokeEvent = invokeEvent;
exports.removeEventListener = removeEventListener;
exports.registerLocale = registerLocale;
exports.getLocale = getLocale;
exports.default = void 0;

var _immutable = require("immutable");

var _immer = _interopRequireDefault(require("immer"));

var _commonTags = require("common-tags");

var _EditorComponent = _interopRequireDefault(require("../valueObjects/EditorComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n        Only one editor component of type \"code-block\" may be registered. Previously registered code\n        block component(s) will be overwritten.\n      "]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n        Multiple widgets registered with name \"", "\". Only the last widget registered with\n        this name will be used.\n      "]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const allowedEvents = ['prePublish', 'postPublish', 'preUnpublish', 'postUnpublish'];
const eventHandlers = {};
allowedEvents.forEach(e => {
  eventHandlers[e] = [];
});
/**
 * Global Registry Object
 */

const registry = {
  backends: {},
  templates: {},
  previewStyles: [],
  widgets: {},
  editorComponents: (0, _immutable.Map)(),
  widgetValueSerializers: {},
  mediaLibraries: [],
  locales: {},
  eventHandlers
};
var _default = {
  registerPreviewStyle,
  getPreviewStyles,
  registerPreviewTemplate,
  getPreviewTemplate,
  registerWidget,
  getWidget,
  getWidgets,
  resolveWidget,
  registerEditorComponent,
  getEditorComponents,
  registerWidgetValueSerializer,
  getWidgetValueSerializer,
  registerBackend,
  getBackend,
  registerMediaLibrary,
  getMediaLibrary,
  registerLocale,
  getLocale,
  registerEventListener,
  removeEventListener,
  getEventListeners,
  invokeEvent
};
/**
 * Preview Styles
 *
 * Valid options:
 *  - raw {boolean} if `true`, `style` value is expected to be a CSS string
 */

exports.default = _default;

function registerPreviewStyle(style, opts) {
  registry.previewStyles.push(_objectSpread({}, opts, {
    value: style
  }));
}

function getPreviewStyles() {
  return registry.previewStyles;
}
/**
 * Preview Templates
 */


function registerPreviewTemplate(name, component) {
  registry.templates[name] = component;
}

function getPreviewTemplate(name) {
  return registry.templates[name];
}
/**
 * Editor Widgets
 */


function registerWidget(name, control, preview) {
  if (Array.isArray(name)) {
    name.forEach(widget => {
      if (typeof widget !== 'object') {
        console.error("Cannot register widget: ".concat(widget));
      } else {
        registerWidget(widget);
      }
    });
  } else if (typeof name === 'string') {
    // A registered widget control can be reused by a new widget, allowing
    // multiple copies with different previews.
    const newControl = typeof control === 'string' ? registry.widgets[control].control : control;
    registry.widgets[name] = {
      control: newControl,
      preview
    };
  } else if (typeof name === 'object') {
    const {
      name: widgetName,
      controlComponent: control,
      previewComponent: preview,
      allowMapValue,
      globalStyles
    } = name,
          options = _objectWithoutProperties(name, ["name", "controlComponent", "previewComponent", "allowMapValue", "globalStyles"]);

    if (registry.widgets[widgetName]) {
      console.warn((0, _commonTags.oneLine)(_templateObject(), widgetName));
    }

    if (!control) {
      throw Error("Widget \"".concat(widgetName, "\" registered without `controlComponent`."));
    }

    registry.widgets[widgetName] = _objectSpread({
      control,
      preview,
      globalStyles,
      allowMapValue
    }, options);
  } else {
    console.error('`registerWidget` failed, called with incorrect arguments.');
  }
}

function getWidget(name) {
  const widget = registry.widgets[name];

  if (!widget) {
    const nameLowerCase = name.toLowerCase();
    const hasLowerCase = !!registry.widgets[nameLowerCase];
    const message = hasLowerCase ? "Could not find widget '".concat(name, "'. Did you mean '").concat(nameLowerCase, "'?") : "Could not find widget '".concat(name, "'. Please make sure the widget name is configured correctly or register it via 'registerwidget'.");
    throw new Error(message);
  }

  return widget;
}

function getWidgets() {
  return (0, _immer.default)(Object.entries(registry.widgets), draft => {
    return draft.map(([key, value]) => _objectSpread({
      name: key
    }, value));
  });
}

function resolveWidget(name) {
  return getWidget(name || 'string') || getWidget('unknown');
}
/**
 * Markdown Editor Custom Components
 */


function registerEditorComponent(component) {
  const plugin = (0, _EditorComponent.default)(component);

  if (plugin.type === 'code-block') {
    const codeBlock = registry.editorComponents.find(c => c.type === 'code-block');

    if (codeBlock) {
      console.warn((0, _commonTags.oneLine)(_templateObject2()));
      registry.editorComponents = registry.editorComponents.delete(codeBlock.id);
    }
  }

  registry.editorComponents = registry.editorComponents.set(plugin.id, plugin);
}

function getEditorComponents() {
  return registry.editorComponents;
}
/**
 * Widget Serializers
 */


function registerWidgetValueSerializer(widgetName, serializer) {
  registry.widgetValueSerializers[widgetName] = serializer;
}

function getWidgetValueSerializer(widgetName) {
  return registry.widgetValueSerializers[widgetName];
}
/**
 * Backend API
 */


function registerBackend(name, BackendClass) {
  if (!name || !BackendClass) {
    console.error("Backend parameters invalid. example: CMS.registerBackend('myBackend', BackendClass)");
  } else if (registry.backends[name]) {
    console.error("Backend [".concat(name, "] already registered. Please choose a different name."));
  } else {
    registry.backends[name] = {
      init: (...args) => new BackendClass(...args)
    };
  }
}

function getBackend(name) {
  return registry.backends[name];
}
/**
 * Media Libraries
 */


function registerMediaLibrary(mediaLibrary, options) {
  if (registry.mediaLibraries.find(ml => mediaLibrary.name === ml.name)) {
    throw new Error("A media library named ".concat(mediaLibrary.name, " has already been registered."));
  }

  registry.mediaLibraries.push(_objectSpread({}, mediaLibrary, {
    options
  }));
}

function getMediaLibrary(name) {
  return registry.mediaLibraries.find(ml => ml.name === name);
}

function validateEventName(name) {
  if (!allowedEvents.includes(name)) {
    throw new Error("Invalid event name '".concat(name, "'"));
  }
}

function getEventListeners(name) {
  validateEventName(name);
  return [...registry.eventHandlers[name]];
}

function registerEventListener({
  name,
  handler
}, options = {}) {
  validateEventName(name);
  registry.eventHandlers[name].push({
    handler,
    options
  });
}

async function invokeEvent({
  name,
  data
}) {
  validateEventName(name);
  const handlers = registry.eventHandlers[name];

  for (const {
    handler,
    options
  } of handlers) {
    try {
      await handler(data, options);
    } catch (e) {
      console.warn("Failed running handler for event ".concat(name, " with message: ").concat(e.message));
    }
  }
}

function removeEventListener({
  name,
  handler
}) {
  validateEventName(name);

  if (handler) {
    registry.eventHandlers[name] = registry.eventHandlers[name].filter(item => item.handler !== handler);
  } else {
    registry.eventHandlers[name] = [];
  }
}
/**
 * Locales
 */


function registerLocale(locale, phrases) {
  if (!locale || !phrases) {
    console.error("Locale parameters invalid. example: CMS.registerLocale('locale', phrases)");
  } else {
    registry.locales[locale] = phrases;
  }
}

function getLocale(locale) {
  return registry.locales[locale];
}