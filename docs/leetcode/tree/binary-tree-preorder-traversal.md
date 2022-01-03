# 二叉树的前序遍历

[二叉树的前序遍历-简单](https://leetcode-cn.com/problems/binary-tree-preorder-traversal)

```
给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

示例 1：
输入：root = [1,null,2,3]
输出：[1,2,3]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [1]
输出：[1]

示例 4：
输入：root = [1,2]
输出：[1,2]

示例 5：
输入：root = [1,null,2]
输出：[1,2]

提示：
树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100

进阶：递归算法很简单，你可以通过迭代算法完成吗？
```

## 方案 1: 递归

```js
var getNode = function(root, arr) {
  if (!root) return null;
  arr.push(root.val);
  getNode(root.left, arr);
  getNode(root.right, arr);
};
var preorderTraversal = function(root) {
  let arr = [];
  getNode(root, arr);
  return arr;
};
```

## 方案 2: 迭代

```js
var preorderTraversal = function(root) {
  if (!root) return [];
  let stack = [root];
  let arr = [];
  while (stack.length) {
    let node = stack.pop();
    arr.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return arr;
};
```
