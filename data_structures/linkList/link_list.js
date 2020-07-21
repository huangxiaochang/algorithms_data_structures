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
	constructor(arr=[], compareFn) {
		this.head = null
		this.tail = null
		this.length = 0
		this.compare = (new Comparator(compareFn)).compare
		if (arr instanceof Array && arr.length !== 0) {
			this.init(arr)
		}
	}
	/*
		初始化一个链表
		@params arr Array
		@return linklist
	 */
	init (arr) {
		this.tail = this.head = new linkListNode(arr[0])
		for(let i = 1; i < arr.length; i++) {
			const node = new linkListNode(arr[i])
			this.tail.next = node
			this.tail = node
		}
		this.length = arr.length
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
	 */
	reverse () {
		// pre用来保存已经反转的链表的head
		let pre = null, last = null;
		this.tail = this.head
		while (this.head) {
			last = this.head.next
			this.head.next = pre
			pre = this.head
			this.head = last
		}
		this.head = pre
	}

	// 使用递归反转链表
	reverseRecursion (nd=this.head) {
		if (nd.next === null) {
			return nd;
		}
		let last = reverseRecursion(nd.next);
		nd.next.next = nd;
		nd.next = null;
		this.head = last;
		return last;
	}
	/*
		reverse a linkList with k number of node as a group
	 */
	reverseWithStep (k) {
		if (k > this.length || k <= 1) { return }
		let len = this.length
		// 首先创建一个头节点指向链表的第一个节点
		let header = new linkListNode(null, this.head)

		let pre = header
		// 每k个节点为一组进行反转
		while (len >= k) {
			// 如果剩余的节点还可以组成一组，则反转这一组
			if (len >= k) {
				// 使用lat指向一组的下一个节点
				let lat = pre, i = 0;
				while (i <= k) {
					lat = lat.next
					i++
				}
				pre = this.reverseGroup(pre, lat)
			}
			len -= k
		}
		
		this.head = header.next
	}
	/*
		反转一组节点(k)个
		pre: 组的前一个节点
		lat：组的后一个节点
		所以我们反转的边界为(pre, lat),即不包含pre和lat
	 */
	reverseGroup (pre, lat) {
		// lpre为每一次反转该组的第一个节点
		let lpre = pre.next
		// cur为每一次反转该组的第一个节点的下一个节点
		let cur = lpre.next
		// cur不为lat时，都还需要一个个第反转组中的每一个元素
		while (cur !== lat) {
			// 第一个节点指向下下一个节点，即同时断开了它指向原顺序中的下一个节点
			lpre.next = cur.next
			// 后一个节点之前前一个节点，即发生了反转
			cur.next = pre.next
			// 该组的头节点指向反转后的节点
			pre.next = cur
			// 移动cur，为下一轮反转该组中的下一个节点
			cur = lpre.next
		}
		// 返回这一组反转后的最后一个节点
		return lpre
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

	/*
	后序遍历链表
	 */
	postOrderTraversal (linkHead, visit) {
		if (linkHead === null) {
			return;
		}
		// 这里前序遍历
		postOrderTraversal(linkHead.next);
		// 这里是后序遍历
		visit(linkHead);
	}
}

// export LinkListNode
// export default linkList
module.exports = {
	linkListNode,
	linkList
}