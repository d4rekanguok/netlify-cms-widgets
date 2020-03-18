"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EmptyMessageContainer = (0, _styledBase.default)("div", {
  target: "e11npagm0",
  label: "EmptyMessageContainer"
})("height:100%;width:100%;display:flex;justify-content:center;align-items:center;color:", props => props.isPrivate && _netlifyCmsUiDefault.colors.textFieldBorder, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01lZGlhTGlicmFyeS9FbXB0eU1lc3NhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS3dDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01lZGlhTGlicmFyeS9FbXB0eU1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5jb25zdCBFbXB0eU1lc3NhZ2VDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuaXNQcml2YXRlICYmIGNvbG9ycy50ZXh0RmllbGRCb3JkZXJ9O1xuYDtcblxuY29uc3QgRW1wdHlNZXNzYWdlID0gKHsgY29udGVudCwgaXNQcml2YXRlIH0pID0+IChcbiAgPEVtcHR5TWVzc2FnZUNvbnRhaW5lciBpc1ByaXZhdGU9e2lzUHJpdmF0ZX0+XG4gICAgPGgxPntjb250ZW50fTwvaDE+XG4gIDwvRW1wdHlNZXNzYWdlQ29udGFpbmVyPlxuKTtcblxuRW1wdHlNZXNzYWdlLnByb3BUeXBlcyA9IHtcbiAgY29udGVudDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBpc1ByaXZhdGU6IFByb3BUeXBlcy5ib29sLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRW1wdHlNZXNzYWdlO1xuIl19 */"));

const EmptyMessage = ({
  content,
  isPrivate
}) => (0, _core.jsx)(EmptyMessageContainer, {
  isPrivate: isPrivate
}, (0, _core.jsx)("h1", null, content));

EmptyMessage.propTypes = {
  content: _propTypes.default.string.isRequired,
  isPrivate: _propTypes.default.bool
};
var _default = EmptyMessage;
exports.default = _default;