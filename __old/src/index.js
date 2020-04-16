import logMessage from './js/logger'

import './less/style.less';

// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef
  console.log('module.hot', module.hot);
}

// Log message to console
logMessage('Welcome to Expack!')
