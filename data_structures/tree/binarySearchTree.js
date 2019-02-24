const { BinarySearchTreeNode } = require('./binarySearchTreeNode.js')

class BinarySearchTree {
	constructor(nodeCompareFn) {
		this.root = new BinaryTreeNode(null, nodeCompareFn)
		this.nodeCompareFn = this.root.nodeCompareFn
	}

	insert(value) {
		return this.root.insert(value)
	}

	remove(value) {
		return this.root.remove(value)
	}

	contains(value) {
		return this.root.contains(value)
	}

	toString() {
		return this.root.toString()
	}
}

module.exports = {
	BinarySearchTree
}