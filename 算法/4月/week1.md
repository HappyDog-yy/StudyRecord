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