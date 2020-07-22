// 多重背包问题
/*
	@params V 背包的容量
	@params cos [[c,w,n]], c表示每种物品的重量，w表示每种物品的价值，n表示每种物品的数量
 */ 
function knapsack_mult (V, cos) {
  var dp = [];
  for (let i = 0 ; i <= cos.length; i++) {
  	dp[i] = [];
	  for (let j = 0 ; j <= V; j++) {
	  	dp[i][j] = 0;
	  }
  }

  // 多重背包问题
  // 多重背包问题和完全背包问题很像，只不过在转化成01背包问题时，对于第i种物品，他的最大的个数
  // 为mi件，如果mi > V/ci，那么它就是一个完全背包问题的一个选项，所以多重背包问题转成01背包问题
  // 时，转化成1,2,4,2^k个重量和价值都不等的01背包问题，其中k满足2^k < Mi + 1
  for (let i = 1; i <= cos.length; i++) {
  	let cs = cos[i-1];
  	let k = 1;

  	// 如果第i种物品的数量大于能加入的最大数量，那么相当于完全背包问题
  	if (cs[2] >= V / cs[0]) {
	  	for (let v = 1; v <= V; v++) {
	  		if (cs[0] <= v) {
	  			// 如果第i种物品可以放进背包时，那么前i种物品放入v容量的背包的最大价值为：
  	 			// 前i-1种物品放入v容量的背包，和前i-1种物品放入v容量加上第i种物品的k件物品的两者的最大值
  				// 其中dp[i][v-cs[0]]表示前i-1种物品，和v/cs[0]件第i种物品的最大价值
	  			dp[i][v] = Math.max(dp[i-1][v], dp[i][v-cs[0]] + cs[1]);
	  		} else {
	  			dp[i][v] = dp[i-1][v];
	  		}
	  	}
  	} else {
  		// 把第i种物品转成1,2,4,2^k件不同重量和价值的01背包问题, 其中k满足k <= cs[2] + 1
  		let k = 1;
  		while (k <= cs[2] + 1) {
  			for (let v = 1; v <= V; v++) {
  				if (k * cs[0] <= v) {
  					dp[i][v] = Math.max(dp[i-1][v], dp[i-1][v - k * cs[0]] + k * cs[1]);
  				} else {
  					dp[i][v] = dp[i-1][v];
  				}
  			}
  			k *= 2;
  		}
  	}
  }
  return dp[cos.length][V];
};


