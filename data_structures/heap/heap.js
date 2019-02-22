// 堆：满足的条件
// 1。最小树或者最大树
// 2。满二叉树
const { Comparator } = require('../../util.js')

class Heap {
	constructor(compareFn) {
		if (new.target === Heap) {
			throw new Error('Cannot construct Heap instance directly')
			this.heap = []
			this.compare = (new Comparator(compareFn)).compare
		}
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
			return (Math.log(pos + ) / Math.log(2)) + 1
		}
		return null
	}

}

module.exports = {
	Heap
}