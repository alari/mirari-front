import {concat, map} from "ramda";
import {createReducer, update} from "commons/utils";
import {
    USERS_SAVE
} from "./constants";


const updateUserInStore = (state, id, handler) => {
  let list = state.list
  let currentUser = state.user

  if (currentUser && currentUser.id === id) {
    state = {
      ...state,
      user: handler(currentUser)
    }
  }

  if (list) {
    list.items = map((user) => {
      if (user.id === id) {
        return handler(user)
      } else {
        return user
      }
    }, list.items)

    state = {
      ...state,
      list: {
        ...list
      }
    }
  }

  return state
}

export default createReducer({}, {
  [USERS_SAVE.REQUEST]: (state, action) => {
    return {
      ...updateUserInStore(state, action.queryParams.id, (user) => {
        return update.set(user, action.params)
      }),
      _error: null,
      _progress: true
    }
  },

  [USERS_SAVE.SUCCESS]: (state, action) => {
    return {
      ...(updateUserInStore(state, action.queryParams.id, (user) => {
        return update.commit(user, action.result.body)
      })),
      editData: {},
      _error: null,
      _progress: false
    }
  },

  [USERS_SAVE.FAILURE]: (state, action) => {
    return {
      ...updateUserInStore(state, action.queryParams.id, (user) => {
        return update.revert(user)
      }),
      _error: action.error.body,
      _progress: false
    }
  }
})
