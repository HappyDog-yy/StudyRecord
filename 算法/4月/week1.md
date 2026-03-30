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