"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _EditorControl = _interopRequireDefault(require("./EditorControl"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const ControlPaneContainer = (0, _styledBase.default)("div", {
  target: "e1tnasa20",
  label: "ControlPaneContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "78woh1",
  styles: "max-width:800px;margin:0 auto;padding-bottom:16px;font-size:16px;"
} : {
  name: "78woh1",
  styles: "max-width:800px;margin:0 auto;padding-bottom:16px;font-size:16px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JDb250cm9sUGFuZS9FZGl0b3JDb250cm9sUGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNdUMiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yL0VkaXRvckNvbnRyb2xQYW5lL0VkaXRvckNvbnRyb2xQYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IEVkaXRvckNvbnRyb2wgZnJvbSAnLi9FZGl0b3JDb250cm9sJztcblxuY29uc3QgQ29udHJvbFBhbmVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBtYXgtd2lkdGg6IDgwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgcGFkZGluZy1ib3R0b206IDE2cHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xQYW5lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50VmFsaWRhdGUgPSB7fTtcblxuICBjb250cm9sUmVmKGZpZWxkLCB3cmFwcGVkQ29udHJvbCkge1xuICAgIGlmICghd3JhcHBlZENvbnRyb2wpIHJldHVybjtcbiAgICBjb25zdCBuYW1lID0gZmllbGQuZ2V0KCduYW1lJyk7XG5cbiAgICB0aGlzLmNvbXBvbmVudFZhbGlkYXRlW25hbWVdID1cbiAgICAgIHdyYXBwZWRDb250cm9sLmlubmVyV3JhcHBlZENvbnRyb2wudmFsaWRhdGUgfHwgd3JhcHBlZENvbnRyb2wudmFsaWRhdGU7XG4gIH1cblxuICB2YWxpZGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZC5nZXQoJ3dpZGdldCcpID09PSAnaGlkZGVuJykgcmV0dXJuO1xuICAgICAgdGhpcy5jb21wb25lbnRWYWxpZGF0ZVtmaWVsZC5nZXQoJ25hbWUnKV0oKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29sbGVjdGlvbixcbiAgICAgIGZpZWxkcyxcbiAgICAgIGVudHJ5LFxuICAgICAgZmllbGRzTWV0YURhdGEsXG4gICAgICBmaWVsZHNFcnJvcnMsXG4gICAgICBvbkNoYW5nZSxcbiAgICAgIG9uVmFsaWRhdGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWNvbGxlY3Rpb24gfHwgIWZpZWxkcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5LnNpemUgPT09IDAgfHwgZW50cnkuZ2V0KCdwYXJ0aWFsJykgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udHJvbFBhbmVDb250YWluZXI+XG4gICAgICAgIHtmaWVsZHMubWFwKChmaWVsZCwgaSkgPT5cbiAgICAgICAgICBmaWVsZC5nZXQoJ3dpZGdldCcpID09PSAnaGlkZGVuJyA/IG51bGwgOiAoXG4gICAgICAgICAgICA8RWRpdG9yQ29udHJvbFxuICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgIGZpZWxkPXtmaWVsZH1cbiAgICAgICAgICAgICAgdmFsdWU9e2VudHJ5LmdldEluKFsnZGF0YScsIGZpZWxkLmdldCgnbmFtZScpXSl9XG4gICAgICAgICAgICAgIGZpZWxkc01ldGFEYXRhPXtmaWVsZHNNZXRhRGF0YX1cbiAgICAgICAgICAgICAgZmllbGRzRXJyb3JzPXtmaWVsZHNFcnJvcnN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25WYWxpZGF0ZT17b25WYWxpZGF0ZX1cbiAgICAgICAgICAgICAgcHJvY2Vzc0NvbnRyb2xSZWY9e3RoaXMuY29udHJvbFJlZi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBjb250cm9sUmVmPXt0aGlzLmNvbnRyb2xSZWZ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICksXG4gICAgICAgICl9XG4gICAgICA8L0NvbnRyb2xQYW5lQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuQ29udHJvbFBhbmUucHJvcFR5cGVzID0ge1xuICBjb2xsZWN0aW9uOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGVudHJ5OiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGZpZWxkczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgZmllbGRzTWV0YURhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZmllbGRzRXJyb3JzOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvblZhbGlkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

class ControlPane extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "componentValidate", {});

    _defineProperty(this, "validate", () => {
      this.props.fields.forEach(field => {
        if (field.get('widget') === 'hidden') return;
        this.componentValidate[field.get('name')]();
      });
    });
  }

  controlRef(field, wrappedControl) {
    if (!wrappedControl) return;
    const name = field.get('name');
    this.componentValidate[name] = wrappedControl.innerWrappedControl.validate || wrappedControl.validate;
  }

  render() {
    const {
      collection,
      fields,
      entry,
      fieldsMetaData,
      fieldsErrors,
      onChange,
      onValidate
    } = this.props;

    if (!collection || !fields) {
      return null;
    }

    if (entry.size === 0 || entry.get('partial') === true) {
      return null;
    }

    return (0, _core.jsx)(ControlPaneContainer, null, fields.map((field, i) => field.get('widget') === 'hidden' ? null : (0, _core.jsx)(_EditorControl.default, {
      key: i,
      field: field,
      value: entry.getIn(['data', field.get('name')]),
      fieldsMetaData: fieldsMetaData,
      fieldsErrors: fieldsErrors,
      onChange: onChange,
      onValidate: onValidate,
      processControlRef: this.controlRef.bind(this),
      controlRef: this.controlRef
    })));
  }

}

exports.default = ControlPane;
ControlPane.propTypes = {
  collection: _reactImmutableProptypes.default.map.isRequired,
  entry: _reactImmutableProptypes.default.map.isRequired,
  fields: _reactImmutableProptypes.default.list.isRequired,
  fieldsMetaData: _reactImmutableProptypes.default.map.isRequired,
  fieldsErrors: _reactImmutableProptypes.default.map.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onValidate: _propTypes.default.func.isRequired
};