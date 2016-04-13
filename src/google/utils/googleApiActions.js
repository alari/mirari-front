import { GOOGLE_API } from 'google/constants'
import { urlInterpolate } from 'utils'


const URL = 'https://maps.googleapis.com/maps/api/geocode/json'

export const createGoogleApiAction = (config, TYPES) => {
  const { queryParams, apiType } = config

  return {
    url: urlInterpolate(URL, queryParams),
    queryParams,
    apiType,
    type: GOOGLE_API,
    types: TYPES
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

export const createFailureAction = (apiAction, error) => {
  return {
    ...apiAction,
    error: {
      error: error.toString(),
      status: error.status
    },
    type: apiAction.types['FAILURE']
  }
}
