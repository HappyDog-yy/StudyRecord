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