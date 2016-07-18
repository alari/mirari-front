import {Resolve, resolveSagaStart} from "commons/resolve";
import {TriptychFullWrapper} from 'commons/triptych'
import {put, select} from "redux-saga/effects";
import UserView from "../users/UserView"
import {setCurrentUser} from "users/redux/actions"
import {getNodesList} from "nodes/redux/actions";
import {getAlias} from "Aliases/redux/actions"
import nodePageProps from "nodes/utils/nodePageProps"
import userPageProps from "users/utils/userPageProps"

export default {
  component: TriptychFullWrapper(Resolve(UserView, 'aliasResolve'), '/:alias'),
  path: ':alias',

  resolve: function* aliasResolve() {
    yield put(resolveSagaStart('aliasResolve'))

    const aliasId = yield select(s => s.resolve.params.alias)
    yield put(getAlias(aliasId, "user,node"))

    const {user, node} = yield select(s => s.aliases.current)

    if(!!user) {
      yield [
        put(setCurrentUser(user)),
        put(getNodesList({userId: user.id}))
      ]
    }
  },

  pageProps: function*() {
    const {user,node} = yield select(s => s.aliases.current)
    return user ? userPageProps(user) : nodePageProps(node)
  }
}
