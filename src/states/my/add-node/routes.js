import {TriptychFullWrapper} from 'commons/triptych'
import NodeForm from "nodes/components/NodeForm"
import { put } from 'redux-saga/effects'
import {setPageProps} from 'commons/page'

export default {
  component: TriptychFullWrapper(NodeForm),
  path: 'add-node',

  resolve: function*(){
    yield put(setPageProps({title:"Добавить страницу"}))
  }
}
