import NodeView from './NodeView'
import Resolve from 'state/components/Resolve'
import { put, select, call,take } from 'redux-saga/effects'
import { getNode } from 'nodes/redux/actions'
import {NODES_GET} from 'nodes/redux/constants'
import {setPageProps} from 'page/redux/actions'

export default {
  component: Resolve(NodeView),
  path: ':id',

  resolve: function* nodeResolve(){
    const resolve = []
    const state = yield select()
    const path = state.routing.locationBeforeTransitions.pathname
    const id = path.match(/^\/nodes\/([\w\d-]+)/)[1]

    const { nodes: { node }} = state

    const setNodeProps = (n) => {
      return setPageProps({
        title: n.title,
        meta: [
          {property:"og:url", content:"https://mirari.ru/nodes/"+n.id},
          {property:"og:type", content:"article"},
          {property:"og:title", content:n.title},
          {property:"og:image", content:n.user.avatarUrl},
          {property:"og:description", content:(n.text && n.text.content) ? n.text.content.substring(0,255) : n.title},
        ]
      })
    }

    if(!(node && node.id === id && !!node.user)) {
      resolve.push(yield put(getNode(id, {_expand:"text,user"})))
      resolve.push(yield take(NODES_GET.SUCCESS))
      resolve.push(yield call(function*(){
        const n = yield select((s) => s.nodes.node)
        yield put(setNodeProps(n))
      }))
    } else {
      resolve.push(yield put(setNodeProps(node)))
    }

    return resolve
  }
}
