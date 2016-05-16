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
import { HISTORY_CHANGE } from 'containers/constants'
import { HISTORY_CHANGE_RESOLVED } from 'state/constants'
import { resolvedOnServer } from 'state/redux/actions'
import { takeLatest } from 'redux-saga'
import { put, select } from 'redux-saga/effects'

export const matchRoute = function(request, token){

  const path = request.url

  const memoryHistory = createMemoryHistory(path)
  const location = memoryHistory.createLocation(path)
  const store = configureStore({
    auth: {
      headers: {
        'accept-language': request.header['accept-language'],
        'user-agent': 'node-superagent ' + request.header['user-agent']
      },
      token: token
    }
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

        store.runSaga(function* () {
          yield takeLatest(HISTORY_CHANGE_RESOLVED, function*(){
            yield put(resolvedOnServer());
            const data = store.getState();
            resolve({ error, redirectLocation, render, data })
          })
        })

        store.runSaga(function* () {
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
