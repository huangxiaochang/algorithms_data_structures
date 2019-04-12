const { permutateWithoutRepet, permutateWithRepet } = require('./permutation.js')

let arr = permutateWithoutRepet([1,2,3])

console.log(arr)
console.log(arr.length)

let arr2 = permutateWithRepet([1,2,2])

console.log(arr2)
console.log(arr2.length)
