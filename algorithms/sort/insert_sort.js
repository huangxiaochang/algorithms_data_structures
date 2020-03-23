/*
 插入排序：时间复杂度(o(n^2)),最好为o(n)，空间复杂度o(1),稳定性：稳定。

 插入排序对于几乎是有序的序列的排序的效率高，即可达到线性排序效率，但是它是低效的，
 因为每一次只能将数据移动一位。

 排序算法的稳定性是指存在多个具有相同关键字的记录，经过排序之后，是否保持他们原本
 的位置关系。排序算法的稳定性对于排序内容是一个复杂的对象的多个数字属性，并且需要
 保持他们原本的顺序时，算法的稳定性才有意义，否则该排序算法是否稳定，是没有什么影响的。

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