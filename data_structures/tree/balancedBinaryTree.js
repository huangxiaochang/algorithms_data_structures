/*
	平衡二叉：
		1.一颗空树
		2.左子树和右子树都是平衡二叉树，且左子树和右子树的深度之差的绝对值不超过1.
		3.是一个二叉排序树
	把成左子树的深度减右子树的深度的差定义为结点的平衡因子
 */
const { BinaryTree }  = require('./binaryTree.js')
const { BinaryTreeNode }  = require('./binaryTreeNode.js')

// taller 表示平衡二叉树是否已经长高
let taller = false

class BalancedBinaryTree extends BinaryTree {
	constructor (data, compareFn) {
		super(data, compareFn)
	}

	searchAVL (val, needLocation = false, compareFn) {
		compareFn = compareFn || this.nodeCompareFn

		if (!this.root) {
			return needLocation ? {
				parent: null,
				node: null
			} : false
		}
		let p = this.root
		let pre = p

		while (p) {
			let flag = compareFn(val, p.value)
			if (flag === 0) {
				return needLocation ? {
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
			parent: null,
			node: null
		} : false
	}

	// 有一个序列来创建一颗平衡二叉树
	

	// 将一个节点插入到平衡二叉树中
	insertAVL (value, tree=this.root) {
		if (!this.root) {
			// 插入为根节点
			const node = new BinaryTreeNode(value)
			node.meta.bf = 0 // 该节点的平衡因子
			this.root = node
			return true
		} else {
			let flag = this.nodeCompareFn(value, tree.value)
			// console.log(value, tree)
			if (flag === 0) {
				// 树中已经存在value的结点
				return false
			} else if (flag === 1){
				// 继续在右子树中插入
				if (tree.right) {
					if (this.insertAVL(value, tree.right)) {
						// 如果已经在右子树插入，该结点平衡因子减1
						if (this.nodeCompareFn(value, tree.value) === 1) {
							tree.meta.bf -= 1
						} else {
							tree.meta.bf = 1
						}
						// 递归回退时，要处理平衡树失衡
						if (tree.meta.bf < -1) {
							if (tree.right.meta.bf === -1) {
								// 调整结点的平衡因子
								tree.meta.bf = 0
								tree.right.meta.bf = 0
								// 进行单左旋转,并调整结点平衡因子
								this.LLRotate(tree)
							} else {
							// 进行先右后左旋转,并调整结点平衡因子
								this.RLRotate(tree)
							}
						}
						return true
					}
					return false
				} else {
					// 作右孩子插入
					const node = new BinaryTreeNode(value)
					node.meta.bf = 0 // 该节点的平衡因子
					tree.right = node
					return true
				}
			} else {
				// 在左子树中插入
				if (tree.left) {
					// 如果已经在左子树插入新节点
					if (this.insertAVL(value, tree.left)) {
						if (this.nodeCompareFn(value, tree.value) === -1) {
							tree.meta.bf += 1
						} else {
							tree.meta.bf = -1
						}
						// 递归回退时，要处理平衡树失衡
						if (tree.meta.bf > 1) {
							if (tree.left.meta.bf === 1) {
								// 调整结点的平衡因子
								tree.meta.bf = 0
								tree.left.meta.bf = 0
								// 进行单左旋转,并调整结点平衡因子
								this.RRRotate(tree)
							} else {
							// 进行先左后右旋转,并调整结点平衡因子
								this.LRRotate(tree)	
							}
						}
						return true
					}
					return false
				} else {
					// 作为左孩子插入
					const node = new BinaryTreeNode(value)
					node.meta.bf = 0 // 该节点的平衡因子
					tree.left = node
					return true
				}
			}
		}
	}

	// 单右旋， tree为最小失衡的子树的根节点
	RRRotate (tree) {
		// 找到最小失衡子树的父节点
		const res = this.searchAVL(tree.value, true)
		let lc = tree.left
		tree.left = lc.right
		lc.right = tree
		// 最失衡根的父结点指向新的平衡根节点
		let flag = this.nodeCompareFn(res.parent.value, tree.value)
		if (flag === 0) {
			// 如果是根节点
			this.root = lc
		} else if (flag === 1) {
			res.parent.left = lc
		} else {
			res.parent.right = lc
		}
	}

	// 先右后左旋转， tree为最小失衡的子树的根节点
	RLRotate (tree) {
		// 调整结点平衡因子
		const lc = tree.right
		const rd = lc.left
		switch (rd.meta.bf) {
			case 1:
				tree.meta.bf = 0
				lc.meta.bf = -1
				break
			case 0:
				tree.meta.bf = 0
				lc.meta.bf = 0
				break
			case -1:
				tree.meta.bf = 1
				lc.meta.bf = 0
				break
		}
		this.RRRotate(tree.right)
		this.LLRotate(tree)
	}

	// 单左旋，tree为最小失衡的子树的根节点
	LLRotate (tree) {
		// 找到最小失衡子树的父节点
		const res = this.searchAVL(tree.value, true)
		let lc = tree.right
		tree.right = lc.left
		lc.left = tree
		// 最失衡根的父结点指向新的平衡根节点
		let flag = this.nodeCompareFn(res.parent.value, tree.value)
		if (flag === 0) {
			// 如果是根节点
			this.root = lc
		} else if (flag === 1) {
			res.parent.left = lc
		} else {
			res.parent.right = lc
		}
	}

	// 先左后要, tree为最小失衡的子树的根节点
	LRRotate (tree) {
		// 调整结点平衡因子
		const lc = tree.left
		const rd = cl.right
		switch (rd.meta.bf) {
			case 1:
				tree.meta.bf = -1
				lc.meta.bf = 0
				break
			case 0:
				tree.meta.bf = 0
				lc.meta.bf = 0
				break
			case -1:
				tree.meta.bf = 0
				lc.meta.bf = 1
				break
		}
		rd.meta.bf = 0
		this.LLRotate(tree.left)
		this.RRRotate(tree)
	}

}

module.exports = {
	BalancedBinaryTree
}