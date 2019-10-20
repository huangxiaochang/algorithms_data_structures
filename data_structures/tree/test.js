var { BinaryTree } = require('./binaryTree.js')
var { BiThreadTree } = require('./biThreadTree')
var { BinarySortTree } = require('./binarySortTree.js')
var { BalancedBinaryTree } = require('./balancedBinaryTree.js')

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

var objTree3 = new BinaryTree({
	value: '-',
	left: {
		value: '+',
		left: 'a',
		right: {
			value: '*',
			left: 'b',
			right: {
				value: '-',
				left: 'c',
				right: 'd'
			}
		}
	},
	right: {
		value: '/',
		left: 'e',
		right: 'f'
	}
})

var objTree4 = new BinaryTree()

var threadTree = new BiThreadTree()

// console.log(objTree3.root)

// threadTree.inOrderThreading(objTree3.root)
// console.log(threadTree.inOrderTraverseThr())
// console.log(threadTree.getPreWithInOrderThr(threadTree.root.left))

var fs = require('fs')

function printToFile (filename, obj) {
	var jsonText = JSON.stringify(obj, null, '\t');
  fs.writeFileSync(fileName, jsonText, 'utf8');   
}

// printToFile('test.txt',threadTree)

// var sortTree = new BinarySortTree()
// console.log(sortTree.searchBST(1))
// sortTree.insertBST(45)
// sortTree.insertBST([24, 53, 12, 28, 90])
// console.log(sortTree)
// sortTree.deleteBST([28, 45])
// console.log(sortTree.searchBST(53))
// console.log(sortTree.inOrderTraverse())
// console.log(sortTree.findChild(45))

var avl = new BalancedBinaryTree()
avl.insertAVL(13)
avl.insertAVL(24)
avl.insertAVL(37)
avl.insertAVL(90)
avl.insertAVL(53)
avl.insertAVL(40)
list = avl.inOrderTraverse()
console.log(avl)
console.log('----')
for(let p of list) {
	console.log(p, p.meta.bf)
}

