import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from 'store/index'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Root from 'commons/containers/Root'

const preloadedData = window.document.getElementById('initialState').text
const initialState = preloadedData && JSON.parse(preloadedData) || {}

const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root store={ store } history={ history } onReady={() => {
    window.LOADED = true
  }}/>,
  document.getElementById('app')
)


if(__DEVTOOLS__){
  const DevTools = require('commons/containers/DevTools').default;

  ReactDOM.render(
    <Provider store={ store }><DevTools /></Provider>,
    document.getElementById('devtools')
  )
}
