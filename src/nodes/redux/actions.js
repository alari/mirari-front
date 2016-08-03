import {
  NODES_LIST,
  NODES_GET,
  NODES_SAVE,
  NODES_DELETE,
  NODES_COMMENT,
  NODE_COMMENT_GET,
  NODE_COMMENT_REMOVE,
  NODE_PIN,
  NODE_UNPIN,
  NODE_SET_CURRENT,
  NODE_MOVE_INSIDE_SERIES,
  NODE_MOVE_TO_DRAFTS
} from './constants';
import { createApiAction } from 'commons/api';
import { singleNodeExpand, listNodesExpand } from '../utils/nodeExpand';

export const getNodesList = ({ key = 'list', offset, limit = 13, userId, layer, q, pinnedToId, _expand = listNodesExpand, append = false }) => createApiAction({
    url: '/nodes',
    method: 'GET',
    queryParams: {
      offset,
      limit,
      userId,
      layer,
      q,
      pinnedToId,
      _expand
    },
    append,
    key
  }, NODES_LIST)

export const getNode = (id, { _expand = singleNodeExpand }) => {
  return createApiAction({
    url: '/nodes/:id',
    routeParams: { id },
    queryParams: { _expand },
    method: 'GET'
  }, NODES_GET)
}

export const saveNode = (base, changed, transient = false) => createApiAction({
    url: base.id ? ("/nodes/" + base.id) : "/nodes",
    queryParams: {
      _expand: singleNodeExpand
    },
    data: changed,
    method: 'POST',
    nodeId: base.id,
    transient
  }, NODES_SAVE)

export const deleteNode = (nodeId) => createApiAction({
  url: '/nodes/:nodeId',
  routeParams: { nodeId },
  method: 'DELETE'
}, NODES_DELETE)

export const commentNode = (id, data) => createApiAction({
  url: '/nodes/:id/comments',
  routeParams: { id },
  queryParams: { _expand: "user" },
  method: 'POST',
  data
}, NODES_COMMENT)

export const getNodeComment = (nodeId, commentId) =>
  createApiAction({
    url: '/nodes/:nodeId/comments/:commentId',
    routeParams: { nodeId, commentId },
    queryParams: { _expand: "user" }
  }, NODE_COMMENT_GET)

export const removeNodeComment = (nodeId, commentId) => createApiAction({
  url: '/nodes/:nodeId/comments/:commentId',
  routeParams: { nodeId, commentId },
  method: 'DELETE'
}, NODE_COMMENT_REMOVE)

export const nodeCommentRemoved = (nodeId, commentId) => ({
  type: NODE_COMMENT_REMOVE.SUCCESS,
  routeParams: { nodeId, commentId }
})

export const nodePin = (nodeId, targetId) => createApiAction({
  url: '/nodes/:nodeId/actions/pin',
  routeParams: { nodeId },
  queryParams: { _expand: "text" },
  method: 'POST',
  data: {
    targetNodeId: targetId
  }
}, NODE_PIN)

export const nodeUnpin = (nodeId, targetId) => createApiAction({
  url: '/nodes/:nodeId/actions/unpin',
  routeParams: { nodeId },
  method: 'POST',
  data: {
    targetNodeId: targetId
  }
}, NODE_UNPIN)

export const nodeMoveInsideSeries = (nodeId, targetId, index) => createApiAction({
  url: '/nodes/:nodeId/series/actions/move',
  routeParams: { nodeId },
  method: 'POST',
  data: {
    nodeId: targetId,
    index
  }
}, NODE_MOVE_INSIDE_SERIES)

export const nodeSetCurrent = (node) => ({
  type: NODE_SET_CURRENT,
  node
})

export const nodeMakeDraft = (node) => createApiAction({
  url: `/nodes/:nodeId?_expand=${singleNodeExpand}`,
  routeParams: { nodeId: node.id },
  method: 'POST',
  data: {
    layer: 'Draft',
  },
}, NODE_MOVE_TO_DRAFTS)
