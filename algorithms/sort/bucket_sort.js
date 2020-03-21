/*
 桶排序是计数排序的优化版本，它利用了函数映射关系，把各个待排项比较均衡的分配到
 各个桶中，即各个桶中的数据项比较相近，然后在使用插入排序算法对每个桶进行排序。
 所以桶排序的高效性取决于所利用的映射函数。桶排序是为了减少基数排序中所使用的额外空间
 桶排序的关键：
 1. 在额外空间充足条件下，尽量增大桶的数量。
 2.所使用的映射函数要能够将待排项均衡地分配到各个桶中

*/

var { insertSort } = require('./insert_sort.js')

function bucketSort (array) {
	var arr = [].concat(array)
	if (arr.length <= 1) {
		return arr
	}
	var min = arr[0]
	var max = arr[0]
	// 获取待排序列中最小值和最大值
	for (var i = 1; i < arr.length; i++) {
		if (arr[i] < min) {
			min = arr[i]
		} else if (arr[i] > max) {
			max = arr[i]
		}
	}

	// 确定桶的个数和大小
	var size = 5
	var bucketCount = Math.floor((max - min) / size ) + 1
	var buckets = new Array(bucketCount)
	// 利用映射函数， 把各项分配到各个桶中
	for (var i = 0 ; i < arr.length; i++) {
		var k = Math.floor((arr[i] - min) / size)
		;(buckets[k] || (buckets[k] = [])).push(arr[i])
	}
	var index = 0 
	// 对每个桶中的数据进行插入排序，然后组合
	for (var j = 0 ; j < buckets.length; j++) {
		var res = []
		if (buckets[j]) {
			res = insertSort(buckets[j])
		}
		for (var t = 0 ; t < res.length; t++) {
			arr[index++] = res[t]
		}
	}
	return arr
}

module.exports = {
	bucketSort
}

