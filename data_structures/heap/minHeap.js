const { Heap } =  require('./heap.js')

class minHeap extends Heap {
	constructor (compareFn) {
		super(compareFn)
	}

	isCorrectOrder (a, b) {
		let flag = this.compare(a, b)
		return (flag === 0 || flag === -1) ? true : false
	}

}

module.exports = {
	minHeap
}