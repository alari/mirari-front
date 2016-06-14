import {loginRedirectSaga} from "commons/auth";
import cookieSaga from "commons/auth/sagas/cookie"
import resolveStateSaga from "commons/resolve/sagas/resolve";
import nodeCreatedSaga from "nodes/sagas/nodeCreated";

export default  [
  cookieSaga,
  loginRedirectSaga,
  resolveStateSaga,
  nodeCreatedSaga
]
