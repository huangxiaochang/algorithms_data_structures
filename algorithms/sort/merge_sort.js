/*
	归并排序: 时间复杂度: nlogn,最好nlogn,最坏nlogn.空间复杂度n。稳定性：稳定.
	算法思想：采用经典的分治策略来实现的算法。分治的分是将问题分成一些小的问题然后递归求解。
	分治的治就是将分阶段得到的各个答案修补在一起。
 */

// 归并排序的递归算法
function mergeSort (arr) {
	if (arr.length <= 1) {
		return arr
	}
	var middle = (0 + arr.length) >> 1
	// 分别分治数组左右两边
	var left = mergeSort(arr.slice(0,middle))
	var right = mergeSort(arr.slice(middle))
	// 把分后的数组治成一个有序的数组
	return merge(left, right)
}

// 这里的治的原理把两个有序的数组合成一个有序的数组
function merge (left, right) {
	var ret = []
	var i = 0, j = 0;

	while(i < left.length && j < right.length) {
		ret.push(left[i] <= right[j] ? left[i++] : right[j++])
	}
	while (i < left.length) {
		ret.push(left[i++])
	}
	while (j < right.length) {
		ret.push(right[j++])
	}
	return ret
}

// 归并排序的非递归算法:
// 非递归算法是递归算法的相反的思路，即从最小子问题开始，一步一步解决，直复杂的问题.
// 1.即开始时，最小子问题为每个数组一个元素，然后相邻的两个数组进行合并。
// 2.第二次为每个数组2个元素，然后相邻的两个数组进行合并
// 3.依次类推，直到最后为两个数组进行合并
// 可以看出每个子数组元素的个数是以2倍数递增
function mergeSortWithoutRecursive (arr) {
	if (arr.length <= 1) {
		return arr
	}
	var step = 1 // 开始时，最小子问题为每个数组一个元素
	var array = arr.slice(0)
	while (step < array.length) {
		var i = 0 // 分割成每个数组时每个数组元素的开始位置
		while(i < array.length) {
			var middle = i + step
			// j = middle + step
			var j = Math.min(i + 2 * step, array.length)
			// 合并数组[i,middle),和[middle, j)
			if (middle < j) {
				var res = merge(array.slice(i, middle), array.slice(middle, j))
				array = array.slice(0, i).concat(res).concat(array.slice(j))
			}
			// 处理下一组数组
			i += 2 * step
		}
		step *= 2
	}
	return array
}

module.exports = {
	mergeSort,
	mergeSortWithoutRecursive
}