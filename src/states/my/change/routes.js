import {Resolve, resolveSagaStart} from "commons/resolve";
import {put, select} from "redux-saga/effects";
import {getNode} from "nodes/redux/actions";
import {NODES_GET} from "nodes/redux/constants";
import {TriptychMainWrapper} from "commons/triptych";
import nodePageProps from "nodes/utils/nodePageProps";
import NodeChange from "./NodeChange"

export default {
  component: TriptychMainWrapper(Resolve(NodeChange, 'myNodeResolve'), "/my/node/:nodeId"),
  path: 'node/:nodeId',

  resolve: function* nodeResolve() {
    yield put(resolveSagaStart('myNodeResolve'))

    const resolve = []
    const nodeId = yield select((s) => s.resolve.params.nodeId)

    const {node} = yield select((s) => s.nodes)

    if (!(node && node.id === nodeId)) {
      resolve.push(yield put(getNode(nodeId, {_expand: "text,user"})))
    }

    return resolve
  },

  pageProps: function*() {
    const n = yield select(s => s.nodes.node)
    return nodePageProps(n)
  }
}
