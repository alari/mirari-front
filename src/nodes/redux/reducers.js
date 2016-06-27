import {concat, map, filter, groupBy, find, sortBy} from "ramda";
import {createReducer, update} from "commons/utils";
import {NODES_LIST, NODES_GET, NODES_SAVE, NODES_DELETE, NODES_COMMENT, NODE_COMMENT_GET} from "./constants";


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

const prepareComments = (comments) => {
  const byReplyId = groupBy(c => c.replyTo || "node", comments.values)
  map(c => c.children = byReplyId[c.id] || [], comments.values)
  return byReplyId.node
}

const addComment = (comments, add) => {
  add.children = []
  if (!comments) comments = []
  if (!add.replyTo) {
    comments.push(add)
    return comments
  } else {
    let i = 0
    while (i < comments.length) {
      const c = comments[i]
      if (c.id === add.replyTo) {
        c.children.push(add)
        break
      } else {
        addComment(c.children, add)
      }
      i += 1
    }
    return comments
  }
}

const removeComment = (comments, id, parent) => {
  if (!comments) comments = []
  let i = 0
  while(i < comments.length) {
    const c = comments[i]
    if(c.id === id) {
      return sortBy(n => n.dateCreated, concat(map(h => h.replyTo = parent && parent.id, c.children), filter(h => h.id !== id, comments)))
    } else {
      c.children = removeComment(c.children, id, c)
    }
  }
  return comments
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
  comments: addComment(state.comments, action.result.body)
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
    comments: action.result.body.comments && prepareComments(action.result.body.comments)
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

  [NODES_DELETE.SUCCESS]: (state, action) => ({
    ...state,
    node: (state.node && state.node.id === action.routeParams.nodeId) ? null : state.node,
    list: (state.list && state.list.values) ? {
      ...state.list,
      values: filter(n => n.id !== action.routeParams.commentId, state.list.values)
    } : state.list,
    comments: removeComment(state.comments, action.routeParams.commentId)
  })

})
