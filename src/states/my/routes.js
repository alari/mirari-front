import DraftsRoutes from "./drafts/routes";
import NotesRoutes from "./notes/routes";
import AddNodeRoutes from "./add-node/routes";
import ChangeNodeRoutes from "./change/routes";
import ProfileRoutes from "./profile/routes";
import {requireAuth} from "commons/auth";

export default {
  path: 'my',

  childRoutes: [
    NotesRoutes,
    DraftsRoutes,
    AddNodeRoutes,
    ChangeNodeRoutes,
    ProfileRoutes
  ],

  resolve: function* resolveMy() {
    return yield requireAuth()
  }
}
