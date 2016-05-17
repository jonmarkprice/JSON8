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
  // fu: {machin: "truc"},
  // "lol": []
  // "machin": true
}

obj = {
  "foo": "bar",
  truc: ['lol'],
  machin:{},
  // ff: 'lol'
}

walk = function (obj, fn) {
  if (typeof obj === 'object' && obj !== null) {
    fn('objectStart', obj)
    Object.keys(obj).forEach(function () {

    })
    fn('objectClose', obj)
  }
})
// }

// function string (obj) {
//   var str = ''
//   walk(obj, function (value, key, parent, idx, parentSize, depth, close) {
//     var indent = '  '.repeat(depth)
//     var pindent = '  '.repeat((depth || 1) - 1)

//     // array parent
//     if (Array.isArray(parent)) {
//       str += indent // prefix value with indent
//     }
//     // object parent
//     else if (typeof parent === 'object' && parent !== null) {
//       str += '\n' + indent + JSON.stringify(key) + ': ' // prefix value with indent and key
//     }

//     // array value
//     if (Array.isArray(value)) {
//       str += '['
//       // empty
//       if (value.length === 0) {
//         str += ']'
//       }
//       else if (close) {
//         str += Array.isArray(close) ? ']' : '}'
//       }
//     }
//     // object value
//     else if (typeof value === 'object' && value !== null) {
//       str += '{'
//       // empty
//       if (Object.keys(value).length === 0) {
//         str += '}'
//         console.log('close', close)
//         if (close) str += Array.isArray(close) ? ']' : '}'
//       }
//     }
//     // primitive value
//     else {
//       str += JSON.stringify(value)
//     }


//     // if (!parent)

//     // suffix - has parent and value is a primitive
//     if (parent && (typeof value !== 'object' || value === null)) {
//       // value is last parent child
//       if (idx === parentSize - 1) {
//         // array parent
//         if (Array.isArray(parent)) {
//           str += '\n' + pindent + ']'
//         }
//         // object parent
//         else {
//           str += '\n' + pindent + '}'
//         }
//       }
//     }

//     // if (typeof value !== 'object') {
//     // if (parent)
//       // str += ',\n'
//     // }

//     // if (parent) str+= ',\n'
//       // not last element
//       // else {
//         // str += ',\n'
//       // }
//         // if (!close) str += ','
//         // str += '\n'
//       // /k/ not last child
//       // } else {
//         // str += ',\n'
//       // }
//     // }

//     // if ((typeof value !== 'object' || value === null) && typeof parentSize === 'number') {
//       // last child, let's close the parent

//     // }



//     // close parent parent
//     if (close) {
//       console.log('CLOSE', close)
//       // console.log(key, value, str)
//       // str += 'lol'
//       str += Array.isArray(close) ? ']' : '}'
//     }
//   })
//   return str
// }

module.exports = string


console.log(JSON.stringify(obj, null, 2))

console.log('\n-----------------\n')

console.log("lol\n" + string(obj) + '\nlol')


var assert = require('assert')
assert.strictEqual(JSON.stringify(obj, null, 2), string(obj).trim())
