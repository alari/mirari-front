import {
    NODES_LIST,
    NODES_LIST_APPEND,
    NODES_GET
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