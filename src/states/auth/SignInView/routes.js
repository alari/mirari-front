import SignInView from "./SignInView";
import {TriptychFullWrapper} from 'commons/triptych'
import {put} from "redux-saga/effects";
import {setPageProps} from 'commons/page'

export default {
  component: TriptychFullWrapper(SignInView),
  path: 'in',

  resolve: function*(){
    yield put(setPageProps({title:"Вход"}))
  }
}
