import {
  RESOLVE_ROUTE_END,
  RESOLVE_ROUTE_START,
  RESOLVED_ON_SERVER,
} from './constants'

export const resolvedOnServer = () => {
  return {
    type: RESOLVED_ON_SERVER
  }
}

export const start = () => {
  return {
    type: RESOLVE_ROUTE_START
  }
}

export const end = () => {
  return {
    type: RESOLVE_ROUTE_END
  }
}
