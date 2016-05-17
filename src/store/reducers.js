import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {authReducer} from 'commons/auth'
import {resolveReducer} from 'commons/state'
import nodes from 'nodes/redux/reducers'
import {pageReducer} from 'commons/page'
import users from 'users/redux/reducers'

export default combineReducers({
  auth: authReducer,
  state: resolveReducer,
  page: pageReducer,
  routing: routerReducer,

  nodes,
  users
})
