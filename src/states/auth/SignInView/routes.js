import SignInView from "./SignInView";
import {TriptychFullWrapper} from 'triptych'

export default {
  component: TriptychFullWrapper(SignInView),
  path: 'in',

  pageProps: function*(){
    return {title:"Вход"}
  }
}
