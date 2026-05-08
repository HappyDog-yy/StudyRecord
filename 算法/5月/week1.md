### 1.分发饼干

https://leetcode.cn/problems/assign-cookies/

```ts
function findContentChildren(g: number[], s: number[]): number {
    // 快速排序法最终超出时间限制
    // // 快速排序法的实现，用于数组排序
    // function QuickSort(arr:number[],begin:number,end:number){
    //     if(begin>=end){return;}
    //     // 思想：随便选一个数，比他小的放在左边，比它大的放在右边
    //     let x:number = arr[end];
    //     let i:number = begin;
    //     let j:number = end;
    //     while(i<j){
    //         // 在左边找大于它的,循环停止的时候的i就满足：arr[i]>x,此时i左边的元素全部满足小于x
    //         // 内层循环也要检查，是否满足i<j,否咋最后i=j的时候，一直出不去循环导致死循环
    //         while(i<j && arr[i]<=x){
    //             i++;
    //         }if(i<j){arr[j] = arr[i];j--;}
    //         while(i<j && arr[j]>=x){
    //             j--;
    //         }if(i<j){arr[i] = arr[j];i++;}
    //     }arr[j]=x;
    //     QuickSort(arr,begin,j-1);
    //     QuickSort(arr,j+1,end);

    // }
    // 贪心算法，有局部最优最后推到出全局最优
    // 局部最优就是：尽量充分的利用大饼干，即大饼干喂胃口大的孩子

    let res:number=0;
    const lenG:number = g.length;
    const lenS:number = s.length;
    // QuickSort(g,0,lenG-1);
    // QuickSort(s,0,lenS-1);

    s=s.sort((a,b)=>a-b);
    g=g.sort((a,b)=>a-b);

    let index:number = lenS-1;

    // 前提要是两个排好顺序的数组
    for(let i:number=lenG-1;i>=0;i--){
        // 外层循环控制孩子

        // 内层循环控制饼干，只有饼干喂出去了再向前移动,同时这个孩子也不要再处理了
        if(index>=0 && s[index]>=g[i]){
            res++;
            index--;
        }
    }

    return res;
    
};
```

### 2.集合的子集

https://leetcode.cn/problems/subsets-ii/submissions/722609934/

```ts
function subsetsWithDup(nums: number[]): number[][] {
    let path:number[]=[];
    let res:number[][]=[];
    // 需要注意重复的问题
    // 比如122，会收集两个12的数组
    // 那就先对数组进行排序,保证重复的数字在一起
    nums.sort((a,b)=>{return a-b;})
    

    function backTracking(nums:number[],startIndex:number):void{
        // 子集问题和之前的组合问题的区别就是
        // 之前的问题仅仅在叶子节点收集结果
        // 而自己问题在每一个节点都收集结果
        const len:number = nums.length;

        res.push([...path]);
        // 并且收集结果的逻辑放在终止条件之前，否则会漏掉本身也是本身的子集的情况
        if(startIndex>=len){
            return;
        }

        for(let i:number=startIndex;i<len;i++){
            
            if(i>startIndex && nums[i]===nums[i-1]){
                continue;
            }
            path.push(nums[i]);
            backTracking(nums,i+1);
            path.pop();
        }
    }

    backTracking(nums,0);
    return res;
};
```

### 3.波动数组的最长波动子序列元素个数-贪心算法

https://leetcode.cn/problems/wiggle-subsequence/submissions/723655258/

```ts
function wiggleMaxLength(nums: number[]): number {
    // 摆动序列
    // 前面一个坡度和后面一个坡度异号就记录摆动，相邻的重复元素要去掉一个
    // 这样就不用考虑平坡的特殊情况
    const len:number = nums.length;
    if(len===0)return 0;
    if(len===1)return 1;
    let arr1:number[]=[];
    if(len>1){
        arr1.push(nums[0]);
        for(let i=1;i<len;i++){
            if(nums[i]!==nums[i-1]){
                arr1.push(nums[i]);
            }
        }
    }
    if(arr1.length === 1)return 1;
    // 现在就没有平坡了
    let res:number = 1;
    let prevDiff:number = 0;
    let curDiff:number = 0;
    // 这里的循环终止条件不对，最后i=arr1.length-1的时候，i+1=arr1.length，会导致越界的问题出现
    for(let i:number = 0;i<arr1.length;i++){
        curDiff = arr1[i+1]-arr1[i];
        // 这里初始的时候，第一个坡度被初始化为0，会导致if一直进不去的问题
        // 所以无论如何也要不要忘记更新遍历条件
        if(prevDiff*curDiff<0){
            res++;
        }
        prevDiff = curDiff;
    }

    return res+1;
    
};
```

### 4.