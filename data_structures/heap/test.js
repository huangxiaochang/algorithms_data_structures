const { Heap } = require('./heap.js')

const heap = new Heap()

heap.heap = [10, 7, 2, 5, 1, 3]
console.log(heap.toString())
heap.printTree()