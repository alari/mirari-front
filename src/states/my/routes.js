import DraftsRoutes from './drafts/routes';
import NotesRoutes from './notes/routes';
import AddNodeRoutes from './add-node/routes';
import ChangeNodeRoutes from './change/routes';
import ProjectsRoutes from './projects/routes';
import ProfileRoutes from './profile/routes';
import { requireAuth } from 'commons/auth';

export default {
  path: 'my',

  childRoutes: [
    NotesRoutes,
    DraftsRoutes,
    AddNodeRoutes,
    ChangeNodeRoutes,
    ProjectsRoutes,
    ProfileRoutes
  ],

  resolve: function* resolveMy() {
    return yield requireAuth()
  }
}
