/*
	快速排序的时间复杂度： nlogn, 最坏为n^2, 最好为nlogn, 稳定性： 不稳定
	此方法比使用数组的方式占用的内存小
 */
class QuickSortInPlace {
	constructor(compareFn) {
		this.compare = compareFn || function(a, b) { return a >= b ? true : false }
	}

	partition(arr, low, high) {
		// 标记为是最值时，还有问题
		let pivot = arr[low]

		while(low < high) {
			while(low < high && this.compare(arr[high], pivot)) {
				high--
			}
			if (low < high) {
				arr[low++] = arr[high]
			}
			while(low < high && this.compare(pivot, arr[low])) {
				low++
			}
			if (low < high) {
				arr[high--] = arr[low]
			}
		}
		arr[low] = pivot
		return low
	}

	sort(orgArr=[], low=0, high=orgArr.length - 1) {
		if (low < high) {
			let pivot = this.partition(orgArr, low, high)
			this.sort(orgArr, low, pivot - 1)
			this.sort(orgArr, pivot + 1, high)
		}
		return orgArr
	}
}

module.exports = {
	QuickSortInPlace
}