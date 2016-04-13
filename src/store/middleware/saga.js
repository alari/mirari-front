import cookieSaga from 'auth/sagas/cookie'
import loginRedirectSaga from 'auth/sagas/loginRedirect'
import resolveStateSaga from 'state/sagas/resolve'

import sagaMiddleware from 'redux-saga'

export default sagaMiddleware(
  cookieSaga,
  loginRedirectSaga,
  resolveStateSaga
)
