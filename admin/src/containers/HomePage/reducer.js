import { fromJS } from 'immutable';

import {
  LOAD_IMPORT_CONFIGS,
  LOAD_IMPORT_CONFIGS_SUCCESS,
  LOAD_IMPORT_CONFIGS_ERROR
} from './constants';

const initialState = fromJS({
  importConfigs: null,
  loading: false,
  error: null
});

function homePageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_IMPORT_CONFIGS:
      return state.set('loading', true);

    case LOAD_IMPORT_CONFIGS_SUCCESS:
      return state
        .set('loading', false)
        .set('importConfigs', payload.importConfigs);

    case LOAD_IMPORT_CONFIGS_ERROR:
      return state.set('loading', false).set('error', payload);

    default:
      return state;
  }
}

export default homePageReducer;
