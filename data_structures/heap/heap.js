// 堆：满足的条件
// 1。最小树或者最大树
// 2。完全二叉树
const { Comparator } = require('../../util.js')

class Heap {
	constructor(compareFn) {
		if (new.target === Heap) {
			throw new Error('Cannot construct Heap instance directly')
		}
		this.heap = []
		this.compare = (new Comparator(compareFn)).compare
	}

	// get leftChileIndex by parentIndex
	getLeftChildIndex (parentIndex) {
		return (parentIndex * 2) + 1
	}

	// get leftChileIndex by parentIndex
	getRightChildIndex (parentIndex) {
		return (parentIndex * 2) + 2
	}

	// get leftChile by parentIndex
	getLeftChild (parentIndex) {
		return this.heap[(parentIndex * 2) + 1]
	}

	// get leftChile by parentIndex
	getRightChild (parentIndex) {
		return this.heap[(parentIndex * 2) + 2]
	}

	getParentIndex (childIndex) {
		return Math.floor((childIndex - 1) / 2)
	}

	getParent (childIndex) {
		return this.heap[Math.floor((childIndex - 1) / 2)]
	}

	hasLeftChild (parentIndex) {
		return this.getLeftChildIndex(parentIndex) < this.heap.length
	}

	hasRightChild (parentIndex) {
		return this.getRightChildIndex(parentIndex) < this.heap.length
	}

	hasParent (childIndex) {
		return this.getParentIndex(childIndex) >= 0
	}

	swap (indexOne, indexTwo) {
		let temp = this.heap[indexOne]
		this.heap[indexOne] = this.heap[indexTwo]
		this.heap[indexTwo] = temp
		return this
	}

	getRoot () {
		return this.heap.length > 0 ? this.heap[0] : null
	}

	find (value, compareFn = this.compare) {
		for (let i = 0; i < this.heap.length; i++) {
			if (compareFn(value, this.heap[i]) === 0) {
				return i
			}
		}
		return false
	}

	printFindPath (value, compareFn = this.compare) {
		let pos = this.find(value, compareFn)
		let path = [value]
		if (pos !== false) {
			while (pos !== 0) {
				pos = this.getParentIndex(pos)
				path.push(pos)
			}
		}
		return path
	}

	getLevel (value, compareFn = this.compare) {
		let pos = this.find(value, compare)
		if (pos !== false) {
			return Math.floor(Math.log(pos + 1) / Math.log(2)) + 1
		}
		return null
	}

	insert (value) {
		this.heap.push(value)
		if (this.heap.length > 1) {
			this.heapifyUp()
		}
		return this
	}

	remove (value) {
		let pos = this.find(value)
		if (pos === this.heap.length - 1) {
			let return_val = this.heap[pos]
			this.heap.pop()
			return return_val
		}
		if (pos !== false) {
			let return_val = this.heap[pos]
			this.heap[pos] = this.heap[this.heap.length - 1]
			this.heap.pop()
			if (this.isCorrectOrder(this.heap[pos], return_val)) {
				this.heapifyUp(pos)
			} else {
				this.heapifyDown(pos)
			}
		}
		return null
	}

	heapifyUp (customIndex = (this.heap.length - 1)) {
		let current_index = customIndex
		while (this.hasParent(current_index) && !this.isCorrectOrder(this.getParent(current_index), this.heap[current_index])) {
			let parentIndex = this.getParentIndex(current_index)
			this.swap(parentIndex, current_index)
			current_index = parentIndex
		}
	}

	heapifyDown (customIndex = 0) {
		let current_index = customIndex
		while(this.hasLeftChild(current_index) && this.hasRightChild(current_index)) {
			let left = this.getLeftChild(current_index)
			let right = this.getRightChild(current_index)
			if (this.isCorrectOrder(left, right)) {
				let leftIndex = this.getLeftChildIndex(current_index)
				this.swap(current_index, leftIndex)
				current_index = leftIndex
			} else {
				let rightIndex = this.getRightChildIndex(current_index)
				this.swap(current_index, rightIndex)
				current_index = rightIndex
			}
		}
	}

	isCorrectOrder (first, second) {
		throw new Error(`
			have to implement isCorrectOrder method for firstElement and secondElement values to max or min heap.
			this method must return true/false
		`)
	}

	toString () {
		return this.heap.length === 0 ? null : this.heap.toString()
	}

	toArray () {
		return this.heap
	}
}

module.exports = {
	Heap
}