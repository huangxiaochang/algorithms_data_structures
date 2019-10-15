var { BinaryTree } = require('./binaryTree.js')

var arrTree = new BinaryTree([1,2,3,4,5,undefined,6,undefined,undefined,7,8])

// console.log(arrTree)

var objTree1 = new BinaryTree({
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
var objTree2 = new BinaryTree({
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

var objTree3 = new BinaryTree()
var objTree4 = new BinaryTree()

// console.log(BinaryTree.compareRecursive(objTree1.root,objTree2.root,undefined, false))
// console.log(BinaryTree.compareRecursive(objTree1.root,objTree3.root,undefined, true))
// console.log(BinaryTree.compareRecursive(objTree4.root,objTree3.root,undefined, true))

// console.log(objTree1)
// console.log(objTree3)

// var tree1 = BinaryTree.createByPreAndInOrder(['a','b','c','d','e','g','f'], ['c','b','e','g','d','f','a'])
var tree2 = BinaryTree.createByPostAndInOrder(['c','g','e','f','d','b','a'], ['c','b','e','g','d','f','a'])
// console.log(tree1)
// console.log(tree2)
console.log(tree2.findChild('c'))


