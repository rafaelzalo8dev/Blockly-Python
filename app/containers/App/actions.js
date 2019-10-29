import { LOADING, API_SUCCES, API_ERROR, CLOSE_SNACKBAR } from './constants';

export function loading() {
  return {
    type: LOADING,
  };
}
export function apiSuccesAction(action) {
  return {
    type: API_SUCCES,
    action,
  };
}

export function apiErrorAction(error) {
  console.log('error en actions ', error);
  return {
    type: API_ERROR,
    error,
  };
}

export function closeSnackbar () {
  return {
    type: CLOSE_SNACKBAR,
  }
}
