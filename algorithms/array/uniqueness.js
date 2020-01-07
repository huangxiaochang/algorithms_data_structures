// 数组去重
// 需要考虑数组中的NaN, null, undefined, 包装对象， number， string等类型

// 双层for循环：时间复杂度高, 去重不了NaN，但简单
function uniqueWithForLoop(arr) {
	// 如果需要不影响原数组，可以先拷贝
	for(let i = 0, len = arr.length ; i < len; i++ ) {
		for (let j = i + 1; j < len; j++) {
			// 去重不了NaN
			if (arr[i] === arr[j]) {
				arr.splice(j, 1)
				j--
				len--
			}
		}
	}
	return arr
}

// sort + for: 去重的能力和双for一样，不过时间复杂度较低
function uniqueWithSort(arr) {
	arr.sort()
	let pre
	let res = []
	console.log(arr, '---')
	for(let i = 0 ; i < arr.length; i++) {
		let item = arr[i]
		if (i === 0 || pre !== item) {
			res.push(item)
		}
		pre = item
	}
	return res
}

// filter + indexOf
function uniqueWithFilter(arr) {
	return arr.filter((item, index) => {
		// 两者相等，说明只存在唯一的值，同样，由于indexOf的底层采用的是===，会忽略掉NaN
		return arr.indexOf(item) === index
	})
}

// map + reduce: 一种能够完全去重并且时间复杂度较好的方法, 但是需要注意键名的问题,还有就是
// 空间复杂度是最高的
function uniqueWithReduce(arr) {
	// 注意：如果这里使用的是 map = {}, 要注意1和'1'，键同名的问题，可以使用map[typeof item + item]
	// 来解决.使用es6的map/数据结构时，注意，对于对象来说，只有同一个对象的引用才视为同一个键
	const map = {}
	return arr.reduce((initVal, item) => {
		var key = typeof item + item
		if (!map[key]) {
			initVal.push(item)
		}
		map[key] = true
		return initVal
	}, [])
}

// es6的Set: 不能去重对象, 但是简单，时间复杂度比较好
function uniqueWithEs6(arr) {
	return [...new Set(arr)]
}

const arr = [1, 1,'1', '1', NaN, NaN, null, null, undefined, undefined, String('1'), String('1'),
	new Number(1), new Number(1), {a:1}, {a:1}]

console.log(uniqueWithEs6(arr))




