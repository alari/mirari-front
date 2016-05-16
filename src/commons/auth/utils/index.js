import { getAuth } from '../redux/actions'
import { put,take,call,select } from 'redux-saga/effects'
import {GET_AUTH} from '../redux/constants'
import { intersection, map, toLower } from 'ramda';
import { push } from 'react-router-redux';
import {STOP_RESOLVE} from 'commons/state/constants'
import {resolveKeep} from 'commons/state/redux/actions'

export const requireAuth = () => call(function*() {
  const userId = yield select((s) => s.auth.userId)
  if(!userId) {
    const auth = yield put(getAuth())
    if(auth.type === GET_AUTH.FAILURE) {
      const redirectAfterLogin = yield select((s) => s.routing.locationBeforeTransitions.pathname)
      yield put(push(__AUTH_LOGIN_HREF__+"?next="+redirectAfterLogin))
      yield put(resolveKeep())
      return STOP_RESOLVE
    }
  }
})

export const requireRoles = (...roles) => call(function*(){
  yield requireAuth()
  const lower = map(toLower)
  const userRoles = yield select((s) => s.auth.roles)
  const rolesIntersection = intersection(lower(roles), lower(userRoles || []))
  if(rolesIntersection.length === 0) {
    yield put(push(__AUTH_FORBIDDEN_HREF__))
    yield put(resolveKeep())
    return STOP_RESOLVE
  }
})