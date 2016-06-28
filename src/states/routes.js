import HomeView from "./HomeView/HomeView";
import RootView from "./RootView";
import NodesRoutes from "./nodes/routes";
import AuthRoutes from "./auth/routes";
import MyRoutes from "./my/routes";
import UserRoutes from "./user/routes"
import {Resolve,resolveSagaStart} from "commons/resolve";
import {put,select} from "redux-saga/effects";
import {getNodesList} from "nodes/redux/actions";
import {getAuth} from "commons/auth";
import {TriptychFullWrapper} from 'commons/triptych'
import React from 'react'
import NodeAddButton from "nodes/components/NodeAddButton"

export default [{
  component: RootView,
  path: '/',

  indexRoute: {
    component: TriptychFullWrapper(Resolve(HomeView, 'resolveHome'), '/', {button: <NodeAddButton/>}),

    resolve: function* resolveHome() {
      yield put(resolveSagaStart('resolveHome'))
      const offset = yield select(s => s.resolve.query.offset)
      return yield [
        put(getNodesList({offset, limit: 13, _expand: "values*user"}))
      ]
    },

    pageProps: function*() {
      const {offset,limit,total} = yield select(s => s.nodes.list)
      const link = []
      if(offset > 0) link.push({rel:"prev", href:"/" + (offset - limit > 0 ? ("?offset="+offset) : "")})
      if(offset+limit <= total) link.push({rel:"next", href: "/?offset="+(offset+limit)})
      return {link}
    }
  },

  resolve: function* rootResolveRoutes(){
    yield put(resolveSagaStart('rootResolveRoutes'))
    const {user} = yield select((s) => s.auth)
    if(!user) {
      yield put(getAuth())
    }
  },

  childRoutes: [
    NodesRoutes,
    AuthRoutes,
    MyRoutes,

    UserRoutes
  ]
}
]
