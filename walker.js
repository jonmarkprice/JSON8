'use strict'

function Walker () {}

Walker.prototype.objectStart = function () {}
Walker.prototype.objectEnd = function () {}
Walker.prototype.arrayStart = function () {}
Walker.prototype.arrayEnd = function () {}
Walker.prototype.value = function () {}

Walker.prototype._walk = function (obj, parent, key, idx, size, depth) {
  var that = this
  if (typeof depth !== 'number') depth = 0

  this.value(obj, key, parent, idx, size, depth)
  if (obj === null || typeof obj !== 'object') return

  depth++

  if (Array.isArray(obj)) {
    this.arrayStart(obj, key, parent, idx, size, depth)
    obj.forEach(function (value, idx) {
      that._walk(value, obj, idx, idx, obj.length, depth)
    })
    this.arrayEnd(obj, key, parent, idx, size, depth)
  } else {
    this.objectStart(obj, key, parent, idx, size, depth)
    var keys = Object.keys(obj)
    keys.forEach(function (key, idx) {
      that._walk(obj[key], obj, key, idx, keys.length, depth)
    })
    this.objectEnd(obj, key, parent, idx, size, depth)
  }
}

Walker.prototype.run = function (obj) {
  this._walk(obj)
}

var obj = {
  // object: {},
  // array: [],
  // string: "hello",
  // boolean: true,
  // null: null,
  // number: 23,
  'foo': ["bar"],
  'extra': {'deep': "bar"}
  // "truc": "muche"
  // "foo": "bar",
  // "foo": ["chose", "et", "autre"],
  // "bar": "foo",
  // fu: {machin: "truc"}
}

function string (obj) {
  var str = ''
  var walker = new Walker()
  walker.arrayStart = function () {
    str += '['
  }
  walker.arrayEnd = function () {
    str += ']'
  }
  walker.objectStart = function () {
    str += '{'
  }
  walker.objectEnd = function () {
    str += '}'
  }
  walker.value = function (value, key, parent) {
    if (typeof value === 'object' && value !== null) return

    if (Array.isArray(parent)) {
      str += JSON.stringify(value) + ','
    } else if (parent) {
      str += JSON.stringify(key) + ':'
      if (typeof value !== 'object' && value !== null) {
        str += JSON.stringify(value) + ','
      }
    } else {
      str += JSON.stringify(value)
    }
  }
  return str
}

// function string () {
//   var str = ''
//   var opened = []

//   walk(obj, function (value, key, parent, idx, parentSize, depth) {
//     var indent = '  '.repeat(depth)

//     if (typeof key === 'string') {
//       str += indent + JSON.stringify(key) + ': '
//     } else if (value && typeof value !== 'object' && value !== null) {
//       str += indent
//     }

//     if (Array.isArray(value)) {
//       str += '[' + (value.length === 0 ? ']' : '\n')
//     } else if (typeof value === 'object' && value !== null) {
//       str += '{' + (Object.keys(value).length === 0 ? '}' : '\n')
//     } else if (value !== undefined) {
//       str += JSON.stringify(value)
//     }

//     // if (close) {
//       // last child, let's close the parent
//       if (Array.isArray(parent)) {
//         str += indent + '\n]\n'
//       } else {
//         str += indent + '\n}\n'
//       }
//       return
//     // not last child
//     // }
//  // else {
//         // str += ',\n'
//       // }
//     // }
//   })
//   return str
// }



console.log(JSON.stringify(obj, null, 2))

console.log('\n-----------------\n')

console.log(string(obj))
