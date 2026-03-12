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

