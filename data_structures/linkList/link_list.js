const { Comparator } = require('../../util.js')

class linkListNode {
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
		this.length = 0
		this.compare = (new Comparator(compareFn)).compare
	}
	/*
		return linkList length
	*/
	listLength() {
		return this.length
	}
	isEmpty () {
		return !this.head
	}
	/*
		reverse a linkList
		反转链表合影使用递归来实现，因为它可以分成多个相似的子问题
	 */
	reverse () {
		// pre用来保存已经反转的链表的head
		let pre = null, last = null;

		while (this.head) {
			last = this.head.next
			this.head.next = pre
			pre = this.head
			this.head = last
		}
		this.head = pre
	}
	// prepend a node to a linkList
	/* @params value *
		 @retrun linkList
	*/
	prepend(value) {
		const newNode = new linkListNode(value, this.head)
		this.head = newNode
		if (!this.tail) {
			this.tail = newNode
		}
		this.length++
		return this
	}
	/*
		append a new node to a linklist
		@params value *
		@retrun linkList
	*/
	append(value) {
		const newNode = new linkListNode(value)
		if (this.isEmpty()) {
			this.head = newNode
			this.tail = newNode
		} else {
			this.tail.next = newNode
			this.tail = newNode
		}
		this.length++
		return this
	}
	/*
		locate a node from a linklist
		@params value 
		@retrun index || -1
	*/
	locateNode(value, compareFn) {
		let index = -1
		compareFn = compareFn || this.compare
		let h = this.head
		while(h) {
			index += 1
			if (compareFn(value, h.value) === 0) {
				break
			}
			h = h.next
		}
		return index + 1
	}
	/*
		find a node from a linklist
		@params value 
		@retrun listNode
	*/
	findNode(value, compareFn) {
		let index = -1
		compareFn = compareFn || this.compare
		let h = this.head
		while(h) {
			index += 1
			if (compareFn(value, h.value) === 0) {
				break
			}
			h = h.next
		}
		return index === -1 ? null : h
	}
	/*
		get a node from a linklist
		@params i number: 1-n
		@retrun value || undefined
	*/
	getNode(i) {
		if (i < 1 || i > this.length) {
			return undefined
		}

		let h = this.head
		let index = 1
		while(h && index < i) {
			h = h.next
			index++
		}
		return h
	}

	/*
		insert a new Node to a linkList
		@params value *
		@params i: number : 1-linkList.length
		@return linkList
	*/
	insertNode(value, i) {
		if (this.isEmpty()) {
			throw new Error('linkList not exist')
		}
		if (i < 1 || i > this.length) {
			throw new Error('insert place outside linkList range')
		}
		let cur_node = this.getNode(i)
		let last_node = cur_node.next
		const new_node = new linkListNode(value, last_node)
		cur_node.next = new_node
		let temp = cur_node.value
		cur_node.value = new_node.value
		new_node.value = temp
		this.length++
		return this
	}
	/*
		del a node from linkList by index
		@params index: i-linkList.lenth
		@return del_node
	*/
	delNodeByIndex(i) {
		if (this.isEmpty()) {
			return false
		}
		if (i < 1 || i > this.length) {
			return false
		}
		let del_node = null
		if (this.length === 1) {
			del_node = this.head.value
			this.head = null
			this.tail = null
		} else if (i === 1) {
			del_node = this.head.value
			this.head = this.head.next
		} else {
			let h = this.head
			let index = 1
			while(h && index < i - 1) {
				h = h.next
				index++
			}
			if (i === this.length) {
				this.tail = h
			}
			del_node = h.next.value
			h.next = h.next.next
		}

		this.length--
		return del_node 
	}
	/*
		del a node from linkList by value
		@params value *
		@params compareFn function | undefined, must return 0 if wanring to equal
		@return linkList
	*/
	delNodeByValue (value, compareFn) {
		if (this.isEmpty()) {
			return false
		}
		compareFn = compareFn || this.compare
		let del_node = null
		if (compareFn(value, this.head.value) === 0) {
			if (this.tail === this.head) {
				this.tail = null
			}
			del_node = this.head.value
			this.head = this.head.next
			this.length--
		} else {
			let h = this.head
			while(h.next && compareFn(value, h.next.value) !== 0) {
				h = h.next
			}
			if (h) {
				if (h.next === this.tail) {
					this.tail = h
				}
				del_node = h.next.value
				h.next = h.next.next
			}
			this.length--
		}
		return del_node
	}
	toArrary () {
		const arr = []
		let h = this.head
		while(h) {
			arr.push(h.value)
			h = h.next
		}
		return arr
	}
}

// export LinkListNode
// export default linkList
module.exports = {
	linkListNode,
	linkList
}