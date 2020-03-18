"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUploadButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FileUploadButton = ({
  label,
  imagesOnly,
  onChange,
  disabled,
  className
}) => (0, _core.jsx)("label", {
  className: "nc-fileUploadButton ".concat(className || '')
}, (0, _core.jsx)("span", null, label), (0, _core.jsx)("input", {
  type: "file",
  accept: imagesOnly ? 'image/*' : '*/*',
  onChange: onChange,
  disabled: disabled
}));

exports.FileUploadButton = FileUploadButton;
FileUploadButton.propTypes = {
  className: _propTypes.default.string,
  label: _propTypes.default.string.isRequired,
  imagesOnly: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool
};