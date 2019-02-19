import { Comparator } from '../util.js'

class LinkListNode {
	constructor(value, next=null) {
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
	// prepend a node to a linkList
	/* @params value *
		 @retrun linkList
	*/
	prepend(value) {
		const newNode = new LinkListNode(value, this.head)
		this.head = newNode
		if (!this.tail) {
			this.tail = newNode
		}
		return this
	}
	/*
		append a new node to a linklist
		@params value *
		@retrun linkList
	*/
	append(value) {
		const newNode = new LinkListNode(value)
		if (!this.head) {
			this.head = newNode
			this.tail = newNode
		} else {
			this.tail.next = newNode
			this.tail = newNode
		}
		return this
	}
}

export LinkListNode
export default linkList