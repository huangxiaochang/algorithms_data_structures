/*
	完全背包问题：
		有N种(每种类型有无限多件)物品，每种物品对应的重量为wi,价值为vi,和一个容量W的背包，
		求解将那些物品放入背包中(总的重量不能超过背包的容量)，使得总的价值最大
		如N种物品为：
		[[15,15],[7,2],[8,14]]
		背包的容量为15，
		则把[7,2],[8,14]装入背包可得到最大价值为16

		[[15,15],[7,2],[8,14]]
		背包的容量为16，
		则把2件[8,14]装入背包可得到最大价值为28

		解：
		完全背包问题和01背包问题的不同之处在于每种物品是可以选多件，而01背包问题，每种物品只有一件可选。
		所以可以把完全背包问题转化成01背包问题。转化的方法：
		1.把每种物品转成W/wi件物品，这样即可使用01背包的动态规划来解决。因为对于每种物品，
			最多只能选择W/wi件加入背包中。
 */

/*
	@param costs array 每种物品重量和价值
	@param n number 背包的容量
	时间复杂度： n * costs.length * n / ci, 其中ci为每种物品的重量
	空间复杂度： n * costs.length * n / ci
 */
function knapsack_01 (costs, n) {
	const dp = [[0]];
	for (let i = 1; i <= costs.length; i++) {
		// 每种物品能够加入背包的最大的件数。如果某种物品重量比背包的容量还大，这里会直接过滤掉
		let count = (n / costs[i-1][0] ) >> 0;
		for (let j = 0 ; j < count; j++) {
			dp.push([0]);
		}
	}

	for (let i = 0; i <= n; i++) {
		dp[0][i] = 0;
	}

	let index = 1;
	for (let i = 1 ; i <= costs.length; i++) {
		let cost = costs[i-1];
		let count = n / cost[0] >> 0;
		// 每种类型物品分成count件物品，这样便转为了01背包问题
		for (let j = 0; j < count; j++) {
			for (let w = 1; w <= n; w++) {
				// 只有在背包还能放得下第i件物品时, 才进行选择
				if (cost[0] <= w) {
					dp[index][w] = Math.max(dp[index - 1][w], dp[index - 1][w - cost[0]] + cost[1]);
				} else {
					dp[index][w] = dp[index - 1][w];
				}
			}
			index += 1;
		}
	}
	return dp[index-1][n];
}

/*
	空间优化：
		因为完全背包问题可以转为01背包问题，所以同样存在着和01背包问题一样的空间优化。
 */

function knapsack_01_2 (costs, n) {
	const dp = [];
	for (let i = 0; i <= n; i++) {
		dp[i] = 0;
	}

	for (let i = 1 ; i <= costs.length; i++) {
		let cost = costs[i-1];
		let count = n / cost[0] >> 0;
		// 每种类型物品分成count件物品，这样便转为了01背包问题
		for (let j = 0; j < count; j++) {
			for (let w = n; w >= 0; w--) {
				// 只有在背包还能放得下第i件物品时, 才进行选择
				if (cost[0] <= w) {
					dp[w] = Math.max(dp[w], dp[w - cost[0]] + cost[1]);
				}
			}
		}
	}
	return dp[n];
}

// let res = knapsack_01([[15,15],[7,2],[8,12]], 15);
// console.log(res);
// let res2 = knapsack_01_2([[15,15],[7,2],[8,12]], 15);
// console.log(res2);

/*
	时间复杂度： n * costs.length
	空间复杂度： n 
 */
function knapsack_01_3 (costs, n) {
	const dp = [];
	for (let i = 0 ; i <= n; i++) {
		dp[i] = 0;
	}
	for (let i = 1; i <= costs.length; i++) {
		let cost = costs[i-1];
		for (let w = 1 ; w <= n; w++) {
			if (cost[0] <= w) {
				dp[w] = Math.max(dp[w], dp[w - cost[0]] + cost[1]);
			}
		}
	}
	return dp[n];
}

let res = knapsack_01([[8,15],[7,7]], 16);
console.log(res);
let res3 = knapsack_01_3([[8,15],[7,7]], 16);
console.log(res3);
