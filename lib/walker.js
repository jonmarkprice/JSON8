'use strict'

var walk = require('./walk')

var obj = {
  object: {},
  array: [],
  string: "hello",
  boolean: true,
  null: null,
  number: 23,
  'foo': ["bar"],
  'extra': {'deep': "machin", deep2: "foo"},
  'extra2': {'deep': "bar"},
  "truc": "muche",
  "foo": "bar",
  "foo": ["chose", "et", "autre"],
  "bar": "foo",
  fu: {machin: "truc"},
  // "lol": []
  // "machin": true
}

function string (obj) {
  var str = ''
  walk(obj, function (value, key, parent, idx, parentSize, depth, close) {
    var indent = '  '.repeat(depth)
    var pindent = '  '.repeat((depth || 1) - 1)

    // array parent
    if (Array.isArray(parent)) {
      str += indent // prefix value with indent
    }
    // object parent
    else if (typeof parent === 'object' && parent !== null) {
      str += indent + JSON.stringify(key) + ': ' // prefix value with indent and key
    }

    // array value
    if (Array.isArray(value)) {
      str += '['
      // empty
      if (value.length === 0) {
        str += ']'
        if (typeof parentSize === 'number' && idx !== parentSize - 1) str += ','
      }
      str += '\n'
    }
    // object value
    else if (typeof value === 'object' && value !== null) {
      str += '{'
      // empty
      if (Object.keys(value).length === 0) {
        str += '}'
        if (typeof parentSize === 'number' && idx !== parentSize - 1) str += ','
      }
      str += '\n'
    }
    // primitive value
    else {
      str += JSON.stringify(value)
    }

    if ((typeof value !== 'object' || value === null) && typeof parentSize === 'number') {
      // last child, let's close the parent
      if (idx === parentSize - 1) {
        // console.log(key, value)
        if (Array.isArray(parent)) {
          str += '\n' + pindent + ']'
        } else {
          str += '\n' + pindent + '}'
        }
        if (!close) str += ','
        str += '\n'
      // not last child
      } else {
        str += ',\n'
      }
    }



    // close parent parent
    if (close) {
      str += Array.isArray(close) ? ']' : '}'
    }
  })
  return str
}

module.exports = string


console.log(JSON.stringify(obj, null, 2))

console.log('\n-----------------\n')

console.log("lol\n" + string(obj) + '\nlol')


var assert = require('assert')
assert.strictEqual(JSON.stringify(obj, null, 2), string(obj).trim())
