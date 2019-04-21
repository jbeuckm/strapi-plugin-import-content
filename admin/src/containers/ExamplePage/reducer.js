/*
 *
 * ExamplePage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_MODELS,
  LOAD_MODELS_SUCCESS,
  LOAD_MODELS_ERROR
} from './constants';

const initialState = fromJS({
  loading: false,
  models: null,
  error: null
});

function examplePageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MODELS:
      return state.set('loading', true);

    case LOAD_MODELS_SUCCESS:
      return state.set('loading', false).set('models', fromJS(payload.models));

    case LOAD_MODELS_ERROR:
      return state.set('loading', false).set('error', fromJS(payload));

    default:
      return state;
  }
}

export default examplePageReducer;
