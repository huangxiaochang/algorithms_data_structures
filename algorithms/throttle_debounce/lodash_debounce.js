// lodash中debounce的实现
// freeGlobal -> 全局对象，nodejs中为global
// freeSelf -> 自由变量self,
// root -> freeGlobal || freeSelf || window

// options.leading: 指定在延迟开始前调用
// options.trailing: 指定在延迟结束后调用
// options.maxWait： func呗延迟的最大值
// 这里我手动设置成window，实际会根据环境来确定
var root = window

function isObject (value) {
  var type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

function debounce(func, wait, options) {
  let lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime // 上一次触发防抖函数debounced的时间

  let lastInvokeTime = 0 // 上一次调用用户函数func的时间
  let leading = false
  let maxing = false
  let trailing = true

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  // 通过显示设置wait=0,来避开requestAnimationFrame
  const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function')

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  // 获取传进的配置
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  // 执行函数func,重置lastInvokeTime， lastArgs，lastThis
  function invokeFunc(time) {
    // 获取最后一次的参数和this
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    // 设置最后一次调用的时间
    lastInvokeTime = time
    // 使用最后一次的参数和this执行函数
    result = func.apply(thisArg, args)
    return result
  }

  // 开始计时
  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId);
      return root.requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  // 取消计时器
  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  // 设置一个定时器，设置lastInvokeTime，并根据leading决定执行func
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  // 剩余的等待时间
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    // 如果配置了maxwait最大延迟时间，剩余时间为延迟时间减去上一次事件的时间
    // 和最大延迟时间减上一次调用用户函数的时间
    // 否者剩余的时间为延迟时间减去上一次事件的时间
    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  // 是否应该调用用户函数
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    // 第一次执行debounced
    // 上一次执行debounced间隔大于延迟时间
    // 系统时间倒退
    // 上一次执行func大于最大延迟时间
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  // 计时器到期
  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    // 重新开始计时器
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    // 设置最后一次执行debounced的参数，this，和调用的时间
    lastArgs = args
    lastThis = this
    lastCallTime = time

    // 满足执行func的要求
    if (isInvoking) {
      if (timerId === undefined) {
        // 首次调用或者trailingEdge执行过函数
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }

    // 不满足执行func的条件
    // 在上一次wait的trailingEdge已经执行了func
    // 设置定时器保证本次trailingEdge的执行
    // 
    // 定时器timerId只会在trailing中自动设置为undefined，和开始时为undefined
    // 其他的时候为undefined只有手动设置
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }

    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

