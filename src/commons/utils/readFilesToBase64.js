import {map} from 'ramda'

export default (files) => {
  return map(function(file){
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = function(event){
        resolve({
          name: file.name,
          data: event.target.result,
          raw: file
        })
      }
      reader.readAsDataURL(file)
    })
  })
}
