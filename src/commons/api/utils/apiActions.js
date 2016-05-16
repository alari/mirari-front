import { API } from 'commons/api/constants'
import { urlInterpolate } from 'commons/utils'


export const createApiAction = (config, TYPES) => {
  const { url, queryParams, data, method = 'GET' } = config
  const apiAction = {
    ...config,
    method,
    type: API,
    types: TYPES
  }

  if(method === 'GET'){
    return {
      ...apiAction,
      url: urlInterpolate(url, {...queryParams, ...data}),
      params: {}
    }
  } else {
    return {
      ...apiAction,
      url: urlInterpolate(url, {...queryParams}),
      params: data
    }
  }
}

export const createRequestAction = (apiAction) => {
  return {
    ...apiAction,
    type: apiAction.types['REQUEST']
  }
}

export const createSuccessAction = (apiAction, result) => {
  return {
    ...apiAction,
    result: {
      body: result.body,
      headers: result.headers,
      status: result.statusCode
    },
    type: apiAction.types['SUCCESS']
  }
}

export const createFailureAction = (apiAction, result) => {
  return {
    ...apiAction,
    error: {
      body: result.body,
      headers: result.headers,
      status: result.statusCode,
      statusString: result.status,
    },
    type: apiAction.types['FAILURE']
  }
}
