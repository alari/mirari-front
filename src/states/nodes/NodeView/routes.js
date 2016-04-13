import NodeView from './NodeView'
import Resolve from 'state/components/Resolve'
import { put } from 'redux-saga/effects'

export default {
  component: Resolve(NodeView),
  path: ':id',

  resolve: function* nodeResolve(){
    console.log("resolve single node")
  }
}
