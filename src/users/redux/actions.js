import {
    USERS_SAVE,
USER_GET,
USER_SET_CURRENT
} from "./constants";
import {createApiAction} from "commons/api";

export const saveUser = (userId, data) => {
  return createApiAction({
    url: '/users/:userId',
    routeParams: {userId},
    data,
    method: 'PUT'
  }, USERS_SAVE)
}

export const getUser = (userId) => createApiAction({
  url: '/users/:userId',
  queryParams: {_expand: "image"},
  routeParams: {userId}
}, USER_GET)

export const setCurrentUser = (user) => ({
  type: USER_SET_CURRENT,
    user
})
