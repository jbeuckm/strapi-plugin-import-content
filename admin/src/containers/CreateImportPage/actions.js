import {
  LOAD_MODELS,
  LOAD_MODELS_SUCCESS,
  LOAD_MODELS_ERROR,
  SAVE_IMPORT_CONFIG,
  SAVE_IMPORT_CONFIG_ERROR,
  SAVE_IMPORT_CONFIG_SUCCESS
} from './constants';

export const loadModels = () => ({
  type: LOAD_MODELS
});
export const loadModelsSuccess = models => ({
  type: LOAD_MODELS_SUCCESS,
  payload: { models }
});
export const loadModelsError = error => ({
  type: LOAD_MODELS_ERROR,
  error: true,
  payload: error
});

export const saveImportConfig = importConfig => ({
  type: SAVE_IMPORT_CONFIG,
  payload: { importConfig }
});
export const saveImportConfigSuccess = models => ({
  type: SAVE_IMPORT_CONFIG_SUCCESS,
  payload: { models }
});
export const saveImportConfigError = error => ({
  type: SAVE_IMPORT_CONFIG_ERROR,
  error: true,
  payload: error
});
