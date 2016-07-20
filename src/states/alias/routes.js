import {Resolve, resolveSagaStart} from "commons/resolve";
import {TriptychMainWrapper} from 'triptych'
import {put, select} from "redux-saga/effects";
import AliasView from "./AliasView"
import {setCurrentUser} from "users/redux/actions"
import {getNodesList,nodeSetCurrent} from "nodes/redux/actions";
import {getAlias} from "aliases/redux/actions"
import nodePageProps from "nodes/utils/nodePageProps"
import userPageProps from "users/utils/userPageProps"
import {singleNodeExpand} from "nodes/utils/nodeExpand"

import nodeEditRoutes from "../nodes/node/edit/routes"

export default {
  component: TriptychMainWrapper(Resolve(AliasView, 'aliasResolve'), '/:alias'),
  path: ':alias',

  resolve: function* aliasResolve() {
    yield put(resolveSagaStart('aliasResolve'))

    const aliasId = yield select(s => s.resolve.params.alias)
    yield put(getAlias(aliasId, `user,node{${singleNodeExpand}}`))

    const {user, node} = yield select(s => s.aliases.current)

    if(!!user) {
      yield [
        put(setCurrentUser(user)),
        put(getNodesList({userId: user.id}))
      ]
    } else if(!!node) {
      yield [
        put(nodeSetCurrent(node))
      ]
    }
  },

  pageProps: function*() {
    const {user,node} = yield select(s => s.aliases.current)
    return user ? userPageProps(user) : nodePageProps(node)
  },

  childRoutes: [
    nodeEditRoutes
  ]
}
