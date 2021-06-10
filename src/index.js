import logMessage from './js/logger'
import './css/style.css'
import './js/rapidapi'
// Log message to console
logMessage('Express with webpack initiated!')
// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef
  module.hot.accept() // eslint-disable-line no-undef  
}