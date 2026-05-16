### 1.使用最小花费爬楼梯

https://leetcode.cn/problems/min-cost-climbing-stairs/submissions/725272859/

```ts
function minCostClimbingStairs(cost: number[]): number {
    // 动态规划五部曲
    // 往往会有一个对应的到达第n的最好情况，作为花费
    // 1.确定dp数组和下标含义
    // 2.递推公式
    // 3.数组初始化
    // 4.遍历顺序
    // 5.打印出dp数组验证一下
    // 达到第n步的最小花费是dp[n],楼顶相当于是下标为cost.length的位置
    let dp:number[]=new Array(cost.length +1);
    // 刚开始就直接站在台阶1或者台阶2上，就可以使得最小花费为0
    dp[0]=0;
    dp[1] = 0;
    // dp[i]=
    // dp[i-1]+cost[i-1];
    // 或者dp[i-2]+cost[i-2];两者之间取较小的
    // 
    for(let i:number = 2;i<=cost.length;i++){
        dp[i] = Math.min((dp[i-1]+cost[i-1]),(dp[i-2]+cost[i-2]));
    }
    return dp[cost.length];
};
```

### 2.

```ts

```
