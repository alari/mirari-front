import DraftsRoutes from "./drafts/routes";
import AddNodeRoutes from "./add-node/routes";
import ChangeNodeRoutes from "./change/routes";

export default {
  path: 'my',

  childRoutes: [
    DraftsRoutes,
    AddNodeRoutes,
    ChangeNodeRoutes
  ]
}
