// 非递归快速排序算法

function quickSortWithNonRecurive (arr) {
  var stack = [arr],
      res = [],
      pos = null,
      item = null,
      left = null,
      right = null;

  while(stack.length) {
    item = stack.pop()
    if (item.length <= 1) {
      res = item.concat(res)
      continue
    }
    pos = item[item.length - 1]
    left = []
    right = []
    for(var i = 0 ; i < item.length - 1; i++) {
      if (item[i] < pos) {
        left.push(item[i])
      } else {
        right.push(item[i])
      }
    }
    stack.push(left)
    stack.push([pos])
    stack.push(right)
  }
  return res
}

module.exports = {
	quickSortWithNonRecurive
}