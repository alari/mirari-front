import {concat, map, filter, groupBy, find, sortBy} from "ramda";
import {createReducer, update} from "commons/utils";
import {NODES_LIST, NODES_GET, NODES_SAVE, NODES_DELETE, NODES_COMMENT, NODE_COMMENT_GET, NODE_COMMENT_REMOVE} from "./constants";


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

const prepareComments = (list) => {
  const byReplyId = groupBy(c => c.replyTo || "root", list)
  const roots = byReplyId.root || []
  return map(c => {
    let replyTo
    let children = []
    let queue = [c.id]
    while(!!(replyTo = queue.pop())) {
      if(!!byReplyId[replyTo]) {
         children = children.concat(byReplyId[replyTo])
         queue = queue.concat(map(r => r.id, byReplyId[replyTo]))
      }
    }
    c.children = sortBy(r => r.dateCreated, children)
    return c
  }, roots)
}

const addCommentReducer = (state, action) => (state.node && state.node.comments && !find(n => n.id === action.result.body.id, state.node.comments.values)) ? ({
  ...state,
  node: {
    ...state.node,
    comments: {
      total: state.node.comments.total + 1,
      values: concat(state.node.comments.values, action.result.body)
    }
  },
  comments: prepareComments(concat(state.node.comments.values, action.result.body))
}) : state ;

export default createReducer({}, {
  [NODES_LIST.SUCCESS]: (state, action) => ({
    ...state,
    list: action.append ? {
      ...action.result.body,
      values: concat(state.list.values || [], action.result.body.values)
    } : action.result.body
  }),

  [NODES_GET.REQUEST]: (state, action) => ({
    ...state,
    node: null
  }),

  [NODES_GET.SUCCESS]: (state, action) => ({
    ...state,
    node: action.result.body,
    comments: action.result.body.comments && prepareComments(action.result.body.comments.values)
  }),

  [NODES_SAVE.REQUEST]: (state, action) =>
    updateNodeInStore(state, action.nodeId, (node) => update.set(node, action.params)),

  [NODES_SAVE.SUCCESS]: (state, action) => {
    const updated = updateNodeInStore(state, action.nodeId, (node) => {
      return update.commit(node, action.result.body)
    })
    if (action.result.status === 201 && updated.list && updated.list.values) {
      updated.list.values.unshift(action.result.body)
    }
    return updated
  },

  [NODES_SAVE.FAILURE]: (state, action) =>
    updateNodeInStore(state, action.nodeId, (node) => update.revert(node)),

  [NODES_COMMENT.SUCCESS]: addCommentReducer,

  [NODE_COMMENT_GET.SUCCESS]: addCommentReducer,

  [NODE_COMMENT_REMOVE.SUCCESS]: (state, action) => {
    const commentId = action.routeParams.commentId
    if(state.node && state.node.comments && !!find(n => n.id === commentId, state.node.comments.values)) {
      const updatedComments = filter(c => c.id !== commentId, state.node.comments.values)
      return {
        ...state,
        node: {
          ...state.node,
          comments: {
            total: state.node.comments.total - 1,
            values: updatedComments
          }
        },
        comments: prepareComments(updatedComments)
      }
    } else return state
  },

  [NODES_DELETE.SUCCESS]: (state, action) => ({
    ...state,
    node: (state.node && state.node.id === action.routeParams.nodeId) ? null : state.node,
    list: (state.list && state.list.values) ? {
      ...state.list,
      values: filter(n => n.id !== action.routeParams.nodeId, state.list.values)
    } : state.list
  })

})
