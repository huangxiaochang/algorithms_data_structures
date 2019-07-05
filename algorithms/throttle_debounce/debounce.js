// 防抖
// 指定时间间隔内都没有发生事件时，才会执行防抖函数
/*
	@params {fn} 需要防抖的函数
	@params {delay} 防抖的时间间隔
	@params {immediate} 是否响应第一次事件,第一次事件： 超出防抖间隔事件后到达的第一次事件
*/
function debounce(fn, delay, immediate) {
	var timer = null, res = undefined, isFirst = true;
	immediate = immediate || false
	var debounced = function db () {
		var args = [].slice.call(arguments)
		var self = this
		if (timer) { 
			clearTimeout(timer)
			isFirst = false
		}
		if (immediate) {
			if (!timer) {
				res = fn.apply(self, args)
			}
			timer = setTimeout(function() {
				if (!isFirst) {
					res = fn.apply(self, args)
				}
				clearTimeout(timer)
				timer = null
				isFirst = true
			}, delay)
		} else {
			timer = setTimeout(function () {
				res = fn.apply(self, args)
				clearTimeout(timer)
				timer = null
			}, delay)
		}
		return res
	}

	debounced.cancel = function () {
		clearTimeout(timer)
		timer = null
		isFirst = true
	}

	return debounced
}