import { filter, map, propOr, compose, is, identity, F } from 'ramda'
import { call, fork } from 'redux-saga/effects'


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
      console.log("should be defined:", result)
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
