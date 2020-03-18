"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactRedux = require("react-redux");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _urlHelper = require("../../lib/urlHelper");

var _Sidebar = _interopRequireDefault(require("./Sidebar"));

var _CollectionTop = _interopRequireDefault(require("./CollectionTop"));

var _EntriesCollection = _interopRequireDefault(require("./Entries/EntriesCollection"));

var _EntriesSearch = _interopRequireDefault(require("./Entries/EntriesSearch"));

var _collectionViews = require("../../constants/collectionViews");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const CollectionContainer = (0, _styledBase.default)("div", {
  target: "e1yhfkro0",
  label: "CollectionContainer"
})("margin:", _netlifyCmsUiDefault.lengths.pageMargin, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vQ29sbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhc0MiLCJmaWxlIjoiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbi9Db2xsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGxlbmd0aHMgfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IGdldE5ld0VudHJ5VXJsIH0gZnJvbSAnTGliL3VybEhlbHBlcic7XG5pbXBvcnQgU2lkZWJhciBmcm9tICcuL1NpZGViYXInO1xuaW1wb3J0IENvbGxlY3Rpb25Ub3AgZnJvbSAnLi9Db2xsZWN0aW9uVG9wJztcbmltcG9ydCBFbnRyaWVzQ29sbGVjdGlvbiBmcm9tICcuL0VudHJpZXMvRW50cmllc0NvbGxlY3Rpb24nO1xuaW1wb3J0IEVudHJpZXNTZWFyY2ggZnJvbSAnLi9FbnRyaWVzL0VudHJpZXNTZWFyY2gnO1xuaW1wb3J0IHsgVklFV19TVFlMRV9MSVNUIH0gZnJvbSAnQ29uc3RhbnRzL2NvbGxlY3Rpb25WaWV3cyc7XG5cbmNvbnN0IENvbGxlY3Rpb25Db250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46ICR7bGVuZ3Rocy5wYWdlTWFyZ2lufTtcbmA7XG5cbmNvbnN0IENvbGxlY3Rpb25NYWluID0gc3R5bGVkLm1haW5gXG4gIHBhZGRpbmctbGVmdDogMjgwcHg7XG5gO1xuXG5jbGFzcyBDb2xsZWN0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBzZWFyY2hUZXJtOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbGxlY3Rpb25OYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlzU2VhcmNoUmVzdWx0czogUHJvcFR5cGVzLmJvb2wsXG4gICAgY29sbGVjdGlvbjogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgIGNvbGxlY3Rpb25zOiBJbW11dGFibGVQcm9wVHlwZXMub3JkZXJlZE1hcC5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIHZpZXdTdHlsZTogVklFV19TVFlMRV9MSVNULFxuICB9O1xuXG4gIHJlbmRlckVudHJpZXNDb2xsZWN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gPEVudHJpZXNDb2xsZWN0aW9uIGNvbGxlY3Rpb249e2NvbGxlY3Rpb259IHZpZXdTdHlsZT17dGhpcy5zdGF0ZS52aWV3U3R5bGV9IC8+O1xuICB9O1xuXG4gIHJlbmRlckVudHJpZXNTZWFyY2ggPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hUZXJtLCBjb2xsZWN0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gPEVudHJpZXNTZWFyY2ggY29sbGVjdGlvbnM9e2NvbGxlY3Rpb25zfSBzZWFyY2hUZXJtPXtzZWFyY2hUZXJtfSAvPjtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2VWaWV3U3R5bGUgPSB2aWV3U3R5bGUgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLnZpZXdTdHlsZSAhPT0gdmlld1N0eWxlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmlld1N0eWxlIH0pO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjb2xsZWN0aW9uLCBjb2xsZWN0aW9ucywgY29sbGVjdGlvbk5hbWUsIGlzU2VhcmNoUmVzdWx0cywgc2VhcmNoVGVybSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdFbnRyeVVybCA9IGNvbGxlY3Rpb24uZ2V0KCdjcmVhdGUnKSA/IGdldE5ld0VudHJ5VXJsKGNvbGxlY3Rpb25OYW1lKSA6ICcnO1xuICAgIHJldHVybiAoXG4gICAgICA8Q29sbGVjdGlvbkNvbnRhaW5lcj5cbiAgICAgICAgPFNpZGViYXIgY29sbGVjdGlvbnM9e2NvbGxlY3Rpb25zfSBzZWFyY2hUZXJtPXtzZWFyY2hUZXJtfSAvPlxuICAgICAgICA8Q29sbGVjdGlvbk1haW4+XG4gICAgICAgICAge2lzU2VhcmNoUmVzdWx0cyA/IG51bGwgOiAoXG4gICAgICAgICAgICA8Q29sbGVjdGlvblRvcFxuICAgICAgICAgICAgICBjb2xsZWN0aW9uTGFiZWw9e2NvbGxlY3Rpb24uZ2V0KCdsYWJlbCcpfVxuICAgICAgICAgICAgICBjb2xsZWN0aW9uTGFiZWxTaW5ndWxhcj17Y29sbGVjdGlvbi5nZXQoJ2xhYmVsX3Npbmd1bGFyJyl9XG4gICAgICAgICAgICAgIGNvbGxlY3Rpb25EZXNjcmlwdGlvbj17Y29sbGVjdGlvbi5nZXQoJ2Rlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICAgIG5ld0VudHJ5VXJsPXtuZXdFbnRyeVVybH1cbiAgICAgICAgICAgICAgdmlld1N0eWxlPXt0aGlzLnN0YXRlLnZpZXdTdHlsZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2VWaWV3U3R5bGU9e3RoaXMuaGFuZGxlQ2hhbmdlVmlld1N0eWxlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpc1NlYXJjaFJlc3VsdHMgPyB0aGlzLnJlbmRlckVudHJpZXNTZWFyY2goKSA6IHRoaXMucmVuZGVyRW50cmllc0NvbGxlY3Rpb24oKX1cbiAgICAgICAgPC9Db2xsZWN0aW9uTWFpbj5cbiAgICAgIDwvQ29sbGVjdGlvbkNvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpIHtcbiAgY29uc3QgeyBjb2xsZWN0aW9ucyB9ID0gc3RhdGU7XG4gIGNvbnN0IHsgaXNTZWFyY2hSZXN1bHRzLCBtYXRjaCB9ID0gb3duUHJvcHM7XG4gIGNvbnN0IHsgbmFtZSwgc2VhcmNoVGVybSB9ID0gbWF0Y2gucGFyYW1zO1xuICBjb25zdCBjb2xsZWN0aW9uID0gbmFtZSA/IGNvbGxlY3Rpb25zLmdldChuYW1lKSA6IGNvbGxlY3Rpb25zLmZpcnN0KCk7XG4gIHJldHVybiB7IGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25zLCBjb2xsZWN0aW9uTmFtZTogbmFtZSwgaXNTZWFyY2hSZXN1bHRzLCBzZWFyY2hUZXJtIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShDb2xsZWN0aW9uKTtcbiJdfQ== */"));
const CollectionMain = (0, _styledBase.default)("main", {
  target: "e1yhfkro1",
  label: "CollectionMain"
})(process.env.NODE_ENV === "production" ? {
  name: "1r4jzjw",
  styles: "padding-left:280px;"
} : {
  name: "1r4jzjw",
  styles: "padding-left:280px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vQ29sbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQmtDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vQ29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBsZW5ndGhzIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgeyBnZXROZXdFbnRyeVVybCB9IGZyb20gJ0xpYi91cmxIZWxwZXInO1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi9TaWRlYmFyJztcbmltcG9ydCBDb2xsZWN0aW9uVG9wIGZyb20gJy4vQ29sbGVjdGlvblRvcCc7XG5pbXBvcnQgRW50cmllc0NvbGxlY3Rpb24gZnJvbSAnLi9FbnRyaWVzL0VudHJpZXNDb2xsZWN0aW9uJztcbmltcG9ydCBFbnRyaWVzU2VhcmNoIGZyb20gJy4vRW50cmllcy9FbnRyaWVzU2VhcmNoJztcbmltcG9ydCB7IFZJRVdfU1RZTEVfTElTVCB9IGZyb20gJ0NvbnN0YW50cy9jb2xsZWN0aW9uVmlld3MnO1xuXG5jb25zdCBDb2xsZWN0aW9uQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luOiAke2xlbmd0aHMucGFnZU1hcmdpbn07XG5gO1xuXG5jb25zdCBDb2xsZWN0aW9uTWFpbiA9IHN0eWxlZC5tYWluYFxuICBwYWRkaW5nLWxlZnQ6IDI4MHB4O1xuYDtcblxuY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgc2VhcmNoVGVybTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb2xsZWN0aW9uTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpc1NlYXJjaFJlc3VsdHM6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbGxlY3Rpb246IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgICBjb2xsZWN0aW9uczogSW1tdXRhYmxlUHJvcFR5cGVzLm9yZGVyZWRNYXAuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICB2aWV3U3R5bGU6IFZJRVdfU1RZTEVfTElTVCxcbiAgfTtcblxuICByZW5kZXJFbnRyaWVzQ29sbGVjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNvbGxlY3Rpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIDxFbnRyaWVzQ29sbGVjdGlvbiBjb2xsZWN0aW9uPXtjb2xsZWN0aW9ufSB2aWV3U3R5bGU9e3RoaXMuc3RhdGUudmlld1N0eWxlfSAvPjtcbiAgfTtcblxuICByZW5kZXJFbnRyaWVzU2VhcmNoID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VhcmNoVGVybSwgY29sbGVjdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIDxFbnRyaWVzU2VhcmNoIGNvbGxlY3Rpb25zPXtjb2xsZWN0aW9uc30gc2VhcmNoVGVybT17c2VhcmNoVGVybX0gLz47XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlVmlld1N0eWxlID0gdmlld1N0eWxlID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS52aWV3U3R5bGUgIT09IHZpZXdTdHlsZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpZXdTdHlsZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbiwgY29sbGVjdGlvbnMsIGNvbGxlY3Rpb25OYW1lLCBpc1NlYXJjaFJlc3VsdHMsIHNlYXJjaFRlcm0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3RW50cnlVcmwgPSBjb2xsZWN0aW9uLmdldCgnY3JlYXRlJykgPyBnZXROZXdFbnRyeVVybChjb2xsZWN0aW9uTmFtZSkgOiAnJztcbiAgICByZXR1cm4gKFxuICAgICAgPENvbGxlY3Rpb25Db250YWluZXI+XG4gICAgICAgIDxTaWRlYmFyIGNvbGxlY3Rpb25zPXtjb2xsZWN0aW9uc30gc2VhcmNoVGVybT17c2VhcmNoVGVybX0gLz5cbiAgICAgICAgPENvbGxlY3Rpb25NYWluPlxuICAgICAgICAgIHtpc1NlYXJjaFJlc3VsdHMgPyBudWxsIDogKFxuICAgICAgICAgICAgPENvbGxlY3Rpb25Ub3BcbiAgICAgICAgICAgICAgY29sbGVjdGlvbkxhYmVsPXtjb2xsZWN0aW9uLmdldCgnbGFiZWwnKX1cbiAgICAgICAgICAgICAgY29sbGVjdGlvbkxhYmVsU2luZ3VsYXI9e2NvbGxlY3Rpb24uZ2V0KCdsYWJlbF9zaW5ndWxhcicpfVxuICAgICAgICAgICAgICBjb2xsZWN0aW9uRGVzY3JpcHRpb249e2NvbGxlY3Rpb24uZ2V0KCdkZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgICBuZXdFbnRyeVVybD17bmV3RW50cnlVcmx9XG4gICAgICAgICAgICAgIHZpZXdTdHlsZT17dGhpcy5zdGF0ZS52aWV3U3R5bGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlVmlld1N0eWxlPXt0aGlzLmhhbmRsZUNoYW5nZVZpZXdTdHlsZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7aXNTZWFyY2hSZXN1bHRzID8gdGhpcy5yZW5kZXJFbnRyaWVzU2VhcmNoKCkgOiB0aGlzLnJlbmRlckVudHJpZXNDb2xsZWN0aW9uKCl9XG4gICAgICAgIDwvQ29sbGVjdGlvbk1haW4+XG4gICAgICA8L0NvbGxlY3Rpb25Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKSB7XG4gIGNvbnN0IHsgY29sbGVjdGlvbnMgfSA9IHN0YXRlO1xuICBjb25zdCB7IGlzU2VhcmNoUmVzdWx0cywgbWF0Y2ggfSA9IG93blByb3BzO1xuICBjb25zdCB7IG5hbWUsIHNlYXJjaFRlcm0gfSA9IG1hdGNoLnBhcmFtcztcbiAgY29uc3QgY29sbGVjdGlvbiA9IG5hbWUgPyBjb2xsZWN0aW9ucy5nZXQobmFtZSkgOiBjb2xsZWN0aW9ucy5maXJzdCgpO1xuICByZXR1cm4geyBjb2xsZWN0aW9uLCBjb2xsZWN0aW9ucywgY29sbGVjdGlvbk5hbWU6IG5hbWUsIGlzU2VhcmNoUmVzdWx0cywgc2VhcmNoVGVybSB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoQ29sbGVjdGlvbik7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

class Collection extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      viewStyle: _collectionViews.VIEW_STYLE_LIST
    });

    _defineProperty(this, "renderEntriesCollection", () => {
      const {
        collection
      } = this.props;
      return (0, _core.jsx)(_EntriesCollection.default, {
        collection: collection,
        viewStyle: this.state.viewStyle
      });
    });

    _defineProperty(this, "renderEntriesSearch", () => {
      const {
        searchTerm,
        collections
      } = this.props;
      return (0, _core.jsx)(_EntriesSearch.default, {
        collections: collections,
        searchTerm: searchTerm
      });
    });

    _defineProperty(this, "handleChangeViewStyle", viewStyle => {
      if (this.state.viewStyle !== viewStyle) {
        this.setState({
          viewStyle
        });
      }
    });
  }

  render() {
    const {
      collection,
      collections,
      collectionName,
      isSearchResults,
      searchTerm
    } = this.props;
    const newEntryUrl = collection.get('create') ? (0, _urlHelper.getNewEntryUrl)(collectionName) : '';
    return (0, _core.jsx)(CollectionContainer, null, (0, _core.jsx)(_Sidebar.default, {
      collections: collections,
      searchTerm: searchTerm
    }), (0, _core.jsx)(CollectionMain, null, isSearchResults ? null : (0, _core.jsx)(_CollectionTop.default, {
      collectionLabel: collection.get('label'),
      collectionLabelSingular: collection.get('label_singular'),
      collectionDescription: collection.get('description'),
      newEntryUrl: newEntryUrl,
      viewStyle: this.state.viewStyle,
      onChangeViewStyle: this.handleChangeViewStyle
    }), isSearchResults ? this.renderEntriesSearch() : this.renderEntriesCollection()));
  }

}

_defineProperty(Collection, "propTypes", {
  searchTerm: _propTypes.default.string,
  collectionName: _propTypes.default.string,
  isSearchResults: _propTypes.default.bool,
  collection: _reactImmutableProptypes.default.map.isRequired,
  collections: _reactImmutableProptypes.default.orderedMap.isRequired
});

function mapStateToProps(state, ownProps) {
  const {
    collections
  } = state;
  const {
    isSearchResults,
    match
  } = ownProps;
  const {
    name,
    searchTerm
  } = match.params;
  const collection = name ? collections.get(name) : collections.first();
  return {
    collection,
    collections,
    collectionName: name,
    isSearchResults,
    searchTerm
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(Collection);

exports.default = _default;