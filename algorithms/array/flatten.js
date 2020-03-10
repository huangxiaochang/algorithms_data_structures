// 多维数组扁平化

function es6_flatten(arr) {
	while(arr.some(item => Array.isArray(item))) {
		// concat方法可以有多个参数，如果参数某一项不是数组。那么会直接加入，否者会把该数组项的每一项加入
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

function recerive_flatten2(arr) {
	var res = []
	for(var i = 0 ; i < arr.length; i++) {
		if (arr[i] instanceof Array) {
			res = res.concat(recerive_flatten(arr[i]))
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

// 不使用递归，保证偏平的顺序
function recerive_flatten (arr) {
	while (arr.some(function(item) {
		return (item instanceof Array) ? true : false
	})) {
		var res = []
    for (var i = 0 ; i < arr.length; i++) {
      if (arr[i] instanceof Array) {
      	// 每次只偏平化第一个数组，这样才能保证顺序
        res = res.concat(arr[i], arr.slice(i+1))
        break;
      } else {
        res.push(arr[i])
      }
    }
    arr = res
	}
	return arr
}

module.exports = {
	es6_flatten,
	recerive_flatten,
	non_recerive_flatten
}