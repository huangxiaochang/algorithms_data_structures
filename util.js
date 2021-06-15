class Comparator {
	constructor(compareFn) {
		this.compare = compareFn || Comparator.defaultCompareFn
	}
	static defaultCompareFn(a, b) {
		// 静态方法内部的this指向的是类，而不是实例
		if (a === b) { return 0 }
		return a < b ? -1 : 1
	}
}

function defaultCompareFn (a, b) {
	if (a === b) { return 0 }
	return a < b ? -1 : 1
}

// 判断值的类型
function getValueType (value) {
	let type = Object.prototype.toString.call(value)
	return type.substring(8, type.length - 1).toLowerCase()
}

module.exports = {
	Comparator,
	defaultCompareFn,
	getValueType
}

// test
