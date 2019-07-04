// 节流
// 每个指定时间间隔内的事件，只执行一次节流函数.
// 思路：
/*
	方案1，记录上一次执行回调的时间，然后每次事件触发时，判断两者的时间差是否
	到达了需要等待的时间，如果是，则执行回调，设置上一次执行回调的时间为当前时间，
	这种方案的缺点是不能响应最后一次事件。
	方案二，事件触发时，设置一个定时器在需要等待的时间之后执行，在这段时间内，如果
	有事件再次触发，则清空之前的定时器，重新设置一个。这种方案的缺点是不能响应第一次
	事件。

	所以为了能够响应第一次事件或者最后一次事件，需要使用者两种方案结合使用。

*/
/*
	@params {fn} 节流的函数
	@params {delay} 节流的时间
	@params {options} 是否响应最后一次事件
	不能同时设置options.leading, options.tailing为false
*/

function throttle (func, wait, options) {
	var res = undefined, context = null, args = null;
	options = options || {}

	var preTime = 0
	var timer = null

	var throttled = function () {
		var nowTime = +new Date
		context = this
		args = [].slice.call(arguments)

		// 是第一次事件并且不响应第一次事件
		if (!preTime && options.leading === false) {
			preTime = nowTime
		}

		// 还需要等待的时间，第一次事件时， preTime = 0
		var remaining = wait - (nowTime - preTime)

		// 如果达到了等待的时间，或者响应第一次事件(第一次事件，preTime = 0, 所以remaining < 0)，则执行事件处理函数
		if (remaining <= 0) {
			// 如果达到了等待的时间，还有事件触发，那么不是最后一次事件
			// 则需要清除之前设置最后一次事件处理程序
			if (timer) {
				clearTimeout(timer)
				// 要清空timer, 这样才会设置下次最后一次事件的定时器，
				// 因为只有没有设置定时器，才会设置新的定时器
				timer = null
			}
			// 设置上一次执行回调的时间为当前时间
			preTime = nowTime
			// 执行回调函数
			res = func.apply(context, args)
			// 防止内存泄漏
			context = args = null
		} else if (!timer && options.tailing !== false) {
			// 处理是否响应最后一次事件
			// 只有当设置了options.tailing = true 响应最后一次事件时，
			// 并且还没有设置定时器的时候，才进行设置一个定时器来响应最后一次事件.
			// 定时的时间为执行过一次回调函数后，在等待时间内再次发生的事件的时间
			// 到需要等待的时间之间的时间端，这样才能保证每隔等待时间执行一次回调
			timer = setTimeout(later, remaining)
		}
		return res
	}

	// 最后一次事件的处理
	function later () {
		// 如果要响应第一次事件的话，上一轮的最后一次事件执行完后，要设置preTIme
		// 为now,否则的话，上一轮的最后一次事件执行完后， 如果在wait内再次事件触发的
		// 话，会马上执行，所以要设置成now, 这样就能下一轮的第一次事件会在等待时间wait
		// 达到了事件才执行
		preTime = options.leading === false ? 0 : +new Date
		// 执行回调， 因为每次事件都会触发throttled，并且都重新设置了conext,args,
		// 所以context，args为最后一次事件提供的上文对象和参数
		res = func.apply(context, args)
		// 清空timer，这样可以设置下一次新的定时器，因为设置定时器时，存在timer时，并不会重新设定
		timer = context = args = null
	}

	// 用于手动按需取消响应最后一次事件
	throttled.cancel = function () {
		clearTimeout(timer)
		preTime = 0
		timer = context = args = null
	}

	return throttled
}