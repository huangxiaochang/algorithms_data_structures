// 堆：满足的条件
// 1。最小树或者最大树
// 2。完全二叉树
const { Comparator } = require('../../util.js')

class Heap {
	constructor(compareFn) {
		// if (new.target === Heap) {
		// 	throw new Error('Cannot construct Heap instance directly')
		// }
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
	}

	remove (value, compareFn = this.compare) {
		let pos = this.find(value, compare)
		if (pos !== false) {
			if (pos === this.heap.length - 1) {
				this.heap.pop()
			} else {

			}
		}
	}

	heapifyUp (customIndex = (this.heap.length - 1)) {
		let current_index = customIndex
		while (this.hasParent(current_index) && !this.isCorrectOrder(this.getParent(current_index), this.heap[current_index])) {
			this.swap(this.getParent(current_index))
			current_index = this.getParentIndex(current_index)
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

	printTree () {
		if (this.heap.length === 0) {
			console.log(null)
		}
		let len = this.heap.length
		let totalLevel = Math.floor(Math.log(len) / Math.log(2)) + 1
		let str = ''
		let cur_level = 0
		for(let i = 0; i < len; i++) {
			let level = Math.floor(Math.log(i + 1) / Math.log(2)) + 1
			if (level !== cur_level) {
				str += '\n'
				let space = 2 * (totalLevel - level)
				str += ' '.repeat(space)
				cur_level = level
			}
			let sp = 0
			if (i === 0) {
				sp = 3
			} else {
				sp = i % 2 === 0 ? 6 : 2
			}
			str += ' '.repeat(sp) + this.heap[i]
		}
		console.log(str)
	}
}

module.exports = {
	Heap
}