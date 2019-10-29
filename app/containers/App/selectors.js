/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectShowSnackbar = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.showSnackbar,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectMessage = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.message,
  );

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectMessage,
  makeSelectShowSnackbar,
};
