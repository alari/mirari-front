import { Resolve, resolveSagaStart } from 'commons/resolve';
import { put, select } from 'redux-saga/effects';
import { getProjectsList, getProject } from 'projects/redux/actions';
import ProjectsView from './ProjectsView';
import ProjectView from './ProjectView'
import { TriptychFullWrapper } from 'triptych';
import React from 'react';

export default {
  component: TriptychFullWrapper(Resolve(ProjectsView, 'resolveMyProjects'), "/my/projects"),
  path: 'projects',

  resolve: function* resolveDrafts() {
    yield put(resolveSagaStart('resolveMyProjects'))
    const userId = yield select(s => s.auth.userId)
    return yield [
      put(getProjectsList({userId, limit: 13}))
    ]
  },

  pageProps: function*(){
    return {title: "Проекты"}
  },

  childRoutes: [
    {
      path: ":projectId",
      component: Resolve(ProjectView, "resolveMyProject"),

      resolve: function* resolveNote(){
        yield put(resolveSagaStart('resolveMyProject'))

        const projectId = yield select(s => s.resolve.params.projectId)

        const {project} = yield select(s => s.nodes)

        if (!(project && project.id === projectId)) {
          yield put(getProject(projectId))
        }
      }
    }
  ]
}
