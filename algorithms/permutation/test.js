const { permutateWithoutRepet, permutateWithRepet, permutateWithStack, permutateWithBracktrack } = require('./permutation.js')

let arr = permutateWithoutRepet([1,2,3])

console.log(arr)
console.log(arr.length)

let arr2 = permutateWithRepet([1,2,2])

console.log(arr2)
console.log(arr2.length)

let arr3 = permutateWithStack([1,2,3])

console.log(arr3)
console.log(arr3.length)

let arr4 = permutateWithBracktrack([1,2,3,4])
console.log(arr4)

