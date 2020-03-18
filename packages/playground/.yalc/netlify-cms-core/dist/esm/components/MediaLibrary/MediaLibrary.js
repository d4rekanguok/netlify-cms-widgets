"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _orderBy2 = _interopRequireDefault(require("lodash/orderBy"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactRedux = require("react-redux");

var _reactPolyglot = require("react-polyglot");

var _fuzzy = _interopRequireDefault(require("fuzzy"));

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _mediaLibrary = require("../../actions/mediaLibrary");

var _mediaLibrary2 = require("../../reducers/mediaLibrary");

var _MediaLibraryModal = _interopRequireWildcard(require("./MediaLibraryModal"));

var _core = require("@emotion/core");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Extensions used to determine which files to show when the media library is
 * accessed from an image insertion field.
 */
const IMAGE_EXTENSIONS_VIEWABLE = ['jpg', 'jpeg', 'webp', 'gif', 'png', 'bmp', 'tiff', 'svg'];
const IMAGE_EXTENSIONS = [...IMAGE_EXTENSIONS_VIEWABLE];

class MediaLibrary extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      selectedFile: {},
      query: ''
    });

    _defineProperty(this, "loadDisplayURL", file => {
      const {
        loadMediaDisplayURL
      } = this.props;
      loadMediaDisplayURL(file);
    });

    _defineProperty(this, "filterImages", files => {
      return files.filter(file => {
        const ext = (0, _netlifyCmsLibUtil.fileExtension)(file.name).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      });
    });

    _defineProperty(this, "toTableData", files => {
      const tableData = files && files.map(({
        key,
        name,
        id,
        size,
        path,
        queryOrder,
        displayURL,
        draft
      }) => {
        const ext = (0, _netlifyCmsLibUtil.fileExtension)(name).toLowerCase();
        return {
          key,
          id,
          name,
          path,
          type: ext.toUpperCase(),
          size,
          queryOrder,
          displayURL,
          draft,
          isImage: IMAGE_EXTENSIONS.includes(ext),
          isViewableImage: IMAGE_EXTENSIONS_VIEWABLE.includes(ext)
        };
      });
      /**
       * Get the sort order for use with `lodash.orderBy`, and always add the
       * `queryOrder` sort as the lowest priority sort order.
       */

      const {
        sortFields
      } = this.state;
      const fieldNames = (0, _map2.default)(sortFields, 'fieldName').concat('queryOrder');
      const directions = (0, _map2.default)(sortFields, 'direction').concat('asc');
      return (0, _orderBy2.default)(tableData, fieldNames, directions);
    });

    _defineProperty(this, "handleClose", () => {
      this.props.closeMediaLibrary();
    });

    _defineProperty(this, "handleAssetClick", asset => {
      const selectedFile = this.state.selectedFile.key === asset.key ? {} : asset;
      this.setState({
        selectedFile
      });
    });

    _defineProperty(this, "handlePersist", async event => {
      /**
       * Stop the browser from automatically handling the file input click, and
       * get the file for upload, and retain the synthetic event for access after
       * the asynchronous persist operation.
       */
      event.persist();
      event.stopPropagation();
      event.preventDefault();
      const {
        persistMedia,
        privateUpload,
        config,
        t,
        field
      } = this.props;
      const {
        files: fileList
      } = event.dataTransfer || event.target;
      const files = [...fileList];
      const file = files[0];
      const maxFileSize = config.get('max_file_size');

      if (maxFileSize && file.size > maxFileSize) {
        window.alert(t('mediaLibrary.mediaLibrary.fileTooLarge', {
          size: Math.floor(maxFileSize / 1000)
        }));
      } else {
        await persistMedia(file, {
          privateUpload,
          field
        });
        this.setState({
          selectedFile: this.props.files[0]
        });
        this.scrollToTop();
      }

      event.target.value = null;
    });

    _defineProperty(this, "handleInsert", () => {
      const {
        selectedFile
      } = this.state;
      const {
        path
      } = selectedFile;
      const {
        insertMedia,
        field
      } = this.props;
      insertMedia(path, field);
      this.handleClose();
    });

    _defineProperty(this, "handleDelete", () => {
      const {
        selectedFile
      } = this.state;
      const {
        files,
        deleteMedia,
        privateUpload,
        t
      } = this.props;

      if (!window.confirm(t('mediaLibrary.mediaLibrary.onDelete'))) {
        return;
      }

      const file = files.find(file => selectedFile.key === file.key);
      deleteMedia(file, {
        privateUpload
      }).then(() => {
        this.setState({
          selectedFile: {}
        });
      });
    });

    _defineProperty(this, "handleLoadMore", () => {
      const {
        loadMedia,
        dynamicSearchQuery,
        page,
        privateUpload
      } = this.props;
      loadMedia({
        query: dynamicSearchQuery,
        page: page + 1,
        privateUpload
      });
    });

    _defineProperty(this, "handleSearchKeyDown", async event => {
      const {
        dynamicSearch,
        loadMedia,
        privateUpload
      } = this.props;

      if (event.key === 'Enter' && dynamicSearch) {
        await loadMedia({
          query: this.state.query,
          privateUpload
        });
        this.scrollToTop();
      }
    });

    _defineProperty(this, "scrollToTop", () => {
      this.scrollContainerRef.scrollTop = 0;
    });

    _defineProperty(this, "handleSearchChange", event => {
      this.setState({
        query: event.target.value
      });
    });

    _defineProperty(this, "queryFilter", (query, files) => {
      /**
       * Because file names don't have spaces, typing a space eliminates all
       * potential matches, so we strip them all out internally before running the
       * query.
       */
      const strippedQuery = query.replace(/ /g, '');

      const matches = _fuzzy.default.filter(strippedQuery, files, {
        extract: file => file.name
      });

      const matchFiles = matches.map((match, queryIndex) => {
        const file = files[match.index];
        return _objectSpread({}, file, {
          queryIndex
        });
      });
      return matchFiles;
    });
  }

  componentDidMount() {
    this.props.loadMedia();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /**
     * We clear old state from the media library when it's being re-opened
     * because, when doing so on close, the state is cleared while the media
     * library is still fading away.
     */
    const isOpening = !this.props.isVisible && nextProps.isVisible;

    if (isOpening) {
      this.setState({
        selectedFile: {},
        query: ''
      });
    }
  }

  componentDidUpdate(prevProps) {
    const isOpening = !prevProps.isVisible && this.props.isVisible;

    if (isOpening && prevProps.privateUpload !== this.props.privateUpload) {
      this.props.loadMedia({
        privateUpload: this.props.privateUpload
      });
    }
  }

  render() {
    const {
      isVisible,
      canInsert,
      files,
      dynamicSearch,
      dynamicSearchActive,
      forImage,
      isLoading,
      isPersisting,
      isDeleting,
      hasNextPage,
      isPaginating,
      privateUpload,
      displayURLs,
      t
    } = this.props;
    return (0, _core.jsx)(_MediaLibraryModal.default, {
      isVisible: isVisible,
      canInsert: canInsert,
      files: files,
      dynamicSearch: dynamicSearch,
      dynamicSearchActive: dynamicSearchActive,
      forImage: forImage,
      isLoading: isLoading,
      isPersisting: isPersisting,
      isDeleting: isDeleting,
      hasNextPage: hasNextPage,
      isPaginating: isPaginating,
      privateUpload: privateUpload,
      query: this.state.query,
      selectedFile: this.state.selectedFile,
      handleFilter: this.filterImages,
      handleQuery: this.queryFilter,
      toTableData: this.toTableData,
      handleClose: this.handleClose,
      handleSearchChange: this.handleSearchChange,
      handleSearchKeyDown: this.handleSearchKeyDown,
      handlePersist: this.handlePersist,
      handleDelete: this.handleDelete,
      handleInsert: this.handleInsert,
      setScrollContainerRef: ref => this.scrollContainerRef = ref,
      handleAssetClick: this.handleAssetClick,
      handleLoadMore: this.handleLoadMore,
      displayURLs: displayURLs,
      loadDisplayURL: this.loadDisplayURL,
      t: t
    });
  }

}

_defineProperty(MediaLibrary, "propTypes", {
  isVisible: _propTypes.default.bool,
  loadMediaDisplayURL: _propTypes.default.func,
  displayURLs: _reactImmutableProptypes.default.map,
  canInsert: _propTypes.default.bool,
  files: _propTypes.default.arrayOf(_propTypes.default.shape(_MediaLibraryModal.fileShape)).isRequired,
  dynamicSearch: _propTypes.default.bool,
  dynamicSearchActive: _propTypes.default.bool,
  forImage: _propTypes.default.bool,
  isLoading: _propTypes.default.bool,
  isPersisting: _propTypes.default.bool,
  isDeleting: _propTypes.default.bool,
  hasNextPage: _propTypes.default.bool,
  isPaginating: _propTypes.default.bool,
  privateUpload: _propTypes.default.bool,
  config: _reactImmutableProptypes.default.map,
  loadMedia: _propTypes.default.func.isRequired,
  dynamicSearchQuery: _propTypes.default.string,
  page: _propTypes.default.number,
  persistMedia: _propTypes.default.func.isRequired,
  deleteMedia: _propTypes.default.func.isRequired,
  insertMedia: _propTypes.default.func.isRequired,
  closeMediaLibrary: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
});

_defineProperty(MediaLibrary, "defaultProps", {
  files: []
});

const mapStateToProps = state => {
  const {
    mediaLibrary
  } = state;
  const field = mediaLibrary.get('field');
  const mediaLibraryProps = {
    isVisible: mediaLibrary.get('isVisible'),
    canInsert: mediaLibrary.get('canInsert'),
    files: (0, _mediaLibrary2.selectMediaFiles)(state, field),
    displayURLs: mediaLibrary.get('displayURLs'),
    dynamicSearch: mediaLibrary.get('dynamicSearch'),
    dynamicSearchActive: mediaLibrary.get('dynamicSearchActive'),
    dynamicSearchQuery: mediaLibrary.get('dynamicSearchQuery'),
    forImage: mediaLibrary.get('forImage'),
    isLoading: mediaLibrary.get('isLoading'),
    isPersisting: mediaLibrary.get('isPersisting'),
    isDeleting: mediaLibrary.get('isDeleting'),
    privateUpload: mediaLibrary.get('privateUpload'),
    config: mediaLibrary.get('config'),
    page: mediaLibrary.get('page'),
    hasNextPage: mediaLibrary.get('hasNextPage'),
    isPaginating: mediaLibrary.get('isPaginating'),
    field
  };
  return _objectSpread({}, mediaLibraryProps);
};

const mapDispatchToProps = {
  loadMedia: _mediaLibrary.loadMedia,
  persistMedia: _mediaLibrary.persistMedia,
  deleteMedia: _mediaLibrary.deleteMedia,
  insertMedia: _mediaLibrary.insertMedia,
  loadMediaDisplayURL: _mediaLibrary.loadMediaDisplayURL,
  closeMediaLibrary: _mediaLibrary.closeMediaLibrary
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactPolyglot.translate)()(MediaLibrary));

exports.default = _default;