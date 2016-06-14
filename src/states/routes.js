import HomeView from "./HomeView/HomeView";
import RootView from "./RootView";
import NodesRoutes from "./nodes/routes";
import AuthRoutes from "./auth/routes";
import MyRoutes from "./my/routes";
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
      return yield [
        put(getNodesList({limit: 13, _expand: "values*user"}))
      ]
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
    MyRoutes
  ]
}
]
