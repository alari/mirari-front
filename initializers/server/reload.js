
const decache = (require, cache) => {
  cache.children.forEach(child => {
    decache(require, child)
  })

  delete require.cache[cache.id]
}

const reload = (require, moduleName) => {
  const file = require.resolve(moduleName)
  const cache = require.cache[file]

  if (cache) decache(require, cache)
}

export default require => moduleName => (
  reload(require, moduleName),
  require(moduleName)
)
