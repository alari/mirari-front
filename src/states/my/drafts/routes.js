import Resolve from "state/components/Resolve";
import {put} from "redux-saga/effects";
import {getNodesList} from "nodes/redux/actions";
import DraftsView from "./DraftsView"

export default {
  component: Resolve(DraftsView),
  path: 'drafts',

  resolve: function* resolveHome() {
    return yield [
      put(getNodesList({limit: 13, draft: true, _expand: "values*user"}))
    ]
  }
}
