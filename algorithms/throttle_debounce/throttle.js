// 节流
// 每个指定时间间隔内的事件，只执行一次节流函数
/*
	@params {fn} 节流的函数
	@params {delay} 节流的时间
	@params {endEvent} 是否响应最后一次事件
*/

function throttle(fn, delay,endEvent) {
	var last = null
	var timer = null
	return function tt () {
		var args = [].slice.call(arguments)
		var self = this
		var now = +new Date()
		if (now - last >= delay || !last ) {
			fn.apply(self, args)
			last = now
		} else if (endEvent) {
			// 响应最后一次事件
			if (timer) {
				clearTimeout(timer)
				timer = null
			}
			timer = setTimeout(function () {
				fn.apply(self, args)
			}, delay)
		}
	}
}