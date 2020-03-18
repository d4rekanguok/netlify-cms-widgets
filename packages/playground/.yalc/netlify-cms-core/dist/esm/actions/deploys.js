"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deployPreviewLoading = deployPreviewLoading;
exports.deployPreviewLoaded = deployPreviewLoaded;
exports.deployPreviewError = deployPreviewError;
exports.loadDeployPreview = loadDeployPreview;
exports.DEPLOY_PREVIEW_FAILURE = exports.DEPLOY_PREVIEW_SUCCESS = exports.DEPLOY_PREVIEW_REQUEST = void 0;

var _reduxNotifications = require("redux-notifications");

var _backend = require("../backend");

var _reducers = require("../reducers");

const {
  notifSend
} = _reduxNotifications.actions;
const DEPLOY_PREVIEW_REQUEST = 'DEPLOY_PREVIEW_REQUEST';
exports.DEPLOY_PREVIEW_REQUEST = DEPLOY_PREVIEW_REQUEST;
const DEPLOY_PREVIEW_SUCCESS = 'DEPLOY_PREVIEW_SUCCESS';
exports.DEPLOY_PREVIEW_SUCCESS = DEPLOY_PREVIEW_SUCCESS;
const DEPLOY_PREVIEW_FAILURE = 'DEPLOY_PREVIEW_FAILURE';
exports.DEPLOY_PREVIEW_FAILURE = DEPLOY_PREVIEW_FAILURE;

function deployPreviewLoading(collection, slug) {
  return {
    type: DEPLOY_PREVIEW_REQUEST,
    payload: {
      collection: collection.get('name'),
      slug
    }
  };
}

function deployPreviewLoaded(collection, slug, {
  url,
  status
}) {
  return {
    type: DEPLOY_PREVIEW_SUCCESS,
    payload: {
      collection: collection.get('name'),
      slug,
      url,
      status
    }
  };
}

function deployPreviewError(collection, slug) {
  return {
    type: DEPLOY_PREVIEW_FAILURE,
    payload: {
      collection: collection.get('name'),
      slug
    }
  };
}
/**
 * Requests a deploy preview object from the registered backend.
 */


function loadDeployPreview(collection, slug, entry, published, opts) {
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config); // Exit if currently fetching

    const deployState = (0, _reducers.selectDeployPreview)(state, collection, slug);

    if (deployState && deployState.get('isFetching')) {
      return;
    }

    dispatch(deployPreviewLoading(collection, slug));

    try {
      /**
       * `getDeploy` is for published entries, while `getDeployPreview` is for
       * unpublished entries.
       */
      const deploy = published ? backend.getDeploy(collection, slug, entry) : await backend.getDeployPreview(collection, slug, entry, opts);

      if (deploy) {
        return dispatch(deployPreviewLoaded(collection, slug, deploy));
      }

      return dispatch(deployPreviewError(collection, slug));
    } catch (error) {
      console.error(error);
      dispatch(notifSend({
        message: {
          details: error.message,
          key: 'ui.toast.onFailToLoadDeployPreview'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(deployPreviewError(collection, slug));
    }
  };
}