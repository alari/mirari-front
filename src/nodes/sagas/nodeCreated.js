import {takeLatest} from "redux-saga";
import {put} from "redux-saga/effects";
import {NODES_SAVE} from "nodes/redux/constants";
import {push} from "react-router-redux";

export default function*() {
  yield* takeLatest([NODES_SAVE.SUCCESS], function*(action) {
    if (!action.nodeId && action.result.body.id) {
      yield put(push("/my/node/" + action.result.body.id))
    }
  })
}