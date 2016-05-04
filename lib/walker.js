'use strict'

// function Walker(obj) {
//   this.root = obj
//   this.currentNode = obj
//   this.position = 0
// }

// Walker.prototype.next = function next () {
//   if (typeof this.currentNode === 'object') {
//     var keys =
//     return Object.keys()
//   }
// }


// while (foo.next()) {
//   console.log(foo.currentValue)
// }

function walk (obj, fn, parent, key, idx, size, depth, parentParent) {
  if (typeof depth !== 'number') depth = 0
  fn(obj, key, parent, idx, size, depth, parentParent)
  if (obj === null || typeof obj !== 'object') return

  depth++

  if (Array.isArray(obj)) {
    obj.forEach(function (value, idx) {
      walk(value, fn, obj, idx, idx, obj.length, depth, parent)
    })
  } else {
    var keys = Object.keys(obj)
    keys.forEach(function (key, idx) {
      walk(obj[key], fn, obj, key, idx, keys.length, depth, parent)
    })
  }
}

// var indexs =

// var test = {}

var obj = {
  // object: {},
  // array: [],
  // string: "hello",
  // boolean: true,
  // null: null,
  // number: 23,
  'foo': ["bar"],
  // 'extra': {'deep': "bar"}
  // "truc": "muche"
  // "foo": "bar",
  // "foo": ["chose", "et", "autre"],
  // "bar": "foo",
  // fu: {machin: "truc"}
}

function string () {
  var str = ''
  walk(obj, function (value, key, parent, idx, parentSize, depth, parentParent) {
    if (typeof key === 'string') {
      str += '  '.repeat(depth) + JSON.stringify(key) + ': '
    } else if (typeof value !== 'object' && value !== null) {
      str += '  '.repeat(depth)
    }

    if (Array.isArray(value)) {
      str += '[' + (value.length === 0 ? ']' : '\n')
    } else if (typeof value === 'object' && value !== null) {
      str += '{' + (Object.keys(value).length === 0 ? '}' : '\n')
    } else {
      str += JSON.stringify(value)
    }

    if (typeof value !== 'object' && typeof parentSize === 'number') {
      // last child, let's close the parent
      if (idx === parentSize - 1) {
        console.log('foobar', value)
        if (Array.isArray(parent)) {
          str += '\n]\n'
        } else {
          str += '\n}\n'
        }
      // not last child
      } else {
        str += ',\n'
      }
    }
  })
  return str
}



console.log(JSON.stringify(obj, null, 2))

console.log('\n-----------------\n')

console.log(string(obj))
