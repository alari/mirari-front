import {TriptychFullWrapper} from 'triptych'
import StartRecoveryView from "./StartRecoveryView"
import RecoveryView from "./RecoveryView"
import {authCheckPasswordRecovery} from 'commons/auth/redux/actions'
import {put, select} from "redux-saga/effects";
import {push} from "react-router-redux"

export default {
  path: "recovery",

  indexRoute: {
    component: TriptychFullWrapper(StartRecoveryView)
  },

  childRoutes: [
    {
      path: ":token",
      component: TriptychFullWrapper(RecoveryView),

      resolve: function*(){
        const token = yield select(s => s.resolve.params.token)
        const {error = false} = yield put(authCheckPasswordRecovery(token))
        if(error) {
          yield put(push("/auth/recovery"))
        }
      }
    }
  ],

  pageProps: function*(){
    return {title:"Восстановление пароля"}
  }
}
