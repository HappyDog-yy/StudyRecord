### 1.杨辉三角

https://leetcode.cn/problems/pascals-triangle/?envType=study-plan-v2&envId=top-100-liked

```ts
function generate(numRows: number): number[][] {
    // 动态规划五部曲
    // 1.dp含义
    // 2.递推公式
    // 3.确定遍历顺序
    // 4.初始化
    // 5.打印输出验证
    // dp数组是一个二位数组
    // dp[i]代表第i行的元素，也是一个数组
    // 递推公式，首先我们可以得知
    // 每一行的第一个和最后一个元素可以直接初始化位1
    let res:number[][]=[];
    for(let i:number=0;i<numRows;i++){
        res[i] = new Array(i+1).fill(1);
    }
    for(let i:number = 2;i<numRows;i++){
        // 如果i=4，需要计算的最后一个数字是j=2，即i-2
        for(let j:number=1;j<i;j++){
            res[i][j] = res[i-1][j]+res[i-1][j-1];
        }
    }
    console.log(res);
    return res;
};
```

### 2.打家劫舍（动态规划）

https://leetcode.cn/problems/house-robber/submissions/729016618/?envType=study-plan-v2&envId=top-100-liked

```ts
function rob(nums: number[]): number {
    // 假设dp[i]代表一共有i间房屋偷到的钱的最大值
    // dp[i]=max（两种方式）
    // 情况一：i-1不偷，这时候就可以偷i,dp[i]=dp[i-2]+nums[i]
    // 情况二：i-1偷了，这时候就不能偷i,dp[i]=dp[i-1]

    const len:number = nums.length;
    let dp:number[] = new Array(len).fill(0);
    dp[0]=nums[0];
    dp[1] = Math.max(nums[0],nums[1]);
    for(let i:number = 2;i<len;i++){
        dp[i] = Math.max(dp[i-2]+nums[i],dp[i-1]);
    }
    console.log(dp);
    return dp[len-1];
    
};
```

### 3.完全平方数

https://leetcode.cn/problems/perfect-squares/?envType=study-plan-v2&envId=top-100-liked

```ts
function numSquares(n: number): number {
    // 动态规划
    // 1.确定dp数组含义
    // 2.递推公式
    // 3.初始化
    // 4.遍历顺序
    // 5.打印检验

    // dp[j] = dp[j-i*i]+1;
    let dp:number[]=new Array(n+1).fill(n);
    dp[0]=0;
    dp[1]=1;
    dp[2]=2;
    dp[3] =3;
    dp[4] = Math.min(dp[4-1*1]+1,dp[4-2*2]+1);
    // 遍历一个i的时候，将dp[j]初始化为对应的dp[j-i*i]+1,后面的都和当前的擂主比较，取最小值
    for(let j:number=5;j<=n;j++){
        for(let i:number=1;i*i<=j;i++){
            dp[j]=Math.min(dp[j],dp[j-i*i]+1);
        }
    }

    console.log(dp);
    return dp[n];
    
};
```