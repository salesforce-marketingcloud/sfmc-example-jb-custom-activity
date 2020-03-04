// Custom Split resources
import './js/customActivity.js'
import './html/index.html'
import './less/style.less'

import logMessage from '../../js/logger'


// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef
}

// Log message to console
logMessage('Welcome to Expack!')
