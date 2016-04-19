import HomeView from "./HomeView/HomeView";
import RootView from "./RootView";
import NodesRoutes from "./nodes/routes";
import AuthRoutes from "./auth/routes";
import Resolve from "state/components/Resolve";
import {put} from "redux-saga/effects";
import {getNodesList} from "nodes/redux/actions";
import {getAuth} from "auth/redux/actions";


export default [{
  component: RootView,
  path: '/',

  indexRoute: {
    component: Resolve(HomeView),

    resolve: function* resolveHome() {
      return yield [
        put(getNodesList({limit: 7, _expand: "values*user"})),
        put(getAuth())
      ]
    }
  },

  childRoutes: [
    NodesRoutes,
    AuthRoutes
  ]
}
]
