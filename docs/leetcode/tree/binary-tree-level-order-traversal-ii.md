# 二叉树的层序遍历 II

[二叉树的层序遍历 II-中等](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii)

```
给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

示例 1：

输入：root = [3,9,20,null,null,15,7]
输出：[[15,7],[9,20],[3]]

示例 2：

输入：root = [1]
输出：[[1]]

示例 3：
输入：root = []
输出：[]

提示：
树中节点数目在范围 [0, 2000] 内
-1000 <= Node.val <= 1000
```

## 方法 1: 广度优先搜索

```js
// 先通过广度优先搜索实现普通层序遍历，然后在翻转一下
var levelOrder = function(root) {
  const ret = [];
  if (!root) {
    return ret;
  }

  const q = [];
  q.push(root);
  while (q.length !== 0) {
    const currentLevelSize = q.length;
    ret.push([]);
    for (let i = 1; i <= currentLevelSize; ++i) {
      const node = q.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return ret.reverse();
};
```
