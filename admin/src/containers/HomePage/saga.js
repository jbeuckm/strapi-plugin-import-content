import { fork, takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import { loadImportConfigsSuccess, loadImportConfigsError } from './actions';
import { LOAD_IMPORT_CONFIGS } from './constants';

export function* loadImportConfigs() {
  try {
    const importConfigs = yield call(request, '/import-content', {
      method: 'GET'
    });

    yield put(loadImportConfigsSuccess(importConfigs));
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(loadImportConfigsError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, LOAD_IMPORT_CONFIGS, loadImportConfigs);
}

export default defaultSaga;
