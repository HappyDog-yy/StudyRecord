### 1.数组前缀后缀数组乘积之和

https://leetcode.cn/problems/product-of-array-except-self/?envType=study-plan-v2&envId=top-100-liked

#### 1.1暴力解法
```ts
function productExceptSelf(nums: number[]): number[] {
    let len:number = nums.length;
    let answer:number[] = new Array(len) ;
    // 创建时一定要指定长度，否则数组的任意索引都无法访问

    // 获得i索引前面的所有元素乘积
    function before(i:number):number{
        let res = 1;
        for(let j:number=0;j<i;j++){
            res = res*nums[j];
        }
        return res;
    }

    // 获得i索引后面的所有元素乘积
    function after(i:number):number{
        let res = 1;
        for(let j:number=i+1;j<len;j++){
            res = res*nums[j];
        }
        return res;
    }

    for(let i:number=0;i<len;i++){
        answer[i] = before(i)*after(i);
    }

    return answer;
    
};
```

#### 1.2 前缀后缀乘积法

```ts
function productExceptSelf(nums: number[]): number[] {
    let len:number = nums.length;
    let answer:number[] = new Array(len).fill(1) ;

    // 计算前缀乘积,并且都放在数组中
    let prev:number = 1;
    for(let i:number = 0;i<len;i++){
        answer[i] = prev;
        prev = prev*nums[i];
    }

    // 计算后缀乘积
    let after:number = 1;
    for(let i:number = len-1;i>=0;i--){
        answer[i] = answer[i]*after;
        after = after*nums[i];
    }

    return answer;
};
```

### 2.滑动窗口法-->数组中连续元素的最大和

https://leetcode.cn/problems/maximum-subarray/submissions/720344319/?envType=study-plan-v2&envId=top-100-liked

```ts
function maxSubArray(nums: number[]): number {
    // 使用滑动窗口法
    let curSum:number = 0;
    // 目前窗口里面的数字之和
    let maxSum = -Infinity;
    // 之前已经存储的，只要比它大，就替换掉它，初始化为负无穷大

    for(let num of nums){
        // 如果num更大，那么curSum一定是0或者负数，直接丢掉
        curSum = Math.max(num,curSum+num);
        // 更新最大和
        maxSum = Math.max(maxSum,curSum);
    }
    return maxSum;
    
};
```
