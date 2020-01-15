
// 数组的filter方法
function arrayFilter(cb) {
	if (typeof cb !== 'function') {
		throw new TypeError(`${cb} is not a function`)
	}
	const arr = this
	const ret = []
	for (let i = 0 ; i < arr.length; i++) {
		if (cb(arr[i], i, arr)) {
			ret.push(arr[i])
		}
	}
	return ret
}

const symbol = Symbol('filter')

Array.prototype[symbol] = arrayFilter

const arr = [1,2,3]

const newArr = arr.filter(function (item, index, reciver) {
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

