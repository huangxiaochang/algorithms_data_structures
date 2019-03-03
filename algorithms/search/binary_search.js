/*
	二分查找算法
	前提： 排好序的系列
	时间复杂度： logn
	空间复杂度： 1
*/

const { Comparator } = require('../../util.js')

class BinarySearch {
	constructor(sortArr=[], compareFn=undefined) {
		this.sortArr = sortArr
		this.compareFn = compareFn || (new Comparator(compareFn)).compare
	}

	search(val, start=0, end=this.sortArr.length -1) {
		while(start <= end) {
			let middle_pos = Math.floor((start + end) / 2)
			let flag = this.compareFn(this.sortArr[middle_pos], val)
			if (flag === 0) {
				return middle_pos
			} else if (flag < 0) {
				start = middle_pos + 1
			} else {
				end = middle_pos - 1
			}
		}
		return -1
	}
}

module.exports = {
	BinarySearch
}
