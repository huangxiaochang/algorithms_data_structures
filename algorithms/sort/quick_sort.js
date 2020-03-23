/*
	快速排序的时间复杂度： nlogn, 最坏为n^2, 最好为nlogn, 稳定性： 不稳定。
	快速排序一般比其他o(nlobn)的算法更快，因为它的内部循环可以在大部分的架构上
	很有效率地被实现出来。
 */
class QuickSort {
	constructor(compareFn) {
		this.compare = compareFn || function(a, b) { return a > b ? true : false }
	}

	sort(orgArr=[]) {
		if (orgArr.length <= 1) {
			return orgArr
		}
		let pos = orgArr.shift()
		let left = []
		let right = []
		for(let i = 0; i < orgArr.length; i++) {
			if (this.compare(pos, orgArr[i])) {
				left.push(orgArr[i])
			} else {
				right.push(orgArr[i])
			}
		}
		return this.sort(left).concat([pos], this.sort(right))
	}
}

module.exports = {
	QuickSort
}