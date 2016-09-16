import {Resolve, resolveSagaStart} from "commons/resolve";
import {TriptychFullWrapper} from 'triptych'
import {put, select} from "redux-saga/effects";
import ProjectView from "./ProjectView"
import {getProject} from "projects/redux/actions"
import {getNodesList} from "nodes/redux/actions"
import projectPageProps from "projects/utils/projectPageProps"

export default {
  component: TriptychFullWrapper(Resolve(ProjectView, 'projectResolve'), '/projects/:projectId'),
  path: '/projects/:projectId',

  resolve: function* aliasResolve() {
    yield put(resolveSagaStart('projectResolve'))

    const projectId = yield select(s => s.resolve.params.projectId)
    yield put(getProject(projectId))

    const project = yield select(s => s.projects.project)

    yield put(getNodesList({projectId: project.id}))
  },

  pageProps: function*() {
    const project = yield select(s => s.projects.project)
    return projectPageProps(project)
  }
}
