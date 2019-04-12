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

module.exports = {
	permutateWithoutRepet,
	permutateWithRepet
}