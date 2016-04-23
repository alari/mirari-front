import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from 'auth/redux/reducers'
import state from 'state/redux/reducers'
import nodes from 'nodes/redux/reducers'
import page from 'page/redux/reducers'


export default combineReducers({
  auth,
  state,
  nodes,
  page,
  routing: routerReducer
})
