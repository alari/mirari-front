import { API } from 'api/constants'
import { logout, updateToken } from 'auth/redux/actions'
import { AUTH_TOKEN_HEADER } from 'auth/constants'
import request from 'api/services/request'
import {
    createRequestAction,
    createSuccessAction,
    createFailureAction
} from 'api/utils/apiActions'

export default (store) => next => action => {

  if(action.type !== API){
    return next(action)
  }

  const { auth: { token, headers = {} } = {} } = store.getState()
  let requestHeaders = {
    ...action.headers,
    ...(headers || {})
  }

  if(token){
    requestHeaders[AUTH_TOKEN_HEADER] = token
  }

  next(createRequestAction(action))

  return request({
    ...action,
    requestHeaders
  }).then(
      ({ result, error }) => {
        if(!error){
          if(result.headers[AUTH_TOKEN_HEADER]){
            next(updateToken(result.headers[AUTH_TOKEN_HEADER]))
          }
          return next(createSuccessAction(action, result))
        } else {
          if(result && result.statusCode === 401){
            next(logout())
          }
          console.log("Api Failure", error);
          return next(createFailureAction(action, result))
        }
      }
  )
}
