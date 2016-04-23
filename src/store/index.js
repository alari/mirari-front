import rootReducer from './reducers'
import { routerMiddleware } from 'react-router-redux'

import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

import apiMiddleware from 'api/middleware/api'
import googleApiMiddleware from 'google/middleware/googleapi'
import sagaMiddleware from './sagas'

let DevTools

if(__DEVTOOLS__){
  DevTools = require('containers/DevTools').default
} else {
  DevTools = null
}

export default function configureStore (initialState, history) {
  const middlewares = applyMiddleware(
    routerMiddleware(history),
    apiMiddleware,
    googleApiMiddleware,
    sagaMiddleware
  )
  let createStoreWithMiddleware = null

  if(__DEVTOOLS__){
    createStoreWithMiddleware = compose(
      middlewares,
      DevTools.instrument()
    )
  } else {
    createStoreWithMiddleware = compose(middlewares)
  }

  const store =  createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  )

  return store
}
