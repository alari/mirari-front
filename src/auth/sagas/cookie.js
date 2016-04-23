import { takeEvery } from 'redux-saga'
import { call } from 'redux-saga/effects'
import { LOGOUT_USER, UPDATE_TOKEN } from 'auth/redux/constants'
import { AUTH_TOKEN_HEADER } from 'auth/constants'
import cookie from 'auth/services/cookie'

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
