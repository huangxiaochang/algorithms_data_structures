// 二叉树的节点

const { defaultCompareFn } = require('../../util.js')

class BinaryTreeNode {
	constructor(value=null) {
		this.value = value
		this.parent = null
		this.left = null
		this.right = null
		this.meta = {}
	}

	setValue(value) {
		this.value = value
		return this
	}

	setLeftChild(node) {
		if (!node instanceof BinaryTreeNode) { throw new TypeError("param must be a binaryTreeNode") }
		if (this.left) { this.left.parent = null }

		this.left = node
		this.left.parent = this
		return this
	}

	setRightChild(node) {
		if (!node instanceof BinaryTreeNode) { throw new TypeError("param must be a binaryTreeNode") }
		if (this.right) { this.right.parent = null }

		this.right = node
		this.right.parent = this
		return this
	}

	setChildren (leftNode, rightNode) {
		this.setLeftChild(leftNode)
		this.setRightChild(right)
		return this
	}

	removeLeftChild() {
		if (this.left) { this.left.parent = null }
		this.left = null
	}

	removeRightChild() {
		if (this.right) { this.right.parent = null }
		this.right = null
	}

	removeChildren () {
		if (this.left) { this.left.parent = null }
		if (this.right) { this.right.parent = null }
		this.left = null
		this.right = null
	}

	getLeftChild () {
		return this.left
	}

	getRightChild () {
		return this.right
	}

	static copyNode(node) {
		if (!node instanceof BinaryTreeNode) { throw new TypeError("param must be a binaryTreeNode") }
		const newNode = new BinaryTreeNode(node.value)
		newNode.parent = node.parent
		newNode.left = node.left
		newNode.right = node.right
		return newNode
	}
}


module.exports = {
	BinaryTreeNode
}