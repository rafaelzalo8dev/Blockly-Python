/**
 *
 * Asynchronously loads the component for TutorView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
