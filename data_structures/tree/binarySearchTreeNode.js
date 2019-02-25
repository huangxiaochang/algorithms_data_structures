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
		let node_remove = this.find(value)
		if (!node_remove) {
			return null
		}
		const { parent } = node_remove

		if (!node_remove.left && !node_remove.right) {
			if (parent) {
				parent.removeChild(node_remove)
			} else {
				// root node
				node_remove.setValue(undefined)
			}
		} else if (node_remove.left && node_remove.right) {
			let nextBiggerNode = node_remove.right.findMinLeft()
			if (node_remove.right === nextBiggerNode) {
				this.remove(nextBiggerNode.value)
				node_remove.setValue(nextBiggerNode.value)
			} else {
				node_remove.setValue(node_remove.right.value)
				node_remove.setRightChild(node_remove.right.right)
			}
		} else {
			let childNode = node_remove.left || node_remove.right
			if (parent) {
				parent.replaceChild(node_remove, childNode)
			} else {
				BinaryTreeNode.copyNode(childNode, node_remove)
			}
		}
		node_remove.parent = null
		return true
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

	findMinLeft () {
		if (!this.left) {
			return this
		}
		return this.left.findMinLeft()
	}
}

module.exports = {
	BinarySearchTreeNode
}