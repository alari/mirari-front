import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {authReducer} from 'commons/auth'
import {resolveReducer} from 'commons/state'
import nodes from 'nodes/redux/reducers'
import {pageReducer} from 'commons/page'
import filesReducer from 'commons/files/redux/reducers'
import users from 'users/redux/reducers'

export default combineReducers({
  auth: authReducer,
  state: resolveReducer,
  page: pageReducer,
  routing: routerReducer,
  filtes: filesReducer,

  nodes,
  users
})
