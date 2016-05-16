import {
  RESOLVE_ROUTE_END,
  RESOLVE_ROUTE_START,
  RESOLVED_ON_SERVER, 
  RESOLVE_KEEP,
} from './constants'

export const resolvedOnServer = () => {
  return {
    type: RESOLVED_ON_SERVER
  }
}

export const resolveStart = () => {
  return {
    type: RESOLVE_ROUTE_START
  }
}

export const resolveEnd = () => {
  return {
    type: RESOLVE_ROUTE_END
  }
}

export const resolveKeep = () => ({
  type: RESOLVE_KEEP
})