import {takeLatest} from "redux-saga";
import {put, select} from "redux-saga/effects";
import {NODES_SAVE, NODES_GET, NODE_ENTER} from "nodes/redux/constants";

export default function*() {
  let nodeId = null

  const resolvedOnServerNode = yield select(s => s.nodes.node)
  if(resolvedOnServerNode && resolvedOnServerNode.id) {
    nodeId = resolvedOnServerNode.id
    yield put({
      type: NODE_ENTER,
      nodeId
    })
  }

  yield* takeLatest([NODES_SAVE.SUCCESS, NODES_GET.SUCCESS], function*(action) {
    if(nodeId !== action.result.body.id) {
      nodeId = action.result.body.id
      yield put({
        type: NODE_ENTER,
        nodeId
      })
    }
  })
}
