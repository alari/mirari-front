import request from 'superagent'

const sendMethod = (HTTPMethod) =>  {
  return (HTTPMethod === 'post' || HTTPMethod === 'put') ? 'send' : 'query';
}

export default (requestConfig) => {
  return new Promise((resolve, reject) => {
    const HTTPMethod = requestConfig.method.toLowerCase() || 'get'
    let url = requestConfig.url

    if(!url.match(/^https?:\/\//)){
      url = __REQUEST_API_ENDPOINT__ + url
    }

    let httpRequest = request
      [HTTPMethod](url)
      [sendMethod(HTTPMethod)](requestConfig.params)

    if(requestConfig.headers){
      httpRequest.set(requestConfig.headers)
    }

    httpRequest.end((error, result) => {
      resolve({ result, error })
    })

    return httpRequest
  })
}
