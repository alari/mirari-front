import {Resolve, resolveSagaStart} from "commons/resolve";
import {TriptychFullWrapper} from 'commons/triptych'
import {put, select} from "redux-saga/effects";
import UserView from "./UserView"
import {getUser} from "users/redux/actions"
import {getNodesList} from "nodes/redux/actions";

export default {
  component: TriptychFullWrapper(Resolve(UserView, 'userResolve'), '/:userId'),
  path: ':userId',

  resolve: function* userResolve() {
    yield put(resolveSagaStart('userResolve'))
    const userId = yield select(s => s.resolve.params.userId)
    yield put(getUser(userId))
    const user = yield select(s => s.users.user)
    yield put(getNodesList({userId: user.id}))
  },

  pageProps: function*() {
    const u = yield select(s => s.users.user)
    return {
      title: u.name,
      meta: [
        {property:"og:url", content:"/"+(u.username || u.id)},
        {property:"og:type", content:"profile"},
        {property:"og:title", content:u.name},
        {property:"og:image", content:u.imageId ? ("/api/images/"+u.imageId+"?q=80") : u.avatarUrl},
        {property:"og:description", content: "Страница автора на Мирари"},
      ]
    }
  }
}
