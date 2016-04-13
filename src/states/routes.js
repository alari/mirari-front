import HomeView from './HomeView/HomeView'
import RootView from './RootView'
import NodesRoutes from './nodes/routes'

export default [{
    component: RootView,
    path: '/',

    indexRoute: {
      component: HomeView
    },

    childRoutes: [
      NodesRoutes
    ]
  }
]
