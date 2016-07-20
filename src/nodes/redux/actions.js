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
  NODE_SET_CURRENT
} from "./constants";
import {createApiAction} from "commons/api";
import {singleNodeExpand, listNodesExpand} from "../utils/nodeExpand"

export const getNodesList = ({key="list", offset, limit = 13, userId, layer, q, pinnedToId, _expand = listNodesExpand, append = false}) => {
  return createApiAction({
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
}

export const getNode = (id, {_expand = singleNodeExpand}) => {
  return createApiAction({
    url: '/nodes/:id',
    routeParams: {id},
    queryParams: {_expand},
    method: 'GET'
  }, NODES_GET)
}

export const saveNode = (base, changed, transient = false) => {
  return createApiAction({
    url: base.id ? ("/nodes/" + base.id) : "/nodes",
    queryParams: {
      _expand: singleNodeExpand
    },
    data: changed,
    method: 'POST',
    nodeId: base.id,
    transient
  }, NODES_SAVE)
}

export const deleteNode = (nodeId) => createApiAction({
  url: '/nodes/:nodeId',
  routeParams: {nodeId},
  method: 'DELETE'
}, NODES_DELETE)

export const commentNode = (id, data) => createApiAction({
  url: '/nodes/:id/comments',
  routeParams: {id},
  queryParams: {_expand: "user"},
  method: 'POST',
  data
}, NODES_COMMENT)

export const getNodeComment = (nodeId, commentId) =>
  createApiAction({
    url: '/nodes/:nodeId/comments/:commentId',
    routeParams: {nodeId, commentId},
    queryParams: {_expand: "user"}
  }, NODE_COMMENT_GET)

export const removeNodeComment = (nodeId, commentId) => createApiAction({
  url: '/nodes/:nodeId/comments/:commentId',
  routeParams: {nodeId, commentId},
  method: 'DELETE'
}, NODE_COMMENT_REMOVE)

export const nodeCommentRemoved = (nodeId, commentId) => ({
  type: NODE_COMMENT_REMOVE.SUCCESS,
  routeParams: {nodeId, commentId}
})

export const nodePin = (nodeId, targetId) => createApiAction({
  url: '/nodes/:nodeId/actions/pin',
  routeParams: {nodeId},
  method: 'POST',
  data: {
    targetNodeId: targetId
  }
}, NODE_PIN)

export const nodeUnpin = (nodeId, targetId) => createApiAction({
  url: '/nodes/:nodeId/actions/unpin',
  routeParams: {nodeId},
  method: 'POST',
  data: {
    targetNodeId: targetId
  }
}, NODE_UNPIN)

export const nodeSetCurrent = (node) => ({
  type: NODE_SET_CURRENT,
  node
})
