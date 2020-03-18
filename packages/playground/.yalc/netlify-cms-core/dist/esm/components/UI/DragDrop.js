"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTML5DragDrop = exports.DropTarget = exports.DragSource = void 0;

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _reactDnd = require("react-dnd");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const DragSource = (_ref) => {
  let {
    namespace
  } = _ref,
      props = _objectWithoutProperties(_ref, ["namespace"]);

  const DragComponent = (0, _reactDnd.DragSource)(namespace, {
    // eslint-disable-next-line no-unused-vars
    beginDrag(_ref2) {
      let {
        children,
        isDragging,
        connectDragComponent
      } = _ref2,
          ownProps = _objectWithoutProperties(_ref2, ["children", "isDragging", "connectDragComponent"]);

      // We return the rest of the props as the ID of the element being dragged.
      return ownProps;
    }

  }, connect => ({
    connectDragComponent: connect.dragSource()
  }))(({
    children,
    connectDragComponent
  }) => children(connectDragComponent));
  return _react.default.createElement(DragComponent, props, props.children);
};

exports.DragSource = DragSource;
DragSource.propTypes = {
  namespace: _propTypes.default.any.isRequired,
  children: _propTypes.default.func.isRequired
};

const DropTarget = (_ref3) => {
  let {
    onDrop,
    namespace
  } = _ref3,
      props = _objectWithoutProperties(_ref3, ["onDrop", "namespace"]);

  const DropComponent = (0, _reactDnd.DropTarget)(namespace, {
    drop(ownProps, monitor) {
      onDrop(monitor.getItem());
    }

  }, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isHovered: monitor.isOver()
  }))(({
    children,
    connectDropTarget,
    isHovered
  }) => children(connectDropTarget, {
    isHovered
  }));
  return _react.default.createElement(DropComponent, props, props.children);
};

exports.DropTarget = DropTarget;
DropTarget.propTypes = {
  onDrop: _propTypes.default.func.isRequired,
  namespace: _propTypes.default.any.isRequired,
  children: _propTypes.default.func.isRequired
};

const HTML5DragDrop = component => (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend.default)(component);

exports.HTML5DragDrop = HTML5DragDrop;