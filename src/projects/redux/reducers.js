import { concat, map, prepend } from 'ramda';
import { createReducer, update } from 'commons/utils';
import { PROJECT_GET, PROJECT_SAVE, PROJECTS_LIST, PROJECT_SET_CURRENT } from './constants';

export default createReducer({}, {
  [PROJECTS_LIST.SUCCESS]: (state, action) => ({
    ...state,
    list: action.append ? {
      ...action.result.body,
      values: concat(state.list.values || [], action.result.body.values)
    } : action.result.body
  }),

  [PROJECT_GET.REQUEST]: (state, action) => ({
    ...state,
    project: null
  }),

  [PROJECT_GET.SUCCESS]: (state, action) => ({
    ...state,
    project: action.result.body
  }),

  [PROJECT_SAVE.SUCCESS]: (state, action) => ({
    ...state,
    project: action.result.body,
    list: (state.list && state.list.values) ? {
      ...(state.list),
      values: action.result.status === 201 ? prepend(action.result.body, state.list.values) : map(v => v.id === action.result.body.id ? action.result.body : v, state.list.values),
    } : state.list,
  }),

  [PROJECT_SET_CURRENT]: (state, action) => ({
    ...state,
    project: action.project
  })
});
