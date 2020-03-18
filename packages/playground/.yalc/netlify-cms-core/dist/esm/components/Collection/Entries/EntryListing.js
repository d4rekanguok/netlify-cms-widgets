"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactWaypoint = _interopRequireDefault(require("react-waypoint"));

var _immutable = require("immutable");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _collections = require("../../../reducers/collections");

var _EntryCard = _interopRequireDefault(require("./EntryCard"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const CardsGrid = (0, _styledBase.default)("ul", {
  target: "e1hbvtjf0",
  label: "CardsGrid"
})(process.env.NODE_ENV === "production" ? {
  name: "1gscq6o",
  styles: "display:flex;flex-flow:row wrap;list-style-type:none;margin-left:-12px;"
} : {
  name: "1gscq6o",
  styles: "display:flex;flex-flow:row wrap;list-style-type:none;margin-left:-12px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vRW50cmllcy9FbnRyeUxpc3RpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVTJCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vRW50cmllcy9FbnRyeUxpc3RpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgV2F5cG9pbnQgZnJvbSAncmVhY3Qtd2F5cG9pbnQnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IEN1cnNvciB9IGZyb20gJ25ldGxpZnktY21zLWxpYi11dGlsJztcbmltcG9ydCB7IHNlbGVjdEZpZWxkcywgc2VsZWN0SW5mZXJlZEZpZWxkIH0gZnJvbSAnUmVkdWNlcnMvY29sbGVjdGlvbnMnO1xuaW1wb3J0IEVudHJ5Q2FyZCBmcm9tICcuL0VudHJ5Q2FyZCc7XG5cbmNvbnN0IENhcmRzR3JpZCA9IHN0eWxlZC51bGBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBtYXJnaW4tbGVmdDogLTEycHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRyeUxpc3RpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNvbGxlY3Rpb25zOiBJbW11dGFibGVQcm9wVHlwZXMuaXRlcmFibGUuaXNSZXF1aXJlZCxcbiAgICBlbnRyaWVzOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdCxcbiAgICB2aWV3U3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3Vyc29yOiBQcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG4gICAgaGFuZGxlQ3Vyc29yQWN0aW9uczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBoYXNNb3JlID0gKCkgPT4ge1xuICAgIHJldHVybiBDdXJzb3IuY3JlYXRlKHRoaXMucHJvcHMuY3Vyc29yKS5hY3Rpb25zLmhhcygnYXBwZW5kX25leHQnKTtcbiAgfTtcblxuICBoYW5kbGVMb2FkTW9yZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5oYXNNb3JlKCkpIHtcbiAgICAgIHRoaXMucHJvcHMuaGFuZGxlQ3Vyc29yQWN0aW9ucygnYXBwZW5kX25leHQnKTtcbiAgICB9XG4gIH07XG5cbiAgaW5mZXJGaWVsZHMgPSBjb2xsZWN0aW9uID0+IHtcbiAgICBjb25zdCB0aXRsZUZpZWxkID0gc2VsZWN0SW5mZXJlZEZpZWxkKGNvbGxlY3Rpb24sICd0aXRsZScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uRmllbGQgPSBzZWxlY3RJbmZlcmVkRmllbGQoY29sbGVjdGlvbiwgJ2Rlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgaW1hZ2VGaWVsZCA9IHNlbGVjdEluZmVyZWRGaWVsZChjb2xsZWN0aW9uLCAnaW1hZ2UnKTtcbiAgICBjb25zdCBmaWVsZHMgPSBzZWxlY3RGaWVsZHMoY29sbGVjdGlvbik7XG4gICAgY29uc3QgaW5mZXJlZEZpZWxkcyA9IFt0aXRsZUZpZWxkLCBkZXNjcmlwdGlvbkZpZWxkLCBpbWFnZUZpZWxkXTtcbiAgICBjb25zdCByZW1haW5pbmdGaWVsZHMgPVxuICAgICAgZmllbGRzICYmIGZpZWxkcy5maWx0ZXIoZiA9PiBpbmZlcmVkRmllbGRzLmluZGV4T2YoZi5nZXQoJ25hbWUnKSkgPT09IC0xKTtcbiAgICByZXR1cm4geyB0aXRsZUZpZWxkLCBkZXNjcmlwdGlvbkZpZWxkLCBpbWFnZUZpZWxkLCByZW1haW5pbmdGaWVsZHMgfTtcbiAgfTtcblxuICByZW5kZXJDYXJkc0ZvclNpbmdsZUNvbGxlY3Rpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb2xsZWN0aW9ucywgZW50cmllcywgdmlld1N0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGluZmVyZWRGaWVsZHMgPSB0aGlzLmluZmVyRmllbGRzKGNvbGxlY3Rpb25zKTtcbiAgICBjb25zdCBlbnRyeUNhcmRQcm9wcyA9IHsgY29sbGVjdGlvbjogY29sbGVjdGlvbnMsIGluZmVyZWRGaWVsZHMsIHZpZXdTdHlsZSB9O1xuICAgIHJldHVybiBlbnRyaWVzLm1hcCgoZW50cnksIGlkeCkgPT4gPEVudHJ5Q2FyZCB7Li4uZW50cnlDYXJkUHJvcHN9IGVudHJ5PXtlbnRyeX0ga2V5PXtpZHh9IC8+KTtcbiAgfTtcblxuICByZW5kZXJDYXJkc0Zvck11bHRpcGxlQ29sbGVjdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb2xsZWN0aW9ucywgZW50cmllcyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZW50cmllcy5tYXAoKGVudHJ5LCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gZW50cnkuZ2V0KCdjb2xsZWN0aW9uJyk7XG4gICAgICBjb25zdCBjb2xsZWN0aW9uID0gY29sbGVjdGlvbnMuZmluZChjb2xsID0+IGNvbGwuZ2V0KCduYW1lJykgPT09IGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25MYWJlbCA9IGNvbGxlY3Rpb24uZ2V0KCdsYWJlbCcpO1xuICAgICAgY29uc3QgaW5mZXJlZEZpZWxkcyA9IHRoaXMuaW5mZXJGaWVsZHMoY29sbGVjdGlvbik7XG4gICAgICBjb25zdCBlbnRyeUNhcmRQcm9wcyA9IHsgY29sbGVjdGlvbiwgZW50cnksIGluZmVyZWRGaWVsZHMsIGNvbGxlY3Rpb25MYWJlbCB9O1xuICAgICAgcmV0dXJuIDxFbnRyeUNhcmQgey4uLmVudHJ5Q2FyZFByb3BzfSBrZXk9e2lkeH0gLz47XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbnMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPENhcmRzR3JpZD5cbiAgICAgICAgICB7TWFwLmlzTWFwKGNvbGxlY3Rpb25zKVxuICAgICAgICAgICAgPyB0aGlzLnJlbmRlckNhcmRzRm9yU2luZ2xlQ29sbGVjdGlvbigpXG4gICAgICAgICAgICA6IHRoaXMucmVuZGVyQ2FyZHNGb3JNdWx0aXBsZUNvbGxlY3Rpb25zKCl9XG4gICAgICAgICAge3RoaXMuaGFzTW9yZSgpICYmIDxXYXlwb2ludCBvbkVudGVyPXt0aGlzLmhhbmRsZUxvYWRNb3JlfSAvPn1cbiAgICAgICAgPC9DYXJkc0dyaWQ+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

class EntryListing extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "hasMore", () => {
      return _netlifyCmsLibUtil.Cursor.create(this.props.cursor).actions.has('append_next');
    });

    _defineProperty(this, "handleLoadMore", () => {
      if (this.hasMore()) {
        this.props.handleCursorActions('append_next');
      }
    });

    _defineProperty(this, "inferFields", collection => {
      const titleField = (0, _collections.selectInferedField)(collection, 'title');
      const descriptionField = (0, _collections.selectInferedField)(collection, 'description');
      const imageField = (0, _collections.selectInferedField)(collection, 'image');
      const fields = (0, _collections.selectFields)(collection);
      const inferedFields = [titleField, descriptionField, imageField];
      const remainingFields = fields && fields.filter(f => inferedFields.indexOf(f.get('name')) === -1);
      return {
        titleField,
        descriptionField,
        imageField,
        remainingFields
      };
    });

    _defineProperty(this, "renderCardsForSingleCollection", () => {
      const {
        collections,
        entries,
        viewStyle
      } = this.props;
      const inferedFields = this.inferFields(collections);
      const entryCardProps = {
        collection: collections,
        inferedFields,
        viewStyle
      };
      return entries.map((entry, idx) => (0, _core.jsx)(_EntryCard.default, _extends({}, entryCardProps, {
        entry: entry,
        key: idx
      })));
    });

    _defineProperty(this, "renderCardsForMultipleCollections", () => {
      const {
        collections,
        entries
      } = this.props;
      return entries.map((entry, idx) => {
        const collectionName = entry.get('collection');
        const collection = collections.find(coll => coll.get('name') === collectionName);
        const collectionLabel = collection.get('label');
        const inferedFields = this.inferFields(collection);
        const entryCardProps = {
          collection,
          entry,
          inferedFields,
          collectionLabel
        };
        return (0, _core.jsx)(_EntryCard.default, _extends({}, entryCardProps, {
          key: idx
        }));
      });
    });
  }

  render() {
    const {
      collections
    } = this.props;
    return (0, _core.jsx)("div", null, (0, _core.jsx)(CardsGrid, null, _immutable.Map.isMap(collections) ? this.renderCardsForSingleCollection() : this.renderCardsForMultipleCollections(), this.hasMore() && (0, _core.jsx)(_reactWaypoint.default, {
      onEnter: this.handleLoadMore
    })));
  }

}

exports.default = EntryListing;

_defineProperty(EntryListing, "propTypes", {
  collections: _reactImmutableProptypes.default.iterable.isRequired,
  entries: _reactImmutableProptypes.default.list,
  viewStyle: _propTypes.default.string,
  cursor: _propTypes.default.any.isRequired,
  handleCursorActions: _propTypes.default.func.isRequired
});