import React, {Component, PropTypes} from "react";
import {Router, match} from "react-router";
import {Provider} from "react-redux";
import {HISTORY_CHANGE} from "./constants";
import routes from "states/routes";
import {resolveRoutes} from "commons/utils";

class Root extends Component {
  componentWillMount() {
    const {history, store, onReady} = this.props
    var isLoaded = false


    history.listen(location => {
      match({history, location, routes}, (error, redirect, state) => {
        if (redirect) {
          history.push(redirect.pathname + redirect.search)
          return
        }

        if (!error && state) {
          store.dispatch({
            type: HISTORY_CHANGE,
            state,
            store
          })
        } else {
          history.goBack()
        }

        if (!isLoaded && onReady) {
          onReady()
        }
      })
    })
  }

  render() {
    const {history, store} = this.props

    return (
        <Provider store={ store }>
          <Router routes={ routes } history={ history }/>
        </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default Root
