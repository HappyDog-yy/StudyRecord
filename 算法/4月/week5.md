### 1.无重复数字的数组中和为target的数字组合，允许一个数字使用多次

https://leetcode.cn/problems/combination-sum/

```ts
function combinationSum(candidates: number[], target: number): number[][] {
    // 回溯算法三部曲
    // 参数和返回值
    // 终止条件
    // 单层循环的逻辑

    let path:number[]=[];
    let res:number[][]=[];

    function backTracking(candidates: number[], target: number,curSUm:number,startIndex:number):void{
        // 什么时候需要startIndex这个参数，如果是在同一个集合中取值的话，就比如本体都在candidates中取值
        // 不需要的时候：上题的九键字母组合
        if(curSUm===target){
            res.push([...path]);
            return;
        }
        if(curSUm>target){
            return;
        }

        // 单层循环逻辑
        for(let i:number=startIndex;i<candidates.length;i++){
            path.push(candidates[i]);
            curSUm=curSUm+candidates[i];
            backTracking(candidates,target,curSUm,i);
            // 因为允许重复，所以此处是i而不是i+1
            curSUm = curSUm-path.pop();
        }
    }

    backTracking(candidates,target,0,0);
    return res;
    
};
```

### 2.有重复数字的数组中和为target的数字组合，不允许一个数字使用多次

https://leetcode.cn/problems/combination-sum-ii/

```ts
function combinationSum2(candidates: number[], target: number): number[][] {
    // 依旧使用回溯算法
    // 不同之处是本题的初始数组中有重复的元素，不过每个元素只能使用一次
    const len:number = candidates.length;
    let res:number[][]=[];
    let path:number[]=[];
    // used数组用于记录数组中的元素之前有没有被使用过
    // 仅仅记录的是当前的path中每个元素的使用情况
    let used:boolean[]=new Array(len).fill(false);

    // 先将数组进行排序，确保一样的数字被放在一起
    candidates.sort((a,b)=>a-b);

    // 回溯三部曲：确定参数和返回值
    // 确定终止条件
    // 确定单层循环逻辑

    function backTracking(candidates: number[], target: number,curSum:number,startIndex:number){

        if(curSum===target){
            res.push([...path]);
            return;
        }

        for(let i:number = startIndex;i<len&&curSum<target;i++){
            // 下面一行是剪枝操作，将不可能符合题目要求的直接剪掉
            // 1.cur>target-curSum=>代表cur已经超过了需要的大小的数，可以直接被淘汰了
            // 2.i>0 && cur === candidates[i-1] && !used[i-1]
            // 代表在第二个元素及其以后的每一个元素都检查，是否和前一个元素一样
            // 如果一样的话，并且前面一个元素没被用过的情况下才能结束这一次循环
            // candidates【1，1，2】=>used【0，0，1】
            // 现在i=1，cur=candidates[0]
            // !used[i-1]代表前一个数字不在当前的path中
            // 为啥非要加上这一条；因为如果不加的话，在第一个1进去的情况下，进入内层循环时，会错过第二个1
            // 导致112的情况永远无法出现，而这种情况是符合题意的
            // 在这种情况下，第二个1要被跳过，因为第一个1已经和第二个1后面的所有情况组合过了
            // 如果此时仍然使用第二个1和后面的所有可能情况做匹配，会导致重复情况的出现，所以跳过本次循环
            if(cur>target-curSum || (i>0 && cur === candidates[i-1] && !used[i-1]))continue;
            // 将当前要被加入path的数字保存起来
            const cur = candidates[i];
            path.push(cur);
            curSum = curSum+cur;
            used[i]=true;
            backTracking(candidates, target,curSum,i+1);
            curSum = curSum-path.pop();
            used[i]=false;
        }
    }
    backTracking(candidates, target,0,0);

    return res;
    
};
```

### 