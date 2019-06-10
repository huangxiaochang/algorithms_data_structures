// 函数科里化
// 	主要应用： 延迟计算等场景。
//  实现的思路：
//     利用闭包先存储一部分的参数，然后再调用函数求值

function add (a, b, c) {
	return a + b + c
}

// 简单版的科里化

function simple_curring (fn) {
	var args = []
	return function curry () {
		var _args = [].slice.call(arguments)
		if (_args.length === 0) {
			return fn.apply(this, args)
		} else {
			args = args.concat(_args)
			return curry
		}
	}
}

var ad1 = simple_curring(add)  
console.log(ad1(1)(2,3)())
var ad2 = simple_curring(add)
console.log(ad2(1,2,3)())
var ad3 = simple_curring(add)
console.log(ad3(1)(2)(3)())

// 优化版的科里化：
// 接受的到参数达到形参的数量时，执行函数，否者返回函数继续接受参数
// 函数对象的length属性：
// 		表示函数形参的个数，但是不包含省略的参数和第一个有默认值的形参后面的形参

function f1(a, b = 1, c) {} // f1.length == 1
function f2(...args) {} // f2l.length == 0
function f3(a, ...args) {} // f3.length == 1

function curring (fn, args) {
	var length = fn.length
	args = args || []
	return function () {
		var _args = [].slice.call(arguments)
		args = args.concat(_args)
		// 实参个数大于形参，则执行函数
		if (args.length >= length) {
			return fn.apply(this, args)
		} else {
			// 否者返回函数，继续接收参数
			return curring.call(this, fn, args)
		}
	}
}

var ad1 = curring(add) 
console.log(ad1(1)(2,3))
var ad2 = curring(add)
console.log(ad2(1,2,3))
var ad3 = curring(add)
console.log(ad3(1)(2)(3))