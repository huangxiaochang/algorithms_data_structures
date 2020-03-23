const { BubbleSort }  = require('./bubble_sort.js')
const { QuickSort }  = require('./quick_sort.js')
const { QuickSortInPlace }  = require('./quick_sort_in_place.js')
const { SelectSort }  = require('./select_sort.js')
const { quickSortWithNonRecurive } = require('./quick_sort_without_recursive.js')
const { insertSort } = require('./insert_sort.js')
const { mergeSort, mergeSortWithoutRecursive } = require('./merge_sort.js')
const { shellSort } = require('./shell_sort.js')
const { countSort } = require('./count_sort.js')
const { radixSort } = require('./radix_sort.js')
const { bucketSort } = require('./bucket_sort.js')

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

let arr = generateArr(7)
// let arr = [100,49,38,65,97,76,13,27]

// const sort_method = new BubbleSort(compareFn)

// const sort_method = new QuickSort(compareFn)

// const sort_method = new QuickSortInPlace(compareFn)

// const sort_method = new SelectSort(compareFn)

// console.log(arr)

// const sort_arr = sort_method.sort(arr)

// const sort_arr = quickSortWithNonRecurive(arr)

// const sort_arr = insertSort(arr)

// const sort_arr = mergeSort(arr)

// const sort_arr = mergeSortWithoutRecursive(arr)

// const sort_arr = shellSort(arr)

// const sort_arr = countSort(arr)

// const sort_arr = radixSort(arr)

const sort_arr = bucketSort(arr)

console.log(arr, 'before_sort', arr.length)
console.log(sort_arr, 'after_sort', sort_arr.length)


// javascript内置排序算法sort底层所采用的排序算法为：
// 在数据比较小时，采用插入排序算法，数据量大时，采用的是快速排序算法

