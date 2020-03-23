/*
	基数排序(多关键字排序算法)： 时间复杂度o(d(r + n)),其中r为关键字的基数，d为长度
	思路： 把待排项分别按照各位数进行分类排序

	基数排序 vs 计数排序 vs 桶排序
	这三种算法都利用到了桶的概念，但在桶的使用方法上有所不同
	计数排序： 每个桶只存储单一键值
	基数排序： 根据键值得每位数字来分配桶
	桶排序： 每个桶存储一定范围的数值
*/

function radixSort(array) {
	var arr = [].concat(array)
	// 按照数位的大小0-9来分配桶
	var bucket = []
    // 待排序列中的最大位数, 默认为1, 也可以先确定最大的位数
    var maxDigit = 1
    var k = 1 
    var dev = 1
    while (k <= maxDigit) {
    	var flag = false
    	for (var i = 0 ; i < arr.length; i++) {
			// 获取对应位数上的数
			var num = (arr[i] / dev) >> 0
			// 如果num >= 10 ,更新最大位数
			if (!flag && num >= 10) {
				maxDigit++
				flag = true
			}
			var mod = num % 10
			;(bucket[mod] || (bucket[mod] = [])).push(arr[i])
		}

		// 对桶中的数项进行组合
		var index = 0
		for (var j = 0 ; j < bucket.length; j++) {
			var bk = bucket[j]
			if (bk) {
				for (var t = 0 ; t < bk.length; t++) {
					arr[index++] = bk[t]
				}
			}
		}

		// 进行下一个位数的基数排序
    	k++
    	dev *= 10 
    	bucket = []
    }
	return arr
}

module.exports = {
	radixSort
}