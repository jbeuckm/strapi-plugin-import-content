import { fork, takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import {
  loadImportConfigs,
  loadImportConfigsSuccess,
  loadImportConfigsError,
  deleteImportError,
  deleteImportSuccess
} from './actions';
import { LOAD_IMPORT_CONFIGS, DELETE_IMPORT } from './constants';

export function* loadImportConfigsSaga() {
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

export function* deleteImportSaga(event) {
  const { id } = event.payload;

  try {
    const importConfigs = yield call(request, `/import-content/${id}`, {
      method: 'DELETE'
    });

    yield put(deleteImportSuccess(importConfigs));
    yield put(loadImportConfigs());
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(deleteImportError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, LOAD_IMPORT_CONFIGS, loadImportConfigsSaga);
  yield fork(takeLatest, DELETE_IMPORT, deleteImportSaga);
}

export default defaultSaga;
