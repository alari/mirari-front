import SignUpView from "./SignUpView";
import {TriptychFullWrapper} from 'triptych'

export default {
  component: TriptychFullWrapper(SignUpView),
  path: 'up',

  pageProps: function*(){
    return {title:"Регистрация"}
  }
}
