
const _ORIGINAL = '_ORIGINAL'

const set = (item, update) => {
  return {
    ...item,
    ...update,
    [_ORIGINAL]: item
  }
}

const commit = (item, newUpdate = {}) => {
  if(item[_ORIGINAL]){
    delete item[_ORIGINAL]
    return {
      ...item,
      ...newUpdate
    }
  } else {
    return item
  }
}

const revert = (item) => {
  if(item[_ORIGINAL]){
    return {
      ...item[_ORIGINAL]
    }
  } else {
    return item
  }
}

export default {
  set,
  commit,
  revert
}
