/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOADING, API_SUCCES, API_ERROR, CLOSE_SNACKBAR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  showSnackbar: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case API_SUCCES:
        draft.loading = false;
        draft.error = false;
        break;

      case API_ERROR:
      console.log('entra al API_ERR' + action.error);
        draft.loading = false;
        draft.error = true;
        draft.showSnackbar = true;
        draft.message = action.error;
        break;

      case LOADING:
        draft.loading = true;
        break;

      case CLOSE_SNACKBAR:
      console.log('cerrando');
        draft.showSnackbar = false;
        break;
    }
  });

export default appReducer;
