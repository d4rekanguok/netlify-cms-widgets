"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _reactPolyglot = require("react-polyglot");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NotFoundContainer = (0, _styledBase.default)("div", {
  target: "e8enq1s0",
  label: "NotFoundContainer"
})("margin:", _netlifyCmsUiDefault.lengths.pageMargin, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FwcC9Ob3RGb3VuZFBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTW9DIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FwcC9Ob3RGb3VuZFBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHsgbGVuZ3RocyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgTm90Rm91bmRDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46ICR7bGVuZ3Rocy5wYWdlTWFyZ2lufTtcbmA7XG5cbmNvbnN0IE5vdEZvdW5kUGFnZSA9ICh7IHQgfSkgPT4gKFxuICA8Tm90Rm91bmRDb250YWluZXI+XG4gICAgPGgyPnt0KCdhcHAubm90Rm91bmRQYWdlLmhlYWRlcicpfTwvaDI+XG4gIDwvTm90Rm91bmRDb250YWluZXI+XG4pO1xuXG5Ob3RGb3VuZFBhZ2UucHJvcFR5cGVzID0ge1xuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlKCkoTm90Rm91bmRQYWdlKTtcbiJdfQ== */"));

const NotFoundPage = ({
  t
}) => (0, _core.jsx)(NotFoundContainer, null, (0, _core.jsx)("h2", null, t('app.notFoundPage.header')));

NotFoundPage.propTypes = {
  t: _propTypes.default.func.isRequired
};

var _default = (0, _reactPolyglot.translate)()(NotFoundPage);

exports.default = _default;