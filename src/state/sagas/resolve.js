import { HISTORY_CHANGE } from 'containers/constants'
import { HISTORY_CHANGE_RESOLVED } from 'state/constants'
import { takeLatest } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import { start, end } from 'state/redux/actions'
import resolveRoutes from 'state/utils/resolveRoutes'


export default function* resolve(){
  yield* takeLatest(HISTORY_CHANGE, function*({ store, state }){
    if(!(yield select(store => store.state.isClientFirstResolve))){
      yield put(start())
      yield resolveRoutes(store, state)
    }
    yield put(end())
    yield put({
      type: HISTORY_CHANGE_RESOLVED
    })
  })
}
