const { BubbleSort }  = require('./bubble_sort.js')
const { QuickSort }  = require('./quick_sort.js')

function generateArr (size=10, start=0, end=100) {
	const arr = []
	while(size > 0) {
		arr.push(Math.floor(Math.random() * (start + (end - start))))
		size--
	}
	return arr
}

function compareFn (a, b) {
	return a > b ? true : false
}

let arr = generateArr()

// const sort_method = new BubbleSort(compareFn)

const sort_method = new QuickSort(compareFn)

console.log(arr)

const sort_arr = sort_method.sort(arr)

console.log(sort_arr, 'after_sort')
