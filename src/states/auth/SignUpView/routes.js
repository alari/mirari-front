import SignUpView from "./SignUpView";
import {TriptychFullWrapper} from 'commons/triptych'

export default {
  component: TriptychFullWrapper(SignUpView),
  path: 'up',

  pageProps: function*(){
    return {title:"Регистрация"}
  }
}
