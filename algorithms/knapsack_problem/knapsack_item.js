class KnapsackItem {
	constructor({weight, value}) {
		this.weight = weight
		this.value = value
		this.quantity = 1
	}

	totalValue() {
		return this.value * this.quantity
	}

	totalWeight() {
		return this.weight * this.quantity
	}

	get valueWeightRatio() {
		return this.value / this.weight
	}
}

module.exports = {
	KnapsackItem
}