/* eslint-disable no-undef */
const util = require('util')

util.inspect.defaultOptions.depth = null

exports.devConsole = (message, showHiddenNodes = false) => {
  util.inspect.defaultOptions.showHidden = showHiddenNodes

  // eslint-disable-next-line no-undef
  if (process.env.ENV === 'development') {
    console.log(message, __filename)
  }
}
