import createActionRequestTypes from 'commons/utils/createActionRequestTypes'

export const LOGIN_USER = createActionRequestTypes('LOGIN_USER')
export const SIGNUP_USER = createActionRequestTypes('SIGNUP_USER')
export const GET_AUTH = createActionRequestTypes('GET_AUTH')
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const SET_CREDENTIALS_FIELDS = 'SET_CREDENTIALS_FIELDS'
export const LOGOUT_USER = 'LOGOUT_USER'
