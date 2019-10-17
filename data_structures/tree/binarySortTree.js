/*
	二叉排序树：一种动态的树表，树的结构通常不是一次生成，而是在查找的过程中，进行动态插入。
		1.空树
		2.若存在左子树，则左子树所有结点的值俊小于它的根结点
		3.若存在右子树，则右子树所有结点的值俊小于它的根结点
		4.左右子树也分别为二叉排序树

	二叉排序树的遍历，获取层级等算法和二叉树是一致的，不过查找某个节点比二叉树更加高效，时间复杂度
	为o(logn),不过二叉排序树的删除和插入节点之后，需要重新调整，以保持二叉排序树的特性。
 */
const { BinaryTree }  = require('./binaryTree.js')
const { BinaryTreeNode }  = require('./binaryTreeNode.js')

class BinarySortTree extends BinaryTree {
	constructor(data, compareFn) {
		super(data, compareFn)
	}

	/* 
		二叉树中的创建方法:
		createBiTreeByLevel , createBiTreeByObject , createByPreAndInOrder, createByPostAndInOrder
		等为一次性生成，所以如果调用这些方法一次性生成二叉排序树，那么要求提供的数据是符合二叉排序树
		的特性的。
		此处如果不想提供一次性生成排序二叉树，可以重写这些继承的方法
	*/

	// 在二分排序树中查找关键字为key的节点，查找成功，返回true，否者false。如果需要返回成功的位置，
	// 需要传入第三个参数为true
	searchBST (key, needLocation = false, compareFn) {
		compareFn = compareFn || this.nodeCompareFn
		if (!this.root) {
			return needLocation ? {
				exist: false,
				parent: null,
				node: null
			} : false
		}

		let p = this.root
		let pre = p

		while (p) {
			let flag = compareFn(key, p.value)
			if (flag === 0) {
				return needLocation ? {
					exist: true,
					parent: pre,
					node: p
				} : true
			} else if (flag === 1) {
				pre = p
				p = p.right
			} else {
				pre = p
				p = p.left
			}
		}

		return needLocation ? {
			exist: false,
			parent: pre,
			node: p,
		} : false
	}
	
	// 提供一个序列，然后插入二叉排序树
	insertBST (values, compareFn) {
		compareFn = compareFn || this.nodeCompareFn

		if (values instanceof Array) {
			// 可以一次性插入多个
			let num = 0
			for (let val of values) {
				if(this._insertBST(val, compareFn)) num++
			}
			return num > 0 ? true : false
		} else {
			return this._insertBST(values, compareFn)
		}
	}

	_insertBST (value, compareFn) {
		const p = this.searchBST(value, true, compareFn)
		if (!p.exist) {
			const node = new BinaryTreeNode(value)
			if (!p.parent) {
				// 插入为根结点
				this.root = node
			} else if (compareFn(value, p.parent.value) === -1) {
				p.parent.left = node
			} else {
				p.parent.right = node
			}
			return true
		}
		return false
	}

	// 从二叉排序树中删除一个节点
	// 删除结点后，要保存二叉排序树的特性，同时也要保存其他元素间中序序列相对位置不变
	deleteBST (values, compareFn) {
		if (!this.root) { return false }
		compareFn = compareFn || this.nodeCompareFn

		if (values instanceof Array) {
			let num = 0
			for (let val of values) {
				if (this._deleteBST(val, compareFn)) num++
			}
			return num > 0 ? true : false
		} else {
			return this._deleteBST(values, compareFn)
		}
	}

	_deleteBST (value, compareFn) {
		// 这里也可以使用递归的方式进行删除
		
		const res = this.searchBST(value, true, compareFn)
		if (res.exist) {
			let p = res.node
			const parent = res.parent
			if (p.left && p.right) {
				// 被删除的节点同时存在左孩子和右孩子
				
				let s = p.left
				let q = s
				// 找到被删除的节点的左子树的最右的节点
				while (s) {
					q = s
					s = s.right
				}
				// 被删节点的右子树重接到它的左子树的最右结点
				q.right = p.right
				// 删除该结点
				if (p === this.root) {
					this.root = p.left
				} else {
					parent.left = p.left
				}
			} else {
				// 被删除结点没有左孩子或者右孩子
				
				if (p === this.root) {
					// 删除根结点时
					this.root = p.left || p.right
				} else {
					// 只需重接它的左孩子
					if (parent.left === p) {
						parent.left = p.left
					} else {
						parent.right = p.right
					}
				}
			}
			// 释放内存
			p = null
			return true
		}
		return false
	}

	// 由于二叉排序树查找某个结点时，不需要在遍历的过程中查找，所以它的查找效率比一般二叉树高
	findChild (value, node) {
		node = node || this.root
		const ret = []
		while (node) {
			ret.push(node)
			let flag = this.nodeCompareFn(value, node.value)
			if (flag === 0) {
				return ret
			} else if (flag === 1) {
				node = node.right
			} else {
				node = node.left
			}
		}
		return []
	}
}

module.exports = {
	BinarySortTree
}