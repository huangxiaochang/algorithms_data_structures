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

	// 先序优先遍历非递归: 
	// 1.对任意节点，都可看成根节点，因此可以直接访问， 然后入栈。
	// 2.若其左孩子不为空，设当前节点为左孩子节点，按照相同的规则访问它的左树
	// 3.若其左孩子为空，则出栈，并设置当前节点为右孩子，然后按照相同的规则访问其右孩子
	preNonRecursive (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		const ret = []
		// 用来收集访问过的节点，只要是为了之后访问它的右孩子
		const stack = []
		while (node || stack.length) {
			if (node) {
				// 如果节点存在，则访问节点
				ret.push(node)
				stack.push(node)
				node = node.left
			} else {
				node = stack.pop().right
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

	// 中序遍历非递归算法：
	// 中序遍历非递归算法的思路和先序非递归算法是一样的，只不过是要在出栈的时候，才访问节点
	middleNonRecursive (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		const ret = []
		const stack = []
		while (node || stack.length) {
			if (node) {
				stack.push(node)
				node = node.left
			} else {
				node = stack.pop()
				ret.push(node)
				node = node.right
			}
		}
		return ret
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

	// 后序非递归算法：
	// 因为后序非递归算法要保证访问其左孩子和右孩子之后，并且左孩子在右孩子前访问才能访问根节点，所以比较难。
	
	// 第一种思路:
	// 1.对于任意节点，将其入栈，然后沿着其左树一直访问到没有左孩子。
	// 2.然后按照相同的规则处理栈顶节点的右孩子。
	// 3.在这个过程之中，可以发现每个节点都会出现在栈顶两次，所以可以设置一个标记位，只有该节点是第二次
	// 出现在栈顶时，才对他进行访问。
	postNonRecursive1 (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		let ret = []
		const stack = []
		while (node || stack.length) {
			// 沿着左树访问到底,依次将他们入栈,并设置他们为第一次出现在栈顶
			while (node) {
				node.meta.isFirst = true
				stack.push(node)
				node = node.left
			}
			if (stack.length) {
				const topNode = stack[stack.length - 1]
				// 如果是第一次出现在栈顶，则继续按照相同的规则处理它的右树，并把标记位改成不是第一次
				if (topNode.meta.isFirst) {
					topNode.meta.isFirst = false
					node = topNode.right
				} else {
					// 如果是第二次出现在栈顶，则访问它,并出栈,然后处理下一个栈顶节点
					ret.push(topNode)
					stack.pop()
					node = null
				}
			}
		}
		return ret
	}

	// 后序非递归算法2：
	// 1.对于任意节点，将其入栈。
	// 2.如果栈顶元素没有孩子节点或者它的左右孩子都访问过，则访问它，然后出栈。
	// 3.否者将其存在的右孩子和左孩子依次入栈。
	// （右孩子先入栈再到左孩子，这样出栈为先左后右，即可保证先访问左再右）
	postNonRecursive2 (node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		let ret = []
		const stack = [node]
		let pre = null

		while (stack.length) {
			let topNode = stack[stack.length - 1]
			// 如果栈顶元素没有孩子节点或者它的左右孩子都访问过
			if (
				(!topNode.left && !topNode.right) ||
				// 如果上一次访问的节点是栈顶的左孩子或者右孩子，说明左右孩子都访问过了。
				// 因为入栈时，右左孩子是接着其入栈的
				(pre && (pre === topNode.left || pre === topNode.right))
			) {
				ret.push(topNode)
				stack.pop()
				// 设置上一次访问过的节点为栈顶节点
				pre = topNode
			} else {
				// 否者将其右孩子和左孩子依次入栈
				if (topNode.right) {
					stack.push(topNode.right)
				}
				if (topNode.left) {
					stack.push(topNode.left)
				}
			}
		}
		return ret
	}

	getChild (value, start) {
		start = start instanceof BinaryTreeNode ? start : this.root
	}

}

var tree = new BinaryTree([1,2,3,4,5,undefined,6,undefined,undefined,7,8])

// console.log(tree.root)

console.log(tree.postNonRecursive2())


module.exports = {
	BinaryTree
}