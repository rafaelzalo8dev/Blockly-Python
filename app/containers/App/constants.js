/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOADING = 'boilerplate/App/LOAD_REPOS';
export const API_SUCCES = 'boilerplate/App/API_SUCCES';
export const API_ERROR = 'boilerplate/App/API_ERROR';
export const CLOSE_SNACKBAR = 'boilerplate/App/CLOSE_SNACKBAR';
