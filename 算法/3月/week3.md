
### 3.16链表相交并返回相交部分

https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/description/

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let lenA = 0;
    let lenB = 0;
    let curA=headA;
    let curB=headB;
    // 计算两个链表长度
    // 不为空时，长度+1
    while(curA){
        lenA++;
        curA = curA.next;
    }
    while(curB){
        lenB++;
        curB = curB.next;
    }

    // 在计算长度之后，已经指向了尾节点
    // 此时都指向null，需要重置
    curA=headA;
    curB=headB;

    // 计算长度差
    // 默认大的为A,小的为B
    if(lenA<lenB){
        curA = headB;
        // 如果只写这一行会导致，两个数组都指向同一个数组
        curB = headA;
        let size_temp_A = lenA;
        lenA = lenB;
        lenB = size_temp_A;

    }
    // 由于两个相等的时候，只能出现在长的末尾跟短的一模一样
    // 所以让两个的末尾对齐
    // A=5,B = 3,
    // A的向后移动gap步即可
    let gap = lenA-lenB;

    // 先让curA向后移动gap步，从而让他俩到链表末尾的距离相等
    // 只需要比较最后min{lenA,lenB}个元素
    while(gap>0 && curA){
        curA = curA.next;
        gap--;
    }

    // 当两个都不空时，每一项都进行比较
    // 
    while(curA && curB){
        if(curA === curB){
            return curA;
        }
        curA = curA.next;
        curB = curB.next;
    }
    
    return null;
};
```

### 3.17双指针

https://leetcode.cn/problems/container-with-most-water/?envType=study-plan-v2&envId=top-100-liked

```typescript
function maxArea(height: number[]): number {
    let size:number = height.length;
    let left:number = 0;
    let right:number = size-1;
    let max:number = 0;

    // 计算最小值，乘以距离
    // 如果大于最大容量则更新
    // 移动左右较短的那条线

    while(left<right){
        let width:number = right-left;
        let minH:number = Math.min(height[left],height[right]);
        let cur:number = width*minH;
        if(cur>max){
            max = cur;
        }
        if(height[left]<=height[right]){
            left++;
        }else{
            right--;
        }
    }
    return max;
    
};
```

### 3.18两数之和

https://leetcode.cn/problems/two-sum/?envType=study-plan-v2&envId=top-100-liked

```typescript
function twoSum(nums: number[], target: number): number[] {
    // 创建键值对
    let map = new Map();

    for(let i:number=0;i<nums.length;i++){
        const num:number = nums[i];
        // 计算还需要的数
        const need:number = target-num;
        // 检查nedd是不是已经在map中，直接取它的索引
        if(map.has(need)){
            // map.get(need)=>得到索引
            return [map.get(need),i]
        }
        // 将当前数存入表中
        map.set(num,i);
    }
    // 没找到返回空
    return [];

};
```