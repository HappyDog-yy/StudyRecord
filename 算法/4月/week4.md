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

### 3.合并无重复的区间（数组）

https://leetcode.cn/problems/merge-intervals/?envType=study-plan-v2&envId=top-100-liked

```ts
function merge(intervals: number[][]): number[][] {
    const len:number = intervals.length;

    // 首先对于原数组的区间按照区间起点进行排序
    for(let i:number=0;i<len;i++){
        for(let j:number=i+1;j<len;j++){
            if(intervals[i][0]>intervals[j][0]){
                let temp:number[] = [...intervals[i]];
                intervals[i] = intervals[j];
                intervals[j] = temp;
            }
        }
    }

    // 检查两个数组是否重合的数组
    // 不重合返回true，否则返回false
    function check(nums1:number[],nums2:number[]):boolean{
        const len1:number = nums1.length;
        const len2:number = nums2.length;

        if(len1===0 || len2===0)return true;
        // 保证数组1的左端点更小
        if(nums1[0]>nums2[0]){
            let temp:number[] = [...nums1];
            nums1 = [...nums2];
            nums2 = [...temp];
        }

        if(nums1[len1-1]<nums2[0])return true;
        return false;
    }

    // 对于原数组中的每两个元素之间进行对比
    let res:number[][] = [];
    let cur:number[] = intervals[0];
    // 下面的循环只需要进行一轮即可完成比较
    for(let j:number = 1;j<len;j++){
        // 让当前数组和下一个数组进行比较
        let checkres = check(cur,intervals[j]);
        // 如果返回结果为false，代表有重合的部分
        // 重合则修改cur数组的起点和终点
        if(!checkres){
            cur[0] = intervals[j][0]>cur[0]?cur[0]:intervals[j][0];
            cur[1] = intervals[j][1]>cur[1]?intervals[j][1]:cur[1];
        }else{
            // 不重合的情况，将当前的cur加入结果数组
            res.push(cur);
            cur = intervals[j];
        }
    }

    //最后将cur放入res结果中
    res.push(cur);
    return res;
};
```

