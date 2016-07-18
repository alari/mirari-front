import {createReducer} from "commons/utils";
import {
  ALIAS_GET
} from "./constants";

export default createReducer({}, {
  [ALIAS_GET.REQUEST]: (state, action) => ({
    ...state,
    current: null
  }),

  [ALIAS_GET.SUCCESS]: (state, action) => ({
    ...state,
    current: action.result.body
  })
})
