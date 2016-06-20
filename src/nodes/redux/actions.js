import {
    NODES_LIST,
    NODES_LIST_APPEND,
    NODES_GET,
    NODES_SAVE
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
    }
  }, append ? NODES_LIST_APPEND : NODES_LIST)
}

export const getNode = (id, {_expand}) => {
  return createApiAction({
    url: '/nodes/:id',
    queryParams: {id, _expand},
    method: 'GET'
  }, NODES_GET)
}

export const saveNode = (base, changed) => {
  return createApiAction({
    url: base.id ? ("/nodes/"+base.id) : "/nodes",
    queryParams: {
      _expand: "user,text"
    },
    data: changed,
    method: 'POST',
    nodeId: base.id
  }, NODES_SAVE)
}
