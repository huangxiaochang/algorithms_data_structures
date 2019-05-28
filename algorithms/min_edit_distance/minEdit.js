// 最小编辑距离：a字符串的长度为m, b字符串的长度n,则a->b的最小编辑距离
    
// 递归：
// 1.如果a[m] == b[n],则最小编辑距离d[m][n] = a[m-1]b[n-1]
// 2.如果a[m] != b[n],则
//    1.d[m][n] = d[m-1][n] + 1, 因为可以先把a[m-1] -> b[n],然后a再删除a[m]
//    2.d[m][n] = d[m][n-1] + 1,因为可以先把a[m] -> b[n-1],然后b再插入b[m]
//    3.d[m][n] = d[m-1][n-1] + 1, 因为可以先把a[m-1] -> b[n-1],然后把a[m]替换成b[n]
//    4.以上的三种情况都有可能，所以要选最小的值作为最短编辑距离
   
/*
  @params a string
  @params b string
  递归的时间复杂度为指数级的
 */
function minEditDistanceRecursion (a, b) {
  var m = a.length,
      n = b.length,
      d1 = 0,
      d2 = 0,
      d3 = 0;

  if (m === 0) {
    return n
  }
  if (n === 0) {
    return m
  }
  if (a[m -1] === b[n-1]) {
    return minEditDistanceRecursion(a.substring(0, m-1), b.substring(0, n-1))
  } else {
    // a[m-1] -> b[n], del a[m]
    d1 = minEditDistanceRecursion(a.substring(0, m-1), b.substring(0, n)) + 1
    // a[m] -> b[n-1], add b[n]
    d2 = minEditDistanceRecursion(a.substring(0, m), b.substring(0, n-1)) + 1
    // a[m-1] -> b[n-1], update a[m] -> b[n]
    d3 = minEditDistanceRecursion(a.substring(0, m-1), b.substring(0, n-1)) + 1

    return Math.min(d1, d2, d3)
  }
}

/*
  动态规划算法求最短编辑距离：时间复杂度为线性级。
  算法思路：
    动态规划的算法和递归算法的求解过程刚好是相反的，递归是要求d[m][n],则需要先求的d[m-1][n-1] ，
    动态规划是先求得d[m-1][n-1]再求得d[m][n]:
    1.如果a[m] == b[n],则d[m][n] = d[m-1][n-1]
    2.如果a[m] != b[n],则
      1.d[m][n] = d[m-1][n] + 1
      2.d[m][n] = d[m][n-1] + 1
      3.d[m][n] = d[m-1][n-1] + 1
    比如在知道d[0][0],d[0][1],d[1][0]的请求下，则d[1][1]:
    1.如果a[1] == b[1],则d[1][1] = d[0][0]
    2.如果a[1] != b[1],则d[1][1] = min(d[0][0], d[0][1], d[1][0])
 */
/*
  @params a string
  @params b string
*/
function minEditDistanceDynamic(a, b) {
  var m = a.length,
      n = b.length,
      // 不能使用fill来填充，因为fill如果填充的是引用类型的话，他们会是同一个对象。
      // d = Array(m + 1).fill(new Array(n + 1).fill(0)); 
      d = [];

  for(var i = 0; i <= m; i++) {
    d[i] = []
    d[i][0] = i
  }

  for(var j = 0; j <= n ; j++) {
    d[0][j] = j
  }

  for(var i = 1; i <= m; i++) {
    for(var j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) {
        d[i][j] = d[i-1][j-1]
      } else {
        d[i][j] = Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]) + 1
      }
    }
  }
  return d[m][n]
}

console.log(minEditDistanceRecursion('ertw7', 'qhel'))
console.log(minEditDistanceDynamic('ertw7', 'qhel'))