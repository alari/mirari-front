import {Resolve, resolveSagaStart} from "commons/resolve";
import {put, select} from "redux-saga/effects";
import {getNode} from "nodes/redux/actions";
import {NODES_GET} from "nodes/redux/constants";
import {TriptychFullWrapper} from "commons/triptych";
import NodeForm from "nodes/components/NodeForm";
import nodePageProps from "nodes/utils/nodePageProps";

export default {
  component: TriptychFullWrapper(Resolve(NodeForm, 'nodeResolve'), "/my/node/:nodeId"),
  path: 'node/:nodeId',

  resolve: function* nodeResolve() {
    yield put(resolveSagaStart('nodeResolve'))

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
