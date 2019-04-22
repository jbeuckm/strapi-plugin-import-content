import { fork, takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import {
  loadImportConfigsSuccess,
  loadImportConfigsError,
  deleteImportError,
  deleteImportSuccess
} from './actions';
import { LOAD_IMPORT_CONFIGS, DELETE_IMPORT } from './constants';

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

export function* deleteImport(event) {
  const { id } = event.payload;
  console.log('deleteImport', id);
  try {
    const importConfigs = yield call(request, `/import-content/${id}`, {
      method: 'DELETE'
    });

    yield put(deleteImportSuccess(importConfigs));
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(deleteImportError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, LOAD_IMPORT_CONFIGS, loadImportConfigs);
  yield fork(takeLatest, DELETE_IMPORT, deleteImport);
}

export default defaultSaga;
