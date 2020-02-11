/*
import logMessage from './js/logger'
import style from './css/style.css'

import 'bootstrap';


import js from './js';

style.use();
*/
import logMessage from './js/logger'

import './less/style.less';

// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef
}

// Log message to console
logMessage('Welcome to Expack!')
