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

### 3.分割回文串

https://leetcode.cn/problems/palindrome-partitioning/submissions/722390665/

```ts
function partition(s: string): string[][] {
    // 仍然使用回溯算法
    let path:string[]=[];
    let res:string[][]=[];

    // 判断某个字符串是否是一个回文串
    function isHW(s:string,startIndex:number,endIndex:number):boolean{
        for(;startIndex<endIndex;startIndex++,endIndex--){
            if(s[startIndex]!==s[endIndex]){return false;}
        }return true;
    }

    // 回溯三部曲
    // 1.确定参数和返回值
    // 2.确定终止条件
    // 3.确定单层搜索逻辑

    function backTracking(s: string,startIndex:number):void{
        // 先是终止条件的判断
        if(startIndex>=s.length){
            res.push([...path]);
            return ;
        }

        // 单层循环逻辑
        for(let i:number=startIndex;i<s.length;i++){
            if(!isHW(s,startIndex,i)){
                continue;
            }
            path.push(s.substring(startIndex,i+1));
            backTracking(s,i+1);
            path.pop();
        }
    }

    backTracking(s,0);
    return res;
};
```

### 4.复原IP地址

https://leetcode.cn/problems/restore-ip-addresses/

```ts
function restoreIpAddresses(s: string): string[] {
    let res:string[]=[];
    // res是一个字符数组，['1','1','1','1']
    // 首先组要一个函数，检查每一位是否符合题目要求
    // 检查的条件：0-255，整数，并且不能有前导0
    function numCheck(str:string,startIndex:number,endIndex:number):boolean{
        if(startIndex>endIndex)return false; 
        // 提取指定索引之间的字符串，注意是左闭右开
        let s:string = str.slice(startIndex,endIndex+1);
        // 先将传入的字符串变成整数
        const num:number=Number(s);
        // 检查是不是整数
        if(!Number.isInteger(num))return false;
        // 检查是否在0-255之间
        if(num<0 || num>255)return false;
        // 检查前导0
        // 下面的代码会导致00也通过，不符合题意
        // if(num>0&&s[0]==='0')return false;
        if(s.length>1&&s[0]==='0')return false;

        return true;
    }

    // pointSum点号的个数，最终要有3个
    function backTracking(s:string,startIndex:number,pointSum:number):void{
        let length:number = s.length;
        
        // 终止条件：逗点的个数有三个
        if(pointSum===3){
            if(numCheck(s,startIndex,length-1)){
                res.push(s);
                return;
                }else{return;}
        }

        // 单层循环逻辑
        // 每次仅针对逗点前面的字串进行判断处理，因此只判断了前三个的合法性，第四个在终止条件出进行判读
        // 在这里进行剪枝了，如果超过三位，直接删掉
        for(let i:number=startIndex;i<Math.min(length,startIndex+3);i++){
            //要处理的区间是[startIndex,i],i是不断增加的
            if(numCheck(s,startIndex,i)){
                // JS中的slice方法，可以作用于数组和字符串
                // s.slice(start,end),提取数组中对应索引区间的元素，左闭右开，返回一个新数组，不改变原始数组
                // JS中的splice方法，只能作用于数组
                // s.splice(开始索引，删除个数，新添加的元素...),在原数组上就地操作
                // 想要在字符串中插入一个元素，使用substring
                const newArr=s.substring(0,i+1)+'.'+s.substring(i+1);
                backTracking(newArr,i+2,pointSum+1);
            // 此处加2的原因是中间加了一个逗点
            }
            
        }
    }

    backTracking(s,0,0);
    return res;
    
};
```

### 5.有障碍的不同路径问题（动态规划解决）

https://leetcode.cn/problems/unique-paths-ii/submissions/725788185/

```ts
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    let m:number = obstacleGrid.length;
    let n:number = obstacleGrid[0].length;
    // 在之前的不同路径的数量上增加01系数即可
    let dp:number[][] = new Array(m).fill(0).map(()=>new Array(n).fill(0));
    // 初始化，依赖于上面一排和左边一列
    // 先全部初始化为0，对于没出现障碍物之前的情况初始化为1
    for(let i:number = 0;i<n;i++){
        dp[0][i]=0
    }
    for(let i:number = 0;i<m;i++){
        dp[i][0]=0
    }
    // 注意终止条件，当中间出现有障碍物，后面的全都不能过去了，直接终止循环即可
    for(let i:number = 0;i<n&& obstacleGrid[0][i]===0;i++){
        dp[0][i]=1
    }
    for(let i:number = 0;i<m&&obstacleGrid[i][0]===0;i++){
        dp[i][0]=1
    }

    for(let i:number = 1;i<m;i++){
        for(let j:number =1 ;j<n;j++){
            // 还有一种情况是该位置本身就是一个障碍物，那么注定无法到达
            if(obstacleGrid[i][j]===1){dp[i][j]=0}else{
                dp[i][j] = dp[i-1][j]+dp[i][j-1];
            }
        }
    }
    console.log(dp);

    return dp[m-1][n-1];
};
```