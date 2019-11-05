import { all } from 'redux-saga/effects';

import rootTestSaga from './test';

export default function* rootSaga() {
  yield all([
    rootTestSaga(),
  ])
};
