const { linkList } = require('../linkList/link_list.js')

class Stack {
	constructor () {
		this.stack = new linkList()
	}

	isEmpty () {
		return (this.stack.head === null)
	}

	/*
		@params value *
		@return stack
	 */
	push (value)	 {
		this.stack.append(value)
		return this
	}
	
	pop () {
		if (this.isEmpty()) {
			return null
		}
		let del_node = this.stack.delNodeByIndex(this.stack.length)
		return del_node.value
	}

	peek () {
		if (this.isEmpty()) {
			return null
		}
		let first_node = this.stack.tail
		return first_node.value
	}

	toString (printFn) {
		return (printFn ? printFn(this.stack) : this.stack.toArrary())
	}
}

module.exports = {
	Stack
}