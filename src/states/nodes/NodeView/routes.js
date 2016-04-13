import NodeView from './NodeView'
import Resolve from 'state/components/Resolve'
import { put, select } from 'redux-saga/effects'
import { getNode } from 'nodes/redux/actions'

export default {
  component: Resolve(NodeView),
  path: ':id',

  resolve: function* nodeResolve(){
    const resolve = []
    const state = yield select()
    const path = state.routing.locationBeforeTransitions.pathname
    const id = path.match(/\/([\w\d-]+)$/)[1]

    const { nodes: { node }} = state

    if(!(node && node.id == id)) {
      resolve.push(yield put(getNode(id, {_expand:"text"})))
    }

    return resolve
  }
}
