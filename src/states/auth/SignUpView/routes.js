import SignUpView from "./SignUpView";
import {TriptychFullWrapper} from 'commons/triptych'
import {put} from "redux-saga/effects";
import {setPageProps} from 'commons/page'

export default {
  component: TriptychFullWrapper(SignUpView),
  path: 'up',

  resolve: function*(){
    yield put(setPageProps({title:"Регистрация"}))
  }
}
