/*
 插入排序：时间复杂度(o(n^2)),最好为o(n)，空间复杂度o(1),稳定性：稳定
 */

function insertSort (arr) {
	var length = arr.length
	// 从第二个元素开始，因为第一个元素本来就有序
	var ret = arr.slice(0)
	for (var i = 1; i < length; i++) {
		var temp = ret[i]
		var j = i - 1;
		while (j >= 0 && temp < ret[j]) {
			ret[j + 1] = ret[j]
			j--
		}
		ret[j + 1] = temp
	}
	return ret
}

module.exports = {
	insertSort
}