const { KnapsackItem } = require('./knapsack_item.js')

class Knapsack {
	constructor(possibleItems, weightLimit) {
		this.selectedItems = []
		this.weightLimit = weightLimit
		this.possibleItems = possibleItems
	}

	sortPossibleItemByValue() {
		this.possibleItems = this.possibleItems.sort((a, b) => {
			return a.value - b.value
		})
	}

	sortPossibleItemByWeight() {
		this.possibleItems = this.possibleItems.sort((a, b) => {
			return a.weight - b.weight
		})
	}

	sortPossibleItemByValueWeightRatio() {
		this.possibleItems = this.possibleItems.sort((a, b) => {
			return a.valueWeightRatio - b.valueWeightRatio
		})
	}

	// 此算法同样适合某一项有多个的情况，即只需要把它分解成多个相同的项即可
	zeroOneKnapsackProblem() {
		// 可以先进行按照值先排序，这样效率高点
		this.sortPossibleItemByValue()
		this.selectedItems = []
		let row = this.possibleItems.length
		let col = this.weightLimit + 1
		// 背包矩阵,一个二维数组
		let matrix = Array(row).fill(null).map(() => {
			return Array(col).fill(null)
		})

		// generate matrix
		// 当背包的承受的重量为0时，所有的选项都不能加入背包，所以价值都是0
		for(let itemIndex = 0; itemIndex < row; itemIndex++) {
			matrix[itemIndex][0] = 0
		}
		// 加入第一个选项，如果背包内存允许，这价值为该选项的价值，否则为0
		let first_item = this.possibleItems[0]
		for(let weightIndex = 1; weightIndex < col; weightIndex++) {
			matrix[0][weightIndex] = first_item.weight > weightIndex ? 0 : first_item.value
		}
		// 对于其他选项的加入，要进行动态的规划，要么加入，要么不加入，在加入之后，总价值比之前的价值大
		// 的时候才选择加入
		for(let itemIndex = 1; itemIndex < row; itemIndex++) {
			let cur_item = this.possibleItems[itemIndex]
			for (let weightIndex = 1; weightIndex < col; weightIndex++) {
				if (cur_item.weight > weightIndex) {
					// 当放不下该选项时，该矩阵点的价值为先前的价值
					matrix[itemIndex][weightIndex] = matrix[itemIndex - 1][weightIndex]
				} else {
					// 否者选择加入和不加入的最大值
					matrix[itemIndex][weightIndex] = Math.max(
						cur_item.value + matrix[itemIndex - 1][weightIndex - cur_item.weight],
						matrix[itemIndex - 1][weightIndex]
					)
				}
			}
		}

		// 从矩阵中找出加入背包的项
		let itemIndex = row - 1
		let weightIndex = col - 1
		let total_weight = 0
		// 算法思路:
		// 经过上面动态规划出二位矩阵解之后，最优解就是二维数组的最后一项，如果需要解出被放进背包的项,
		// 需要从最后一项开始寻找。寻找方法：
		// 1.和前一行同列对比，如果两值相等，这行数减1，再进行对比。
		// 2.如果两值不相等，这说明改行对应的项是被选进背包的。则选中，然后列移动到目前列对应的weight减去
		// 该选中选的weight对应的列。然后行减1.继续步骤1.
		// 3.如果行已近位于第一行，并且对应的值不为0，那么说明该项也是被选中的。
		while(itemIndex > 0) {
			if (matrix[itemIndex][weightIndex] !== matrix[itemIndex - 1][weightIndex]) {
				let select = this.possibleItems[itemIndex]
				total_weight += select.weight
				this.selectedItems.push(select)
				weightIndex -= select.weight
			}
			itemIndex -= 1
			// 如果已经是第一项，并且该项对应的值不为0的话，要加入该项
			if (itemIndex === 0 && matrix[itemIndex][weightIndex] !== 0) {
				let select = this.possibleItems[itemIndex]
				total_weight += select.weight
				this.selectedItems.push(select)
				break
			}
		}

		return {
			totalWeight: total_weight,
			totalVlaue: matrix[row - 1][col - 1],
			selectedItems: this.selectedItems
		}
	}

}

module.exports = {
	Knapsack
}