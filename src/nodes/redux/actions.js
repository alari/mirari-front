import {
    NODES_LIST, 
    NODES_LIST_APPEND,
    NODES_GET, 
    NODES_CLEAR_CHANGED,
    NODES_SET_CHANGED_FIELDS,
    NODES_SAVE
} from "./constants";
import {createApiAction} from "api/utils/apiActions";

export const getNodesList = ({offset, limit, userId, draft, q, _expand, append = false}) => {
  return createApiAction({
    url: '/nodes',
    method: 'GET',
    queryParams: {
      offset,
      limit,
      userId,
      draft,
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

export const clearChanged = (create=false) => {
  return {
    type: NODES_CLEAR_CHANGED,
    create
  }
}

export const setChangedFields = (fields) => {
  return {
    type: NODES_SET_CHANGED_FIELDS,
    fields
  }
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