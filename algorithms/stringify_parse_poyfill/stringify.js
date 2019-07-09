/**
 实现JSON.stringify()
 思路：递归处理对象和数组，把属性值或者数组项转成字符串。
 该poyfill并不考虑JSON.stringify()的第二第三个参数
 */

function isObject (val) {
  return (val !== null && typeof val === 'object')
}

function isArray (val) {
  return Object.prototype.toString.call(val) === '[object Array]'
}

function isPlainObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

function stringify (val) {

  if (isObject(val)) {
    var res = ''
    if (val.toJSON && typeof val.toJSON === 'function') {
      return stringify(val.toJSON())
    } else if (isPlainObject(val)) {
      // 纯对象
      var arr = []
      // for/in 会忽略symbol
      for(var k in val) {
        // 忽略属性值为function,undefined
        var valType = typeof val[k]
        if (valType === 'function' || valType === 'undefined') { continue }
        arr.push('"' + k + '"' + ":" + stringify(val[k]))
      }
      return ('{' + arr + '}')

    } else if (isArray(val)) {
      var res = []
      var item
      for(var i = 0; i < val.length; i++) {
        item = val[i]
        var valType = typeof item
        if (valType === 'function' || valType === 'undefined' || valType === 'symbol') { 
          res[i] = 'null'
        } else {
          res[i] = stringify(item)
        }
      }

      return ("[" + res + "]")
    }

  } else {
    var type = typeof val
    var res = val
    if (type === 'function' || type === 'symbol' || type === 'undefined') {
     return undefined
    } else if (isNaN(val) || val === null || val === Infinity) {
      res = 'null'
    } else if (type === 'string'){
      res = '"' + val + '"'
    }
    return String(res)
  }
}

// test
JSON.stringify = undefined
JSON.stringify = JSON.stringify || stringify

console.log(JSON.stringify("112"))

console.log(JSON.stringify(112))

console.log(JSON.stringify(1 / 0), typeof JSON.stringify(1 / 0)) // NaN, Infinity, null -> 'null'

console.log(JSON.stringify(true))

console.log(JSON.stringify(function (){}))

console.log(JSON.stringify(undefined), typeof JSON.stringify(undefined)) // symbol, function undefined -> undefined

var data = {
  a: 1,
  b: [2,3],
  c: null,
  d: undefined,
  e: function () {},
  f: {
    g: true
  },
  h: '444'
}

console.log(JSON.stringify(data)) // toJSON