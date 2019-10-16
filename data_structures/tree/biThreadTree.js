// 线索二叉树：利用空指针域指向节点的前驱或者后继的二叉树。
/*
	线索二叉树的节点设置了两个域，LTag,RTag来表示节点的左右孩子指针指向的是线索还是其孩子。
	
	在中序线索二叉树上遍历二叉树，虽然钱时间复杂度也是o(n)，但是阐述因子比一般的二叉树的遍历要小，
	且不用设置栈，所以线索二叉树适用于经常遍历或者查找结点在遍历所得的线性序列中的前驱和后继的场景。
 */
const { BinaryTreeNode } = require('./binaryTreeNode.js')
const { BinaryTree } = require('./binaryTree.js')
const { defaultCompareFn, getValueType } = require('../../util.js')

const Link = 0 // 表示为指针
const Thread = 1 // 表示为线索，即指向它的前驱或者后继

// 线索二叉树的遍历等方法的算法思路和二叉树的基本一致，不过需要注意的是，节点左右孩子的判断条件，
// 因为除了根节点和最后一个节点，它们的左右还是都是不为null的。只需要更改判断条件和更改其他与此
// 相关的逻辑即可，所以这里只实现线索二叉树特有的一些算法和逻辑。

class BiThreadTree {
	constructor () {
		this.root = null
	}

	// 二叉树的线索化：中序线索化
	// 线索化的实质是讲空指针指向前驱或者后序，所以只有在遍历过程中，才能得到前驱和后继，为了记录
	// 访问过的结点的先后顺序，需要设置一个变量指向刚刚访问过的结点
	inOrderThreading (biTree) {
		if (!biTree instanceof BinaryTree) {
			throw new TypeError('must a BinaryTree instance')
		}

		// 中序线索化
		function inThreading (biTree) {
			if (biTree) {
				// 递归线索化左子树
			  inThreading(biTree.left)
				if (!biTree.left) {
					// 指向它的前驱
					biTree.meta.LTag = Thread
					biTree.left = pre
				} else {
					biTree.meta.LTag = Link
				}

				if (!pre.right) {
					// 如果上一个访问的结点没有右孩子，则它的后继为当前节点
					pre.meta.RTag = Thread
					pre.right = biTree
				} else {
					pre.meta.RTag = Link
				}

				pre = biTree
				// 递归线索化右子树
				inThreading(biTree.right)
			}
		}
		
		// 创建一个头节点
		var head = new BinaryTreeNode(null)
		head.meta.LTag = Link
		head.meta.RTag = Thread
		head.right = head // 右指针回指

		// 用于记录最新访问过的结点
		var pre = head

		if (!biTree) {
			head.left = head // 左指针回指
		} else {
			// 头节点的lchild指向根
			head.left = biTree
			// 进行中序线索化
			inThreading(biTree)
			head.right = pre
			// 最后一个节点的线索化
			pre.meta.RTag = Thread
			pre.right = head
		}
		this.root = head
	}

	// 中序遍历线索二叉树的非递归算法：
	// 根据中序遍历的规律可知，节点的后继应为遍历其右子树时访问的第一个结点。
	// 在中序线索二叉树中查找结点的前驱时，如果左孩子为线索，则左孩子指向的即为其前驱，否者
	// 其前驱为遍历左子树时，最后访问的结点(左子树中最右下的结点)为其前驱。
	inOrderTraverseThr (biThreadTree, node) {
		// 支持从某个节点开始遍历
		var biThreadTree = biThreadTree || this.root // 头节点
		var ret = []
		var p = biThreadTree
		if (biThreadTree === this.root) {
			// 指向根节点
			p = biThreadTree.left 
		}
		if (node && p === node) {
			return [p]
		}
		// 直到最后一个节点，线索二叉树的最后一个结点的线索指向头节点
		while (p !== this.root) {
			// 找到最左的第一个结点
			while (p.meta.LTag === Link) p = p.left
			if (node && p === node) {
				return ret
			}
			ret.push(p)
			// 沿着线索访问，直到结束或者右孩子不是线索的结点
			while (p.meta.RTag === Thread && p.right !== this.root) {
				p = p.right
				if (node && p === node) {
					return ret
				}
				ret.push(p)
			}
			// 遍历右子树
			p = p.right
		}
		return ret
	}

	// 在中序线索树中获取某个节点的后继
	getNextWithInOrderThr (node) {
		// 如果是线索，则线索指向即为后继
		if (node.meta.RTag === Thread) {
			if (node.right === this) {
				// 最后一个节点的后继为null
				return null
			}
			return node.right
		}
		// 如果不是线索，则为中序遍历右子树时，第一个访问的节点
		var p = node.right
		while (p.meta.LTag === Link) {
			p = p.left
		}
		return p
	}

	// 在中序线索树中获取某个节点的前驱
	getPreWithInOrderThr (node) {
		// 如果他的左孩子为线索，则线索指向即为其前驱
		if (node.meta.LTag === Thread) {
			if (node.left === this) {
				// 头结点前驱为null
				return null
			}
			return node.left
		}
		// 否则为中序遍历器左子树时，最后一个访问的结点
		var p = node.left
		var ret = this.inOrderTraverseThr(p, node)
		return ret.pop()
	}

}

module.exports = {
	BiThreadTree
}

