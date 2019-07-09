/*
实现JSON.parse()
思路：
	1.使用Function(), 把JSON字符串作为函数体参数返回
	2.使用eval()，把JSON字符串转化成对象
 */

function jsonParse (jsonStr) {
	return (new Function('return' + jsonStr ))()
}

// 该方式可能会存在xss攻击，因为jsonStr可能是一段可执行的js代码，
// 所以需要对jsonStr进行一些检查和转化
function jsonEvalParse (jsonStr) {
	return eval("(" + jsonStr + ")")
}

// test

var data = {
  a: 1,
  b: [2,3],
  c: null,
  d: undefined,
  e: function () {},
  f: {
    g: true
  },
  h: '444'
}

var jsonStr = JSON.stringify(data)

JSON.parse = undefined

JSON.parse = JSON.parse || jsonParse // jsonEvalParse

var obj = JSON.parse(jsonStr)

console.log(obj, data === obj)