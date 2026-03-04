### 3.4二分查找法 搜索有序数组中目标值的位置

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