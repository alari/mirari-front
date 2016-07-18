import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {authReducer} from 'commons/auth'
import {resolveReducer} from 'commons/resolve'
import nodes from 'nodes/redux/reducers'
import {pageReducer} from 'commons/page'
import filesReducer from 'commons/files/redux/reducers'
import users from 'users/redux/reducers'
import aliases from 'aliases/redux/reducers'

export default combineReducers({
  auth: authReducer,
  resolve: resolveReducer,
  page: pageReducer,
  routing: routerReducer,
  files: filesReducer,

  nodes,
  users,
  aliases
})
