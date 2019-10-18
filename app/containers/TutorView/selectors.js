import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorView state domain
 */

const selectTutorViewDomain = state => state.tutorView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorView
 */

const makeSelectTutorView = () =>
  createSelector(
    selectTutorViewDomain,
    substate => substate,
  );

export default makeSelectTutorView;
export { selectTutorViewDomain };
