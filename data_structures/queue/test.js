const { Queue }  = require('./queue.js')

const queue = new Queue()
console.log(queue, 'queue')
console.log(queue.isEmpty())
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
console.log(queue.peek())
queue.dequeue()
console.log(queue.peek())
console.log(queue.toString())