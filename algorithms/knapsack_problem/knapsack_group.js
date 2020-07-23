/*
	分组背包问题
	即有k组物品，每组物品有n个，同一组中的物品最多只能选择一个，装入背包容量为V的背包，求能得到的最大值
 */
/*
 * @param  {[number]} V      [背包容量]
 * @param  {[arrary]} groups [k组物品]
 * @return {[number]}        [能够得到的最大价值]
 */
function knapsack_group (V, groups) {
	/*
	 dp数组定义：
	 dp[k][v]: 表示前k组物品加入容量为v的背包得到的最大价值
	 则dp[k][v] = max(dp[k-1][v],dp[k][v],dp[k-1][v-kci] + kwi)
	 其中kci为第k组中的某件物品的重量，kwi则为它的价值
	 状态转移方程的含义：
	 对每一组，只有两种可能的选择，即选择或者不选择该组中的物品
	 对于某一个组中的物品，它同样只有两种选择，即选择或者不选择该件物品
	 当不选择第k组中的物品时，dp[k][v]即为dp[k-1][v]
	 当选择第k组中的物品时，对于第k组中的第i件物品：
	 不选择时，即为dp[k][v],
	 选择时，即为dp[k-1][v-kci] + kwi
	 然后取他们中的最大值即为dp[k][v]的最大值
	*/
	dp = [];
  for (let i = 0 ; i <= groups.length; i++) {
  	dp[i] = [];
  	for (let j = 0 ; j <= V; j++) {
  		dp[i][j] = 0;
  	}
  }

  for (let k = 1 ; k <= groups.length; k++) {
  	let gp = groups[k-1];
  	for (let v = 1; v <= V; v++) {
  		for (let i = 0 ; i < gp.length; i++) {
  			let cs = gp[i];
  			if (cs[0] <= v) {
  				dp[k][v] = Math.max(dp[k-1][v], dp[k][v], dp[k-1][v-cs[0]] + cs[1]);
  			} else {
  				dp[k][v] = dp[k-1][v];
  			}
  		}
  	}
  }

  return dp[groups.length][V];
}