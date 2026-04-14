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