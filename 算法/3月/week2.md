### 3.9螺旋矩阵

https://leetcode.cn/problems/spiral-matrix-ii/submissions/705404872/

无算法，仅模拟数组填充规律

```javascript
var generateMatrix = function(n) {
    // let res= new Array(n)(n);
    // 此方法并不能创建n阶数组
    let res=new Array(n).fill().map(()=>new Array(n).fill(0));

    // 设置初始值
    let top =0;
    let buttom = n-1;
    let left = 0;
    let right = n-1;

    let num=1;
    while(num<=n*n){
        for(i=left;i<=right;i++){
            res[top][i]=num++;
        }top++;
        for(j=top;j<=buttom;j++){
            res[j][right]=num++;
        }right--;
        for(i=right;i>=left;i--){
            res[buttom][i]=num++;
        }buttom--;
        for(j=buttom;j>=top;j--){
            res[j][left]=num++;
        }left++;
    }

    return res;
};
```

### 3.10 删除链表指定节点

https://leetcode.cn/problems/remove-linked-list-elements/

#### JS创建链表节点

```javascript
class ListNode{
    // 构造函数，指向下一个节点的指针默认值null
    constructor(val,next=null){
        this.val=val;
        this.next=next;
    }
}

// 循环次数为数组的长度
function createList(arr){
    if(arr.length===0)return null;
    let head =new ListNode(arr[0]);
    let current = head;
    for(let i=1;i<arr.length;i++){
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}
```

#### 题解

```javascript
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    // 创建虚拟头节点，以便解决要删除头节点的情况
    const ret = new ListNode(0,head);

    // 设置当前指针为虚拟头节点，并且遍历链表，虚拟头节点的值不需要检查
    // 循环终止条件：到最后一个指针了，即指针为空
    let cur = ret;
    while(cur.next){
        if(cur.next.val===val){
            cur.next=cur.next.next;
            // 删除节点时，不需要指针再往后移动
            // 跳出循环
            continue;
        }
        cur=cur.next;
    }
    // 返回真正的头节点
    return ret.next;
};
```

### 3.11 滑动窗口最大值

https://leetcode.cn/problems/sliding-window-maximum/?envType=study-plan-v2&envId=top-100-liked

#### 暴力解法（超出时间限制）
```typescript
function maxSlidingWindow(nums: number[], k: number): number[] {
    // 暴力解法：首先处理空数组的情况
    const size:number = nums.length;
    let res:number[]=[];
    if(size === 0 || k === 0){
        return [];
    }

    // 数组不为空时，分内外循环
    // 外层循环控制当前选中子数组的起始点
    for(let i:number=0;i<=(size-k);i++){
        // 先预设下标为i的元素是子数组中最大的
        let max:number = nums[i];
        // 现在子数组中已经有一个元素，下标为i，j只需要再遍历后面的k-1个就够了

        for(let j:number = 1;j<k;j++){
            if(nums[i+j]>max){
                max = nums[i+j];
            }
        }
    // 对于i遍历的每一个子数组的最大值，都要加到结果数组中
    res.push(max);
    }
    return res;
};
```

#### 单调队列法
- 队列中村所有可能称为当前窗口最大元素的值的索引
- 如果队列的第一个元素不在当前滑动窗口中，则从队列中移除
- 从队尾开始，移除比当前元素小的元素。因为有这些元素在的可能当前窗口中，一定存在当前元素
- 因为他们不可能称为可能当前窗口的最大值
- 单调队列中的元素，从单调队列的长度大于k-1之后，始终是最大元素，可以直接放进结果队列

```typescript
function maxSlidingWindow(nums: number[], k: number): number[] {
    // 单队列法
    const n:number=nums.length;
    let res:number[]=[];
    let queue:number[]=[];

    for(let i:number=0;i<n;i++){
        // 当前元素索引为i
        // 队列长度不为0时，对于队首元素，如果超出当前窗口的范围，直接移除队首元素
        // 队首元素是queue[0],这个是nums的索引
        // 如果这个时候i=10，k=3，那么窗口是【8，9，10】
        // 即有效索引的范围是[i-k+1,i]
        // 而当队列为空的时候，不用判断是否超出当前窗口
        // 并且不在当前窗口的情况只能是索引比左侧的边界小
        if(queue.length>0 && queue[0]<i-k+1){
            queue.shift();
            // 移除数组首元素，使用shift
        }

        // 从队尾开始，移除比当前元素i小的元素
        // 因为有队尾元素在的窗口，一定有当前元素，如果它比当前元素小，就不可能称为窗口元素的最大值
        // 队尾元素此刻是queue【queue.length-1】,是数组元素的一个索引

        while(queue.length>0 && nums[queue[queue.length-1]]<nums[i]){
            queue.pop();
        }

        // 当前元素入队,注意队列中存的是索引
        queue.push(i);

        if(i>=k-1){
            res.push(nums[queue[0]]);
        }
    }
    return res;
};
```

### 3.12翻转链表-双指针

https://leetcode.cn/problems/reverse-linked-list/

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
// 1-2-3-4-5-null
// 变成5-4-3-2-1-null
function reverseList(head: ListNode | null): ListNode | null {
    // 当前节点要指向的结点,初始时为最后一个节点要指向的节点
    let prev:ListNode|null = null;
    // 当前节点
    let curr:ListNode|null = head;
    // 下一个要处理的节点
    // let next:ListNode = curr.next;
    // let next:ListNode;

    // 循环结束的条件是当前要处理的节点变为null
    while(curr!==null){
        // 保存下一个节点
        const next:ListNode|null = curr.next;
        // 翻转当前的指针
        curr.next = prev;
        // 移动指针
        prev = curr;
        curr = next;
    }
    // 参考例子，最后一个要返回的是5，curr现在是null
    // 也就是它的前一个节点
    return prev;
    
};
```

### 3.13交换链表相邻元素

https://leetcode.cn/problems/swap-nodes-in-pairs/

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function swapPairs(head: ListNode | null): ListNode | null {
    // 考虑链表为空的情况
    if(!head || !head.next){
        return head;
    }
    // 创建虚拟头节点
    const virtual:ListNode = new ListNode(0,head);
    // 每次设计三个指针，要交换的两个节点，以及他俩的前面一个
    // 要交换的两个叫first和second
    let prev:ListNode = virtual;
    let first:ListNode = head;

    // 循环：只要first或者second为空就结束
    // 但如果first为空时，根本拿不到second，只能通过first->next的方式
    while(first&&first.next){
        const second:ListNode = first.next;
        // 交换过程
        // 先保存第三个节点，以免丢失
        let nextPair:ListNode|null = second.next;
        prev.next = second;
        second.next = first;
        first.next = nextPair;
        //现在是prev->second->first->third
        // prev要指向first，再开始下一轮
        prev=first;
        first = nextPair;
    }
    return virtual.next;

};
```