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

	// 在平衡二叉树上搜索某一个节点，needLocation为true,会返回找到的节点和父节点，否者只会返回true/false
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
						// 递归回退时，如果没有插入之前，该结点的右树已经高与左树，则需要调整平衡
						if (tree.meta.bf === -1) {
							// 在失衡结点的右子树的根结点的右子树上插入节点
							if (tree.right.meta.bf === -1) {
								// 调整结点的平衡因子
								tree.meta.bf = 0
								tree.right.meta.bf = 0
								// 进行单左旋转,并调整结点平衡因子
								this.LLRotate(tree)
							} else if (tree.right.meta.bf === 1) {
								// 在失衡结点的右子树的根节点的左子树上插入结点
								// 进行先右后左旋转,并调整结点平衡因子
								this.RLRotate(tree)
							}
						} else {
							// 已经插入到右树中，所以平衡因子要减1，即该结点为树要向右长高
							tree.meta.bf -= 1
						}
						return true
					}
					return false
				} else {
					// 作右孩子插入
					const node = new BinaryTreeNode(value)
					node.meta.bf = 0 // 该节点的平衡因子
					tree.right = node
					// 被插入的父结点要向右长高
					tree.meta.bf -= 1
					return true
				}
			} else {
				// 在左子树中插入
				if (tree.left) {
					// 如果已经在左子树插入新节点
					if (this.insertAVL(value, tree.left)) {
						// 递归回退时，如果之前的左树已经比右树高，则要平衡化处理
						if (tree.meta.bf === 1) {
							// 失衡结点的左子树的根节点的左子树上插入
							if (tree.left.meta.bf === 1) {
								// 调整结点的平衡因子
								tree.meta.bf = 0
								tree.left.meta.bf = 0
								// 进行单右旋转,并调整结点平衡因子
								this.RRRotate(tree)
							} else if (tree.left.meta.bf === -1) {
								// 在失衡结点的左子树的根结点的右子树上插入节点
							// 进行先左后右旋转,并调整结点平衡因子
								this.LRRotate(tree)	
							}
						} else {
							// 如果已经插入左子树，当还没达到失衡，则以该结点为树要向左长高
							tree.meta.bf += 1
						}
						return true
					}
					return false
				} else {
					// 作为左孩子插入
					const node = new BinaryTreeNode(value)
					node.meta.bf = 0 // 该节点的平衡因子
					tree.left = node
					// 父结点要向左树长高
					tree.meta.bf += 1
					return true
				}
			}
		}
	}

	// 将一个结点从平衡二叉树中删除
	deleteAVL (value, tree=this.root, parent=null) {
		if (!tree) { return false}
		const flag = this.nodeCompareFn(value, tree.value)

		if (flag === 1 ) {
			// 在右子树中删除
			this.deleteAVL(value, tree.right)
		} else if (flag === -1) {
			// 在左子树中删除
			this.deleteAVL(value, tree.left)
		} else {
			// 删除该节点，并调整
			if (parent === null) {
				// 删除的是根节点
				
			} else {
				if (this.nodeCompareFn(value, parent.value) === 1) {
					// 要删除的节点
					const del = parent.right
					if (del.left && del.right) {

					} else if (del.left || del.right) {
						parent.right = del.left || del.right
					} else {
						parent.right = null
					}
					// 删除为右结点，父节点要向左长高
					parent.meta.bf += 1
					return true
				} else {
					const del = parent.left
					if (del.left && del.right) {
						let new_del = null
						// 如果该节点的平衡因子为0或者1，则找到其左子树最大节点作为新的删除结点
						if (del.meta.bf === -1) {
							new_del = BalancedBinaryTree.findMaxOrMin(del.right, false/*isMax*/)
							// 新旧删除结点内容交换，只交换内容，不交换平衡因子
							del.value = new_del.node.value
							// 然后删除新的结点
							this.deleteAVL(value, del.right, del)
						} else {
							new_del = BalancedBinaryTree.findMaxOrMin(del.left, true/*isMax*/)
							// 新旧删除结点内容交换，只交换内容，不交换平衡因子
							del.value = new_del.node.value
							// 然后删除新的结点
							this.deleteAVL(value, del.left, del)
						}
					} else if (del.left || del.right) {
						parent.left = del.left || del.right
					} else {
						parent.left = null
					}
					// 删除为左节点，父节点要向右长高
					parent.meta.bf -= 1
					return true
				}
			}
		}
	}

	// 在一颗平衡二叉树中，找到最大或者最小的节点, 返回该节点和其父节点
	static findMaxOrMin (tree, isMax=true) {
		if (!tree) {
			return {
				parent: null,
				node: null
			}
		}
		let parent = null
		while (tree) {
			if (isMax) {
				if (tree.right) {
					parent = tree
					tree = tree.right
				} else {
					return {
						parent: parent,
						node: tree
					}
				}
			} else {
				if (tree.left) {
					parent = tree
					tree = tree.left
				} else {
					return {
						parent: parent,
						node: tree
					}
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
		const rd = tree.right
		const lc = rd.left
		switch (lc.meta.bf) {
			case 1:
				tree.meta.bf = 0
				rd.meta.bf = -1
				break
			case 0:
				tree.meta.bf = 0
				rd.meta.bf = 0
				break
			case -1:
				tree.meta.bf = 1
				rd.meta.bf = 0
				break
		}
		// 被插入的父级节点会平衡
		lc.meta.bf = 0
		// 先右旋其右子树
		this.RRRotate(tree.right)
		// 再左旋该树
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
		const rd = lc.right
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
		// 向左旋其左树
		this.LLRotate(tree.left)
		// 再右旋该树
		this.RRRotate(tree)
	}

}

module.exports = {
	BalancedBinaryTree
}