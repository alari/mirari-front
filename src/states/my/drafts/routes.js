import {Resolve} from "commons/resolve";
import {put} from "redux-saga/effects";
import {getNodesList} from "nodes/redux/actions";
import DraftsView from "./DraftsView"

export default {
  component: Resolve(DraftsView, 'resolveDrafts'),
  path: 'drafts',

  resolve: function* resolveDrafts() {
    yield put(resolveSagaStart('resolveDrafts'))
    return yield [
      put(getNodesList({limit: 13, draft: true, _expand: "values*user"}))
    ]
  }
}
