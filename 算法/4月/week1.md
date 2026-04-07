### 1.合并两个有序链表

https://leetcode.cn/problems/merge-two-sorted-lists/submissions/713696518/?envType=study-plan-v2&envId=top-100-liked

```ts
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // 合并两个有序数组的方法，双指针分别指向两个链表的头节点
    // 比较值的大小，值小的先插入，并且对应的往后移动一位

    // 处理数组为空的情况
    if(!list1){return list2};
    if(!list2){return list1};

    let leftList: ListNode | null = list1;
    let rightList: ListNode | null = list2;
    // 虚拟头节点
    let virtual: ListNode | null = new ListNode(0);
    let cur: ListNode | null = virtual;

    // 当任意一个链表没有到达结尾的时候，都不会结束
    while(leftList && rightList){
        if(leftList.val <= rightList.val){
            cur.next = leftList;
            leftList = leftList.next;
        }else if(leftList.val>rightList.val){
            cur.next = rightList;
            rightList = rightList.next;
        }
        cur = cur.next;
    }

    // while循环结束，说明至少有一个链表达到结尾了，那就把另一个链表的后面的元素全部加进去
    // left链表为空的情况，将right后面的全部插入
    if(!leftList){
        cur.next = rightList;
    }

    if(!rightList){
        cur.next = leftList;
    }

    return virtual.next;
};
```

### 2.回文链表

https://leetcode.cn/problems/palindrome-linked-list/?envType=study-plan-v2&envId=top-100-liked

```ts
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

function isPalindrome(head: ListNode | null): boolean {
    // 翻转链表
    function reverse(head: ListNode | null): ListNode | null{
        // 首先处理链表仅有1或0个元素的特殊情况
        if(head === null || head.next === null){
            return head;
        }

        let cur: ListNode | null = head;
        let prev: ListNode | null = null;
        let nextNode: ListNode | null = null;

        while(cur){
            // 先保存下一个节点
            nextNode = cur.next;
            // 当前节点指向前一个节点
            cur.next = prev;
            prev = cur;
            cur = nextNode;
        }

        return prev;
    }

    // 首先计算链表长度，便于后面奇偶处理
    let cur: ListNode | null = head;
    let length:number = 0;
    while(cur){
        length++;
        cur = cur.next;
    }
    // 此时cur指向最后，需要重置
    cur = head;

    // 快慢指针找到链表的中间节点
    let fast: ListNode | null = head;
    let slow: ListNode | null = head;
    while(fast && fast.next && slow){
        slow = slow.next;
        fast = fast.next.next;
    }

    // 翻转后半部分的链表，使用上面定义好的reverse函数
    // 用于存放后半部分链表的头节点
    let Hou: ListNode | null  = reverse(slow);
    let Qian: ListNode | null  = head;
    // 所有准备工作已经完成，下面比较Qian和Hou两个链表是否完全一样
    while(Hou&&Qian){
        if(Qian.val !== Hou.val){
            return false;
        }
        Qian = Qian!.next;
        Hou = Hou.next;
    }return true;
};
```

### 3.判断是否存在环形链表

https://leetcode.cn/problems/linked-list-cycle/?envType=study-plan-v2&envId=top-100-liked

```ts
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

function hasCycle(head: ListNode | null): boolean {

    // 使用快慢指针，如果链表里面有环，就一定能够追上
    // 因为快指针相当于一个一个地靠近慢指针
    let fast: ListNode | null = head;
    let slow: ListNode | null = head;

    while(fast && fast.next){
        fast = fast.next.next;
        slow = slow.next;
        if(fast === slow){
            return true;
        }
    }return false;
    
};
```

### 4.链表模拟加法竖式脱式

https://leetcode.cn/problems/add-two-numbers/submissions/714754273/?envType=study-plan-v2&envId=top-100-liked

```ts
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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // 结果数组的虚拟头节点，便于最后返回结果
    let res: ListNode | null = new ListNode(0);
    let cur: ListNode | null = res;
    // 需要相加的前面进的数，如前面是8+9，则进1
    let Jin:number = 0;
    // 当任意一个为空的时候就可以结束循环了，因为剩余的只需要跟0相加
    while(l1 &&l2){
        let x:number = l1?.val;
        let y:number = l2?.val;
        let sum:number = x+y+Jin;
        Jin = Math.floor(sum/10);
        let thisval = sum%10;
        let node: ListNode | null = new ListNode(thisval);
        cur.next = node;
        cur = cur.next;
        if(l1){l1 = l1.next;}
        if(l2){l2 = l2.next}
    }
    
    // 将剩余还有元素的那个拼到结果的最后
    // 如果l1不为空
    if(l1){
        while(l1){
            let x:number = l1?.val;
            let sum:number = x+Jin;
            Jin = Math.floor(sum/10);
            let thisval:number = sum%10;
            let node: ListNode | null = new ListNode(thisval);
            cur.next = node;
            cur = cur.next;
            if(l1){l1 = l1.next;}
        }
    }
    if(l2){
        while(l2){
            let y:number = l2?.val;
            let sum:number = y+Jin;
            Jin = Math.floor(sum/10);
            let thisval:number = sum%10;
            let node: ListNode | null = new ListNode(thisval);
            cur.next = node;
            cur = cur.next;
            if(l2){l2 = l2.next}
        }
    }

    if(Jin>0){
        // 处理最后循环结束时仍有需要进位的值的情况
        // 如8+9，上面的处理仅仅存了各位的7，此时Jin=1
        cur.next = new ListNode(Jin);
    }

    return res.next;
};
```

### 5.数组中只出现1次的数字

https://leetcode.cn/problems/single-number/submissions/714989501/?envType=study-plan-v2&envId=top-100-liked

```ts
function singleNumber(nums: number[]): number {
    // 位运算^异或
    // 异或的重要特性（两个一样了就是0，不一样的时候是1）
    // x^x = 0;
    // x^y = y^x;
    // x^(y^z) = y^(x^z)
    // x^0 = x

    // 数组的reduce方法如何使用
    return nums.reduce((x,y)=>x^y)
    // 根据交换律，出现两次的数字组合在一起异或都会变成0
    // 如果0是奇数个，相当于0^x=x
    // 如果0是偶数个，偶数个的0异或一下还是0，又变成奇数个的0
};
```

### 6.多数元素

https://leetcode.cn/problems/majority-element/?envType=study-plan-v2&envId=top-100-liked

```ts
function majorityElement(nums: number[]): number {
    let res:number = nums[0];
    let count:number = 0;
    const len:number=nums.length;
    for(let i:number = 0;i<len;i++){
        if(count === 0){
            res = nums[i];
        }
        if(nums[i]=== res){
            count++;
        }else{count--;}
        
    }
    return res;
};
```
