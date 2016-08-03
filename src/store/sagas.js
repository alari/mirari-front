import cookieSaga from 'commons/auth/sagas/cookie';
import resolveStateSaga from 'commons/resolve/sagas/resolve';
import nodeCreatedSaga from 'nodes/sagas/nodeCreated';
import nodeEnterSaga from 'nodes/sagas/nodeEnter';
import nodeSseSaga from 'nodes/sagas/nodeSse';
import nodeMovedToDraft from 'nodes/sagas/nodeMovedToDraft';

export default  [
  cookieSaga,
  resolveStateSaga,
  nodeSseSaga,
  nodeEnterSaga,
  nodeCreatedSaga,
  nodeMovedToDraft
]
