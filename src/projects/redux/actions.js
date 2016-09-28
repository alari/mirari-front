import {
  PROJECT_GET,
  PROJECT_SAVE,
  PROJECTS_LIST,
  PROJECT_SET_CURRENT
} from './constants';
import { createApiAction } from 'commons/api';

export const getProjectsList = ({offset, limit = 13, userId, _expand, append = false }) => createApiAction({
    url: '/projects',
    method: 'GET',
    queryParams: {
      offset,
      limit,
      userId,
      _expand
    },
    append
  }, PROJECTS_LIST)

export const getProject = (id, { _expand } = {}) => {
  return createApiAction({
    url: '/projects/:id',
    routeParams: { id },
    queryParams: { _expand },
    method: 'GET'
  }, PROJECT_GET)
}

export const saveProject = (data, projectId, _expand) => createApiAction({
    url: projectId ? ('/projects/' + projectId) : '/projects',
    queryParams: {
      _expand
    },
    data,
    method: 'POST',
    projectId
  }, PROJECT_SAVE)

export const setCurrentProject = (project) => ({
  type: PROJECT_SET_CURRENT,
    project
})
