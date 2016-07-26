import { TriptychFullWrapper } from 'triptych';
import { put } from 'redux-saga/effects';
import {setPageProps} from 'commons/page';
import AddNodeView from './AddNodeView';

export default {
  component: TriptychFullWrapper(AddNodeView),
  path: 'add-node',

  resolve: function*(){
    yield put(setPageProps({ title: "Добавить страницу" }))
  }
};
