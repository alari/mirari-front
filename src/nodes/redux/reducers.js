import {concat, map, filter} from "ramda";
import {createReducer, update} from "commons/utils";
import {
  NODES_LIST,
  NODES_GET,
  NODES_SAVE,
  NODES_DELETE} from "./constants";


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
    list: action.append ? {...action.result.body, values: concat(state.list.values || [], action.result.body.values)} : action.result.body
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
  },

  [NODES_SAVE.REQUEST]: (state, action) => {
    return {
      ...updateNodeInStore(state, action.nodeId, (user) => {
        return update.set(user, action.params)
      })
    }
  },

  [NODES_SAVE.SUCCESS]: (state, action) => {
    const updated = updateNodeInStore(state, action.nodeId, (node) => {
      return update.commit(node, action.result.body)
    })
    if(action.result.status === 201) {
      updated.list.values.unshift(action.result.body)
    }
    return {
      ...updated
    }
  },

  [NODES_SAVE.FAILURE]: (state, action) => {
    return {
      ...updateNodeInStore(state, action.nodeId, (node) => {
        return update.revert(node)
      })
    }
  },

  [NODES_DELETE.SUCCESS]: (state, action) => ({
    ...state,
    node: (state.node && state.node.id === action.queryParams.id) ? null : state.node,
    list: (state.list && state.list.values) ? {
      ...state.list,
      values: filter(n => n.id !== action.queryParams.id, state.list.values)
    } : state.list
  })

})
