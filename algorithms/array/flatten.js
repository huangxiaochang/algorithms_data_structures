// 多维数组扁平化

function es6_flatten(arr) {
	while(arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr)
	}
	return arr
}

function recerive_flatten(arr, res) {
	res = res || []
	for(var i = 0 ; i < arr.length; i++) {
		if (arr[i] instanceof Array) {
			recerive_flatten(arr[i], res)
		} else {
			res.push(arr[i])
		}
	}
	return res
}

// 偏平化后的顺序没有保证
function non_recerive_flatten(arr) {
	var queue = [arr],
			subArr = null,
			res = [];

	while(queue.length) {
		subArr = queue.shift()
		for(var i = 0 ; i < subArr.length; i++) {
			if (subArr[i] instanceof Array) {
				queue.push(subArr[i])
			} else {
				res.push(subArr[i])
			}
		}
	}

	return res
}

module.exports = {
	es6_flatten,
	recerive_flatten,
	non_recerive_flatten
}