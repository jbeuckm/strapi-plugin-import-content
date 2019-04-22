import { fork, takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import {
  loadModelsSuccess,
  loadModelsError,
  saveImportConfigError,
  saveImportConfigSuccess
} from './actions';
import { LOAD_MODELS, SAVE_IMPORT_CONFIG } from './constants';

export function* loadModels() {
  try {
    const { allModels } = yield call(request, '/content-type-builder/models', {
      method: 'GET'
    });

    yield put(loadModelsSuccess(allModels));
  } catch (err) {
    strapi.notification.error('notification.error');
    yield put(loadModelsError(err));
  }
}

export function* saveImportConfig(event) {
  try {
    const { importConfig } = event.payload;

    const saved = yield call(request, '/import-content', {
      method: 'POST',
      body: importConfig
    });

    yield put(saveImportConfigSuccess(saved));
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(saveImportConfigError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, LOAD_MODELS, loadModels);

  yield fork(takeLatest, SAVE_IMPORT_CONFIG, saveImportConfig);
}

export default defaultSaga;
