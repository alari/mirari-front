import { GOOGLE_API } from 'google/constants'
import request from 'api/services/request'
import {
  createRequestAction,
  createSuccessAction,
  createFailureAction
} from 'google/utils/googleApiActions'

export default (store) => next => action => {

  if(action.type !== GOOGLE_API){
    return next(action)
  }

  next(createRequestAction(action))

  return request({
    ...action,
    method: 'GET'
  }).then(
    ({ result, error }) => {
      if(!error){
        return next(createSuccessAction(action, result))
      } else {
        return next(createFailureAction(action, error))
      }
    }
  )
}
