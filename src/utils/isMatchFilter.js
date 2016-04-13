import {find, keys} from 'ramda'

export default (item, filter) => {
  const firstNotMachedKey = find((filterKey) => {
    const filterValue = filter[filterKey]
    const itemValue = filter[filterKey]

    if(filterValue === undefined || itemValue === filterValue){
      return false
    } else {
      return true
    }
  }, keys(filter))

  return firstNotMachedKey === undefined
}
