import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { NODE_MOVE_TO_DRAFTS } from 'nodes/redux/constants';
import { push } from 'react-router-redux';

export default function*() {
  yield* takeLatest([NODE_MOVE_TO_DRAFTS.SUCCESS], function*(action) {
    yield put(push(`/my/node/${action.result.body.id}`));
  });
}
