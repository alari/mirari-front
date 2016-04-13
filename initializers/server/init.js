import './cssHook'
import './globals';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import routes from 'states/routes'
import configureStore from 'store/index'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import { resolveRoutes } from 'utils'
import environmental from 'environmental'
import { HISTORY_CHANGE } from 'containers/constants'
import { HISTORY_CHANGE_RESOLVED } from 'state/constants'
import { resolvedOnServer } from 'state/redux/actions'
import { takeLatest } from 'redux-saga'
import { put, select } from 'redux-saga/effects'

import sagaMiddleware from 'store/middleware/saga'

export const matchRoute = function(path, token){

  const memoryHistory = createMemoryHistory(path)
  const location = memoryHistory.createLocation(path)
  const store = configureStore({
    auth: {
      token: token
    },
    // google: {
    //   geocoding: environmental.config().google.googleGeocoding
    // }
  }, memoryHistory)

  const history = syncHistoryWithStore(memoryHistory, store)

  return new Promise(function(resolve, reject){
    match({
      history,
      routes,
      location: path
    }, function(error, redirectLocation, renderProps){
      if(renderProps){
        const render = () => ReactDOMServer.renderToString(
          <Provider store={ store }>
            <RouterContext { ...renderProps }/>
          </Provider>
        )

        sagaMiddleware.run(function* () {
          yield takeLatest(HISTORY_CHANGE_RESOLVED, function*(){
            yield put(resolvedOnServer());
            const data = store.getState();
            resolve({ error, redirectLocation, render, data })
          })
        })

        sagaMiddleware.run(function* () {
          yield put({
            type: HISTORY_CHANGE,
            store,
            state: renderProps
          })
        })


      } else {
        resolve({ error, redirectLocation, render: null, data: null })
      }
    })
  })
}
