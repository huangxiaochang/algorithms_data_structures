const { linkList } = require('../linkList/link_list.js')

class Queue {
	constructor () {
		this.queue = new linkList()
	}

	isEmpty () {
		return (this.queue.head === null)
	}

	/*
		@params value *
		@return queue
	 */
	enqueue (value)	 {
		this.queue.append(value)
		return this
	}
	
	dequeue () {
		if (this.isEmpty()) {
			return null
		}
		let del_node = this.queue.delNodeByIndex(1)
		return del_node.value
	}

	peek () {
		if (this.isEmpty()) {
			return null
		}
		let first_node = this.queue.getNode(1)
		return first_node.value
	}

	toString (printFn) {
		return (printFn ? printFn(this.queue) : this.queue.toArrary())
	}
}

module.exports = {
	Queue
}