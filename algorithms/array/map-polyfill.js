
// 数组的map方法
function arrayMap(cb) {
	if (typeof cb !== 'function') {
		throw new TypeError(`${cb} is not a function`)
	}
	const arr = this
	const ret = []
	for (let i = 0 ; i < arr.length; i++) {
		ret.push(cb(arr[i], i, arr))
	}
	return ret
}

const symbol = Symbol('map')

Array.prototype[symbol] = arrayMap

const arr = [1,2,3]

const newArr = arr.map(function (item, index, reciver) {
	console.log(item, index, reciver)
	return item * 2
})

console.log(newArr)

const newArr2 = arr[symbol](function (item, index, reciver) {
	console.log(item, index, reciver)
	return item * 2
})

console.log(newArr2)

