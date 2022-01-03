# 二叉树的锯齿形层序遍历

[二叉树的锯齿形层序遍历-中等](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal)

```
给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

例如：
给定二叉树 [3,9,20,null,null,15,7],

  3
  / \
9  20
  /  \
  15   7

返回锯齿形层序遍历如下：

[
  [3],
  [20,9],
  [15,7]
]
```

## 方案 1: 递归

```js
// 层序遍历+反转奇数行
var getNode = function(root, arr, k) {
  if (!root) return null;
  if (arr.length === k) arr.push([]);
  arr[k].push(root.val);
  getNode(root.left, arr, k + 1);
  getNode(root.right, arr, k + 1);
};
var reserve = function(arr) {
  let pre = 0;
  let tail = arr.length - 1;
  while (pre < tail) {
    [arr[pre], arr[tail]] = [arr[tail], arr[pre]];
    pre++;
    tail--;
  }
};
var zigzagLevelOrder = function(root) {
  let arr = [];
  getNode(root, arr, 0);
  for (let i = 1; i < arr.length; i += 2) {
    reserve(arr[i]); // 翻转奇数行
  }
  return arr;
};
```

## 方法 2: 广度优先遍历

```js
// https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/solution/er-cha-shu-de-ju-chi-xing-ceng-xu-bian-l-qsun/
// 配合一个标记记录方向
var zigzagLevelOrder = function(root) {
  if (!root) {
    return [];
  }

  const ans = [];
  const nodeQueue = [root];

  let isOrderLeft = true;

  while (nodeQueue.length) {
    let levelList = [];
    const size = nodeQueue.length;
    for (let i = 0; i < size; ++i) {
      const node = nodeQueue.shift();
      if (isOrderLeft) {
        levelList.push(node.val);
      } else {
        levelList.unshift(node.val);
      }
      if (node.left !== null) {
        nodeQueue.push(node.left);
      }
      if (node.right !== null) {
        nodeQueue.push(node.right);
      }
    }
    ans.push(levelList);
    isOrderLeft = !isOrderLeft;
  }

  return ans;
};
```
