import {Resolve,resolveSagaStart} from "commons/resolve";
import {put} from "redux-saga/effects";
import {getNodesList} from "nodes/redux/actions";
import DraftsView from "./DraftsView"
import {TriptychMainWrapper} from 'commons/triptych'

export default {
  component: TriptychMainWrapper(Resolve(DraftsView, 'resolveDrafts'), '/my/drafts'),
  path: 'drafts',

  resolve: function* resolveDrafts() {
    yield put(resolveSagaStart('resolveDrafts'))
    return yield [
      put(getNodesList({limit: 13, draft: true, _expand: "values*user"}))
    ]
  }
}
