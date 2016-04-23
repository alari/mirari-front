import NodeView from './NodeView'
import Resolve from 'state/components/Resolve'
import { put, select, call,take } from 'redux-saga/effects'
import { getNode } from 'nodes/redux/actions'
import {NODES_GET} from 'nodes/redux/constants'
import {setPageTitle} from 'page/redux/actions'

export default {
  component: Resolve(NodeView),
  path: ':id',

  resolve: function* nodeResolve(){
    const resolve = []
    const state = yield select()
    const path = state.routing.locationBeforeTransitions.pathname
    const id = path.match(/^\/nodes\/([\w\d-]+)/)[1]

    const { nodes: { node }} = state

    if(!(node && node.id === id && !!node.user)) {
      resolve.push(yield put(getNode(id, {_expand:"text,user"})))
      resolve.push(yield take(NODES_GET.SUCCESS))
      resolve.push(yield call(function*(){
        const title = yield select((s) => s.nodes.node.title)
        yield put(setPageTitle(title))
      }))
    } else {
      resolve.push(yield put(setPageTitle(node.title)))
    }

    return resolve
  }
}
