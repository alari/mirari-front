import { filter, map, propOr, compose, is, identity, F } from 'ramda'
import { call, fork, select } from 'redux-saga/effects'
import {STOP_RESOLVE} from 'commons/state/constants'


export default function* (store, state){
  const { routes } = state

  const routeSagas = compose(
    filter(identity),
    map(propOr(F, 'resolve'))
  )(routes)

  while(0 < routeSagas.length){
    const saga = routeSagas.shift()
    let result = null;

    try {
      result = yield call(saga)
      if(result === STOP_RESOLVE) {
        //console.log("STOP RESOLVE")
        routeSagas.splice(0,routeSagas.length)
      }
      //console.log("should be defined:", result)
    } catch (e) {
      console.error("Resolve error: ", e, e.stack);
    }

    if(is(Array, result)){
      while(0 < result.length){
        try {
          yield result.shift();
        } catch(e){
          console.error("Array resolve error: ", e)
        }
      }
    }
  }
}
