import {
  GOOGLE_GEOCODING
} from './constants'

import { createGoogleApiAction } from 'google/utils/googleApiActions'

export const addressCoords = (address) => {
  return createGoogleApiAction({
    queryParams: { address },
    apiType: 'googleGeocoding'
  }, GOOGLE_GEOCODING)
}
