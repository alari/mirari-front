import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from 'auth/redux/reducers'
import state from 'state/redux/reducers'
import nodes from 'nodes/redux/reducers'


export default combineReducers({
  auth,
  state,
  nodes,
  routing: routerReducer
})
