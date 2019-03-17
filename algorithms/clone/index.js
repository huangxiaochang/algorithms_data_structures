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
		target.hasOwnProperty(K) && res[k] = target[k]
	}
	return res
}

// 2.浅拷贝数组
let arr = [1, {a: 1}]
Array.slice(arr, 0)
Array.concat(arr, [])

// 等等，还有很多的方式可以实现浅拷贝


// 实现深拷贝的方式
// 1.先拷贝加递归

function getType(val) {
	return Object.prototype.toString.call(val) === '[Object object]'
}

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
function cloneJSON(target) {
	return JSON.parse(JSON.stringify(target))
}

// 以上这种方式存在以下问题：
// 当target层级过大时，会造成调用栈溢出
// 但是不会因为存在循环已用而导致调用栈溢出
// 可见JSON.stringify/parse的方式也是通过递归的方式来实现的

// 3.使用循环+栈来实现
function cloneLoop(target) {
	const root = {}
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
		for(let k in data) {
			if(target.hasOwnProperty(k)) {
				if (typeof target[k] === 'object') {
					stack.push({
						parent: res,
						key: key,
						data: data[k]
					})
				} else {
					res[k] = target[k]
				}
			}
		}
	}
	return root
}

// 以上这种方式虽然可以解决了由于层级过深造成的调用栈溢出，但是对于循环引用的问题造成调用栈溢出依然
// 没有解决

// 4. 使用循环+栈+缓存已拷贝过的值
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

		cacheData.push({
			target: res,
			source: data
		})

		for(let k in data) {
			if(target.hasOwnProperty(k)) {
				if (typeof target[k] === 'object') {
					stack.push({
						parent: res,
						key: key,
						data: data[k]
					})
				} else {
					res[k] = target[k]
				}
			}
		}
	}
	return root
}


function find(arr, data) {
	for(let item in arr) {
		if (item.source === data) {
			return item
		}
	}
	return null
}


// 创建测试的数据
function createData (deep, breadth) {
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
		循环引用  一层           不支持						一层					支持
		栈溢出    会 					   会   						不会          不会
		保持引用  否  				   否 							否             是
		适合场景  一般数据拷贝   一般数据拷贝     层级很多       保持引用关系


		性能：clone > cloneLoop > cloneForce > cloneJSON
 */

module.exports = {
	cloneForce,
	cloneLoop,
	cloneJSON,
	clone
}