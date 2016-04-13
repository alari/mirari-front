import {clone, isEmpty} from 'ramda'
import queryString from 'query-string'


export default (urlTemplate, params) => {
  const urlParams = clone(params)
  const interpolatedUrl = urlTemplate.replace(/:([\w\d-]+)/, (sustr, match) => {
    if(params[match]){
      let value = params[match]
      delete params[match]
      return value
    } else {
      return ''
    }
  })

  if(!isEmpty(urlParams)){
    return interpolatedUrl + "?" + queryString.stringify(urlParams)
  } else {
    return interpolatedUrl
  }
}
