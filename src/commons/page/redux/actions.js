import {
  SET_PAGE_PROPS
} from './constants'

export const setPageProps = ({title,meta=[]}) => {
  return {
    type: SET_PAGE_PROPS,
    title,
    meta
  }
}