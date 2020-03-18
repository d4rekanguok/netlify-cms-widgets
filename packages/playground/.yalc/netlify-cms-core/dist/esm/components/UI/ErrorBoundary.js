"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactPolyglot = require("react-polyglot");

var _copyTextToClipboard = _interopRequireDefault(require("copy-text-to-clipboard"));

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ISSUE_URL = 'https://github.com/netlify/netlify-cms/issues/new?template=bug_report.md';
const ErrorBoundaryContainer = (0, _styledBase.default)("div", {
  target: "e177kfaq0",
  label: "ErrorBoundaryContainer"
})("padding:40px;h1{font-size:28px;color:", _netlifyCmsUiDefault.colors.text, ";}h2{font-size:20px;}strong{color:", _netlifyCmsUiDefault.colors.textLead, ";font-weight:500;}hr{width:200px;margin:30px 0;border:0;height:1px;background-color:", _netlifyCmsUiDefault.colors.text, ";}a{color:", _netlifyCmsUiDefault.colors.text, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL0Vycm9yQm91bmRhcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVXlDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL0Vycm9yQm91bmRhcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJ3JlYWN0LXBvbHlnbG90JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBjb3B5VG9DbGlwYm9hcmQgZnJvbSAnY29weS10ZXh0LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQgeyBsb2NhbEZvcmFnZSB9IGZyb20gJ25ldGxpZnktY21zLWxpYi11dGlsJztcbmltcG9ydCB7IGJ1dHRvbnMsIGNvbG9ycyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5jb25zdCBJU1NVRV9VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL25ldGxpZnkvbmV0bGlmeS1jbXMvaXNzdWVzL25ldz90ZW1wbGF0ZT1idWdfcmVwb3J0Lm1kJztcblxuY29uc3QgRXJyb3JCb3VuZGFyeUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmc6IDQwcHg7XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICBjb2xvcjogJHtjb2xvcnMudGV4dH07XG4gIH1cblxuICBoMiB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICB9XG5cbiAgc3Ryb25nIHtcbiAgICBjb2xvcjogJHtjb2xvcnMudGV4dExlYWR9O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cblxuICBociB7XG4gICAgd2lkdGg6IDIwMHB4O1xuICAgIG1hcmdpbjogMzBweCAwO1xuICAgIGJvcmRlcjogMDtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy50ZXh0fTtcbiAgfVxuXG4gIGEge1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0fTtcbiAgfVxuYDtcblxuY29uc3QgQ29weUJ1dHRvbiA9IHN0eWxlZC5idXR0b25gXG4gICR7YnV0dG9ucy5idXR0b259O1xuICAke2J1dHRvbnMuZGVmYXVsdH07XG4gICR7YnV0dG9ucy5ncmF5fTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMTJweCAwO1xuYDtcblxuY29uc3QgUmVjb3ZlcmVkRW50cnkgPSAoeyBlbnRyeSwgdCB9KSA9PiB7XG4gIGNvbnNvbGUubG9nKGVudHJ5KTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGhyIC8+XG4gICAgICA8aDI+e3QoJ3VpLmVycm9yQm91bmRhcnkucmVjb3ZlcmVkRW50cnkuaGVhZGluZycpfTwvaDI+XG4gICAgICA8c3Ryb25nPnt0KCd1aS5lcnJvckJvdW5kYXJ5LnJlY292ZXJlZEVudHJ5Lndhcm5pbmcnKX08L3N0cm9uZz5cbiAgICAgIDxDb3B5QnV0dG9uIG9uQ2xpY2s9eygpID0+IGNvcHlUb0NsaXBib2FyZChlbnRyeSl9PlxuICAgICAgICB7dCgndWkuZXJyb3JCb3VuZGFyeS5yZWNvdmVyZWRFbnRyeS5jb3B5QnV0dG9uTGFiZWwnKX1cbiAgICAgIDwvQ29weUJ1dHRvbj5cbiAgICAgIDxwcmU+XG4gICAgICAgIDxjb2RlPntlbnRyeX08L2NvZGU+XG4gICAgICA8L3ByZT5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGhhc0Vycm9yOiBmYWxzZSxcbiAgICBlcnJvck1lc3NhZ2U6ICcnLFxuICAgIGJhY2t1cDogJycsXG4gIH07XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHJldHVybiB7IGhhc0Vycm9yOiB0cnVlLCBlcnJvck1lc3NhZ2U6IGVycm9yLnRvU3RyaW5nKCkgfTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGlmICh0aGlzLnByb3BzLnNob3dCYWNrdXApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuc3RhdGUuZXJyb3JNZXNzYWdlICE9PSBuZXh0U3RhdGUuZXJyb3JNZXNzYWdlIHx8IHRoaXMuc3RhdGUuYmFja3VwICE9PSBuZXh0U3RhdGUuYmFja3VwXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93QmFja3VwKSB7XG4gICAgICBjb25zdCBiYWNrdXAgPSBhd2FpdCBsb2NhbEZvcmFnZS5nZXRJdGVtKCdiYWNrdXAnKTtcbiAgICAgIGNvbnNvbGUubG9nKGJhY2t1cCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgYmFja3VwIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGhhc0Vycm9yLCBlcnJvck1lc3NhZ2UsIGJhY2t1cCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IHNob3dCYWNrdXAsIHQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JCb3VuZGFyeUNvbnRhaW5lcj5cbiAgICAgICAgPGgxPnt0KCd1aS5lcnJvckJvdW5kYXJ5LnRpdGxlJyl9PC9oMT5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPHNwYW4+e3QoJ3VpLmVycm9yQm91bmRhcnkuZGV0YWlscycpfTwvc3Bhbj5cbiAgICAgICAgICA8YSBocmVmPXtJU1NVRV9VUkx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgICAgICAgIHt0KCd1aS5lcnJvckJvdW5kYXJ5LnJlcG9ydEl0Jyl9XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L3A+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDI+e3QoJ3VpLmVycm9yQm91bmRhcnkuZGV0YWlsc0hlYWRpbmcnKX08L2gyPlxuICAgICAgICA8cD57ZXJyb3JNZXNzYWdlfTwvcD5cbiAgICAgICAge2JhY2t1cCAmJiBzaG93QmFja3VwICYmIDxSZWNvdmVyZWRFbnRyeSBlbnRyeT17YmFja3VwfSB0PXt0fSAvPn1cbiAgICAgIDwvRXJyb3JCb3VuZGFyeUNvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zbGF0ZSgpKEVycm9yQm91bmRhcnkpO1xuIl19 */"));
const CopyButton = (0, _styledBase.default)("button", {
  target: "e177kfaq1",
  label: "CopyButton"
})(_netlifyCmsUiDefault.buttons.button, ";", _netlifyCmsUiDefault.buttons.default, ";", _netlifyCmsUiDefault.buttons.gray, ";display:block;margin:12px 0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL0Vycm9yQm91bmRhcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0NnQyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9FcnJvckJvdW5kYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICdyZWFjdC1wb2x5Z2xvdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgY29weVRvQ2xpcGJvYXJkIGZyb20gJ2NvcHktdGV4dC10by1jbGlwYm9hcmQnO1xuaW1wb3J0IHsgbG9jYWxGb3JhZ2UgfSBmcm9tICduZXRsaWZ5LWNtcy1saWItdXRpbCc7XG5pbXBvcnQgeyBidXR0b25zLCBjb2xvcnMgfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuY29uc3QgSVNTVUVfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZXRsaWZ5L25ldGxpZnktY21zL2lzc3Vlcy9uZXc/dGVtcGxhdGU9YnVnX3JlcG9ydC5tZCc7XG5cbmNvbnN0IEVycm9yQm91bmRhcnlDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nOiA0MHB4O1xuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgY29sb3I6ICR7Y29sb3JzLnRleHR9O1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gIHN0cm9uZyB7XG4gICAgY29sb3I6ICR7Y29sb3JzLnRleHRMZWFkfTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG5cbiAgaHIge1xuICAgIHdpZHRoOiAyMDBweDtcbiAgICBtYXJnaW46IDMwcHggMDtcbiAgICBib3JkZXI6IDA7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMudGV4dH07XG4gIH1cblxuICBhIHtcbiAgICBjb2xvcjogJHtjb2xvcnMudGV4dH07XG4gIH1cbmA7XG5cbmNvbnN0IENvcHlCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICAke2J1dHRvbnMuYnV0dG9ufTtcbiAgJHtidXR0b25zLmRlZmF1bHR9O1xuICAke2J1dHRvbnMuZ3JheX07XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDEycHggMDtcbmA7XG5cbmNvbnN0IFJlY292ZXJlZEVudHJ5ID0gKHsgZW50cnksIHQgfSkgPT4ge1xuICBjb25zb2xlLmxvZyhlbnRyeSk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxociAvPlxuICAgICAgPGgyPnt0KCd1aS5lcnJvckJvdW5kYXJ5LnJlY292ZXJlZEVudHJ5LmhlYWRpbmcnKX08L2gyPlxuICAgICAgPHN0cm9uZz57dCgndWkuZXJyb3JCb3VuZGFyeS5yZWNvdmVyZWRFbnRyeS53YXJuaW5nJyl9PC9zdHJvbmc+XG4gICAgICA8Q29weUJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoZW50cnkpfT5cbiAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucmVjb3ZlcmVkRW50cnkuY29weUJ1dHRvbkxhYmVsJyl9XG4gICAgICA8L0NvcHlCdXR0b24+XG4gICAgICA8cHJlPlxuICAgICAgICA8Y29kZT57ZW50cnl9PC9jb2RlPlxuICAgICAgPC9wcmU+XG4gICAgPC8+XG4gICk7XG59O1xuXG5jbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgZXJyb3JNZXNzYWdlOiAnJyxcbiAgICBiYWNrdXA6ICcnLFxuICB9O1xuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICByZXR1cm4geyBoYXNFcnJvcjogdHJ1ZSwgZXJyb3JNZXNzYWdlOiBlcnJvci50b1N0cmluZygpIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93QmFja3VwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLnN0YXRlLmVycm9yTWVzc2FnZSAhPT0gbmV4dFN0YXRlLmVycm9yTWVzc2FnZSB8fCB0aGlzLnN0YXRlLmJhY2t1cCAhPT0gbmV4dFN0YXRlLmJhY2t1cFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0JhY2t1cCkge1xuICAgICAgY29uc3QgYmFja3VwID0gYXdhaXQgbG9jYWxGb3JhZ2UuZ2V0SXRlbSgnYmFja3VwJyk7XG4gICAgICBjb25zb2xlLmxvZyhiYWNrdXApO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGJhY2t1cCB9KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoYXNFcnJvciwgZXJyb3JNZXNzYWdlLCBiYWNrdXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBzaG93QmFja3VwLCB0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaGFzRXJyb3IpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yQm91bmRhcnlDb250YWluZXI+XG4gICAgICAgIDxoMT57dCgndWkuZXJyb3JCb3VuZGFyeS50aXRsZScpfTwvaDE+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxzcGFuPnt0KCd1aS5lcnJvckJvdW5kYXJ5LmRldGFpbHMnKX08L3NwYW4+XG4gICAgICAgICAgPGEgaHJlZj17SVNTVUVfVVJMfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgICAgICB7dCgndWkuZXJyb3JCb3VuZGFyeS5yZXBvcnRJdCcpfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9wPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyPnt0KCd1aS5lcnJvckJvdW5kYXJ5LmRldGFpbHNIZWFkaW5nJyl9PC9oMj5cbiAgICAgICAgPHA+e2Vycm9yTWVzc2FnZX08L3A+XG4gICAgICAgIHtiYWNrdXAgJiYgc2hvd0JhY2t1cCAmJiA8UmVjb3ZlcmVkRW50cnkgZW50cnk9e2JhY2t1cH0gdD17dH0gLz59XG4gICAgICA8L0Vycm9yQm91bmRhcnlDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2xhdGUoKShFcnJvckJvdW5kYXJ5KTtcbiJdfQ== */"));

const RecoveredEntry = ({
  entry,
  t
}) => {
  console.log(entry);
  return (0, _core.jsx)(_react.default.Fragment, null, (0, _core.jsx)("hr", null), (0, _core.jsx)("h2", null, t('ui.errorBoundary.recoveredEntry.heading')), (0, _core.jsx)("strong", null, t('ui.errorBoundary.recoveredEntry.warning')), (0, _core.jsx)(CopyButton, {
    onClick: () => (0, _copyTextToClipboard.default)(entry)
  }, t('ui.errorBoundary.recoveredEntry.copyButtonLabel')), (0, _core.jsx)("pre", null, (0, _core.jsx)("code", null, entry)));
};

class ErrorBoundary extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      hasError: false,
      errorMessage: '',
      backup: ''
    });
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return {
      hasError: true,
      errorMessage: error.toString()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.showBackup) {
      return this.state.errorMessage !== nextState.errorMessage || this.state.backup !== nextState.backup;
    }

    return true;
  }

  async componentDidUpdate() {
    if (this.props.showBackup) {
      const backup = await _netlifyCmsLibUtil.localForage.getItem('backup');
      console.log(backup);
      this.setState({
        backup
      });
    }
  }

  render() {
    const {
      hasError,
      errorMessage,
      backup
    } = this.state;
    const {
      showBackup,
      t
    } = this.props;

    if (!hasError) {
      return this.props.children;
    }

    return (0, _core.jsx)(ErrorBoundaryContainer, null, (0, _core.jsx)("h1", null, t('ui.errorBoundary.title')), (0, _core.jsx)("p", null, (0, _core.jsx)("span", null, t('ui.errorBoundary.details')), (0, _core.jsx)("a", {
      href: ISSUE_URL,
      target: "_blank",
      rel: "noopener noreferrer"
    }, t('ui.errorBoundary.reportIt'))), (0, _core.jsx)("hr", null), (0, _core.jsx)("h2", null, t('ui.errorBoundary.detailsHeading')), (0, _core.jsx)("p", null, errorMessage), backup && showBackup && (0, _core.jsx)(RecoveredEntry, {
      entry: backup,
      t: t
    }));
  }

}

_defineProperty(ErrorBoundary, "propTypes", {
  children: _propTypes.default.node,
  t: _propTypes.default.func.isRequired
});

var _default = (0, _reactPolyglot.translate)()(ErrorBoundary);

exports.default = _default;