// 二叉树
const { BinaryTreeNode } = require('./binaryTreeNode.js')
const { defaultCompareFn, getValueType } = require('../../util.js')

class BinaryTree {
	constructor (target, type, compareFn) {
		let targetType = getValueType(target)
		if (targetType !== 'object' && targetType !== 'array') { throw new TypeError("param must be an array or object") }
		this.nodeCompareFn = getValueType(compareFn) === 'function' ? compareFn : defaultCompareFn
		this.root = targetType === 'object'
								? this.createBinaryTreeByObject(target)
								: this.createBinaryTreeByArray(target)
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

	// 通过对象的形式创建一个二叉树，规则：
	// 节点的值使用value字段表示，left/right分布表示左右孩子
	createBinaryTreeByObject (obj) {
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
				node.parent = parent
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

	// 查找某个孩子节点:
	// 可以使用前面的遍历方法来查找，找到的时候，则提前结束。
	// 此处用前序遍历的递归算法查找某个孩子节点
	findChild (value, start) {
		start = start instanceof BinaryTreeNode ? start : this.root
		let node = start
		const stack = []
		const ret = []
		while (node || stack.length) {
			if (node) {
				ret.push(node)
				if (this.nodeCompareFn(node.value, value) === 0) {
					break
				}
				stack.push(node)
				node = node.left
			} else {
				node = stack.pop().right
			}
		}
		return {
			path: ret,
			node: (ret.length === 0 ? null : ret[ret.length - 1])
		}
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
}

// var arrTree = new BinaryTree([1,2,3,4,5,undefined,6,undefined,undefined,7,8])

// console.log(arrTree)
var objTree = new BinaryTree({
	value: 1,
	left: {
		value: 2,
		left: {
			value: 4
		},
		right: {
			value: 5,
			left: 7,
			right: 8
		}
	},
	right: {
		value: 3,
		right: 6
	}
})

// console.log(objTree.root)

console.log(objTree.getLevelNodes(5))


module.exports = {
	BinaryTree
}