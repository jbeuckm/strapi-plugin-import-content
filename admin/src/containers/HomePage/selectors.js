import { createSelector } from 'reselect';
import pluginId from '../../pluginId';
/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => state => state.get(`${pluginId}_homePage`);

/**
 * Default selector used by HomePage
 */

export const selectImportConfigs = () =>
  createSelector(selectHomePageDomain(), substate =>
    substate.get('importConfigs')
  );

export const selectImportConfigsError = () =>
  createSelector(selectHomePageDomain(), substate => substate.get('error'));

export const selectImportConfigsLoading = () =>
  createSelector(selectHomePageDomain(), substate => substate.get('loading'));
