import rootReducer from "./reducers";
import {routerMiddleware} from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import sagas from "./sagas";
import {apiMiddleware} from "commons/api";
import googleApiMiddleware from "google/middleware/googleapi";

const sagaMiddleware = createSagaMiddleware()

let DevTools

if (__DEVTOOLS__) {
  DevTools = require('commons/containers/DevTools').default
} else {
  DevTools = null
}

export default function configureStore(initialState, history) {
  const middlewares = applyMiddleware(
      routerMiddleware(history),
      apiMiddleware,
      googleApiMiddleware,
      sagaMiddleware
  )
  let createStoreWithMiddleware = null

  if (__DEVTOOLS__) {
    createStoreWithMiddleware = compose(
        middlewares,
        DevTools.instrument()
    )
  } else {
    createStoreWithMiddleware = compose(middlewares)
  }

  const store = createStoreWithMiddleware(createStore)(
      rootReducer, initialState
  )

  sagas.forEach((s) => sagaMiddleware.run(s))

  return {
    ...store,
    runSaga: sagaMiddleware.run
  }
}
