import createActionRequestTypes from 'commons/utils/createActionRequestTypes'

export const NODES_LIST = createActionRequestTypes('NODES_LIST')
export const NODES_LIST_APPEND = createActionRequestTypes('NODES_LIST_APPEND')
export const NODES_GET = createActionRequestTypes('NODES_GET')
export const NODES_CLEAR_CHANGED = "NODES_CLEAR_CHANGED"
export const NODES_SET_CHANGED_FIELDS = "NODES_SET_CHANGED_FIELDS"
export const NODES_SAVE = createActionRequestTypes('NODES_SAVE')