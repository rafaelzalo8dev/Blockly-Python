import { createSelector } from 'reselect';

/**
 * Direct selector to the HomePage state domain
 */

const selectHomePageDomain = state => state.homePage || null;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

export default makeSelectHomePage;
export { selectHomePageDomain };
