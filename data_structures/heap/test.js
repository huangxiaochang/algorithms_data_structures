const { minHeap } = require('./minHeap.js')
const { maxHeap } = require('./maxHeap.js')

const min_heap = new minHeap()
const max_heap = new maxHeap()

max_heap.heap = [10, 7, 8, 5, 1, 4, 6, 2, 3]
max_heap.insert(16)
console.log(max_heap.toArray())
max_heap.remove(5)
console.log(max_heap.toArray())

min_heap.heap = [2,4,7,10,6,12,20,13,15,8,9,30]
min_heap.insert(5)
console.log(min_heap.toArray())
min_heap.remove(4)
console.log(min_heap.toArray())
