import {takeLatest} from "redux-saga";
import {put, call} from "redux-saga/effects";
import {NODE_ENTER, NODES_DELETE} from "nodes/redux/constants";
import {getNodeComment, nodeCommentRemoved} from "nodes/redux/actions"

function createSource(nodeId, url) {

  const source = new EventSource(url)
  let deferred

  source.addEventListener("COMMENT_PULL", (event) => {
    if(deferred) {
      deferred.resolve(getNodeComment(nodeId, JSON.parse(event.data).commentId))
      deferred = null
    }
  })

  source.addEventListener("COMMENT_REMOVE", (event) => {
    if(deferred) {
       deferred.resolve(nodeCommentRemoved(nodeId, JSON.parse(event.data).commentId))
       deferred = null
    }
  })

  return {
    nextMessage() {
      if(!deferred) {
        deferred = {}
        deferred.promise =
          new Promise(resolve => deferred.resolve = resolve)
      }
      return deferred.promise
    },
    close: () => {
      source.close()
    }
  }
}

export default function*() {
  if(typeof window !== 'undefined' && window.EventSource) {
    yield* takeLatest([NODE_ENTER], function*({nodeId}) {
      let source = null
      try {
        source = createSource(nodeId, (document.origin === "http://localhost:3000" ? "http://localhost:9000" : "") + `/api/nodes/${nodeId}/sse`)

        let msg = yield call(source.nextMessage)

        while(!!msg) {
          yield put(msg)
          msg = yield call(source.nextMessage)
        }
      } finally {
        if(!!source) {
          yield call(source.close)
        }
      }
    })
  }
}
