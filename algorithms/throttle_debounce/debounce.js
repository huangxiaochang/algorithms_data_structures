// 防抖
// 指定时间间隔内都没有发生事件时，才会执行防抖函数
/*
	@params {fn} 需要防抖的函数
	@params {delay} 防抖的时间间隔
	@params {startEvent} 是否响应第一次事件,第一次事件： 超出防抖间隔事件后到达的第一次事件
*/
function debounce(fn, delay, startEvent) {
	var timer = null
	startEvent = startEvent || false
	var isFirst = true
	return function db () {
		var args = [].slice.call(arguments)
		var self = this
		if (startEvent) {
			fn.apply(self, args)
			startEvent = false
		}
		if (timer) {
			clearTimeout(timer)
			timer = null
			isFirst = false
		}
		timer = setTimeout(function () {
			if (!isFirst) {
				fn.apply(self, args)
			}
			startEvent = true
		}, delay)
	}
}
