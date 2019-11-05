import { all, takeEvery, put, delay } from 'redux-saga/effects';

import actionTypes, { CustomAction } from '../types';

function* firstTestSagaWorker({ payload }: CustomAction) {
  yield delay(200);

  yield put({
    type: actionTypes.TEST_SET,
    payload: payload
  })
}

function* firstTestSagaWatcher() {
  yield takeEvery(actionTypes.TEST_GET, firstTestSagaWorker)
}

export default function* rootTestSaga() {
  yield all([
    firstTestSagaWatcher(),
  ])
}