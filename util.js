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

module.exports = {
	Comparator
}