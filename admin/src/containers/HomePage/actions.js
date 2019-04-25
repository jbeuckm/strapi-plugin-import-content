import {
  LOAD_IMPORT_CONFIGS,
  LOAD_IMPORT_CONFIGS_ERROR,
  LOAD_IMPORT_CONFIGS_SUCCESS,
  UNDO_IMPORT,
  UNDO_IMPORT_SUCCESS,
  UNDO_IMPORT_ERROR,
  DELETE_IMPORT,
  DELETE_IMPORT_SUCCESS,
  DELETE_IMPORT_ERROR
} from "./constants";

export const loadImportConfigs = () => ({
  type: LOAD_IMPORT_CONFIGS
});
export const loadImportConfigsSuccess = importConfigs => ({
  type: LOAD_IMPORT_CONFIGS_SUCCESS,
  payload: { importConfigs }
});
export const loadImportConfigsError = error => ({
  type: LOAD_IMPORT_CONFIGS_ERROR,
  payload: error,
  error: true
});

export const undoImport = id => ({
  type: UNDO_IMPORT,
  payload: { id }
});
export const undoImportSuccess = () => ({
  type: UNDO_IMPORT_SUCCESS
});
export const undoImportError = error => ({
  type: UNDO_IMPORT_ERROR,
  payload: error,
  error: true
});

export const deleteImport = id => ({
  type: DELETE_IMPORT,
  payload: { id }
});
export const deleteImportSuccess = () => ({
  type: DELETE_IMPORT_SUCCESS
});
export const deleteImportError = error => ({
  type: DELETE_IMPORT_ERROR,
  payload: error,
  error: true
});
