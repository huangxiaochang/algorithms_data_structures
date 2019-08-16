// 二叉树
const { BinaryTreeNode } = require('./binaryTreeNode.js')
const { defaultCompareFn } = require('../../util.js')

class BinaryTree {
	constructor (arr, compareFn) {
		if (!arr instanceof Array) { throw new TypeError("param must be an array") }
		this.nodeCompareFn = typeof compareFn === 'function' ? compareFn : defaultCompareFn
		this.root = this.createBinaryTreeByArray(arr)
	}

	// 通过数组来创建二叉树：空节点时，数组项要为undefined。规则为数组项依次对应树节点：从上到下，
	// 从左到右
	createBinaryTreeByArray (arr) {
		let tree = null,
				len = arr.length,
				node = null,
				leftNode = null,
				rightNode = null;
		const nodeList = [];

		for(let i = 0; i < len; i++) {
			if (arr[i] === undefined) { continue }
			node = null
			if (i === 0) { 
				if (arr[0] === undefined ) { throw new TypeError("root node must be exist") }
				node = new BinaryTreeNode(arr[0])
				nodeList.push(node)
				tree = node
			} else {
				node = nodeList[i]
			}
			let left = 2 * i + 1
			leftNode = (left < len && arr[left] !== undefined) ? new BinaryTreeNode(arr[left]) : null
			if (leftNode) { leftNode.parent = node}
			nodeList.push(leftNode)
			node.left = leftNode

			let right = 2 * i + 2
			rightNode = (right < len && arr[right] !== undefined) ? new BinaryTreeNode(arr[right]) : null
			if (rightNode) { rightNode.parent = node}
			nodeList.push(rightNode)
			node.right = rightNode
		}

		node = leftNode = rightNode = null;
		return tree
	}
	// 节点比较函数
	setNodeCompareFn (fn) {
		if (typeof fn === 'function') {
			this.nodeCompareFn = fn
		}
	}

	// 广度优先遍历
	tranverseByBFS (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		if (node === null) { return null }
		const queue = [node]
		const ret = []

		while (queue.length) {
			let node = queue.shift()
			ret.push(node)
			if (node.left) {
				queue.push(node.left)
			}
			if (node.right) {
				queue.push(node.right)
			}
		}
		return ret
	}

	// 先序优先遍历（深度优先遍历）
	preTraversal (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		if (node === null) { return [] }
		let ret = []
		ret.push(node)
		if (node.left) {
			ret = ret.concat(this.preTraversal(node.left))
		}
		if (node.right) {
			ret = ret.concat(this.preTraversal(node.right))
		}
		return ret
	}

	// 先序优先遍历非递归: 先进先出
	preNonRecursive (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		if (node === null) { return [] }
		let ret = []
		const queue = [node]
		while (queue.length) {
			let node = queue.shift()
			ret.push(node)
			// 由于是先进先出，所以要先加入右孩子
			if (node.right) {
				queue.unshift(node.right)
			}
			if (node.left) {
				queue.unshift(node.left)
			}
		}
		return ret
	}


	// 中序优先遍历
	middleTraversal (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		if (node === null) { return [] }
		let ret = []
		if (node.left) {
			ret = ret.concat(this.middleTraversal(node.left))
		}
		ret.push(node)
		if (node.right) {
			ret = ret.concat(this.middleTraversal(node.right))
		}
		return ret
	}

	middleNonRecursive (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		if (node === null) { return [] }
		let ret = []

	}

	// 后序优先遍历
	postTraversal (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		if (node === null) { return [] }
		let ret = []
		if (node.left) {
			ret = ret.concat(this.postTraversal(node.left))
		}
		if (node.right) {
			ret = ret.concat(this.postTraversal(node.right))
		}
		ret.push(node)
		return ret
	}

	postNonRecursive (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		if (node === null) { return [] }
		let ret = []
		const stack = [node]
		while (stack.length) {
			
		}
	}

	getChild (value, start) {
		start = start instanceof BinaryTreeNode ? start : this.root
	}

}

var tree = new BinaryTree([1,2,3,4,5,undefined,6,undefined,undefined,7,8])

// console.log(tree.root)

console.log(tree.preOrderNonRecursive())


module.exports = {
	BinaryTree
}