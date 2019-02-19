export class Comparator {
	constructor(compareFn) {
		this.compare = compareFn || Comparator.defaultCompareFn
	}
	defaultCompareFn(a, b) {
		if (a === b) { return 0 }
		return a < b ? -1 : 1
	}
}