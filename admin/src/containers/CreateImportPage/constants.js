/*
 *
 * ExamplePage constants
 *
 */

import pluginId from 'pluginId';

const buildString = suffix => `${pluginId}/CreateImportPage/${suffix}`;

export const LOAD_MODELS = buildString('LOAD_MODELS');
export const LOAD_MODELS_SUCCESS = buildString('LOAD_MODELS_SUCCESS');
export const LOAD_MODELS_ERROR = buildString('LOAD_MODELS_ERROR');

export const SAVE_IMPORT_CONFIG = buildString('SAVE_IMPORT_CONFIG');
export const SAVE_IMPORT_CONFIG_SUCCESS = buildString(
  'SAVE_IMPORT_CONFIG_SUCCESS'
);
export const SAVE_IMPORT_CONFIG_ERROR = buildString('SAVE_IMPORT_CONFIG_ERROR');
