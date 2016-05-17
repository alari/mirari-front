import {
  FILE_SAVE
} from './constants'

import { createApiAction } from 'commons/api'

export const saveImage = (image) => {
  const formData = new FormData()
  formData.append('data', image)

  return createApiAction({
    url: '/images',
    fileUploadId: `${ image.name }_${ +new Date }`,
    method: 'POST',
    headers: {
      'Content-Type': undefined,
      'Content-Length': undefined
    },
    data: formData
  }, FILE_SAVE)
}
