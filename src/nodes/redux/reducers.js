import {concat, map} from "ramda";
import {createReducer, update} from "utils";
import {
    NODES_LIST,
    NODES_LIST_APPEND,
    NODES_GET
} from "./constants";


const updateNodeInStore = (state, id, handler) => {
  let list = state.list
  let currentNode = state.node

  if (currentNode && currentNode.id === id) {
    state = {
      ...state,
      node: handler(currentNode)
    }
  }

  if (list) {
    list.values = map((node) => {
      if (node.id === id) {
        return handler(node)
      } else {
        return node
      }
    }, list.values)

    state = {
      ...state,
      list: {
        ...list
      }
    }
  }

  return state
}

export default createReducer({}, {
  [NODES_LIST.SUCCESS]: (state, action) => ({
    ...state,
    list: action.result.body
  }),

  [NODES_LIST_APPEND.SUCCESS]: (state, action) => ({
    ...state,
    list: {...action.result.body, values: concat(state.list.values || [], action.result.body.values)}
  }),

  [NODES_GET.REQUEST]: (state, action) => {
    return {
      ...state,
      node: null
    }
  },

  [NODES_GET.SUCCESS]: (state, action) => {
    return {
      ...state,
      node: action.result.body
    }
  }

})
