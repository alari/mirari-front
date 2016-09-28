import {Resolve, resolveSagaStart} from "commons/resolve";
import {put, select} from "redux-saga/effects";
import {getNode, getNodesList} from "nodes/redux/actions";
import {NODES_GET} from "nodes/redux/constants";
import {TriptychMainWrapper} from "triptych";
import nodePageProps from "nodes/utils/nodePageProps";
import NodeChange from "./NodeChange";
import {singleNodeExpand} from "nodes/utils/nodeExpand";
import {getProjectsList} from "projects/redux/actions";

export default {
  component: TriptychMainWrapper(Resolve(NodeChange, 'myNodeResolve'), "/my/node/:nodeId"),
  path: 'node/:nodeId',

  resolve: function* nodeResolve() {
    yield put(resolveSagaStart('myNodeResolve'))

    const resolve = []
    const nodeId = yield select((s) => s.resolve.params.nodeId)
    const userId = yield select((s) => s.auth.userId)

    const {node} = yield select((s) => s.nodes)

    if (!(node && node.id === nodeId)) {
      resolve.push(put(getNode(nodeId, {_expand: singleNodeExpand})))
    }

    resolve.push(put(getNodesList({key: 'series', layer: '!Note', kind: 'Series'})))

    resolve.push(put(getProjectsList({limit: 100, userId})))

    return resolve
  },

  pageProps: function*() {
    const n = yield select(s => s.nodes.node)
    return nodePageProps(n)
  }
}
