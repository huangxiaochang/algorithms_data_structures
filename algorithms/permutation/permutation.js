/*
	排列: [1,2,3]的全排列有6种,[2,1,3],[1,3,2]等等.
	算法思路：固定第一个位置的数，然后全排剩下的数，直到全部全排列完。
		如果只有一个数，则直接返回，否者使用第一个元素和其他元素进行交换
 */

// 此全排序算法适用于没有重复项的全排序，如果有重复项，输出的结果也会有重复项
function permutateWithoutRepet (arr) {
	if (!Array.isArray(arr)) { return }

	if (arr.length <= 1) {
		return [arr]
	}

	const permutations = []

	// 固定第一个位置，然后递归全排序剩余的数据得到全排序的结果res
	let res = permutateWithoutRepet(arr.slice(1))

	let firstOption = arr[0]

	// 对除了第一个数据之外全排序的每一种结果进行处理，即对于每一种结果用第一个数据和后面的数据进行交换
	for(let i = 0 ; i < res.length; i++) {
		// 得到其中一种全排序
		let p = res[i]
		// 用第一个数据和某个全排结果后面的数据进行交换
		for (let j = 0; j <= p.length; j++) {
			let pre = p.slice(0, j)
			let suf = p.slice(j)
			permutations.push(pre.concat([firstOption], suf))
		}
	}

	// 返回全部全排序之后的结果
	return permutations

}

function permutateWithRepet(arr) {
  if (!Array.isArray(arr)) { return }

	if (arr.length <= 1) {
		return [arr]
	}

	const permutations = []

	// 固定第一个位置，然后递归全排序剩余的数据得到全排序的结果res
	let res = permutateWithoutRepet(arr.slice(1))

	let firstOption = arr[0]
	let cache = {}
	// 对除了第一个数据之外全排序的每一种结果进行处理，即对于每一种结果用第一个数据和后面的数据进行交换
	for(let i = 0 ; i < res.length; i++) {
		// 得到其中一种全排序
		let p = res[i]
		// 用第一个数据和某个全排结果后面的数据进行交换
		for (let j = 0; j <= p.length; j++) {
			let pre = p.slice(0, j)
			let suf = p.slice(j)
			let option = pre.concat([firstOption], suf)
			let key = option.toString()
			// 重复项去重
			if (!cache[key]) {
				permutations.push(option)
				cache[key] = true
			}
		}
	}

	// 返回全部全排序之后的结果
	return permutations
}

function quitSort(orgArr=[]) {
	if (orgArr.length <= 1) {
		return orgArr
	}
	let pos = orgArr.shift()
	let left = []
	let right = []
	for(let i = 0; i < orgArr.length; i++) {
		if (pos > orgArr[i]) {
			left.push(orgArr[i])
		} else {
			right.push(orgArr[i])
		}
	}
	return quitSort(left).concat([pos], quitSort(right))
}

function getMin(arr, pos) {
	let len = arr.length - 1
	let minPos
	for(let i = len; i > pos; i--) {
		if (arr[i] > arr[pos]) {
			if (!minPos) {
				minPos = i
			}	else {
				if (arr[i] < arr[minPos]) {
					minPos = i
				}
			}
		}
	}
	return minPos
}

// 全排序非递归算法，按字典序排列算法
// 算法思路：
//  1。把所有数排成一个最小数（即数组项是从小到大的）
// 	2。从后向前找到第一双相邻的递增数字。
// 	3。把前一个数作为替换数a，从后找到比替换数大的最小数b
// 	4。交换a,b。然后将替换点之后的数进行反转。
// 	5。打印输出一种排序
//  6。如果这个数达到最大，则结束循环
//  即从最小数到最大数的所有组合即为这几个数字的所有组合

function permutateWithStack (arr) {
	let permutations = []
	// 进行排序，即把所有的数排成一个最小数
	arr = quitSort(arr)
	// 得到最大数
	let max = arr.slice(0).reverse()
	max = 1 * max.join('')

	// 最小数也是一种全排序， 加入结果中
	permutations.push([...arr])

	while (true) {
		// 找到替换的两个数
		let a = 0
		let b = 0

		// 从后面开始查找第一双相邻的递增数字
		for(let i = arr.length - 1; i > 0; i--) {
			if (arr[i -1] < arr[i]) {
				// 前一个数作为替换数a
				a = i-1
				// 找到比替换数大的最小数
				b = getMin(arr,a)
				break
			}
		}
		// 替换
		let temp = arr[a]
		arr[a] = arr[b]
		arr[b] = temp

		// 因为替换之后，a后面的项的大小顺序并没有发生改变， 也非下一个最小的排列，所以反转替换点之后的数据，
		// 这样既可保证是下一个最小的数
		arr = arr.slice(0,a + 1).concat(arr.slice(a+1).reverse())
		permutations.push(arr.slice(0))

		let num = 1 * arr.join('')
		if (num === max) { 
			break 
		}
	}

	return permutations
}

module.exports = {
	permutateWithoutRepet,
	permutateWithRepet,
	permutateWithStack
}