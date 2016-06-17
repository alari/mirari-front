import SignInView from "./SignInView";
import {TriptychFullWrapper} from 'commons/triptych'

export default {
  component: TriptychFullWrapper(SignInView),
  path: 'in',

  pageProps: function*(){
    return {title:"Вход"}
  }
}
