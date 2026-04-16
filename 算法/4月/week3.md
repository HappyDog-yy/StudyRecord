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