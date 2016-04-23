import {SET_PAGE_TITLE} from "./constants";
import {RESOLVE_ROUTE_START} from "state/redux/constants";
import {createReducer} from "utils";

const defaultTitle = "Мирари"

export default createReducer({title: defaultTitle}, {
  [SET_PAGE_TITLE]: (state, action) => {
    return {
      ...state,
      title: action.title
    }
  },

  [RESOLVE_ROUTE_START]: (state, action) => {
    return {
      ...state,
      title: defaultTitle
    }
  }
})
