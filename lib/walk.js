'use strict'

module.exports = function walk (obj, fn, parent, key, idx, size, depth, parentParent, close) {
  if (typeof depth !== 'number') depth = 0
  if (typeof close !== 'boolean') close = false

  // close = test === size - 1 ? parent
  var dclose = idx === size - 1 ? parent : false

  fn(obj, key, parent, idx, size, depth, parentParent, dclose || close)
  if (obj === null || typeof obj !== 'object') return

  depth++

  // var test = idx

  if (Array.isArray(obj)) {
    obj.forEach(function (value, idx) {
      walk(value, fn, obj, idx, idx, obj.length, depth, dclose)
    })
  } else {
    var keys = Object.keys(obj)
    keys.forEach(function (key, idx) {
      walk(obj[key], fn, obj, key, idx, keys.length, depth, dclose)
    })
  }
}
