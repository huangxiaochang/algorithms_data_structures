// 二叉树

/*
	二叉树性质：
		1.二叉树第i层最多有2^(i - 1)个节点.
		2.深度为k的二叉树至多有2^k - 1个节点
		3.对于任意的一颗二叉树，叶子节点数n0为度为2的节点个数加1，即n0 = n2 + 1
 */ 
const { BinaryTreeNode } = require('./binaryTreeNode.js')
const { defaultCompareFn, getValueType } = require('../../util.js')
const cache = {}
let id = 0

class BinaryTree {
	constructor (data, compareFn) {
		let targetType = getValueType(data)
		if (
			targetType !== 'object' && 
			targetType !== 'array' && 
			targetType !=='undefined'
		) { 
			throw new TypeError("param must be an array or object") 
		}
		this.nodeCompareFn = getValueType(compareFn) === 'function' ? compareFn : defaultCompareFn
		this.length = 0
		this.root = targetType !== 'undefined'
								? targetType === 'object'
									? this.createBiTreeByObject(data)
									: this.createBiTreeByLevel(data)
								: null
	}

	// 通过数组来创建二叉树：空节点时，数组项要为undefined。规则为数组项依次对应树节点：从上到下，
	// 从左到右，即按层级次序创建。
	createBiTreeByLevel (arr) {
		let tree = null,
				node = null,
				leftNode = null,
				rightNode = null;
		const nodeList = [];
		if (arr) {
			let len = arr.length
			for(let i = 0; i < len; i++) {
				if (arr[i] === undefined) { continue }
				node = null
				if (i === 0) { 
					if (arr[0] === undefined ) { throw new TypeError("root node must be exist") }
					node = new BinaryTreeNode(arr[0])
					this.length++
					nodeList.push(node)
					tree = node
				} else {
					node = nodeList[i]
				}
				let left = 2 * i + 1
				if (left < len && arr[left] !== undefined) {
					leftNode = new BinaryTreeNode(arr[left])
					this.length++
				} else {
					leftNode = null
				}
				nodeList.push(leftNode)
				node.left = leftNode

				let right = 2 * i + 2
				if (right < len && arr[right] !== undefined) {
					rightNode = new BinaryTreeNode(arr[right])
					this.length++
				} else {
					rightNode = null
				}
				nodeList.push(rightNode)
				node.right = rightNode
			}
		}
		node = leftNode = rightNode = null;
		return tree
	}

	// 通过对象的形式创建一个二叉树，规则：
	// 节点的值使用value字段表示，left/right分布表示左右孩子
	createBiTreeByObject (obj) {
		if (obj !== null && getValueType(obj) !== 'object') {
			throw new TypeError("param must be an object")
		}
		let tree = null
		const queue = [{
			parent: null,
			child: '',
			data: obj
		}]

		if (obj) {
			while (queue.length) {
				let { parent, child, data } = queue.shift()
				let node = new BinaryTreeNode(data.value || data)
				this.length++
				if (!parent) { 
					tree = node 
					parent = node
				} else {
					if (child === 'left') {
						parent.left = node
					} else {
						parent.right = node
					}
				}

				if (data.left) {
					queue.push({
						parent: node,
						child: 'left',
						data: data.left
					})
				}
				if (data.right) {
					queue.push({
						parent: node,
						child: 'right',
						data: data.right
					})
				}
			}
		}
		return tree
	}

	// 通过先序和中序次序创建二叉树
	static createByPreAndInOrder (preOrder, inOrder) {
		if (!preOrder instanceof Array || !inOrder instanceof Array) {
			throw new TypeError("param must be an array") 
		}
		var tree = new BinaryTree()
		tree.length = preOrder.length
		tree.root = tree._preAndInOrder(preOrder, inOrder)
		return tree
	}

	_preAndInOrder (preOrder, inOrder) {
		if (preOrder.length) {
			// root
			var node = new BinaryTreeNode(preOrder[0])
			var pos = inOrder.indexOf(preOrder[0])
			// 创建左树
			node.left = this._preAndInOrder(preOrder.slice(1, pos + 1), inOrder.slice(0, pos))
			// 创建右树
			node.right = this._preAndInOrder(preOrder.slice(pos + 1), inOrder.slice(pos + 1))
			return node
		} else {
			return null
		}
	}

	// 通过后序和中序次序创建二叉树
	static createByPostAndInOrder (postOrder, inOrder) {
		if (!postOrder instanceof Array || !inOrder instanceof Array) {
			throw new TypeError("param must be an array") 
		}
		var tree = new BinaryTree()
		tree.length = postOrder.length
		tree.root = tree._postAndInorder(postOrder, inOrder)
		return tree
	}

	_postAndInorder (postOrder, inOrder) {
		var len = postOrder.length
		if (len > 0) {
			var node = new BinaryTreeNode(postOrder[len - 1])
			var pos = inOrder.indexOf(postOrder[len - 1])
			node.left = this._postAndInorder(postOrder.slice(0, pos), inOrder.slice(0, pos))
			node.right = this._postAndInorder(postOrder.slice(pos, len - 1), inOrder.slice(pos + 1))
			return node
		} else {
			return null
		}
	}

	// 节点比较函数: 自定义的比较函数规则：
	// 如果是相等，则返回0，如果是大于，则返回1，否者返回-1
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
	preOrderTraverse (node) {
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
	preOrderTraverseWithoutRecursive (node) {
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
	inOrderTraverse (node) {
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
	inOrderTraverseWithoutRecursive (node) {
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
	postOrderTraverse (node) {
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
	postOrderTraverseWithoutRecursive1 (node) {
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
	postOrderTraverseWithoutRecursive2 (node) {
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

	// 查找某个孩子节点:
	// 可以使用前面的遍历方法来查找，找到的时候，则提前结束。
	// 此处用前序遍历的递归算法查找某个孩子节点
	findChild (value, node) {
		node = node instanceof BinaryTreeNode ? node : this.root
		let ret = []
		const stack = []
		while (node || stack.length) {
			// 沿着左树访问到底,依次将他们入栈,并设置他们为第一次出现在栈顶
			while (node) {
				ret.push(node)
				if (this.nodeCompareFn(node.value, value) === 0) {
					return ret
				}
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
					stack.pop()
					// 如果它的左右孩子都没有包含目标，则移出路径
					ret.pop()
					node = null
				}
			}
		}
		return ret
	}

	// 获取某个节点的层级:
	// 使用上面findChild的方法查找孩子节点，路径的长度即为它的层级
	getChildLevel (value, start) {
		const path = this.findChild(value, start)
		// 找不到时，为-1
		return (path.length === 0 ? -1 : path.length)
	}

	// 获取总层级: 分别求出左树和右树的层级，取两者的最大值加1
	getTreeLevel (node) {
		node = node || this.root
		let leftLevel = 0
		let rightLevel = 0
		if (node) {
			if (node.left) {
				leftLevel = this.getTreeLevel(node.left)
			}
			if (node.right) {
				rightLevel = this.getTreeLevel(node.right)
			}
			return Math.max(leftLevel, rightLevel) + 1
		} else {
			return 0
		}
	}

	// 返回某层级的所有节点
	getLevelNodes (level, start) {
		if (level < 1) {
			throw new Error("level must be a positive number")
		}
		start = start instanceof BinaryTreeNode ? start : this.root
		if (!start) { return [] }

		let stack = [start]
		let ret = [start]
		let dep = 1
		while (dep < level) {
			ret = []
			for(let i = 0; i < stack.length; i++) {
				let node = stack[i]
				if (node.left) {
					ret.push(node.left)
				}
				if (node.right) {
					ret.push(node.right)
				}
			}
			stack = ret
			dep += 1
		}

		// 超过的层级，返回空数组
		return level > dep ? [] : ret
	}

	// 计算二叉树中不相邻节点和最大值：
	// 使用递归和动态规划的方法来进行求值
	calcMaxValue (node=this.root, nodeList=[]) {
		if (!node) {
			return {
				value: 0,
				nodeList: nodeList
			}
		}

		// 如果使用缓存，则从缓存中或者结果，这样会极大地提高算法的效率
		// if (cache[`node_${id}`]) {
		// 	return cache[`node_${id}`]
		// }

		// 分别计算当前节点的左右树的不相邻节点和最大值
		let maxLeft = this.calcMaxValue(node.left).value
		let maxRight = this.calcMaxValue(node.right).value

		// 分别计算当前节点的左孩子节点的左右孩子树的不相邻节点和最大值
		let maxLeftLeft = 0
		let maxLeftRight = 0
		if (node.left) {
			maxLeftLeft = this.calcMaxValue(node.left.left).value
			maxLeftRight = this.calcMaxValue(node.left.right).value
		}

		// 分别计算当前节点的右孩子节点的左右孩子树的不相邻节点和最大值
		let maxRightLeft = 0
		let maxRightRight = 0
		if (node.right) {
			maxRightLeft = this.calcMaxValue(node.right.left).value
			maxRightRight = this.calcMaxValue(node.right.right).value
		}

		// 动态规划，加入该节点和不加入该节点的最值
		// 如果加入当前节点，那么最值就是当前节点和其孩子节点的孩子树的最值之和
		let addCurrent = node.value + maxLeftLeft + maxLeftRight + maxRightLeft + maxRightRight
		// 不包含当前节点，则最大值为左右孩子的最值之和
		let removeCurrent = maxLeft + maxRight

		// 然后比较这两种方式，返回他们的最大值，即为该节点的策略(加或者不加)
		let max = 0
		if (addCurrent > removeCurrent) {
			nodeList.push(node)
			max = addCurrent
		} else {
			max = removeCurrent
		}

		// 可以为每个节点的元信息标记一个唯一的标记，并缓存已经计算的最值，
		// 这样会提高算法的效率
		// cache[`node_${id}`] = max

		return {
			value: max,
			nodeList: nodeList
		}
	}

	// 比较两个二叉树是否相等：结构和节点的值是否相等
	// 算法思路： 遍历两颗树，比较每一个节点
	static compare (tree1, tree2, compareFn=defaultCompareFn, onlyStructure=false) {
		if (!tree1 instanceof BinaryTree || !tree2 instanceof BinaryTree) {
			throw new TypeError("target be compared must be a BinaryTree")
		}
		if (getValueType(compareFn) !== 'function') {
			throw new TypeError("compare function must be a function")
		}
		if (tree1.root && tree2.root) {
			// 采用先序广度优先遍历的方式来进行对比
			const queue1 = [tree1.root]
			const queue2 = [tree2.root]
			while (queue1.length && queue2.length) {
				let node1 = queue1.shift()
				let node2 = queue2.shift()
				if (node1 && node2) {
					if (!onlyStructure && compareFn(node1.value, node2.value) !== 0) {
						return false
					}
					queue1.push(node1.left)
					queue1.push(node1.right)
					queue2.push(node2.left)
					queue2.push(node2.right)
				} else if (node1 || node2) {
					return false
				}
			}
			if (queue1.length !== queue2.length) {
				return false
			}
			return true
		} else if (tree1.root || tree2.root) {
			return false
		}
		return true
	}

	// 比较两个二叉树的递归算法
	static compareRecursive (tree1, tree2, compareFn=defaultCompareFn, onlyStructure=false) {
		if (tree1 === null && tree2 === null) {
			return true
		}
		if (tree1 === null || tree2 === null) {
			return false
		}
		if (!onlyStructure) {
			let valSame = compareFn(tree1.value, tree2.value) === 0
			if (!valSame) {
				return false
			}
		}
		let leftSame = BinaryTree.compareRecursive(tree1.left, tree2.left, compareFn, onlyStructure)
		let rightSame = BinaryTree.compareRecursive(tree1.right, tree2.right, compareFn, onlyStructure)
		return leftSame && rightSame
	}

}

module.exports = {
	BinaryTree
}