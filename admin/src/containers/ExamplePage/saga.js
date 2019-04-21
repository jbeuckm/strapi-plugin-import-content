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

import { loadModelsSuccess, loadModelsError } from './actions';
import { LOAD_MODELS } from './constants';

export function* loadModels() {
  try {
    const { allModels } = yield call(request, '/content-type-builder/models', {
      method: 'GET'
    });
    console.log({ allModels });
    yield put(loadModelsSuccess(allModels));
  } catch (err) {
    strapi.notification.error('notification.error');
    yield put(loadModelsError(err));
  }
}

// Individual exports for testing
export function* defaultSaga() {
  const loadModelsWatcher = yield fork(takeLatest, LOAD_MODELS, loadModels);

  // Suspend execution until location changes
  //  yield take(LOCATION_CHANGE);
  //  yield cancel(loadModelsWatcher);
}

// All sagas to be loaded
export default defaultSaga;
