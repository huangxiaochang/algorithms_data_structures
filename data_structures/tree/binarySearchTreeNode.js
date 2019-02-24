const { BinaryTreeNode } = require('./binaryTreeNode.js')
const { Comparator } = require('../../util.js')

class BinarySearchTreeNode extends BinaryTreeNode {
	constructor(value, nodeValueCompareFn) {
		super(value)
		this.nodeValueCompareFn = (new Comparator(nodeValueCompareFn)).compareFn
	}

	insert(value) {
		if (this.nodeValueCompareFn(value, null) === 0) {
			this.value = value
			return this
		}

		if (this.nodeValueCompareFn(value, this.value) === -1) {
			if (this.left) {
				this.left.insert(value)
			}

			const newNode = new BinarySearchTreeNode(value, this.nodeCompareFn)
			this.left.setLeftChild(newNode)
			return this
		}

		if (this.nodeValueCompareFn(value, this.value) === -1) {
			if (this.left) {
				this.right.insert(value)
			}

			const newNode = new BinarySearchTreeNode(value, this.nodeCompareFn)
			this.left.setRightChild(newNode)
			return this
		}
	}

	remove(value) {

	}

	contains(value) {
		return !!this.find(value)
	}

	find(value) {
		if (this.nodeCompareFn(value, this.value) === 0) {
			return this
		}

		if(this.left && this.nodeCompareFn(value, this.value) === -1) {
			return this.left.find(value)
		}

		if(this.right && this.nodeCompareFn(value, this.value) === -1) {
			return this.right.find(value)
		}

		return null
	}
}

module.exports = {
	BinarySearchTreeNode
}