### 1.字符串括号匹配->使用栈

https://leetcode.cn/problems/valid-parentheses/submissions/716102120/?envType=study-plan-v2&envId=top-100-liked

```ts
function isValid(s: string): boolean {
    const stack:string[]=[];
    const pairs:Record<string,string>={
        ')':"(",
        "}":"{",
        "]":"["
    }

    // ch是其中的每一个属性
    for (const ch of s ){
        if(ch==='('||ch==='['||ch==='{'){
            // 如果是左括号，加入对应的栈中
            stack.push(ch);
        }else{
            // 如果不是左括号，看目前的ch属性与刚刚加入栈中的属性是否匹配
            // 先弹出，再看是否匹配，不匹配就直接返回false
            // 如果没有左括号的特殊情况也要直接返回false
            // 两者是或的关系，满足其一即可
            if(stack.length ===0||stack.pop()!==pairs[ch]){
                return false;
            }
        }
    }
    // 如果所有的都弹出了了，此时的长度为0，代表是匹配的，否则不匹配
    return stack.length === 0;
};
```

### 2.数组实现栈及基本操作CRUD

https://leetcode.cn/problems/min-stack/submissions/716741150/?envType=study-plan-v2&envId=top-100-liked

```ts
class MinStack {
    // 栈：先进后出的原则，最先删除的是栈顶元素，加入的元素作为新的栈顶
    // 栈的数据结构如果用数组实现，数组的尾部作为栈顶元素
    // 链表的话，链表头作为栈顶元素

    // 创建栈-->不能在类内使用let或者const，应换成对应的修饰private等
    private stack:number[] = [];

    constructor() {
        // this.arr = arr;
        this.stack = [];
    }

    // 加入元素
    push(val: number): void {
        this.stack.push(val);
    }

    // 弹出栈顶元素
    pop(): void {
        this.stack.pop();
    }

    // 获取栈顶元素
    top(): number {
        return this.stack[this.stack.length-1];
    }

    // 获取其中的最小元素
    getMin(): number {
        let min:number = this.stack[0];
        for(let i=0;i<this.stack.length;i++){
            if(this.stack[i]<min){
                min = this.stack[i];
            }
        }
        return min;
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

//  ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]
// 第一个数组是要执行的方法名，第二个数组是传递的参数
// 传递的参数数组每一个元素又是一个数组，最后一个对应就是，执行getMin()的执行结果
```

### 3.二叉树的前序遍历

https://leetcode.cn/problems/binary-tree-preorder-traversal/submissions/716967024/

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function preorderTraversal(root: TreeNode | null): number[] {
    // 将数据存到对应的数据结构中
    // 前序遍历算法即深度优先算法

    let res:number[] = [];
    
    // 遍历一个节点的左节点和右节点的函数
    function through(node:TreeNode | null):null{
        // 先处理节点为空的情况
        if(!node){
            return;
        }else{
            res.push(node.val);
            if(node.left){
                through(node.left);
            }
            if(node.right){
                through(node.right);
            }
        }
    }

    through(root);
    return res;
    
};
```

### 4.二叉树的中序遍历：左-->根-->右

https://leetcode.cn/problems/binary-tree-inorder-traversal/submissions/716973220/?envType=study-plan-v2&envId=top-100-liked

#### 4.1递归实现

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function inorderTraversal(root: TreeNode | null): number[] {
    // 中序遍历的遍历顺序：左-->根-->右
    let res:number[] = [];

    // 定义访问其中一个节点的函数
    function through(node: TreeNode | null):void{
        // 首先处理该节点直接为空的情况
        if(!node){
            return ;
        }else{
            if(node.left){
                through(node.left);
            }
            res.push(node.val);
            if(node.right){
                through(node.right);
            }
        }
    }

    through(root);

    return res;
    
};
```

#### 4.2循环实现

```ts
function inorderTraversal(root: TreeNode | null): number[] {
    // 中序遍历的遍历顺序：左-->根-->右
    let res:number[] = [];
    let stack: (TreeNode| null)[]= []; // 辅助栈
    let cur: TreeNode | null = root;

    // 先遍历左节点，将其压入栈中，直至遍历完左
    // 先将栈里的元素弹出，让cur指向现在的这个元素，放到结果里面
    while(stack.length||cur){
        if(cur){
            // 该节点先入栈，它的左节点在下一轮入栈
            // 1是此时不确定其左节点是否存在
            // 2是如果左节点先入栈，就会后出栈，导致不满足中序遍历
            stack.push(cur);
            cur = cur.left;
        }else{
            cur = stack.pop();
            res.push(cur.val);
            cur = cur.right;
        }
    }
    return res;
};
```

### 5.层序遍历二叉树

https://leetcode.cn/problems/binary-tree-level-order-traversal/?envType=study-plan-v2&envId=top-100-liked

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function levelOrder(root: TreeNode | null): number[][] {
    if(root === null)return [];

    const res:number[][]=[];
    // 将根节点首先入队
    const queue:TreeNode[] = [root];

    while(queue.length>0){
        // 当前层数位队列的长度
        const level = queue.length;
        let curLevel:number[] = [];

        // level就代表当前层的根节点个数
        // 遍历这一层的每一个根节点
        // 虽然在循环的过程中，队列的长度回随之增加，但是在循环开始之前
        // 队列的长度已经被存储在level变量里
        for(let i=0;i<level;i++){
            // 取出队首元素，即上面放进来的根节点
            // 也可以理解为处于这一层的根节点
            let node = queue.shift();
            curLevel.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right)queue.push(node.right);
        }
        res.push(curLevel);
    }
    return res;
};
```