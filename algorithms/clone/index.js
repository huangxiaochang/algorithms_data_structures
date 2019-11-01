/*
浅拷贝，深拷贝，拷贝方式的对比
 */

// 实现浅拷贝的方式：
// 1.浅拷贝对象
let obj = {a: 1}
Object.assign(obj)

function shallowClone(target) {
	let res = {}
	for(let k in target) {
		if (target.hasOwnProperty(K)){
			res[k] = target[k]
		}
	}
	return res
}

// 2.浅拷贝数组
let arr = [1, {a: 1}]
Array.prototype.slice.call(arr, 0)
Array.prototype.concat.call(arr, [])

// 等等，还有很多的方式可以实现浅拷贝
// 如es6的展开运算符

// 实现深拷贝的方式
// 1.浅拷贝加递归

function getType(val) {
	return Object.prototype.toString.call(val) === '[Object object]'
}

// 时间复杂度：创建递归的时间+处理每个对象的时间
function clone (target) {
	let res = {}
	for(let k in target) {
		if (target.hasOwnProperty(k)) {
			if (getType(target[k])) {
				res[k] = clone(target[k])
			} else {
				res[k] = target[k]
			}
		}
	}
	return res
}

// 以上这种方式存在以下问题：
// 没有考虑数组的情况
// 当target层级过大时，会造成调用栈溢出
// 当存在循环引用时，也会造成调用栈溢出
// 没有对参数进行检验

// 2.使用JSON.stringify/parse的方法
// 时间复杂度：循环检测的时间+处理每个对象的时间*2(递归转字符串+递归解析成对象)
function cloneJSON(target) {
	return JSON.parse(JSON.stringify(target))
}

// 以上这种方式存在以下问题：
// 当target层级过大时，会造成调用栈溢出
// 但是不会因为存在循环已用而导致调用栈溢出
// 可见JSON.stringify/parse的方式也是通过递归的方式来实现的

// 3.使用循环+栈来实现
// 时间复杂度：处理每个对象的时间
function cloneLoop(target) {
	const root = {}
	const stack = [
		{
			parent: root,
			key: undefined,
			data: target
		}
	]

	// 广度优先遍历
	while(stack.length) {
		const node = stack.pop()
		const { parent, key, data } = node
		let res = parent
		if (typeof key !== 'undefined') {
			res = parent[key] = {}
		}
		for(let k in data) {
			if(data.hasOwnProperty(k)) {
				if (typeof data[k] === 'object') {
					stack.push({
						parent: res,
						key: k,
						data: data[k]
					})
				} else {
					res[k] = data[k]
				}
			}
		}
	}
	return root
}

// 以上这种方式虽然可以解决了由于层级过深造成的调用栈溢出，但是对于循环引用的问题造成调用栈溢出依然
// 没有解决

// 4. 使用循环+栈+缓存已拷贝过的值
// 时间复杂度：判断对象时候在缓存中+处理每个对象的时间
function cloneForce(target) {
	const root = {}
	const cache = []
	const stack = [
		{
			parent: root,
			key: undefined,
			data: target
		}
	]

	while(stack.length) {
		const node = stack.pop()
		const { parent, key, data } = node
		let res = parent
		if (typeof key !== 'undefined') {
			res = parent[key] = {}
		}

		let cacheData = find(cache, data)
		if (cacheData) {
			parent[key] = cacheData.target
			break
		}

		cache.push({
			target: res,
			source: data
		})

		for(let k in data) {
			if(data.hasOwnProperty(k)) {
				if (typeof data[k] === 'object') {
					stack.push({
						parent: res,
						key: k,
						data: data[k]
					})
				} else {
					res[k] = data[k]
				}
			}
		}

		// 兼容es6的Symbol作为对象的键
		// symbol键不会被for/in、for/of, Object.heys, Object.getOwnPropertyNames()、JSON.stringify()遍历和返回。
		// 所以只能用Object.getOwnPropertySymbols来返回该对象所有的Symbol名。
		let sbs = Object.hasOwnPropertySymbols(data)
		for(let sb of sbs) {
			if (typeof data[sb] === 'object') {
				stack.push({
					parent: res,
					key: sb,
					data: data[sb]
				})
			} else {
				res[sb] = data[sb]
			}
		}
	}
	return root
}


function find(arr, data) {
	for(let item of arr) {
		if (item.source === data) {
			return item
		}
	}
	return null
}


// 创建测试的数据
function createData (deep, breadth=0) {
	let data = {}
	let temp = data
	for(let i = 0 ; i < deep; i++) {
		temp = temp['data'] = {}
		for(let j = 0; j < breadth; j++) {
			temp[j] = j
		}
	}
	return data
}

/*
  对比
                  clone         cloneJSON      cloneLoop      cloneForce
		循环引用      一层           不支持						一层					支持
		栈溢出    		会 					   会   						不会          不会
		保持引用  		否  				   否 							否             是
		适合场景  		一般数据拷贝   一般数据拷贝     层级很多       保持引用关系
		是否拷贝函数	是 							否 							是 							是


		性能：clone > cloneLoop > cloneForce > cloneJSON
 */

// 测试性能
let a = createData(100000, 1)

// 循环引用
// let a = {}
// a.a = a

// 保持相同的引用
// let b = {d: 1}
// let a = {a1: b, a2: b}
// let c = cloneForce(a)
// console.log(c.a1 === c.a2)

// 测试能够copy函数
// let fn = function() {
// 	console.log('测试拷贝函数')
// }

// let a = {
// 	f1: fn,
// 	f2: fn
// }
// let c = cloneLoop(a)
// console.log(c.f1 === c.f2)

console.log(clone(a))


if (typeof module !== 'undefined') {
	module.exports = {
		cloneForce,
		cloneLoop,
		cloneJSON,
		clone
	}
}

// 兼容数组和对象的的深度拷贝

function isArrAndObj (val) {
  if (val instanceof Array || 
    val !== null && typeof val === 'object'
  ) {
    return true
  }
  return false
}

function findCopy (cache, target) {
  for(let obj of cache) {
    if (obj.key === target) {
      return obj.copyObj
    }
  }
  return null
}

// 使用递归进行深度复制，可能会存在调用栈溢出
function deepCopy (obj, cache=[]) {
  if (!isArrAndObj(obj)) {
    // 只处理数组或者纯对象
    return obj
  }

  // 避免循环引用
  let cacheData = findCopy(cache, obj)

  if (cacheData) {
    return cacheData
  }

  const ret = obj instanceof Array ? [] : {}
  // 增加缓存
  cache.push({
    copyObj: ret,
    key: obj
  })

  // copy es6 symbol
  const skeys = Object.getOwnPropertySymbols(obj)
  for (let sk of skeys) {
    var val = obj[sk]
    if (isArrAndObj(val)) {
      ret[sk] = deepCopy(val, cache)
    } else {
      ret[sk] = val
    }
  }

  if (obj instanceof Array) {
    for(let val of obj) {
      if (isArrAndObj(val)) {
        ret.push(deepCopy(val, cache))
      } else {
        ret.push(val)
      }
    }
    return ret
  } else {
    const keys = Object.keys(obj)
    for(let k of keys) {
      var val = obj[k]
      if (isArrAndObj(val)) {
        ret[k] = deepCopy(val, cache)
      } else {
        ret[k] = val
      }
    }
    return ret
  }
}

function deepClone (obj) {
  if (!isArrAndObj(obj)) {
    return obj
  }
  const ret = obj instanceof Array ? [] : {}
  const stack = [
    {
      parent: ret,
      key: undefined, // 用于避免循环引用
      data: obj
    }
  ]

  const cache = []

  while (stack.length) {
    let { parent, key, data } = stack.pop()

    const cacheData = findCopy(cache, data)
    if (cacheData) {
    	// 避免循环引用
      parent[key] = cacheData
      continue
    }
    cache.push({
      copyObj: parent,
      key: data
    })

    // 这里同步兼容了数组，如果是数组，则keys = ['0', '1', ...]
    const keys = Object.keys(data)
    
    for(let k of keys) {
      let val = data[k]
      if (isArrAndObj(val)) {
        const res = val instanceof Array ? [] : {}
        // 对象或者数组
        parent[k] = res
        stack.push({
          parent: res,
          key: k,
          data: val
        })
      } else {
        parent[k] = val
      }
    }

    // 处理键为Symbol的情况
    const skeys = Object.getOwnPropertySymbols(data)
    for (let sk of skeys) {
      let val = data[sk]
      if (isArrAndObj(val)) {
        const res = val instanceof Array ? [] : {}
        parent[sk] = res
        stack.push({
          parent: res,
          key: sk,
          data: val
        })
      } else {
        parent[sk] = val
      }
    }

  }
  return ret
}

var obj1 = {
  g: 1,
}

obj1.o = obj1

var obj = {
  a: 1,
  b: '2',
  c: null,
  d: function () {},
  e: undefined,
  f: true,
  g: [1, {'a': '22'}],
  h: obj1,
  [Symbol('33')]: 'symbol',
  m: {
    y: 0,
    [Symbol('11')]: {
      k: 'ee'
    }
  }
}

var arr = [
  1,
  '3',
  {
    'a': 3,
    'b': [3, {g: 5}]
  },
  obj1,
  null,
  function function_name(argument) {
    // body...
  },
  true,
  undefined,
  Symbol('33'),
  {
    [Symbol('11')]: 22332,
    v: 65
  }
]
var a = {
}
a.b = a
var copyObj = deepClone(a)
console.log(copyObj, copyObj === a)

