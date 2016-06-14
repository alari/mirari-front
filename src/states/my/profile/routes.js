import ProfileFormView from "./ProfileFormView"
import {TriptychFullWrapper} from 'commons/triptych'
import {setPageProps} from "commons/page"
import {put} from "redux-saga/effects"

export default {
  component: TriptychFullWrapper(ProfileFormView),
  path: 'profile',
  
  resolve: function*(){
    yield put(setPageProps({title: "Настройка профиля"}))
  }
}
