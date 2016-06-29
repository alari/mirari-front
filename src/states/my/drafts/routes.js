import {Resolve, resolveSagaStart} from "commons/resolve";
import {put} from "redux-saga/effects";
import {getNodesList} from "nodes/redux/actions";
import {TriptychFullWrapper} from "commons/triptych";
import NodeAddButton from "nodes/components/NodeAddButton";
import React from "react";

import NodesFeed from "nodes/components/NodesFeed"

export default {
  component: TriptychFullWrapper(Resolve(() => <NodesFeed filter={{layer:"Draft"}}/>, 'resolveDrafts'), '/my/drafts', {button: <NodeAddButton/>}),
  path: 'drafts',

  resolve: function* resolveDrafts() {
    yield put(resolveSagaStart('resolveDrafts'))
    return yield [
      put(getNodesList({layer: "Draft"}))
    ]
  },

  pageProps: function*(){
    return {title: "Черновики"}
  }
}
