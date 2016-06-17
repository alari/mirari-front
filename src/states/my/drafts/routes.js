import {Resolve, resolveSagaStart} from "commons/resolve";
import {put} from "redux-saga/effects";
import {getNodesList} from "nodes/redux/actions";
import DraftsView from "./DraftsView";
import {TriptychFullWrapper} from "commons/triptych";
import NodeAddButton from "nodes/components/NodeAddButton";
import React from "react";

export default {
  component: TriptychFullWrapper(Resolve(DraftsView, 'resolveDrafts'), '/my/drafts', {button: <NodeAddButton/>}),
  path: 'drafts',

  resolve: function* resolveDrafts() {
    yield put(resolveSagaStart('resolveDrafts'))
    return yield [
      put(getNodesList({limit: 13, draft: true, _expand: "values*user"}))
    ]
  },

  pageProps: function*(){
    return {title: "Черновики"}
  }
}
