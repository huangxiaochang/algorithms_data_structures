// 递归算法
// 递归算法的精粹就是一种先进后出的栈，然后加一个结束递归的条件即可
function reverseNumber (num) {
  if ((num / 10 >> 0) === 0) {
    return ('' + num)
  }
  return ('' + num % 10 + reverseNumber(num / 10 >> 0) )
}
console.log(reverseNumber(1328))

function printNumber (n, i) {
  var i = i || 1
  if (i === n) {
    console.log(n)
    return i
  }

  // console.log(i)
  return( '' + i + printNumber(n, i + 1) + i)
  // console.log(i)
}
console.log(printNumber(5))