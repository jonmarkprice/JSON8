'use strict'

const OBJECT = require('./types').OBJECT

module.exports = function isStructure(obj) {
  return typeof obj === OBJECT && obj !== null
}
