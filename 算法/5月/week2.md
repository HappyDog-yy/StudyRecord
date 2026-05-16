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

### 2.从左上走到右下格子的方法数

https://leetcode.cn/problems/unique-paths/description/

```ts
function uniquePaths(m: number, n: number): number {
    // 使用动态规划来解决
    // 动态规划五部曲
    // 确定dp数组及其下表含义，往往是要求到n的结果，数组就是从0，n-1对应的关系
    // 递推公式
    // 初始化
    // 打印验证
    // 遍历顺序
    // Array.from用于将包含了length属性的类数组对象转换成一个真正的数组
    // 创建二位数组的两种方法
    let res:number[][]=new Array(m).fill(0).map(()=>new Array(n).fill(0));
    for(let j=0;j<n;j++){res[0][j]=1}
    for(let i=0;i<m;i++){res[i][0]=1}
    // 要到达m*n这个格子，有两种办法，一是m-1,n，二是m,n-1
    // 所以res[m-1][n-1] = res[m-2][n-1]+res[m-1][n-2]
    for(let i:number = 1;i<m;i++){
        for(let j:number = 1;j<n;j++){
            res[i][j] = res[i-1][j]+res[i][j-1];
        }
    }
    for(let i:number = 0;i<m;i++){
        for(let j:number = 0;j<n;j++){
            console.log(res[i][j])
        }
    }

    return res[m-1][n-1];
    
};
```
