import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from 'store/index'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from 'states/routes'
import { get } from 'auth/redux/actions'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Root from 'containers/Root'

const preloadedData = window.document.getElementById('initialState').text
const initialState = preloadedData && JSON.parse(preloadedData) || {}

const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

const { auth: { token } = {}} = store.getState()

if(token){
  store.dispatch(get())
}

ReactDOM.render(
  <Root store={ store } history={ history } onReady={() => {
    window.LOADED = true
  }}/>,
  document.getElementById('app')
)


if(__DEVTOOLS__){
  const DevTools = require('containers/DevTools').default;

  ReactDOM.render(
    <Provider store={ store }><DevTools /></Provider>,
    document.getElementById('devtools')
  )
}
