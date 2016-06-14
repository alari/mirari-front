import NodeView from './NodeView'
import {Resolve, resolveSagaStart} from 'commons/resolve'
import { put, select, call,take } from 'redux-saga/effects'
import { getNode } from 'nodes/redux/actions'
import { getAuth } from 'commons/auth'
import {NODES_GET} from 'nodes/redux/constants'
import {setPageProps} from 'commons/page'
import {TriptychMainWrapper} from 'commons/triptych'

export default {
  component: TriptychMainWrapper(Resolve(NodeView, 'nodeResolve'), '/nodes/:nodeId'),
  path: ':nodeId',

  resolve: function* nodeResolve(){
    yield put(resolveSagaStart('nodeResolve'))

    const resolve = []
    const nodeId = yield select(s => s.resolve.params.nodeId)

    const { nodes: { node }, auth: {userId}} = yield select()

    if(!userId) {
      resolve.push(yield put(getAuth()))
    }

    const setNodeProps = (n) => {
      return setPageProps({
        title: n.title,
        meta: [
          {property:"og:url", content:"https://mirari.ru/nodes/"+n.id},
          {property:"og:type", content:"article"},
          {property:"og:title", content:n.title},
          {property:"og:image", content:n.user.imageId ? ("https://mirari.ru/api/images/"+n.user.imageId+"?q=80&w=250&h=250&m=cover") : n.user.avatarUrl},
          {property:"og:description", content:(n.text && n.text.content) ? n.text.content.substring(0,255) : n.title},
        ]
      })
    }

    if(!(node && node.id === nodeId && !!node.user)) {
      resolve.push(yield put(getNode(nodeId, {_expand:"text,user"})))
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
