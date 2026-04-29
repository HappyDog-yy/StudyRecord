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

### 4.回溯法解决组合问题

https://leetcode.cn/problems/combinations/submissions/721878702/

#### 4.1未剪枝版本
```ts
function combine(n: number, k: number): number[][] {
    // 使用回溯算法
    // 有递归就有回溯
    // 组合问题，使用for循环要嵌套k层，k是不确定的，没办法解决

    let res:number[][]=[];
    // 结果数组，二维数组
    let path:number[] = [];
    // 一维数组，最后会将符合的path数组push到最终结果中

    function backTracking(n:number,k:number,startIndex:number){
        // 回溯算法三部曲
        // 递归函数的参数和返回值
        // 确定递归终止的条件：到达叶子节点，即path.length===k
        // 单层递归的逻辑是什么

        if(path.length === k){
            // 符合终止条件时，先将其加入结果数组，再返回结果
            res.push(path.slice());
            return;
        }
        for(let i=startIndex;i<=n;i++){
            path.push(i);
            // i=1的时候，此时数组长度为1
            // 可以进一次循环，把2加进去，此时长度为2，直接返回，并且已经把【1，2】加入结果数组
            // 这时候把2弹出，
            backTracking(n,k,i+1);
            path.pop();
        }
    }

    backTracking(n,k,1);
    return res;
 
};
```

#### 4.2剪枝版本
```ts
function combine(n: number, k: number): number[][] {
    // 使用回溯算法
    // 有递归就有回溯
    // 组合问题，使用for循环要嵌套k层，k是不确定的，没办法解决

    let res:number[][]=[];
    // 结果数组，二维数组
    let path:number[] = [];
    // 一维数组，最后会将符合的path数组push到最终结果中

    function backTracking(n:number,k:number,startIndex:number){
        // 回溯算法三部曲
        // 递归函数的参数和返回值
        // 确定递归终止的条件：到达叶子节点，即path.length===k
        // 单层递归的逻辑是什么

        if(path.length === k){
            // 符合终止条件时，先将其加入结果数组，再返回结果
            res.push(path.slice());
            return;
        }
        // 如何剪枝？如n=4，k=3，那么i至多从2开始，如果从3开始，只有3 4，是不可能满足元素的个数的
        // 如果n=3，k=3，那么i至多从1开始，后面的都不用看
        // 如果组合中一共要有k个数，现在已经有path.length个数，还需要k-path.length
        // 那么起始的位置至多是n-(k-path.length)+1
        for(let i=startIndex;i<=n-(k-path.length)+1;i++){
            path.push(i);
            // i=1的时候，此时数组长度为1
            // 可以进一次循环，把2加进去，此时长度为2，直接返回，并且已经把【1，2】加入结果数组
            // 这时候把2弹出，
            backTracking(n,k,i+1);
            path.pop();
        }
    }
    backTracking(n,k,1);
    return res;
};
```