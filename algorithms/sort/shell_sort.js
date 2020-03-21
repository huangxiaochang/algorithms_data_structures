/*
	希尔排序（递减增量排序）： 是插入排序的一种更加高效的改进版本。
	时间复杂度o(n^1.5左右，和所选的增量序列有关), 最坏情况下为o(n^2), 不稳定 空间复杂度o(1)。

	排序思想：先将整个待排序的序列分割成若干子序列分别进行插入排序，带整个
	序列中的记录基本有序时，再对全体记录进行插入排序。

	步骤：
	1.选择一个增量序列，t1,t2.., tk。其中tk为1. (一般增量序列可以为n/2, n/4, n/8.., 1)
	2.按照增量序列个数K，对序列进行K趟排序。
	3.每趟排序，根据对应的增量ti, 将待排序列分割成若干长度为m的子序列(如增量为3时，分组为：
	(1，3, 6..), (2,5,8..)(4,7,10,..))，分别进行对个子序列进行直接插入排序，仅增量因子为1时，整个序列作为一个表来处理。
*/

function shellSort(array) {
	var arr = [].concat(array)
	var len = arr.length
	var gap = len / 2 >> 0
	// 选择增量序列： n / 2, n / 4, n / 8, ..., 1
	for (gap; gap > 0; gap = (gap / 2 >> 0)) {
		// 按照增量，对序列进行增量序列个数k，进行k趟排序
		for (var k = gap; k < len; k++) {
			var temp = arr[k]
			// for-3
			// 对每个子序列(k, k - gap, k - 2gap, ... )进行直接插入排序
			for (var i = k - gap; i >= 0 && arr[i] > temp; i = i - gap) {
				arr[i + gap] = arr[i]
			}
			// 因为上面的for-3循环结束时，i减了gap，所以要加回来
			arr[i + gap] = temp
		}
	}
	return arr
}

module.exports = {
	shellSort
}

