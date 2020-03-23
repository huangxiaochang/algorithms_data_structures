/*
	计算排序： 时间复杂度 o(n), 空间复杂度数组中的最大值为长度的数组。
	优点： 时间复杂度为线性级别
	缺点： 需要的空间复杂度是最大的，和待排序列中最大值有关，
	并且最值要在数组有效长度范围内, 同时待排序列不能有负值。
	思路：
	将输入的数据值转化为键存储在额外开辟的数组空间中(如果待排序列值相差很大，同时序列个数不大
	可以使用字典来作为额外开闭的空间)。
*/

function countSort(array) {
	var arr = [].concat(array)

	// 对于静态类型语音，可以向遍历待排序列，找出最大值，然后创建最值为长度的数组
	var map = []
	
	for (var i = 0; i < arr.length; i++) {
		var k = arr[i]
		if (map[k]) {
			map[k] += 1
		} else {
			map[k] = 1
		}
	}
	var j = 0;

	for (var k = 0 ; k < map.length; k++) {
		var t = 0
		if (map[k]) {
			while (t < map[k]) {
				arr[j++] = k
				t++
			}
		}
	}
	return arr
}


module.exports = {
	countSort
}

