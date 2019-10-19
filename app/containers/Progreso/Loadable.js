/**
 *
 * Asynchronously loads the component for Progreso
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
