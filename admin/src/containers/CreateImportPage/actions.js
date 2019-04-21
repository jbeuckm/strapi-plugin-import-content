import {
  LOAD_MODELS,
  LOAD_MODELS_SUCCESS,
  LOAD_MODELS_ERROR
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
