const { Knapsack } = require('./knapsack.js')

let possibleItems = [
	{weight: 5, value: 4},
	{weight: 2, value: 6},
	{weight: 2, value: 6},
	{weight: 6, value: 5},
	{weight: 2, value: 3},
	{weight: 2, value: 3},
	{weight: 4, value: 6}
]

let ks = new Knapsack(possibleItems, 10)
let res = ks.zeroOneKnapsackProblem()
console.log(ks.selectedItems)
console.log(res)
