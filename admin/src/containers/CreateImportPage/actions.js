import {
  LOAD_MODELS,
  LOAD_MODELS_SUCCESS,
  LOAD_MODELS_ERROR,
  PRE_ANALYZE,
  PRE_ANALYZE_SUCCESS,
  PRE_ANALYZE_ERROR,
  SAVE_IMPORT_CONFIG,
  SAVE_IMPORT_CONFIG_ERROR,
  SAVE_IMPORT_CONFIG_SUCCESS
} from "./constants";

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

export const preAnalyze = importConfig => ({
  type: PRE_ANALYZE,
  payload: { importConfig }
});
export const preAnalyzeSuccess = analysis => ({
  type: PRE_ANALYZE_SUCCESS,
  payload: { analysis }
});
export const preAnalyzeError = error => ({
  type: PRE_ANALYZE_ERROR,
  error: true,
  payload: error
});

export const saveImportConfig = importConfig => ({
  type: SAVE_IMPORT_CONFIG,
  payload: { importConfig }
});
export const saveImportConfigSuccess = saved => ({
  type: SAVE_IMPORT_CONFIG_SUCCESS,
  payload: { saved }
});
export const saveImportConfigError = error => ({
  type: SAVE_IMPORT_CONFIG_ERROR,
  error: true,
  payload: error
});
