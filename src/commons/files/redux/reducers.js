import {
  FILE_SAVE
} from './constants'

import { createReducer } from 'commons/utils'

export default createReducer({}, {
  [FILE_SAVE.REQUEST]: (state, action) => {
    return {
      ...state,
      progress: true,
      uploading: {
        ...state.uploading,
        [ action.fileUploadId ]: true
      }
    }
  },

  [FILE_SAVE.SUCCESS]: (state, action) => {
    return {
      ...state,
      progress: false,
      uploading: {
        ...state.uploading,
        [ action.fileUploadId ]: null
      },
      [action.result.body.id]: action.result.body
    }
  }
})
