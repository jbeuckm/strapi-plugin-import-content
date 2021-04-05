import { fork, takeLatest, call, put } from "redux-saga/effects";
import { request } from "strapi-helper-plugin";

import {
  loadImportConfigs,
  loadImportConfigsSuccess,
  loadImportConfigsError,
  undoImportError,
  undoImportSuccess,
  deleteImportError,
  deleteImportSuccess
} from "./actions";
import { LOAD_IMPORT_CONFIGS, DELETE_IMPORT, UNDO_IMPORT } from "./constants";

export function* loadImportConfigsSaga() {
  try {
    const importConfigs = yield call(request, "/import-content", {
      method: "GET"
    });

    yield put(loadImportConfigsSuccess(importConfigs));
  } catch (error) {
    strapi.notification.error("notification.error");
    yield put(loadImportConfigsError(error));
  }
}

export function* deleteImportSaga(event) {
  const { id } = event.payload;

  try {
    const importConfigs = yield call(request, `/import-content/${id}`, {
      method: "DELETE"
    });

    yield put(deleteImportSuccess(importConfigs));
    yield put(loadImportConfigs());
  } catch (error) {
    strapi.notification.error("notification.error");
    yield put(deleteImportError(error));
  }
}

export function* undoImportSaga(event) {
  const { id } = event.payload;

  try {
    const importConfigs = yield call(request, `/import-content/${id}/undo`, {
      method: "POST"
    });

    yield put(undoImportSuccess(importConfigs));
    yield put(loadImportConfigs());
  } catch (error) {
    strapi.notification.error("notification.error");
    yield put(undoImportError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, LOAD_IMPORT_CONFIGS, loadImportConfigsSaga);
  yield fork(takeLatest, UNDO_IMPORT, undoImportSaga);
  yield fork(takeLatest, DELETE_IMPORT, deleteImportSaga);
}

export default defaultSaga;
