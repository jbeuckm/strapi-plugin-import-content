/*
 *
 * createImportPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_MODELS,
  LOAD_MODELS_SUCCESS,
  LOAD_MODELS_ERROR,
  SAVE_IMPORT_CONFIG,
  SAVE_IMPORT_CONFIG_SUCCESS,
  SAVE_IMPORT_CONFIG_ERROR
} from './constants';

const initialState = fromJS({
  loading: false,
  models: null,
  error: null
});

function createImportPageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MODELS:
      return state.set('loading', true);

    case LOAD_MODELS_SUCCESS: {
      const filtered = payload.models.filter(
        model => !['importconfig', 'importeditem'].includes(model.name)
      );
      return state.set('loading', false).set('models', filtered);
    }

    case LOAD_MODELS_ERROR:
      return state.set('loading', false).set('error', payload);

    case SAVE_IMPORT_CONFIG:
    case SAVE_IMPORT_CONFIG_SUCCESS:
    case SAVE_IMPORT_CONFIG_ERROR:

    default:
      return state;
  }
}

export default createImportPageReducer;
