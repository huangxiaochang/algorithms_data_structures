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

	// 该二分查找找到一个即返回
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

// 二分查找右边界。如: [1,2,2,2,3],target=2返回3， 即最右边的2
function searchRightBorder (arr, target) {
	let l = 0;
	let r = arr.length;
	var res = -1
	// [l, r)左闭右开
	while (l < r) {
		let mid = (l + r) >> 1
		if (arr[mid] === target) {
			// 找到某个值时，不立即终止查找，而是继续向右二分查找
			res = mid
			l = mid + 1
		} else if (arr[mid] > target) {
			r = mid
		} else if (arr[mid] < target) {
			l = mid + 1
		}
	}
	return res
}

// 二分查找左边界。如: [1,2,2,2,3],target=2返回3， 即最右边的1
function searchLefttBorder (arr, target) {
	let l = 0;
	let r = arr.length - 1;
	var res = -1
	// [l, r]
	while (l <= r) {
		let mid = (l + r) >> 1
		if (arr[mid] === target) {
			res = mid
			// 继续先左边二分查找
			r = mid - 1
		} else if (arr[mid] > target) {
			r = mid - 1
		} else if (arr[mid] < target) {
			l = mid + 1
		}
	}
	return res
}

module.exports = {
	BinarySearch,
	searchRightBorder,
	searchLefttBorder
}
