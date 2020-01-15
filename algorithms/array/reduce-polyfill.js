
// 数组的reduce方法
function arrayReduce (cb, initVal) {
	if (typeof cb !== 'function') {
		throw new TypeError(`${cb} is not a function`)
	}
	const arr = this
	// 如果数组为空，并且没有传递初始值,则报错。
	// （原生数组的reduce传递null，undefined初始值是允许，只有不传时，才会报错）
	let i = 0
	if (arr.length === 0) {
		if (arguments.length <= 1) {
			throw new TypeError('Reduce of empty array with no initial value')
		}
		return initVal
	} else if (arguments.length === 1) {
		// 如果数组不为空，并且不传递初始值，则使用数组第一项作为初始值，并且从第二项开始遍历
		initVal = arr[0]
		i = 1
	}

	let ret = initVal

	for (; i < arr.length; i++) {
		ret = cb(ret, arr[i], i, arr)
	}
	return ret
}

const symbol = Symbol('arrayReduce')

Array.prototype[symbol] = arrayReduce

const arr = [1,2,3]

const newArr = arr.reduce(function (item, index, reciver) {
	console.log(item, index, reciver)
	if (index > 0) {
		return true
	}
})

console.log(newArr)

const newArr2 = arr[symbol](function (item, index, reciver) {
	console.log(item, index, reciver)
	if (index > 0) {
		return true
	}
})

console.log(newArr2)

