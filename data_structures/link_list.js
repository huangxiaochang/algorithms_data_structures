import { Comparator } from '../util.js'

class LinkListNode {
	constructor(value, next) {
		this.value = value
		this.next = next
	}
	toString(callback) {
		return callback ? callback(this.value) : `${this.value}`
	}
}

class linkList {
	constructor(compareFn) {
		this.head = null
		this.tail = null
		this.compare = new Comparator(compareFn)
	}
}

export LinkListNode
export default linkList