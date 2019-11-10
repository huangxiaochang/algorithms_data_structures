// 兼容多种情况的完全版深度拷贝：函数，循环引用，symbol, map, set, Date, 正则, 箭头函数，调用栈溢出
function getValType (val) {
	var type = Object.prototype.toString.call(val)
	return type.substring(8, type.length - 1)
}

function isPrimitiveValue (val) {
	// 原始值，不包括包装对象
	if (val === null || !(typeof val === 'object' || typeof val === 'function')) {
		return true
	}
	return false
}

// 赋值不能遍历的对象
function cloneCannotTraverseObj (obj, valType) {
	const ctor = obj.constructor
	// 获取基本类型包装对象的基本值
	const val = Object.prototype.valueOf.call(obj)

	switch (valType) {
		case 'Number':
		case 'Boolean':
		case 'String':
		
		case 'Date':
		case 'Error':
		case 'RegExp': 
		case 'Function':
		default :
	}
}

const canTraverse = ['Set', 'WeekSet', 'Map', 'WeeMap', 'Object', 'Array', 'Arugments']

function cloneDeep (obj) {
	const valType = getValType(obj)
	console.log(getValType(obj))
	// 基本类型值(string, null, undefined, boolean, number, symbol)，直接返回，不包括包装对象
	if (isPrimitiveValue(obj)) {
		return obj
	}

	// 处理不能遍历的对象
	
	// 处理可遍历的对象：Set(WeekSet), Map(WeekMap), Object, Array, arguments。 (注意不包含dom对象
	// ，因为它是宿主对象，不属于JavaScript的范畴)
	if (canTraverse(valType)) {

	} else {

	}
}

var obj = {
	a: Error('wee')
}

cloneDeep(Symbol('32'))

console.log('finish')

