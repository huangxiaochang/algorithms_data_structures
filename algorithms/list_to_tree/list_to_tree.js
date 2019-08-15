// 根据列表中的项的parentId转换成tree的模式

// 列表中的项可以是无序的
// 算法思路：
// 先根据列表中的每一项的id建立映射对象
// 然后遍历每一项，根据父级id从映射对象中或者到相应的parent，把该项加入该parent中的children中
// 算法时间复杂度：o(2n) => o(n)
function listToTree (list) {
  var item = null,
      parent = null,
      child = null,
      map = {},
      res = [],
      listCopy = [];

  // 建立映射关系和去重
  list.reduce(function(arr, item) {
    if (!map[item.id]) {
      map[item.id] = item
      arr.push(item)
    }
    return arr
  }, listCopy)

  for(var i = 0 ; i < listCopy.length; i++) {
    item = listCopy[i]
    parent = map[item.parentId]
    // 使用!parent来判断是否是根
    // 优势：根不必为某一具体的值，如0，可以为任何值，如null， undefined等
    if (!parent) {
      res.push(item)
    } else {
      child = parent.children = parent.children || []
      child.push(item)
    }
  }
  return res
}

// 测试
var list = [
  {id:3,name:'部门C',parentId:1},
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4},
  {id:4,name:'部门D',parentId:1},
  {id:1,name:'部门A',parentId:0},
  {id:6,name:'部门F',parentId:3},
]

console.log(listToTree(list))