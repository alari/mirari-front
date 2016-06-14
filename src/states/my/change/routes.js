import ChangeNodeView from './ChangeNodeView'
import {Resolve,resolveSagaStart} from 'commons/resolve'
import { put, select, call,take } from 'redux-saga/effects'
import { getNode } from 'nodes/redux/actions'
import {NODES_GET} from 'nodes/redux/constants'
import {setPageProps} from 'commons/page'

export default {
  component: Resolve(ChangeNodeView,'nodeResolve'),
  path: 'node/:nodeId',

  resolve: function* nodeResolve(){
    yield put(resolveSagaStart('nodeResolve'))

    const resolve = []
    const nodeId = yield select((s) => s.resolve.params.nodeId)

    const { node } = yield select((s) => s.nodes)

    if(!(node && node.id === nodeId)) {
      resolve.push(yield put(getNode(nodeId, {_expand:"text,user"})))
      resolve.push(yield call(function*(){
        const title = yield select((s) => s.nodes.node.title)
        yield put(setPageProps({title}))
      }))
    } else {
      resolve.push(yield put(setPageProps({title:node.title})))
    }

    return resolve
  }
}
