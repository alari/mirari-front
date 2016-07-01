import createActionRequestTypes from 'commons/utils/createActionRequestTypes'

export const NODES_LIST = createActionRequestTypes('NODES_LIST')
export const NODES_GET = createActionRequestTypes('NODES_GET')
export const NODES_SAVE = createActionRequestTypes('NODES_SAVE')
export const NODES_DELETE = createActionRequestTypes('NODES_DELETE')
export const NODES_COMMENT = createActionRequestTypes("NODES_COMMENT")

export const NODE_COMMENT_GET = createActionRequestTypes("NODE_COMMENT_GET")
export const NODE_COMMENT_REMOVE = createActionRequestTypes("NODE_COMMENT_REMOVE")

export const NODE_PIN = createActionRequestTypes("NODE_PIN")
export const NODE_UNPIN = createActionRequestTypes("NODE_UNPIN")

export const NODE_ENTER = "NODE_ENTER"
