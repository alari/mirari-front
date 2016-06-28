import {Resolve, resolveSagaStart} from "commons/resolve";
import {TriptychFullWrapper} from 'commons/triptych'
import {put, select} from "redux-saga/effects";
import UserView from "./UserView"
import {getUser} from "users/redux/actions"

export default {
  component: TriptychFullWrapper(Resolve(UserView, 'userResolve'), '/:userId'),
  path: ':userId',

  resolve: function* userResolve() {
    yield put(resolveSagaStart('userResolve'))
    const userId = yield select(s => s.resolve.params.userId)
    yield put(getUser(userId))
  },

  pageProps: function*() {
    const u = yield select(s => s.users.user)
    return {
      title: u.name
    }
  }
}
