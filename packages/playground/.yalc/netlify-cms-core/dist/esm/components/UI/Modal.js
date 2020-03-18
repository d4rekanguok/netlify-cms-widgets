"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _reactModal = _interopRequireDefault(require("react-modal"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  const data = _taggedTemplateLiteral(["\n                  ", ";\n                "]);

  _templateObject4 = function () {
    return data;
  };

  return data;
}

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n                  ", ";\n                "]);

  _templateObject3 = function () {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n                  ", ";\n                "]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n                    ", ";\n                  "]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var _ref = process.env.NODE_ENV === "production" ? {
  name: "1o9c9d2-ReactModalGlobalStyles",
  styles: ".ReactModal__Body--open{overflow:hidden;};label:ReactModalGlobalStyles;"
} : {
  name: "1o9c9d2-ReactModalGlobalStyles",
  styles: ".ReactModal__Body--open{overflow:hidden;};label:ReactModalGlobalStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL01vZGFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFlIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL01vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjc3MsIEdsb2JhbCwgQ2xhc3NOYW1lcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IFJlYWN0TW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xuaW1wb3J0IHsgdHJhbnNpdGlvbnMsIHNoYWRvd3MsIGxlbmd0aHMgfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuY29uc3QgUmVhY3RNb2RhbEdsb2JhbFN0eWxlcyA9ICgpID0+IChcbiAgPEdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgLlJlYWN0TW9kYWxfX0JvZHktLW9wZW4ge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBzdHlsZVN0cmluZ3MgPSB7XG4gIG1vZGFsQm9keTogYFxuICAgICR7c2hhZG93cy5kcm9wRGVlcH07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAke2xlbmd0aHMuYm9yZGVyUmFkaXVzfTtcbiAgICBoZWlnaHQ6IDgwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWF4LXdpZHRoOiAyMjAwcHg7XG4gICAgcGFkZGluZzogMjBweDtcblxuICAgICY6Zm9jdXMge1xuICAgICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG4gIGAsXG4gIG92ZXJsYXk6IGBcbiAgICB6LWluZGV4OiA5OTk5OTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAke3RyYW5zaXRpb25zLm1haW59LCBvcGFjaXR5ICR7dHJhbnNpdGlvbnMubWFpbn07XG4gIGAsXG4gIG92ZXJsYXlBZnRlck9wZW46IGBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgb3BhY2l0eTogMTtcbiAgYCxcbiAgb3ZlcmxheUJlZm9yZUNsb3NlOiBgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgICBvcGFjaXR5OiAwO1xuICBgLFxufTtcblxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICBpc09wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgUmVhY3RNb2RhbC5zZXRBcHBFbGVtZW50KCcjbmMtcm9vdCcpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNPcGVuLCBjaGlsZHJlbiwgY2xhc3NOYW1lLCBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8UmVhY3RNb2RhbEdsb2JhbFN0eWxlcyAvPlxuICAgICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgICB7KHsgY3NzLCBjeCB9KSA9PiAoXG4gICAgICAgICAgICA8UmVhY3RNb2RhbFxuICAgICAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsb3NlVGltZW91dE1TPXszMDB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17e1xuICAgICAgICAgICAgICAgIGJhc2U6IGN4KFxuICAgICAgICAgICAgICAgICAgY3NzYFxuICAgICAgICAgICAgICAgICAgICAke3N0eWxlU3RyaW5ncy5tb2RhbEJvZHl9O1xuICAgICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGFmdGVyT3BlbjogJycsXG4gICAgICAgICAgICAgICAgYmVmb3JlQ2xvc2U6ICcnLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBvdmVybGF5Q2xhc3NOYW1lPXt7XG4gICAgICAgICAgICAgICAgYmFzZTogY3NzYFxuICAgICAgICAgICAgICAgICAgJHtzdHlsZVN0cmluZ3Mub3ZlcmxheX07XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICBhZnRlck9wZW46IGNzc2BcbiAgICAgICAgICAgICAgICAgICR7c3R5bGVTdHJpbmdzLm92ZXJsYXlBZnRlck9wZW59O1xuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgICAgYmVmb3JlQ2xvc2U6IGNzc2BcbiAgICAgICAgICAgICAgICAgICR7c3R5bGVTdHJpbmdzLm92ZXJsYXlCZWZvcmVDbG9zZX07XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgPC9SZWFjdE1vZGFsPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2xhc3NOYW1lcz5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const ReactModalGlobalStyles = () => (0, _core.jsx)(_core.Global, {
  styles: _ref
});

const styleStrings = {
  modalBody: "\n    ".concat(_netlifyCmsUiDefault.shadows.dropDeep, ";\n    background-color: #fff;\n    border-radius: ").concat(_netlifyCmsUiDefault.lengths.borderRadius, ";\n    height: 80%;\n    text-align: center;\n    max-width: 2200px;\n    padding: 20px;\n\n    &:focus {\n      outline: none;\n    }\n  "),
  overlay: "\n    z-index: 99999;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    opacity: 0;\n    background-color: rgba(0, 0, 0, 0);\n    transition: background-color ".concat(_netlifyCmsUiDefault.transitions.main, ", opacity ").concat(_netlifyCmsUiDefault.transitions.main, ";\n  "),
  overlayAfterOpen: "\n    background-color: rgba(0, 0, 0, 0.6);\n    opacity: 1;\n  ",
  overlayBeforeClose: "\n    background-color: rgba(0, 0, 0, 0);\n    opacity: 0;\n  "
};

class Modal extends _react.default.Component {
  componentDidMount() {
    _reactModal.default.setAppElement('#nc-root');
  }

  render() {
    const {
      isOpen,
      children,
      className,
      onClose
    } = this.props;
    return (0, _core.jsx)(_react.default.Fragment, null, (0, _core.jsx)(ReactModalGlobalStyles, null), (0, _core.jsx)(_core.ClassNames, null, ({
      css,
      cx
    }) => (0, _core.jsx)(_reactModal.default, {
      isOpen: isOpen,
      onRequestClose: onClose,
      closeTimeoutMS: 300,
      className: {
        base: cx(css(_templateObject(), styleStrings.modalBody), className),
        afterOpen: '',
        beforeClose: ''
      },
      overlayClassName: {
        base: css(_templateObject2(), styleStrings.overlay),
        afterOpen: css(_templateObject3(), styleStrings.overlayAfterOpen),
        beforeClose: css(_templateObject4(), styleStrings.overlayBeforeClose)
      }
    }, children)));
  }

}

exports.Modal = Modal;

_defineProperty(Modal, "propTypes", {
  children: _propTypes.default.node.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  className: _propTypes.default.string,
  onClose: _propTypes.default.func.isRequired
});