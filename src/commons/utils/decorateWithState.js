import React from "react";
import {map, keys, propOr, merge, equals, pickBy} from "ramda";


export default (pureRender, initialState = {}) => React.createClass({
  getInitialState: () => {
    return initialState
  },

  render: function() {
    const setState = this.setState.bind(this)
    const state = pickBy((v) => v !== undefined, this.state)
    return pureRender({
      ...this.props,
      setState,
      clearState: () => {
        setState(map((v) => undefined, state))
      },
      state,
      stateFieldChanged: (fieldName) => (e) => {
        setState({
          ...state,
          [fieldName]: e.target.value
        })
      }
    })
  }
})