/**
 *
 * Asynchronously loads the component for NextExercise
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
