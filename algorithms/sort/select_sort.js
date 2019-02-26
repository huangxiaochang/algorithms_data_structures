/*
	选择排序的时间复杂度平均为n^2, 最坏为n^2, 最好为n^2, 稳定性： 稳定
*/

class SelectSort {
	constructor(compareFn=undefined) {
		this.compare = compareFn || function(a, b) { return a > b ? true : false}
	}

	sort(orgArr=[]) {
		for(let i = 0; i < orgArr.length - 1; i++) {
			let k = i
			for (let j = i+1; j < orgArr.length; j++) {
				if (this.compare(orgArr[k], orgArr[j])) {
					k = j
				}
			}
			if (k !== i) {
				[orgArr[i], orgArr[k]] = [orgArr[k], orgArr[i]]
			}
		}
		return orgArr
	}
}

module.exports = {
	SelectSort
}