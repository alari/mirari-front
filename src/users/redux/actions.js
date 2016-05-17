import {
    USERS_SAVE
} from "./constants";
import {createApiAction} from "commons/api";

export const saveUser = (id, data) => {
  return createApiAction({
    url: '/users/:id',
    queryParams: {id},
    data,
    method: 'PUT'
  }, USERS_SAVE)
}
