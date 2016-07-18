import {
  ALIAS_GET,
} from "./constants";
import {createApiAction} from "commons/api";

export const getAlias = (alias, _expand) => {
  return createApiAction({
    url: '/aliases/:alias',
    routeParams: {alias},
    queryParams: {_expand},
    method: 'GET'
  }, ALIAS_GET)
}
