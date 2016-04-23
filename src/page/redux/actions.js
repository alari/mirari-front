import {
  SET_PAGE_TITLE
} from './constants'

export const setPageTitle = (title) => {
  return {
    type: SET_PAGE_TITLE,
    title
  }
}