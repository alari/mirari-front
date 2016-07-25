import {Resolve, resolveSagaStart} from "commons/resolve";
import {put, select} from "redux-saga/effects";
import {getNodesList, getNode} from "nodes/redux/actions";
import NotesView from "./NotesView";
import {TriptychMainWrapper} from "triptych";
import React from "react";
import NoteView from "./NoteView"

export default {
  component: Resolve(NotesView, 'resolveNotes'),
  path: 'notes',

  resolve: function* resolveDrafts() {
    yield put(resolveSagaStart('resolveNotes'))
    const q = yield select(s => s.resolve.query.q)
    return yield [
      put(getNodesList({q, limit: 13, layer: "Note"}))
    ]
  },

  pageProps: function*(){
    return {title: "Заметки"}
  },

  childRoutes: [
    {
      path: ":nodeId",
      component: Resolve(NoteView, "resolveNote"),

      resolve: function* resolveNote(){
        yield put(resolveSagaStart('resolveNote'))

        const nodeId = yield select(s => s.resolve.params.nodeId)

        const {node} = yield select(s => s.nodes)

        if (!(node && node.id === nodeId && !!node.user)) {
          yield put(getNode(nodeId, {_expand: "text"}))
        }
      }
    }
  ]
}
