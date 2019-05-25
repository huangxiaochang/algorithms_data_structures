// 使用广度优先遍历和深度优先遍历的思想实现clone
var obj = {
  a: 1,
  b: {
    c: {
      e: 2,
      g: null,
      f: function f () {
        console.log('i am a function')
      }
    },
    d: [3,4]
  }
}

function getType(val) {
  var type = Object.prototype.toString.call(val)
  return type.match(/\[object ([a-zA-Z]+)\]/)[1]
}

// 深度优先遍历
function DFSTranverse (source) {
  var res = null
  var type = getType(source)
  if (type === 'Object') {
    res = {}
    for(var k in source) {
      DFS(source[k], res, k)
    }
  } else if (type === 'Array') {
    res = []
    for(var i = 0; i < source.length; i++) {
      DFS(source[i], res, i)
    }
  } else {
    res = source
  }
  return res
}

function DFS (val, res, key) {
  var type = getType(val)
  console.log(key)
  if (type === 'Object') {
    res[key] = {}
    for(var k in val) {
      DFS(val[k], res[key], k)
    }
  } else if (type === 'Array') {
    res[key] = []
    for(var i = 0; i < val.length; i++) {
      DFS(val[i], res[key], i)
    }
  } else {
    res[key] = val
  }
}

var copyObj = DFSTranverse(obj)
console.log(copyObj)

// 广度优先遍历
function BFSTranverse (source) {
  var parent = null
  var stack = []

  var type = getType(source)
  if (type === 'Object') {
    parent = {}
  } else if (type === 'Array') {
    parent = []
  }

  stack.push({
    parent: parent,
    data: source
  })

  while (stack.length) {
    var node = stack.pop()
    var p = node.parent,
        data = node.data,
        type = getType(data);

    if (type === 'Object') {
      for(var k in data) {
        var type = getType(data[k])
        if (type === 'Object' || type === 'Array') {
          p[k] = type === 'Object' ? {} : []
          stack.push({
            parent: p[k],
            data: data[k]
          })
        } else {
         p[k] = data[k]
        }
        console.log(k)
      }
    } else if (type === 'Array') {
      for (var k  = 0; k < data.length; k++) {
        var type = getType(data[k])
        if (type === 'Object' || type === 'Array') {
          p[k] = type === 'Object' ? {} : []
          stack.push({
            parent: p[k],
            data: data[k]
          })
        } else {
         p[k] = data[k]
        }
        console.log(k)
      }
    } else {
      p = data
    }
  }

  return parent
}

var res = BFSTranverse(obj)
console.log(res, res === obj)




