import {
  GOOGLE_GEOCODING
} from './constants'

import { createReducer } from 'utils'

export default createReducer({}, {
  [GOOGLE_GEOCODING.SUCCESS]: (state, action) => {
    const { address } = action.queryParams
    if(action.result.body.status === 'ZERO_RESUTLS'){
      return state
    } else {
      return {
        [address]: action.result.body.results
      }
    }
  }
})
