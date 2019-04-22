import {
  all,
  fork,
  takeLatest,
  call,
  put,
  take,
  cancel
} from 'redux-saga/effects';
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

    yield call(request, '/import', { method: 'POST', body: importConfig });

    yield put(saveImportConfigSuccess());
  } catch (error) {
    strapi.notification.error('notification.error');
    yield put(saveImportConfigError(error));
  }
}

// Individual exports for testing
export function* defaultSaga() {
  const loadModelsWatcher = yield fork(takeLatest, LOAD_MODELS, loadModels);
  const saveImportConfigWatcher = yield fork(
    takeLatest,
    SAVE_IMPORT_CONFIG,
    saveImportConfig
  );
  // Suspend execution until location changes
  //  yield take(LOCATION_CHANGE);
  //  yield cancel(loadModelsWatcher);
}

// All sagas to be loaded
export default defaultSaga;
