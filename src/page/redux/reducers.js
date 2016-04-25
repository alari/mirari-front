import {SET_PAGE_PROPS} from "./constants";
import {RESOLVE_ROUTE_START} from "state/redux/constants";
import {createReducer} from "utils";

export default createReducer({}, {
  [SET_PAGE_PROPS]: (state, action) => {
    return {
      ...state,
      title: action.title,
      meta: action.meta || []
    }
  },

  [RESOLVE_ROUTE_START]: (state, action) => {
    return {
      ...state,
      title: null,
      meta: []
    }
  }
})
