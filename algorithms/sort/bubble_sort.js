/*
	冒泡排序的时间复杂度平均为n^2, 最坏为n^2, 最好为n, 稳定性： 稳定
*/

class BubbleSort {
	constructor(compareFn=undefined) {
		this.compare = compareFn || function(a, b) { return a > b ? true : false}
	}

	sort(orgArr=[]) {
		for(let i = 1; i < orgArr.length; i++) {
			let has_swap = false
			for (let j = 0; j < orgArr.length - i; j++) {
				if (this.compare(orgArr[j], orgArr[j + 1])) {
					[orgArr[j], orgArr[j + 1]] = [orgArr[j + 1], orgArr[j]]
					has_swap = true
				}
			}
			if (!has_swap) {
				return orgArr
			}
		}
		return orgArr
	}
}

module.exports = {
	BubbleSort
}