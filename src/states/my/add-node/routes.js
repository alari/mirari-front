import AddNodeView from "./AddNodeView"
import {Resolve} from 'commons/state'
import {requireAuth} from 'commons/auth'

export default {
  component: Resolve(AddNodeView),
  path: 'add-node',

  resolve: function*() {
    yield requireAuth()
  }
}
