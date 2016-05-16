import HomeView from "./HomeView/HomeView";
import RootView from "./RootView";
import NodesRoutes from "./nodes/routes";
import AuthRoutes from "./auth/routes";
import MyRoutes from "./my/routes";
import Resolve from "state/components/Resolve";
import {put,select} from "redux-saga/effects";
import {getNodesList} from "nodes/redux/actions";
import {getAuth} from "auth/redux/actions";


export default [{
  component: RootView,
  path: '/',

  indexRoute: {
    component: Resolve(HomeView),

    resolve: function* resolveHome() {
      return yield [
        put(getNodesList({limit: 13, _expand: "values*user"}))
      ]
    }
  },

  resolve: function* rootResolveRoutes(){
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
