const { BubbleSort }  = require('./bubble_sort.js')
const { QuickSort }  = require('./quick_sort.js')
const { QuickSortInPlace }  = require('./quick_sort_in_place.js')

function generateArr (size=10, start=0, end=100) {
	const arr = []
	while(size > 0) {
		arr.push(Math.floor(Math.random() * (start + (end - start))))
		size--
	}
	return arr
}

function compareFn (a, b) {
	return a <= b ? true : false
}

// let arr = generateArr(6)
let arr = [100,49,38,65,97,76,13,27]

// const sort_method = new BubbleSort(compareFn)

// const sort_method = new QuickSort(compareFn)

const sort_method = new QuickSortInPlace(compareFn)

console.log(arr)

const sort_arr = sort_method.sort(arr)

console.log(sort_arr, 'after_sort')
