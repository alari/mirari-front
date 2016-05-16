import DraftsRoutes from "./drafts/routes";
import AddNodeRoutes from "./add-node/routes";
import ChangeNodeRoutes from "./change/routes";
import {requireAuth} from "commons/auth"

export default {
  path: 'my',

  childRoutes: [
    DraftsRoutes,
    AddNodeRoutes,
    ChangeNodeRoutes
  ],

  resolve: function* resolveMy() {
    console.log("resolve my")
    const z = yield requireAuth()
    console.log("z", z)
    return z
  }
}
