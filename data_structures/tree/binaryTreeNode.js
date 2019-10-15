// 二叉树的节点---二叉链表表示形式

const { defaultCompareFn } = require('../../util.js')

class BinaryTreeNode {
	constructor(value=null) {
		this.value = value
		this.left = null
		this.right = null
		this.meta = {} // 用于储存其他的信息，如线索二叉树中的LTag, RTag标记等
	}

	setValue(value) {
		this.value = value
		return this
	}

	setLeftChild(node) {
		if (!node instanceof BinaryTreeNode) { throw new TypeError("param must be a binaryTreeNode") }
		this.left = node
		return this
	}

	setRightChild(node) {
		if (!node instanceof BinaryTreeNode) { throw new TypeError("param must be a binaryTreeNode") }
		this.right = node
		return this
	}

	setChildren (leftNode, rightNode) {
		this.setLeftChild(leftNode)
		this.setRightChild(right)
		return this
	}

	removeLeftChild() {
		this.left = null
	}

	removeRightChild() {
		this.right = null
	}

	removeChildren () {
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
		newNode.left = node.left
		newNode.right = node.right
		return newNode
	}
}


module.exports = {
	BinaryTreeNode
}