import NodeRoutes from "./NodeView/routes"
import { put } from 'redux-saga/effects'

export default {
  //component: Resolve(VenuesView),
  path: 'nodes',

  //indexRoute: {
  //  component: VenuesListView
  //},

  childRoutes: [
    NodeRoutes
  ],

  resolve: function* nodesResolve(){
    console.log("resolve nodes")
  }
}
