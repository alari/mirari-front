import {
  NODES_LIST,
  NODES_GET,
  NODES_SAVE,
  NODES_DELETE,
  NODES_COMMENT,
  NODE_COMMENT_GET,
  NODE_COMMENT_REMOVE
} from "./constants";
import {createApiAction} from "commons/api";

export const getNodesList = ({offset, limit, userId, layer, q, _expand, append = false}) => {
  return createApiAction({
    url: '/nodes',
    method: 'GET',
    queryParams: {
      offset,
      limit,
      userId,
      layer,
      q,
      _expand
    },
    append
  }, NODES_LIST)
}

export const getNode = (id, {_expand}) => {
  return createApiAction({
    url: '/nodes/:id',
    routeParams: {id},
    queryParams: {_expand},
    method: 'GET'
  }, NODES_GET)
}

export const saveNode = (base, changed) => {
  return createApiAction({
    url: base.id ? ("/nodes/" + base.id) : "/nodes",
    queryParams: {
      _expand: "user,text"
    },
    data: changed,
    method: 'POST',
    nodeId: base.id
  }, NODES_SAVE)
}

export const deleteNode = (id) => createApiAction({
  url: '/nodes/:id',
  routeParams: {id},
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
