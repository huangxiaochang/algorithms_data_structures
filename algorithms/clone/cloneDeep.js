// 兼容多种情况的完全版深度拷贝：函数，循环引用，symbol, map, set, Date, 正则, 箭头函数，调用栈溢出
// WeakSet,WeakMap不能遍历，因为它的成员(只能是对象类型)都是弱引用，随时可能消失
function getValType (val) {
	var type = Object.prototype.toString.call(val)
	return type.substring(8, type.length - 1)
}

function isPrimitiveValue (val) {
	// 原始值(不包括包装对象): string, null, undefined, boolean, number, symbol
	// WeakSet, WeakMap.
	// 如果也需要拷贝symbol类型的值，可以使用Symbol(symbol.description)来实现
	if (val === null || 
		!(typeof val === 'object' || typeof val === 'function') ||
		val instanceof WeakSet ||
		val instanceof WeakMap
	) {
		return true
	}
	return false
}

// 赋值不能遍历的对象
function cloneCannotTraverseObj (obj, valType) {
	const ctor = obj.constructor
	// 获取基本类型包装对象的基本值
	const val = Object.prototype.valueOf.call(obj)
	console.log(val, typeof val)

	switch (valType) {
		case 'Boolean':
					// 因为new Boolean(false) -> new ctor(obj) => [Boolean: true]
					// 所以并不能直接使用new ctor(obj)
					var value = val.valueOf()
					return new Boolean(value)
		case 'Number':
		case 'String':
					// return new ctor(val)
		case 'Date':
		case 'Error':
					return new ctor(obj)
		case 'RegExp': 
					// 正则表达式实例对象的source属性保存着正则表达式,flags保存着修饰符
					const source = obj.source
					const flags = obj.flags
					console.log(source, flags, 111)
					return new RegExp(source, flags)
		case 'Function':
					const fnStr = obj.toString()
					// 函数可以分为箭头函数和普通的函数，为箭头函数时，直接返回即可
					// 两者的区别是，箭头函数没有原型
					const isArrowFun = obj.prototype === undefined
					if (isArrowFun) {
						// 箭头函数可以使用eval+箭头函数的字符串进行拷贝
						return eval(fnStr)
					}
					
					let paramsReg = /\((.*?)\)/
					let params = fnStr.match(paramsReg)
					
					let bodyReg = /\{([\w\W]*)\}/m
					let body = fnStr.match(bodyReg)
					return new Function(params[1], body[1])
					// 如果需要具名函数，可以使用eval来实现
					// var fn = ''
					// eval('fn = ' + fnStr)
					// return fn
		default :
				 return new ctor(obj)
	}
}

// 是否已经复制过
function hadCopy (map, target) {
	for (let item of map) {
		if (item.source === target) {
			return item.copy
		}
	}
	return false
}

const canTraverse = ['Set', 'Map', 'Object', 'Array', 'Arugments']

function cloneDeep (obj) {
	const valType = getValType(obj)
	// 基本类型值和WeekSet, WeekMap，直接返回，不包括包装对象。
	if (isPrimitiveValue(obj)) {
		return obj
	}

	// 处理可遍历的对象：Set, Map, Object, Array, arguments。 (注意不包含dom对象
	// ，因为它是宿主对象，不属于JavaScript的范畴)
	if (canTraverse.includes(valType)) {
		const stack = []
		const map = []

		const Ctor = obj.constructor
		const ret = new Ctor()

		stack.push({
			parent: ret,
			key: undefined,
			data: obj
		})

		while (stack.length) {
			let {parent, key, data} = stack.pop()

			var clone = hadCopy(map, data)
			if (clone) {
				parent[key] = clone
				continue
			}
			map.push({
				source: data,
				copy: parent
			})
			let type = getValType(data)
			if (type === 'Set') {
				data.forEach(function (val, k) {
					let type = getValType(val)
					if (isPrimitiveValue(val)) {
						parent.add(val)
					} else if (canTraverse.includes(type)) {
						let newVal = new val.constructor()
						parent.add(newVal)
						stack.push({
							parent: newVal,
							key: k,
							data: val
						})
					} else {
						parent.add(cloneCannotTraverseObj(val, type))
					}
				})
			} else if (type === 'Map') {
				data.forEach(function (val, k) {
					let type = getValType(val)

					if (isPrimitiveValue(val)) {
						parent.set(k, val)
					} else if (canTraverse.includes(type)) {
						let newVal = new val.constructor()
						parent.set(k, newVal)
						stack.push({
							parent: newVal,
							key: k,
							data: val
						})
					} else {
						parent.set(k, cloneCannotTraverseObj(val, type))
					}
				})
			} else {
				// 处理键为Symbol的情况
	    	const skeys = Object.getOwnPropertySymbols(data)

				let keys = [...Object.keys(data), ...skeys]
				for (let k of keys) {
					let val = data[k]
					let type = getValType(val)
					if (isPrimitiveValue(val)) {
						parent[k] = val
					} else if (canTraverse.includes(type)) {
						let newVal = new val.constructor()
						parent[k] = newVal
						stack.push({
							parent: newVal,
							key: k,
							data: val
						})
					} else {
						parent[k] = cloneCannotTraverseObj(val, type)
					}
				}
			}
		}
		return ret
	} else {
		return cloneCannotTraverseObj(obj, valType)
	}
}

var obj = {
	a: /\d/gim,
	b: true,
	c: 12,
	[Symbol()]: 'w43e',
	d: 'we',
	e: function () {},
	f: null,
	g: undefined,
	r: new Set([2, {a: 22, b: [3,{y: '66'}]}, Symbol(11)]),
	h: new Map([['a','09'], [Symbol(22), 444]]),
	k: Symbol('tt'), // 如果也需要Symbol类型值不等，可以使用Symbol(symbol.description)
	w: new Date(),
	z: new String('22'),
	y: new Number(777),
	x: new Boolean(false),
	l: () => {
		var o = 777
		return o
	},
	i: new Boolean(false)
}
var cobj = cloneDeep(obj)

console.log(cobj, cobj === obj, cobj.a === obj.a, cobj.y === obj.y)

