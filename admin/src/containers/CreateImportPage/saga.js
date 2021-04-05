import { fork, takeLatest, call, put } from "redux-saga/effects";
import { request } from "strapi-helper-plugin";

import {
  loadModelsSuccess,
  loadModelsError,
  preAnalyzeSuccess,
  preAnalyzeError,
  saveImportConfigError,
  saveImportConfigSuccess
} from "./actions";
import { LOAD_MODELS, PRE_ANALYZE, SAVE_IMPORT_CONFIG } from "./constants";

export function* loadModels() {
  try {
    console.log(strapi.models)
    const { allModels } = yield call(request, "/content-manager/content-types", {
      method: "GET"
    });

    yield put(loadModelsSuccess(allModels));
  } catch (err) {
    strapi.notification.error("notification.error");
    yield put(loadModelsError(err));
  }
}

export function* preAnalyze(event) {
  try {
    const { importConfig } = event.payload;

    const analysis = yield call(
      request,
      "/import-content/preAnalyzeImportFile",
      {
        method: "POST",
        body: importConfig
      }
    );

    yield put(preAnalyzeSuccess(analysis));
  } catch (error) {
    strapi.notification.error("notification.error");
    yield put(preAnalyzeError(error));
  }
}

export function* saveImportConfig(event) {
  try {
    const { importConfig } = event.payload;

    const saved = yield call(request, "/import-content", {
      method: "POST",
      body: importConfig
    });

    yield put(saveImportConfigSuccess(saved));
  } catch (error) {
    strapi.notification.error("notification.error");
    yield put(saveImportConfigError(error));
  }
}

export function* defaultSaga() {
  yield fork(takeLatest, LOAD_MODELS, loadModels);
  yield fork(takeLatest, PRE_ANALYZE, preAnalyze);
  yield fork(takeLatest, SAVE_IMPORT_CONFIG, saveImportConfig);
}

export default defaultSaga;
