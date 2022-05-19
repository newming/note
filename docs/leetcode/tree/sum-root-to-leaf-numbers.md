# 求根节点到叶节点数字之和

[求根节点到叶节点数字之和-中等](https://leetcode.cn/problems/sum-root-to-leaf-numbers)

```
给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
每条从根节点到叶节点的路径都代表一个数字：

例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
计算从根节点到叶节点生成的 所有数字之和 。

叶节点 是指没有子节点的节点。

示例 1：

输入：root = [1,2,3]
输出：25
解释：
从根到叶子节点路径 1->2 代表数字 12
从根到叶子节点路径 1->3 代表数字 13
因此，数字总和 = 12 + 13 = 25

示例 2：

输入：root = [4,9,0,5,1]
输出：1026
解释：
从根到叶子节点路径 4->9->5 代表数字 495
从根到叶子节点路径 4->9->1 代表数字 491
从根到叶子节点路径 4->0 代表数字 40
因此，数字总和 = 495 + 491 + 40 = 1026
 

提示：
树中节点的数目在范围 [1, 1000] 内
0 <= Node.val <= 9
树的深度不超过 10
```

## 方法 1: 深度优先遍历

复杂度分析

- 时间复杂度：O(n)，其中 n 是二叉树的节点个数。对每个节点访问一次。
- 空间复杂度：O(n)，其中 n 是二叉树的节点个数。空间复杂度主要取决于递归调用的栈空间，递归栈的深度等于二叉树的高度，最坏情况下，二叉树的高度等于节点个数，空间复杂度为 O(n)。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const dfs = (root, prevSum) => {
  if (root === null) {
    return 0;
  }
  const sum = prevSum * 10 + root.val;
  if (root.left == null && root.right == null) {
    return sum;
  } else {
    return dfs(root.left, sum) + dfs(root.right, sum);
  }
};
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  return dfs(root, 0);
};
```

## 方法 2: 广度优先遍历

复杂度分析

- 时间复杂度：O(n)，其中 n 是二叉树的节点个数。对每个节点访问一次。
- 空间复杂度：O(n)，其中 n 是二叉树的节点个数。空间复杂度主要取决于队列，每个队列中的元素个数不会超过 n。

```js
var sumNumbers = function (root) {
  if (root === null) {
    return 0;
  }
  let sum = 0;
  const nodeQueue = [];
  const numQueue = [];
  nodeQueue.push(root);
  numQueue.push(root.val);
  while (nodeQueue.length) {
    const node = nodeQueue.shift();
    const num = numQueue.shift();
    const left = node.left,
      right = node.right;
    if (left === null && right === null) {
      sum += num;
    } else {
      if (left !== null) {
        nodeQueue.push(left);
        numQueue.push(num * 10 + left.val);
      }
      if (right !== null) {
        nodeQueue.push(right);
        numQueue.push(num * 10 + right.val);
      }
    }
  }
  return sum;
};
```
