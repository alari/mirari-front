import {concat, map, filter, groupBy, find, sortBy, clone, prepend} from "ramda";
import {createReducer, update} from "commons/utils";
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
  NODE_MOVE_INSIDE_SERIES
} from "./constants";

const prepareComments = (list) => {
  const byReplyId = groupBy(c => c.replyTo || "root", list)
  const roots = byReplyId.root || []
  return map(c => {
    let replyTo
    let children = []
    let queue = [c.id]
    while (!!(replyTo = queue.pop())) {
      if (!!byReplyId[replyTo]) {
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
}) : state;

export default createReducer({}, {
  [NODES_LIST.SUCCESS]: (state, action) => ({
        ...state,
        [action.key]: action.append ? {
          ...action.result.body,
          values: concat(state.list.values || [], action.result.body.values)
        } : action.result.body
      }),

  [NODES_GET.REQUEST]: (state, action) => ({
    ...state,
    node: null,
    comments: null,
    pinned:null
  }),

  [NODES_GET.SUCCESS]: (state, action) => ({
    ...state,
    node: action.result.body,
    comments: action.result.body.comments && prepareComments(action.result.body.comments.values)
  }),

  [NODES_SAVE.SUCCESS]: (state, action) => {
    if(action.transient) return state
    else {
      console.log("action is "+action)
      const node = action.result.body
      const updated = clone(state)
      if (action.params.pinToNodeId && action.params.pinToNodeId === state.node.id) {
        updated.pinned.values.unshift(node)
      } else {
        if (action.result.status === 201 && updated.list && updated.list.values) {
          updated.list.values.unshift(action.result.body)
        }
        updated.node = node
      }
      return updated
    }
  },

  [NODES_COMMENT.SUCCESS]: addCommentReducer,

  [NODE_COMMENT_GET.SUCCESS]: addCommentReducer,

  [NODE_COMMENT_REMOVE.SUCCESS]: (state, action) => {
    const commentId = action.routeParams.commentId
    if (state.node && state.node.comments && !!find(n => n.id === commentId, state.node.comments.values)) {
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
  }),

  [NODE_PIN.SUCCESS]: (state, action) => (action.data.targetNodeId === state.node.id) ? {
    ...state,
    pinned: {
      ...state.pinned,
      values: prepend(action.result.body, state.pinned.values)
    }
  } : state,

  [NODE_UNPIN.SUCCESS]: (state, action) => (action.data.targetNodeId === state.node.id) ? {
    ...state,
    pinned: {
      values: filter(n => n.id !== action.result.body.id, state.pinned.values)
    }
  } : state,

  [NODE_MOVE_INSIDE_SERIES.SUCCESS]: (state, action) => (action.routeParams.nodeId === state.node.id) ? {
    ...state,
    node: {
      ...state.node,
      series: {
        ...action.result.body,
        nodes: map(i => find(n => n.id === i, state.node.series.nodes), action.result.body.nodeIds)
      }
    }
  } : state,

  [NODE_SET_CURRENT]: (state, action) => ({
    ...state,
    node: action.node,
    comments: prepareComments(action.node.comments.values)
  })

})
