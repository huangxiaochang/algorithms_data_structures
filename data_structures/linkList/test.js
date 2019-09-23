const { linkList } = require('./link_list.js')

let list = new linkList()
list.append(2)
list.append(3)
list.prepend(1)
list.append(4)
console.log(list.locateNode(3), 'locate')
console.log(list.listLength(), 'length')
console.log(list.getNode(2), 'getNode 2')
list.insertNode(5, 3)
list.insertNode(0, 4)
list.delNodeByIndex(2)
list.delNodeByValue(1)
console.log(list.toArrary())
list.reverse()
console.log('--',list.tail, list.head, '--')
console.log(list, 'list')
console.log(list.toArrary(), 'listArray')

let link = new linkList()

link.append(1)
link.append(2)
link.append(3)
link.append(4)
link.append(5)

console.log(link.toArrary(), 'listArray')

link.reverseWithStep(4)

console.log(link.toArrary(), 'reverse')


const link2 = new linkList([2,3,57,8,0,24,5])

console.log(link2)
console.log(link2.toArrary(), 888)

