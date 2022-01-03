# 翻转二叉树

[翻转二叉树-简单](https://leetcode-cn.com/problems/invert-binary-tree)

```
翻转一棵二叉树。

示例：

输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

## 方法 1: 递归

```js
// https://leetcode-cn.com/problems/invert-binary-tree/solution/fan-zhuan-er-cha-shu-by-leetcode-solution/
var invertTree = function(root) {
  if (root === null) {
    return null;
  }
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};

// 直观一点的写法
var resvers = function(root) {
  if (!root) return null; // 边界条件：树不存在
  [root.left, root.right] = [root.right, root.left]; // 左右子树交换
  resvers(root.left); // 翻转左子树
  resvers(root.right); // 翻转右子树
};

var invertTree = function(root) {
  resvers(root);
  return root;
};
```

## 方法 2: 迭代

```js
var invertTree = function(root) {
  if (!root) return null;
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    [node.left, node.right] = [node.right, node.left];
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return root;
};
```
