const { BinarySearch } = require('./binary_search.js')

let arr = [1,4,4,8,11,14,17,68, 100, 122]

binarySearch = new BinarySearch(arr, function(a, b) {
	return a - b
})

console.log(binarySearch.search(11))
console.log(binarySearch.search(1))
console.log(binarySearch.search(4))
console.log(binarySearch.search(18))
