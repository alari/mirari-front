import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  GET_AUTH,
  UPDATE_TOKEN,
  AUTH_TOKEN_HEADER,
  SET_CREDENTIALS_FIELDS
} from './constants';

import { createReducer } from 'utils';

export default createReducer({}, {
  [UPDATE_TOKEN]: (state, action) => {
    return {
      ...state,
      token: action.token
    };
  },

  [SET_CREDENTIALS_FIELDS]: (state, action) => {
    return {
        ...state,
      credentials: {
          ...state.credentials,
          ...action.credentials
      }
    }
  },

  [LOGIN_USER.REQUEST]: (state, action) => {
    return {
        ... state,
      _error: null,
      _progress: true
    }
  },

  [LOGIN_USER.SUCCESS]: (state, action) => {
    return {
    ...state,
    ...action.result.body,
      _error: null,
      _progress: false,
      credentials: {}
  }},

  [LOGIN_USER.FAILURE]: (state, action) => {
    return {
        ...state,
      _progress: false,
    _error: action.error.body
  }},

  [GET_AUTH.SUCCESS]: (state, action) => {
    return {
    ...state,
    ...action.result.body
  }},

  [SIGNUP_USER.REQUEST]: (state, action) => {
    return {
        ...state,
        _error: null,
      _progress: true,
    }
  },

  [SIGNUP_USER.SUCCESS]: (state, action) => ({
    ...state,
    ...action.result.body,
    _error: null,
    _progress: false,
    credentials: {}
  }),

  [SIGNUP_USER.FAILURE]: (state, action) => ({
      ...state,
    _progress: false,
    _error: action.error.body
  }),

  [LOGOUT_USER]: (state, action) => {
    return {}
  }
})
