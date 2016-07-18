import {Resolve, resolveSagaStart} from "commons/resolve";
import {TriptychFullWrapper} from 'triptych'
import {put, select} from "redux-saga/effects";
import UserView from "./UserView"
import {getUser} from "users/redux/actions"
import {getNodesList} from "nodes/redux/actions"
import userPageProps from "users/utils/userPageProps"

export default {
  component: TriptychFullWrapper(Resolve(UserView, 'userResolve'), '/users/:userId'),
  path: '/users/:userId',

  resolve: function* aliasResolve() {
    yield put(resolveSagaStart('userResolve'))

    const userId = yield select(s => s.resolve.params.userId)
    yield put(getUser(userId))

    const user = yield select(s => s.users.user)

    yield put(getNodesList({userId: user.id}))
  },

  pageProps: function*() {
    const user = yield select(s => s.users.user)
    return userPageProps(user)
  }
}
