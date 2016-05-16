import AddNodeView from "./AddNodeView"
import {put} from "redux-saga/effects";
import {clearChanged} from "nodes/redux/actions"
import {Resolve} from 'commons/state'

export default {
  component: Resolve(AddNodeView),
  path: 'add-node',

  resolve: function*() {
    yield put(clearChanged(true))
  }
}
