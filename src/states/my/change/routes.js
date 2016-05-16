import ChangeNodeView from './ChangeNodeView'
import {Resolve} from 'commons/state'
import { put, select, call,take } from 'redux-saga/effects'
import { getNode,clearChanged } from 'nodes/redux/actions'
import {NODES_GET} from 'nodes/redux/constants'
import {setPageProps} from 'commons/page'

export default {
  component: Resolve(ChangeNodeView),
  path: 'node/:id',

  resolve: function* nodeResolve(){
    const resolve = [yield put(clearChanged())]
    const state = yield select()
    const path = state.routing.locationBeforeTransitions.pathname

    const id = path.match(/\/([\w\d-]+)$/)[1]

    const { nodes: { node }} = state

    if(!(node && node.id === id)) {
      resolve.push(yield put(getNode(id, {_expand:"text,user"})))
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
