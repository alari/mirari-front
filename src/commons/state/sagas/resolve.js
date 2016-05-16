import { HISTORY_CHANGE } from 'commons/containers/constants'
import { HISTORY_CHANGE_RESOLVED } from '../constants'
import { takeLatest } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import { resolveStart, resolveEnd } from '../redux/actions'
import resolveRoutes from '../utils/resolveRoutes'


export default function* resolve(){
  yield* takeLatest(HISTORY_CHANGE, function*({ store, state }){
    if(!(yield select(store => store.state.isClientFirstResolve))){
      yield put(resolveStart())
      yield resolveRoutes(store, state)
    }
    yield put(resolveEnd())
    yield put({
      type: HISTORY_CHANGE_RESOLVED
    })
  })
}
