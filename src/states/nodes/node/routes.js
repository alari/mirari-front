import NodeView from "./NodeView";
import {Resolve, resolveSagaStart} from "commons/resolve";
import {put, select} from "redux-saga/effects";
import {getNode} from "nodes/redux/actions";
import {getAuth} from "commons/auth";
import {NODES_GET} from "nodes/redux/constants";
import {TriptychFullWrapper} from "commons/triptych";
import React from "react";
import EditRoutes from "./edit/routes";
import NodeEditButton from "nodes/components/NodeAction/NodeEditButton";
import nodePageProps from "nodes/utils/nodePageProps";

export default {
  component: TriptychFullWrapper(Resolve(NodeView, 'nodeResolve'), '/nodes/:nodeId', {button: <NodeEditButton/>}),
  path: ':nodeId',

  childRoutes: [
    EditRoutes
  ],

  resolve: function* nodeResolve() {
    yield put(resolveSagaStart('nodeResolve'))

    const resolve = []
    const nodeId = yield select(s => s.resolve.params.nodeId)

    const {nodes: {node}, auth: {userId}} = yield select()

    if (!userId) {
      resolve.push(yield put(getAuth()))
    }

    if (!(node && node.id === nodeId && !!node.user)) {
      resolve.push(yield put(getNode(nodeId, {_expand: "text,user"})))
    }

    return resolve
  },

  pageProps: function*() {
    const n = yield select(s => s.nodes.node)
    return nodePageProps(n)
  }
}
