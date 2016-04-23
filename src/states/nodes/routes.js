import NodeRoutes from "./node/routes"
import { put } from 'redux-saga/effects'

export default {
  path: 'nodes',

  childRoutes: [
    NodeRoutes
  ]
}
