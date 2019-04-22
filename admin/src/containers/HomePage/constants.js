import pluginId from 'pluginId';

const buildString = suffix => `${pluginId}/HomePage/${suffix}`;

export const LOAD_IMPORT_CONFIGS = buildString('LOAD_IMPORT_CONFIGS');
export const LOAD_IMPORT_CONFIGS_ERROR = buildString(
  'LOAD_IMPORT_CONFIGS_ERROR'
);
export const LOAD_IMPORT_CONFIGS_SUCCESS = buildString(
  'LOAD_IMPORT_CONFIGS_SUCCESS'
);
export const DELETE_IMPORT = buildString('DELETE_IMPORT');
export const DELETE_IMPORT_SUCCESS = buildString('DELETE_IMPORT_SUCCESS');
export const DELETE_IMPORT_ERROR = buildString('DELETE_IMPORT_ERROR');
