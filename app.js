import appModulePath from 'app-module-path';
import path from 'path';
appModulePath.addPath(path.join(process.cwd(), '/src'))

import koa from 'koa'
import serve from 'koa-static'
import koaBody from 'koa-better-body'
import hbs from 'koa-hbs'
import proxy from 'koa-proxy'
import logger from 'koa-logger'
import userAgent from 'koa-useragent'
import reactAppMiddleware from './initializers/server/middleware'
import environmental from 'environmental'

const config = environmental.config()


var app = module.exports = koa()

app.use(logger())
app.use(proxy({
  host: config.api.remote.host,
  match: new RegExp(`^\/${ config.api.root }`),
  map: (apiPath) => path.join(config.api.remote.path, apiPath)
}))

app.use(hbs.middleware({
  viewPath: path.join(__dirname, './initializers/views')
}))

app.use(userAgent())
app.use(serve(path.join(__dirname, './public')))
app.use(koaBody({
  extendTypes: {
    json: ['application/json']
  }
}))

app.use(reactAppMiddleware({
  view: "layout"
}))

const start = () => {
  var port = process.env.PORT || config.app.port || 3000
  app.listen(port)
  console.log('listening on port ' + port)
}

start()
