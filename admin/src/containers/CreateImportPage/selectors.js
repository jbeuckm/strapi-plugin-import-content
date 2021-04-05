import { createSelector } from "reselect";
import pluginId from "../../pluginId";

/**
 * Direct selector to the examplePage state domain
 */
const selectCreateImportPageDomain = () => state =>
  state.get(`${pluginId}_createImportPage`);

/**
 * Default selector used by HomePage
 */

const makeSelectLoading = () =>
  createSelector(
    selectCreateImportPageDomain(),
    substate => substate.get("loading")
  );
const makeSelectModels = () =>
  createSelector(
    selectCreateImportPageDomain(),
    substate => substate.get("models")
  );

const makeSelectAnalyzing = () =>
  createSelector(
    selectCreateImportPageDomain(),
    substate => substate.get("analyzing")
  );
const makeSelectAnalysis = () =>
  createSelector(
    selectCreateImportPageDomain(),
    substate => substate.get("analysis")
  );

const makeSelectCreated = () =>
  createSelector(
    selectCreateImportPageDomain(),
    substate => substate.get("created")
  );
const makeSelectSaving = () =>
  createSelector(
    selectCreateImportPageDomain(),
    substate => substate.get("saving")
  );

export {
  makeSelectLoading,
  makeSelectModels,
  makeSelectAnalyzing,
  makeSelectAnalysis,
  makeSelectCreated,
  makeSelectSaving
};
