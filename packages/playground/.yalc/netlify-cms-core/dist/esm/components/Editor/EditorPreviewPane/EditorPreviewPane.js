"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PreviewPane = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactFrameComponent = _interopRequireDefault(require("react-frame-component"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _registry = require("../../../lib/registry");

var _UI = require("../../UI");

var _collections = require("../../../reducers/collections");

var _reactRedux = require("react-redux");

var _media = require("../../../actions/media");

var _medias = require("../../../reducers/medias");

var _fieldInference = require("../../../constants/fieldInference");

var _EditorPreviewContent = _interopRequireDefault(require("./EditorPreviewContent.js"));

var _PreviewHOC = _interopRequireDefault(require("./PreviewHOC"));

var _EditorPreview = _interopRequireDefault(require("./EditorPreview"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PreviewPaneFrame = ( /*#__PURE__*/0, _styledBase.default)(_reactFrameComponent.default, {
  target: "e6emspu0",
  label: "PreviewPaneFrame"
})("width:100%;height:100%;border:none;background:#fff;border-radius:", _netlifyCmsUiDefault.lengths.borderRadius, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQnNDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgRnJhbWUgZnJvbSAncmVhY3QtZnJhbWUtY29tcG9uZW50JztcbmltcG9ydCB7IGxlbmd0aHMgfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IHJlc29sdmVXaWRnZXQsIGdldFByZXZpZXdUZW1wbGF0ZSwgZ2V0UHJldmlld1N0eWxlcyB9IGZyb20gJ0xpYi9yZWdpc3RyeSc7XG5pbXBvcnQgeyBFcnJvckJvdW5kYXJ5IH0gZnJvbSAnVUknO1xuaW1wb3J0IHsgc2VsZWN0VGVtcGxhdGVOYW1lLCBzZWxlY3RJbmZlcmVkRmllbGQsIHNlbGVjdEZpZWxkIH0gZnJvbSAnUmVkdWNlcnMvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGJvdW5kR2V0QXNzZXQgfSBmcm9tICdBY3Rpb25zL21lZGlhJztcbmltcG9ydCB7IHNlbGVjdElzTG9hZGluZ0Fzc2V0IH0gZnJvbSAnUmVkdWNlcnMvbWVkaWFzJztcbmltcG9ydCB7IElORkVSQUJMRV9GSUVMRFMgfSBmcm9tICdDb25zdGFudHMvZmllbGRJbmZlcmVuY2UnO1xuaW1wb3J0IEVkaXRvclByZXZpZXdDb250ZW50IGZyb20gJy4vRWRpdG9yUHJldmlld0NvbnRlbnQuanMnO1xuaW1wb3J0IFByZXZpZXdIT0MgZnJvbSAnLi9QcmV2aWV3SE9DJztcbmltcG9ydCBFZGl0b3JQcmV2aWV3IGZyb20gJy4vRWRpdG9yUHJldmlldyc7XG5cbmNvbnN0IFByZXZpZXdQYW5lRnJhbWUgPSBzdHlsZWQoRnJhbWUpYFxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuYDtcblxuZXhwb3J0IGNsYXNzIFByZXZpZXdQYW5lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgZ2V0V2lkZ2V0ID0gKGZpZWxkLCB2YWx1ZSwgbWV0YWRhdGEsIHByb3BzLCBpZHggPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBnZXRBc3NldCwgZW50cnkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHdpZGdldCA9IHJlc29sdmVXaWRnZXQoZmllbGQuZ2V0KCd3aWRnZXQnKSk7XG4gICAgY29uc3Qga2V5ID0gaWR4ID8gZmllbGQuZ2V0KCduYW1lJykgKyAnXycgKyBpZHggOiBmaWVsZC5nZXQoJ25hbWUnKTtcbiAgICBjb25zdCB2YWx1ZUlzSW5NYXAgPSB2YWx1ZSAmJiAhd2lkZ2V0LmFsbG93TWFwVmFsdWUgJiYgTWFwLmlzTWFwKHZhbHVlKTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBhbiBIT0MgdG8gcHJvdmlkZSBjb25kaXRpb25hbCB1cGRhdGVzIGZvciBhbGwgcHJldmlld3MuXG4gICAgICovXG4gICAgcmV0dXJuICF3aWRnZXQucHJldmlldyA/IG51bGwgOiAoXG4gICAgICA8UHJldmlld0hPQ1xuICAgICAgICBwcmV2aWV3Q29tcG9uZW50PXt3aWRnZXQucHJldmlld31cbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIGZpZWxkPXtmaWVsZH1cbiAgICAgICAgZ2V0QXNzZXQ9e2dldEFzc2V0fVxuICAgICAgICB2YWx1ZT17dmFsdWVJc0luTWFwID8gdmFsdWUuZ2V0KGZpZWxkLmdldCgnbmFtZScpKSA6IHZhbHVlfVxuICAgICAgICBlbnRyeT17ZW50cnl9XG4gICAgICAgIGZpZWxkc01ldGFEYXRhPXttZXRhZGF0YX1cbiAgICAgICAgcmVzb2x2ZVdpZGdldD17cmVzb2x2ZVdpZGdldH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBpbmZlcmVkRmllbGRzID0ge307XG5cbiAgaW5mZXJGaWVsZHMoKSB7XG4gICAgY29uc3QgdGl0bGVGaWVsZCA9IHNlbGVjdEluZmVyZWRGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sICd0aXRsZScpO1xuICAgIGNvbnN0IHNob3J0VGl0bGVGaWVsZCA9IHNlbGVjdEluZmVyZWRGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sICdzaG9ydFRpdGxlJyk7XG4gICAgY29uc3QgYXV0aG9yRmllbGQgPSBzZWxlY3RJbmZlcmVkRmllbGQodGhpcy5wcm9wcy5jb2xsZWN0aW9uLCAnYXV0aG9yJyk7XG5cbiAgICB0aGlzLmluZmVyZWRGaWVsZHMgPSB7fTtcbiAgICBpZiAodGl0bGVGaWVsZCkgdGhpcy5pbmZlcmVkRmllbGRzW3RpdGxlRmllbGRdID0gSU5GRVJBQkxFX0ZJRUxEUy50aXRsZTtcbiAgICBpZiAoc2hvcnRUaXRsZUZpZWxkKSB0aGlzLmluZmVyZWRGaWVsZHNbc2hvcnRUaXRsZUZpZWxkXSA9IElORkVSQUJMRV9GSUVMRFMuc2hvcnRUaXRsZTtcbiAgICBpZiAoYXV0aG9yRmllbGQpIHRoaXMuaW5mZXJlZEZpZWxkc1thdXRob3JGaWVsZF0gPSBJTkZFUkFCTEVfRklFTERTLmF1dGhvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWRnZXQgY29tcG9uZW50IGZvciBhIG5hbWVkIGZpZWxkLCBhbmQgbWFrZXMgcmVjdXJzaXZlIGNhbGxzXG4gICAqIHRvIHJldHJpZXZlIGNvbXBvbmVudHMgZm9yIG5lc3RlZCBhbmQgZGVlcGx5IG5lc3RlZCBmaWVsZHMsIHdoaWNoIG9jY3VyIGluXG4gICAqIG9iamVjdCBhbmQgbGlzdCB0eXBlIGZpZWxkcy4gVXNlZCBpbnRlcm5hbGx5IHRvIHJldHJpZXZlIHdpZGdldHMsIGFuZCBhbHNvXG4gICAqIGV4cG9zZWQgZm9yIHVzZSBpbiBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMuXG4gICAqL1xuICB3aWRnZXRGb3IgPSAoXG4gICAgbmFtZSxcbiAgICBmaWVsZHMgPSB0aGlzLnByb3BzLmZpZWxkcyxcbiAgICB2YWx1ZXMgPSB0aGlzLnByb3BzLmVudHJ5LmdldCgnZGF0YScpLFxuICAgIGZpZWxkc01ldGFEYXRhID0gdGhpcy5wcm9wcy5maWVsZHNNZXRhRGF0YSxcbiAgKSA9PiB7XG4gICAgLy8gV2UgcmV0cmlldmUgdGhlIGZpZWxkIGJ5IG5hbWUgc28gdGhhdCB0aGlzIGZ1bmN0aW9uIGNhbiBhbHNvIGJlIHVzZWQgaW5cbiAgICAvLyBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMsIHdoZXJlIHRoZSBmaWVsZCBvYmplY3QgY2FuJ3QgYmUgcGFzc2VkIGluLlxuICAgIGxldCBmaWVsZCA9IGZpZWxkcyAmJiBmaWVsZHMuZmluZChmID0+IGYuZ2V0KCduYW1lJykgPT09IG5hbWUpO1xuICAgIGxldCB2YWx1ZSA9IHZhbHVlcyAmJiB2YWx1ZXMuZ2V0KGZpZWxkLmdldCgnbmFtZScpKTtcbiAgICBjb25zdCBuZXN0ZWRGaWVsZHMgPSBmaWVsZC5nZXQoJ2ZpZWxkcycpO1xuICAgIGNvbnN0IHNpbmdsZUZpZWxkID0gZmllbGQuZ2V0KCdmaWVsZCcpO1xuICAgIGNvbnN0IG1ldGFkYXRhID0gZmllbGRzTWV0YURhdGEgJiYgZmllbGRzTWV0YURhdGEuZ2V0KGZpZWxkLmdldCgnbmFtZScpLCBNYXAoKSk7XG5cbiAgICBpZiAobmVzdGVkRmllbGRzKSB7XG4gICAgICBmaWVsZCA9IGZpZWxkLnNldCgnZmllbGRzJywgdGhpcy5nZXROZXN0ZWRXaWRnZXRzKG5lc3RlZEZpZWxkcywgdmFsdWUsIG1ldGFkYXRhKSk7XG4gICAgfVxuXG4gICAgaWYgKHNpbmdsZUZpZWxkKSB7XG4gICAgICBmaWVsZCA9IGZpZWxkLnNldCgnZmllbGQnLCB0aGlzLmdldFNpbmdsZU5lc3RlZChzaW5nbGVGaWVsZCwgdmFsdWUsIG1ldGFkYXRhKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWxsZWRXaWRnZXRzID0gWydzdHJpbmcnLCAndGV4dCcsICdudW1iZXInXTtcbiAgICBjb25zdCBpbmZlcmVkRmllbGQgPSBPYmplY3QuZW50cmllcyh0aGlzLmluZmVyZWRGaWVsZHMpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZFRvTWF0Y2ggPSBzZWxlY3RGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sIGtleSk7XG4gICAgICAgIHJldHVybiBmaWVsZFRvTWF0Y2ggPT09IGZpZWxkO1xuICAgICAgfSlcbiAgICAgIC5tYXAoKFssIHZhbHVlXSkgPT4gdmFsdWUpWzBdO1xuXG4gICAgaWYgKGluZmVyZWRGaWVsZCkge1xuICAgICAgdmFsdWUgPSBpbmZlcmVkRmllbGQuZGVmYXVsdFByZXZpZXcodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB2YWx1ZSAmJlxuICAgICAgbGFiZWxsZWRXaWRnZXRzLmluZGV4T2YoZmllbGQuZ2V0KCd3aWRnZXQnKSkgIT09IC0xICYmXG4gICAgICB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IDUwXG4gICAgKSB7XG4gICAgICB2YWx1ZSA9IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3Ryb25nPntmaWVsZC5nZXQoJ2xhYmVsJywgZmllbGQuZ2V0KCduYW1lJykpfTo8L3N0cm9uZz4ge3ZhbHVlfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlID8gdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlLCBtZXRhZGF0YSwgdGhpcy5wcm9wcykgOiBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgd2lkZ2V0cyBmb3IgbmVzdGVkIGZpZWxkcyAoY2hpbGRyZW4gb2Ygb2JqZWN0L2xpc3QgZmllbGRzKVxuICAgKi9cbiAgZ2V0TmVzdGVkV2lkZ2V0cyA9IChmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpID0+IHtcbiAgICAvLyBGaWVsZHMgbmVzdGVkIHdpdGhpbiBhIGxpc3QgZmllbGQgd2lsbCBiZSBwYWlyZWQgd2l0aCBhIExpc3Qgb2YgdmFsdWUgTWFwcy5cbiAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWVzKSkge1xuICAgICAgcmV0dXJuIHZhbHVlcy5tYXAodmFsdWUgPT4gdGhpcy53aWRnZXRzRm9yTmVzdGVkRmllbGRzKGZpZWxkcywgdmFsdWUsIGZpZWxkc01ldGFEYXRhKSk7XG4gICAgfVxuICAgIC8vIEZpZWxkcyBuZXN0ZWQgd2l0aGluIGFuIG9iamVjdCBmaWVsZCB3aWxsIGJlIHBhaXJlZCB3aXRoIGEgc2luZ2xlIE1hcCBvZiB2YWx1ZXMuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0c0Zvck5lc3RlZEZpZWxkcyhmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpO1xuICB9O1xuXG4gIGdldFNpbmdsZU5lc3RlZCA9IChmaWVsZCwgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkgPT4ge1xuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZXMpKSB7XG4gICAgICByZXR1cm4gdmFsdWVzLm1hcCgodmFsdWUsIGlkeCkgPT5cbiAgICAgICAgdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlLCBmaWVsZHNNZXRhRGF0YS5nZXQoZmllbGQuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzLCBpZHgpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0V2lkZ2V0KGZpZWxkLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVc2Ugd2lkZ2V0Rm9yIGFzIGEgbWFwcGluZyBmdW5jdGlvbiBmb3IgcmVjdXJzaXZlIHdpZGdldCByZXRyaWV2YWxcbiAgICovXG4gIHdpZGdldHNGb3JOZXN0ZWRGaWVsZHMgPSAoZmllbGRzLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSA9PiB7XG4gICAgcmV0dXJuIGZpZWxkcy5tYXAoZmllbGQgPT4gdGhpcy53aWRnZXRGb3IoZmllbGQuZ2V0KCduYW1lJyksIGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGV4aXN0cyBlbnRpcmVseSB0byBleHBvc2UgbmVzdGVkIHdpZGdldHMgZm9yIG9iamVjdCBhbmQgbGlzdFxuICAgKiBmaWVsZHMgdG8gY3VzdG9tIHByZXZpZXcgdGVtcGxhdGVzLlxuICAgKlxuICAgKiBUT0RPOiBzZWUgaWYgd2lkZ2V0Rm9yIGNhbiBub3cgcHJvdmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkgZm9yIHByZXZpZXcgdGVtcGxhdGVzXG4gICAqL1xuICB3aWRnZXRzRm9yID0gbmFtZSA9PiB7XG4gICAgY29uc3QgeyBmaWVsZHMsIGVudHJ5LCBmaWVsZHNNZXRhRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5maW5kKGYgPT4gZi5nZXQoJ25hbWUnKSA9PT0gbmFtZSk7XG4gICAgY29uc3QgbmVzdGVkRmllbGRzID0gZmllbGQgJiYgZmllbGQuZ2V0KCdmaWVsZHMnKTtcbiAgICBjb25zdCB2YWx1ZSA9IGVudHJ5LmdldEluKFsnZGF0YScsIGZpZWxkLmdldCgnbmFtZScpXSk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBmaWVsZHNNZXRhRGF0YS5nZXQoZmllbGQuZ2V0KCduYW1lJyksIE1hcCgpKTtcblxuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5tYXAodmFsID0+IHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9XG4gICAgICAgICAgbmVzdGVkRmllbGRzICYmXG4gICAgICAgICAgTWFwKFxuICAgICAgICAgICAgbmVzdGVkRmllbGRzLm1hcCgoZiwgaSkgPT4gW1xuICAgICAgICAgICAgICBmLmdldCgnbmFtZScpLFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aX0+e3RoaXMuZ2V0V2lkZ2V0KGYsIHZhbCwgbWV0YWRhdGEuZ2V0KGYuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzKX08L2Rpdj4sXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gTWFwKHsgZGF0YTogdmFsLCB3aWRnZXRzIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hcCh7XG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgIHdpZGdldHM6XG4gICAgICAgIG5lc3RlZEZpZWxkcyAmJlxuICAgICAgICBNYXAoXG4gICAgICAgICAgbmVzdGVkRmllbGRzLm1hcChmID0+IFtcbiAgICAgICAgICAgIGYuZ2V0KCduYW1lJyksXG4gICAgICAgICAgICB0aGlzLmdldFdpZGdldChmLCB2YWx1ZSwgbWV0YWRhdGEuZ2V0KGYuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgKSxcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBlbnRyeSwgY29sbGVjdGlvbiB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LmdldCgnZGF0YScpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aWV3Q29tcG9uZW50ID1cbiAgICAgIGdldFByZXZpZXdUZW1wbGF0ZShzZWxlY3RUZW1wbGF0ZU5hbWUoY29sbGVjdGlvbiwgZW50cnkuZ2V0KCdzbHVnJykpKSB8fCBFZGl0b3JQcmV2aWV3O1xuXG4gICAgdGhpcy5pbmZlckZpZWxkcygpO1xuXG4gICAgY29uc3QgcHJldmlld1Byb3BzID0ge1xuICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgIHdpZGdldEZvcjogdGhpcy53aWRnZXRGb3IsXG4gICAgICB3aWRnZXRzRm9yOiB0aGlzLndpZGdldHNGb3IsXG4gICAgfTtcblxuICAgIGNvbnN0IHN0eWxlRWxzID0gZ2V0UHJldmlld1N0eWxlcygpLm1hcCgoc3R5bGUsIGkpID0+IHtcbiAgICAgIGlmIChzdHlsZS5yYXcpIHtcbiAgICAgICAgcmV0dXJuIDxzdHlsZSBrZXk9e2l9PntzdHlsZS52YWx1ZX08L3N0eWxlPjtcbiAgICAgIH1cbiAgICAgIHJldHVybiA8bGluayBrZXk9e2l9IGhyZWY9e3N0eWxlLnZhbHVlfSB0eXBlPVwidGV4dC9jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz47XG4gICAgfSk7XG5cbiAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgIDxQcmV2aWV3UGFuZUZyYW1lIGhlYWQ9e3N0eWxlRWxzfSAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFsQ29udGVudCA9IGBcbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG4gIDxoZWFkPjxiYXNlIHRhcmdldD1cIl9ibGFua1wiLz48L2hlYWQ+XG4gIDxib2R5PjxkaXY+PC9kaXY+PC9ib2R5PlxuPC9odG1sPlxuYDtcblxuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JCb3VuZGFyeT5cbiAgICAgICAgPFByZXZpZXdQYW5lRnJhbWUgaGVhZD17c3R5bGVFbHN9IGluaXRpYWxDb250ZW50PXtpbml0aWFsQ29udGVudH0+XG4gICAgICAgICAgPEVkaXRvclByZXZpZXdDb250ZW50IHsuLi57IHByZXZpZXdDb21wb25lbnQsIHByZXZpZXdQcm9wcyB9fSAvPlxuICAgICAgICA8L1ByZXZpZXdQYW5lRnJhbWU+XG4gICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgKTtcbiAgfVxufVxuXG5QcmV2aWV3UGFuZS5wcm9wVHlwZXMgPSB7XG4gIGNvbGxlY3Rpb246IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZmllbGRzOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICBlbnRyeTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICBmaWVsZHNNZXRhRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICBnZXRBc3NldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcbiAgY29uc3QgaXNMb2FkaW5nQXNzZXQgPSBzZWxlY3RJc0xvYWRpbmdBc3NldChzdGF0ZS5tZWRpYXMpO1xuICByZXR1cm4geyBpc0xvYWRpbmdBc3NldCB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIGJvdW5kR2V0QXNzZXQ6IChjb2xsZWN0aW9uLCBlbnRyeSkgPT4gYm91bmRHZXRBc3NldChkaXNwYXRjaCwgY29sbGVjdGlvbiwgZW50cnkpLFxuICB9O1xufTtcblxuY29uc3QgbWVyZ2VQcm9wcyA9IChzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlUHJvcHMsXG4gICAgLi4uZGlzcGF0Y2hQcm9wcyxcbiAgICAuLi5vd25Qcm9wcyxcbiAgICBnZXRBc3NldDogZGlzcGF0Y2hQcm9wcy5ib3VuZEdldEFzc2V0KG93blByb3BzLmNvbGxlY3Rpb24sIG93blByb3BzLmVudHJ5KSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMpKFByZXZpZXdQYW5lKTtcbiJdfQ== */"));

class PreviewPane extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getWidget", (field, value, metadata, props, idx = null) => {
      const {
        getAsset,
        entry
      } = props;
      const widget = (0, _registry.resolveWidget)(field.get('widget'));
      const key = idx ? field.get('name') + '_' + idx : field.get('name');

      const valueIsInMap = value && !widget.allowMapValue && _immutable.Map.isMap(value);
      /**
       * Use an HOC to provide conditional updates for all previews.
       */


      return !widget.preview ? null : (0, _core.jsx)(_PreviewHOC.default, {
        previewComponent: widget.preview,
        key: key,
        field: field,
        getAsset: getAsset,
        value: valueIsInMap ? value.get(field.get('name')) : value,
        entry: entry,
        fieldsMetaData: metadata,
        resolveWidget: _registry.resolveWidget
      });
    });

    _defineProperty(this, "inferedFields", {});

    _defineProperty(this, "widgetFor", (name, fields = this.props.fields, values = this.props.entry.get('data'), fieldsMetaData = this.props.fieldsMetaData) => {
      // We retrieve the field by name so that this function can also be used in
      // custom preview templates, where the field object can't be passed in.
      let field = fields && fields.find(f => f.get('name') === name);
      let value = values && values.get(field.get('name'));
      const nestedFields = field.get('fields');
      const singleField = field.get('field');
      const metadata = fieldsMetaData && fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());

      if (nestedFields) {
        field = field.set('fields', this.getNestedWidgets(nestedFields, value, metadata));
      }

      if (singleField) {
        field = field.set('field', this.getSingleNested(singleField, value, metadata));
      }

      const labelledWidgets = ['string', 'text', 'number'];
      const inferedField = Object.entries(this.inferedFields).filter(([key]) => {
        const fieldToMatch = (0, _collections.selectField)(this.props.collection, key);
        return fieldToMatch === field;
      }).map(([, value]) => value)[0];

      if (inferedField) {
        value = inferedField.defaultPreview(value);
      } else if (value && labelledWidgets.indexOf(field.get('widget')) !== -1 && value.toString().length < 50) {
        value = (0, _core.jsx)("div", null, (0, _core.jsx)("strong", null, field.get('label', field.get('name')), ":"), " ", value);
      }

      return value ? this.getWidget(field, value, metadata, this.props) : null;
    });

    _defineProperty(this, "getNestedWidgets", (fields, values, fieldsMetaData) => {
      // Fields nested within a list field will be paired with a List of value Maps.
      if (_immutable.List.isList(values)) {
        return values.map(value => this.widgetsForNestedFields(fields, value, fieldsMetaData));
      } // Fields nested within an object field will be paired with a single Map of values.


      return this.widgetsForNestedFields(fields, values, fieldsMetaData);
    });

    _defineProperty(this, "getSingleNested", (field, values, fieldsMetaData) => {
      if (_immutable.List.isList(values)) {
        return values.map((value, idx) => this.getWidget(field, value, fieldsMetaData.get(field.get('name')), this.props, idx));
      }

      return this.getWidget(field, values, fieldsMetaData.get(field.get('name')), this.props);
    });

    _defineProperty(this, "widgetsForNestedFields", (fields, values, fieldsMetaData) => {
      return fields.map(field => this.widgetFor(field.get('name'), fields, values, fieldsMetaData));
    });

    _defineProperty(this, "widgetsFor", name => {
      const {
        fields,
        entry,
        fieldsMetaData
      } = this.props;
      const field = fields.find(f => f.get('name') === name);
      const nestedFields = field && field.get('fields');
      const value = entry.getIn(['data', field.get('name')]);
      const metadata = fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());

      if (_immutable.List.isList(value)) {
        return value.map(val => {
          const widgets = nestedFields && (0, _immutable.Map)(nestedFields.map((f, i) => [f.get('name'), (0, _core.jsx)("div", {
            key: i
          }, this.getWidget(f, val, metadata.get(f.get('name')), this.props))]));
          return (0, _immutable.Map)({
            data: val,
            widgets
          });
        });
      }

      return (0, _immutable.Map)({
        data: value,
        widgets: nestedFields && (0, _immutable.Map)(nestedFields.map(f => [f.get('name'), this.getWidget(f, value, metadata.get(f.get('name')), this.props)]))
      });
    });
  }

  inferFields() {
    const titleField = (0, _collections.selectInferedField)(this.props.collection, 'title');
    const shortTitleField = (0, _collections.selectInferedField)(this.props.collection, 'shortTitle');
    const authorField = (0, _collections.selectInferedField)(this.props.collection, 'author');
    this.inferedFields = {};
    if (titleField) this.inferedFields[titleField] = _fieldInference.INFERABLE_FIELDS.title;
    if (shortTitleField) this.inferedFields[shortTitleField] = _fieldInference.INFERABLE_FIELDS.shortTitle;
    if (authorField) this.inferedFields[authorField] = _fieldInference.INFERABLE_FIELDS.author;
  }
  /**
   * Returns the widget component for a named field, and makes recursive calls
   * to retrieve components for nested and deeply nested fields, which occur in
   * object and list type fields. Used internally to retrieve widgets, and also
   * exposed for use in custom preview templates.
   */


  render() {
    const {
      entry,
      collection
    } = this.props;

    if (!entry || !entry.get('data')) {
      return null;
    }

    const previewComponent = (0, _registry.getPreviewTemplate)((0, _collections.selectTemplateName)(collection, entry.get('slug'))) || _EditorPreview.default;

    this.inferFields();

    const previewProps = _objectSpread({}, this.props, {
      widgetFor: this.widgetFor,
      widgetsFor: this.widgetsFor
    });

    const styleEls = (0, _registry.getPreviewStyles)().map((style, i) => {
      if (style.raw) {
        return (0, _core.jsx)("style", {
          key: i
        }, style.value);
      }

      return (0, _core.jsx)("link", {
        key: i,
        href: style.value,
        type: "text/css",
        rel: "stylesheet"
      });
    });

    if (!collection) {
      (0, _core.jsx)(PreviewPaneFrame, {
        head: styleEls
      });
    }

    const initialContent = "\n<!DOCTYPE html>\n<html>\n  <head><base target=\"_blank\"/></head>\n  <body><div></div></body>\n</html>\n";
    return (0, _core.jsx)(_UI.ErrorBoundary, null, (0, _core.jsx)(PreviewPaneFrame, {
      head: styleEls,
      initialContent: initialContent
    }, (0, _core.jsx)(_EditorPreviewContent.default, {
      previewComponent,
      previewProps
    })));
  }

}

exports.PreviewPane = PreviewPane;
PreviewPane.propTypes = {
  collection: _reactImmutableProptypes.default.map.isRequired,
  fields: _reactImmutableProptypes.default.list.isRequired,
  entry: _reactImmutableProptypes.default.map.isRequired,
  fieldsMetaData: _reactImmutableProptypes.default.map.isRequired,
  getAsset: _propTypes.default.func.isRequired
};

const mapStateToProps = state => {
  const isLoadingAsset = (0, _medias.selectIsLoadingAsset)(state.medias);
  return {
    isLoadingAsset
  };
};

const mapDispatchToProps = dispatch => {
  return {
    boundGetAsset: (collection, entry) => (0, _media.boundGetAsset)(dispatch, collection, entry)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _objectSpread({}, stateProps, {}, dispatchProps, {}, ownProps, {
    getAsset: dispatchProps.boundGetAsset(ownProps.collection, ownProps.entry)
  });
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(PreviewPane);

exports.default = _default;