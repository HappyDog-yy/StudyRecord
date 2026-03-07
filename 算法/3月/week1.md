### 3.3二分查找法 搜索有序数组中目标值的位置

https://leetcode.cn/problems/search-insert-position/?envType=study-plan-v2&envId=top-100-liked

```javascript
var searchInsert = function(nums, target) {
    let left=0;
    let right=nums.length-1;
    // 包含数组只有一个元素的情况

    while(left<=right){
        let mid=Math.floor((left+right)/2);
        if(target<nums[mid]){
        right=mid-1;
        }else if(target>nums[mid]){
        left=mid+1;
        }else{
        return mid;
        }
    }
    // 循环结束未找到，插入位置left
    return left;
};
```


### 3.4移除数组中的所有目标元素，并返回数组中不等于目标值的元素个数

https://leetcode.cn/problems/remove-element/submissions/702931276/


#### 暴力题解法
```javascript
var removeElement = function(nums, val) {
    // 暴力解法
    // 判断元素是否等于val，相等则将后面的元素都前移一位
    // 此时i的值是多少，下一次循环从哪个开始
    let size=nums.length;
    for(let i=0;i<size;i++){
        if(val === nums[i]){
            // 之后的元素全部向前移动一位，后面的覆盖前面的思路
            // 因为此时向前移动了一位，i的位置变成了i+1的元素
            // 所以每前移一个元素，要改变i
            for(let j=i+1;j<size;j++){
                // 从j-1位置开始
                nums[j-1]=nums[j];
            }
            // 数组总长度-1
            size=size-1;
            // 当全部前移之后，此时数组i位置的元素是原来i+1位置的，该元素还没有检查
            i--;

        }
        // 如果不相等，无需任何处理
    }
    return size;
};
```

#### 双指针法

暂时还没学会

### 3.5对有序数组中的元素先平方再按照从大到小顺序排列

#### 暴力解法
```javascript
var sortedSquares = function(nums) {
    // 暴力解法，先对数组中每一个元素平方，再排序
    let size=nums.length;
    for(let i=0;i<size;i++){
        nums[i]=nums[i]*nums[i];
    }
    nums.sort((a,b)=>{
        return a-b;
    });
    return nums;
};
```

#### 双指针法

```javascript
var sortedSquares = function(nums) {
    // 双指针
    // let res=[];
    // 创建结果数组，长度为n
    const n=nums.length;
    let res=new Array(n);
    let left=0;
    let right=nums.length-1;
    let index=n-1;
    while(left<=right){
        let square_left=nums[left]*nums[left];
        let square_right=nums[right]*nums[right];

        if(square_left<=square_right){
            // 只在结果数组中插入一个数值，要处理的数组长度减少1
            res[index]=square_right;
            right--;
        }else if(square_left>square_right){
            res[index]=square_left;
            left++;
    }
    // 在新数组中插入的顺序按照从后往前，最后面的数字最大
    index--;
    }
    return res;
};
```
