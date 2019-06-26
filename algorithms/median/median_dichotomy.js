// 二分分治法求两个有序数组的中位数, 时间复杂度： log(n + m)

// 分治法

var a = [1,4,7,9]
var b = [2,3,5]

// 中位数和top k 的问题
function findMedian(a, b, k) {
	var m = a.length, n = b.length;
	// 二分分治求值时，以长度比较短的数组作为基准分支，效率高一些
	if (n < m) {
		var temp = a
		a = b
		b = temp
		m = a.length
		n = b.length
	}
	// j = m *2 + 1,保证了数组的长度为奇数
	var l1,l2,r1,r2,c1,c2,i = 0, j = m * 2; // j = m * 2 + 1 - 1

	// 进行二分分治
	while(i <= j) {
		c1 = (i + j) / 2 >> 0 // 对a数组进行二分
		// m + n + 1 - 1为合并后的数组的中位数
		c2 = k ? 2 * k - c1 : ((m + n) - c1) >> 0

		l1 = c1 === 0 ? Number.MIN_VALUE : a[(c1 - 1) / 2 >> 0]
		r1 = c1 === 2 * m ? Number.MAX_VALUE : a[c1 / 2 >> 0] 

		l2 = c2 === 0 ? Number.MIN_VALUE : b[(c2 - 1) / 2 >> 0]
		r2 = c2 === 2 * n ? Number.MAX_VALUE : b[c2 / 2 >> 0] 

		if (l1 > r2) {
			// c1要变小，c2要变大
			j = c1 - 1
		} else if (l2 > r1) {
			// c1要变大，c2要变小
			i = c1 + 1
		} else {
			// 说明 l1 <= r2, l2 <= r1
			break
		}
	}
	return k ? Math.max(l1, l2) : (Math.max(l1, l2) + Math.min(r1, r2)) / 2
}

console.log(findMedian(b, a, 4))