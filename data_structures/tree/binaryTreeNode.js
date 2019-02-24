const { Comparator } = require('../../util.js')
const { HashTable } =require('../hashTable/hash_table.js')

class BinaryTreeNode {
	constructor(value=null) {
		this.value = value
		this.parent = null
		this.left = null
		this.right = null
		this.meta = new HashTable()
		this.nodeCompareFn = (new Comparator()).compareFn
	}
	
	setValue(value) {
		this.value = value
		return this
	}

	setLeftChild(node) {
		if (this.left) {
			this.left.parent = null
		}
		this.left = node
		if (this.left) {
			this.left.parent = this
		}
		return this
	}

	setRightChild(node) {
		if (this.right) {
			this.right.parent = null
		}
		this.right = node
		if (this.right) {
			this.right.parent = this
		}
		return this
	}

	removeChild(node) {
		if (this.left && this.nodeCompareFn(node, this.left) === 0) {
			this.left = null
			return true
		}

		if (this.right && this.nodeCompareFn(node, this.right) === 0) {
			return true
		}

		return false
	}

	replaceChild(oldNode, newNode) {
		if (!oldNode || !newNode) {
			return false
		}

		if (this.left && this.nodeCompareFn(oldNode, this.left) === 0) {
			this.left = newNode
			return true
		}

		if (this.right && this.nodeCompareFn(oldNode, this.right) === 0) {
			this.right = newNode
			return true
		}

		return false
	}

	static copyNode(sourceNode, targetNode) {
		targetNode.setValue(sourceNode.value)
		targetNode.setLeftChild(sourceNode.left)
		targetNode.setRightChild(sourceNode.right)
		targetNode.meta = sourceNode.meta
	}
}

module.exports = {
	BinaryTreeNode
}