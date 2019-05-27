const { es6_flatten } = require('./flatten.js')
const { recerive_flatten } = require('./flatten.js')
const { non_recerive_flatten } = require('./flatten.js')

var arr = [1,[2,3], [4,[5,6,[7,8]]], 9]

// var res = es6_flatten(arr)
// var res = recerive_flatten(arr)
var res = non_recerive_flatten(arr)

console.log(res)