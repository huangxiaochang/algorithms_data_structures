const { BubbleSort }  = require('./bubble_sort.js')
const { QuickSort }  = require('./quick_sort.js')
const { QuickSortInPlace }  = require('./quick_sort_in_place.js')
const { SelectSort }  = require('./select_sort.js')
const { quickSortWithNonRecurive } = require('./quick_sort_without_recursive.js')

function generateArr (size=10, start=0, end=100) {
	const arr = []
	while(size > 0) {
		arr.push(Math.floor(Math.random() * end + start))
		size--
	}
	return arr
}

function compareFn (a, b) {
	return a <= b ? true : false
}

let arr = generateArr(10)
// let arr = [100,49,38,65,97,76,13,27]

// const sort_method = new BubbleSort(compareFn)

// const sort_method = new QuickSort(compareFn)

// const sort_method = new QuickSortInPlace(compareFn)

// const sort_method = new SelectSort(compareFn)

// console.log(arr)

// const sort_arr = sort_method.sort(arr)

const sort_arr = quickSortWithNonRecurive(arr)

console.log(arr, 'before_sort', arr.length)
console.log(sort_arr, 'after_sort', sort_arr.length)
