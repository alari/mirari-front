import { takeEvery } from 'redux-saga'
import { call } from 'redux-saga/effects'
import { LOGOUT_USER, UPDATE_TOKEN } from '../redux/constants'
import { AUTH_TOKEN_HEADER } from '../constants'
import cookie from '../services/cookie'
const { save, remove } = cookie(AUTH_TOKEN_HEADER)

export default function* cookieSaga() {
  yield* takeEvery([
    UPDATE_TOKEN,
    LOGOUT_USER
  ], function*(action){
    if(action.type === UPDATE_TOKEN && action.token){
      save(action.token)
    } else {
      remove()
    }
  })
}
