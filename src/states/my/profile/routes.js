import ProfileFormView from "./ProfileFormView"
import {TriptychFullWrapper} from 'commons/triptych'

export default {
  component: TriptychFullWrapper(ProfileFormView),
  path: 'profile',

  pageProps: function*(){
    return {title: "Настройка профиля"}
  }
}
