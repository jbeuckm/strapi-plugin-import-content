import {
  LOAD_IMPORT_CONFIGS,
  LOAD_IMPORT_CONFIGS_ERROR,
  LOAD_IMPORT_CONFIGS_SUCCESS,
  DELETE_IMPORT,
  DELETE_IMPORT_SUCCESS,
  DELETE_IMPORT_ERROR
} from './constants';

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
