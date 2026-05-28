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

### 3.字节跳动工程训练营笔试

- 构造一个由a+b个正整数构成的数组，满足c1,c2,....,ca+b恰好包含a个1和b个2，其中数组任意相邻两数的乘积是偶数，若这个数组存在则输出一个满足上述条件的数组，不存在则输出-1。

- 输入
分别输入a和b两个正整数。
2 2 

- 输出
符合条件的数组存在则输出一个符合条件的数组。
1 2 1 2
否则输出-1。

- 思路
由于要求数组内任意相邻两数的乘积是偶数，这意味着不能有连续的两个1存在，也就是1必须被2分隔，而2可以连续，故对a的个数进行情景讨论。

如果a = 0：则无论b为多少，都满足条件。
如果a >= 1：数组内存在a个1，则至少需要a-1个2来分隔他们。
如果b < a-1：那么2的个数不足以分隔所有1，不满足条件，返回-1。
如果b >= a-1：可能满足条件，剩余的b-(a-1)个2可以插入数组的任何位置。 那么，本题的核心思路就是用a-1个2分隔a个1，构造一条（1，2）a-1+1标准链，这将用掉a-1个1和a-1个2，将剩余的extra = b-(a-1)个2插入到链中任何位置都不会破坏约束条件，最终的完整序列为（1，2）a-1 + (extra个2) + 1。

```ts
function cal(a:number,b:number):number[]|number{
    if(b<a-1){
        return -1;
    }
    let res:number[]=[];
    // 下面出现了a-1，所以要考虑a-1是否为负数的情况
    if(a-1>=0){
        for(let i=0;i<a-1;i++){
            res.push(1);
            res.push(2);
        }
        res.push(1);
    }
    // a-1如果小于等于0，直接不做处理即可，只需要处理后面的2
    
    let rest:number = b-a+1;
    for(let i=0;i<(a===0?b:rest);i++){
        res.push(2);
    }
    return res;
}

console.log(cal(2,2))

```

### 4.不同的二叉搜索树种类（动态规划）

https://leetcode.cn/problems/unique-binary-search-trees/submissions/727650499/

```ts
function numTrees(n: number): number {
    // 动态规划五部曲
    // 确定dp数组及其含义
    // 初始化
    // 确定遍历顺序
    // 地推公式
    // 打印验证
    // 以n=3为例，分为3中情况
    // 1为根节点，左侧有0个节点，右子树有2个节点，dp[0]*dp[2]
    // 2为根节点，左侧有1个节点，右子树有1个节点,dp[1]*dp[1]
    // 3为根节点，左侧有2个节点，右子树有0个节点,dp[2]*dp[0]
    // 三者相加得到对应的dp[3]的结果
    // 得到递推公式,j为根节点，左子树一共有j-1个节点，右子树一共有i-j个节点
    // dp[i] = dp[i]+dp[j-1]*dp[i-j]
    let dp:number[] = new Array(n+1).fill(0);
    dp[0]=1;
    dp[1]=1;
    dp[2] =2;
    for(let i=3;i<=n;i++){
        for(let j:number = 1;j<=i;j++){
            dp[i] = dp[i]+dp[j-1]*dp[i-j];
        }
    }
    console.log(dp);
    return dp[n];
    
};
```
