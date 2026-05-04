### 1.IP复原

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