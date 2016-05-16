import {
  RESOLVE_ROUTE_START,
  RESOLVE_ROUTE_END,
  RESOLVED_ON_SERVER
} from './constants'
import { createReducer } from 'commons/utils'
import {HISTORY_CHANGE} from 'commons/containers/constants'

export default createReducer({}, {
  [RESOLVED_ON_SERVER]: (state, action) => {
    return {
      ...state,
      isClientFirstResolve: true
    }
  },

  [RESOLVE_ROUTE_START]: (state, action) => {
    return {
      ...state,
      resolving: true
    }
  },

  [RESOLVE_ROUTE_END]: (state, action) => {
    return {
      ...state,
      resolving: false,
      isClientFirstResolve: false
    }
  },

  [HISTORY_CHANGE]: (state, action) => {
    return {
      ...state,
      query: action.state.location.query,
      resolving: true
    }
  }
})
