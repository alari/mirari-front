import cookieSaga from "auth/sagas/cookie";
import loginRedirectSaga from "auth/sagas/loginRedirect";
import resolveStateSaga from "state/sagas/resolve";
import nodeCreatedSaga from "nodes/sagas/nodeCreated";

export default  [
    cookieSaga,
    loginRedirectSaga,
    resolveStateSaga,
    nodeCreatedSaga
  ]
