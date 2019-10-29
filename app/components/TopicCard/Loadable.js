/**
 *
 * Asynchronously loads the component for TopicCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
