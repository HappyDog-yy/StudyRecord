### 1.翻转二叉树-->得到其镜像

https://leetcode.cn/problems/invert-binary-tree/?envType=study-plan-v2&envId=top-100-liked

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

function invertTree(root: TreeNode | null): TreeNode | null {
    // 所谓翻转二叉树，就是得到二叉树的对称树
    // 使用递归算法

    swap(root);

    function swap(node: TreeNode | null):null{
        if(!node){return null}

        if(node){
            // 创建临时变量
            let temp: TreeNode | null =null;
            // 交换该节点的左右节点
            temp = node.left;
            node.left = node.right;
            node.right = temp;
            swap(node.left);
            swap(node.right);
        }
    }

    return root;
};
```

### 2.将有序数组转化成搜索二叉树

https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/?envType=study-plan-v2&envId=top-100-liked

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

function sortedArrayToBST(nums: number[]): TreeNode | null {
    // 二叉搜索树所有的节点都满足：左《根《右
    // 中序遍历也是一样的顺序
    // 因此只需要将每个节点都按照中序遍历将节点放进去
    // 使用递归的方法

    // 找到最中间的节点作为根节点
    // 它的前一个元素作为它的左孩子，后一个元素作为它的右孩子
    function createTree(nums:number[],leftIndex:number,rightIndex:number): TreeNode | null{
        if(leftIndex>rightIndex){return null;}
        // 先找到中最中间的节点,让它作为根节点
        const mid:number = Math.floor((leftIndex+rightIndex)/2);
        const root:TreeNode | null = new TreeNode(nums[mid]);
        // 将递归的结果传递给左右子树
        // 递归的结果刚好是左右子树的根节点，即当前的根节点的左右节点
        // 注意在传递时左右子树的范围，不能写成0，mid-1，要更有普遍性
        // 写传入的leftIndex和rightIndex
        root.left = createTree(nums,leftIndex,mid-1);
        root.right = createTree(nums,mid+1,rightIndex);
        return root;
    }

    return createTree(nums,0,nums.length-1);
};
```

### 3.检查是否符合二叉搜索树的定义

https://leetcode.cn/problems/validate-binary-search-tree/?envType=study-plan-v2&envId=top-100-liked

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

function isValidBST(node: TreeNode | null): boolean {
    // 设置前一个节点的值，初始化为null
    let prevVal:number|null = null;

    // 中序遍历数组
    // 因为二叉搜索树的条件就是中序遍历有序
    function inorder(node: TreeNode | null):boolean{
        // 节点为空-》返回true
        if(!node){return true;}

        // 下面按照左根右的顺序
        if(!inorder(node.left)) return false;

    // 接着是当前节点，和它的左边哪个节点比较
    // 为什么没有比较右边的节点呢？因为右边的节点在后面比较过了
        if(prevVal !== null && node.val<=prevVal){
            return false;
        }
        prevVal = node.val;
        return inorder(node.right);
    }
    return inorder(node);
};
```

### 4.二叉树的最大深度

https://leetcode.cn/problems/maximum-depth-of-binary-tree/?envType=study-plan-v2&envId=top-100-liked

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

function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0;
    // 使用队列，首先将根节点入栈
    const queue:(TreeNode | null)[] = [root];
    let depth:number = 0;
    while (queue.length) {
        // 用于记录当前层的所处的深度
        const levelSize:number = queue.length;
        for (let i:number = 0; i < levelSize; i++) {
            // 将当前层的所有子节点全部加入到队列中
            // 当for循环结束，队列中只剩下子节点，此时深度加1
            const node:TreeNode | null = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        depth++;
    }
    return depth;
    
};
```

### 5.二叉树的最大直径

https://leetcode.cn/problems/diameter-of-binary-tree/?envType=study-plan-v2&envId=top-100-liked

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

function diameterOfBinaryTree(root: TreeNode | null): number {
    // 对于每一个节点，经过该节点的最长路径等于左子树的深度和右子树的深度之和
    let maxNum:number = 0;

    // 计算某一个节点的左右子树深度之和的算法
    function calMaxDepth(node: TreeNode | null):number{
        if(!node) return 0;
        // 左子树和右子树递归计算最大深度
        const left:number = calMaxDepth(node.left);
        const right:number = calMaxDepth(node.right);

        maxNum = Math.max(left+right,maxNum);

        return Math.max(left,right)+1;
    }

    calMaxDepth(root);
    return maxNum;
    
};
```