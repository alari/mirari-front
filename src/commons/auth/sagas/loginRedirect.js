import {takeEvery} from "redux-saga";
import {put} from "redux-saga/effects";
import {LOGIN_USER, SIGNUP_USER} from "../redux/constants";
import {push} from "react-router-redux";
import { intersection, map, toLower } from 'ramda';

export default function* loginRedirectSaga() {
  yield* takeEvery([SIGNUP_USER.SUCCESS, LOGIN_USER.SUCCESS], function*(action) {
    const {redirect} = action;
    if (redirect) {
      yield put(push(redirect))
    } else {
      const {roles} = action.result.body
      if (0 <= map(toLower, roles).indexOf('admin')) {
        yield put(push('/'))
      } else {
        yield put(push('/'))
      }
    }
  })
}
