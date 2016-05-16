const config = require('environmental').config()
import reload from './reload'
import Helmet from "react-helmet";

let App = null

module.exports = function (middlewareConfig){
  return function*(next) {


    yield* next

    if (this.method != 'HEAD' && this.method != 'GET') return
    if (this.body != null || this.status != 404) return

    if (config.env === 'development') {
      const appReload = reload(require)
      App = appReload('./init')
    } else if(!App){
      App = require('./init')
    }

    const constants = require('../../src/commons/auth/constants')
    const token = this.cookies.get(constants.AUTH_TOKEN_HEADER)

    global.navigator = {
      userAgent: this.request.header['user-agent'] || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36'
    }

    var result = yield App.matchRoute(this.request, token ? decodeURIComponent(token) : undefined)

    if(result.error){
      this.status = 500
    } else if(result.redirectLocation){
      this.status = 302
      this.response.redirect(result.redirect.to)
    } else if(result.render){
      var html = ''
      try {
        html = result.render()
      } catch(e) {
        // TODO: error page
        console.error(e)
      }
      this.status = 200

      const head = Helmet.rewind();

      yield this.render(middlewareConfig.view, {
        initialState: JSON.stringify(result.data),
        app: html,
        title: head.title.toString(),
        meta: head.meta.toString(),
        link: head.link.toString(),
        htmlAttributes: head.htmlAttributes.toString()
      })
    } else {
      this.status = 404
      // TODO: 404 page
      this.body = 'Not found'
    }
  }
}
