
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./stream-react.cjs.production.min.js')
} else {
  module.exports = require('./stream-react.cjs.development.js')
}
