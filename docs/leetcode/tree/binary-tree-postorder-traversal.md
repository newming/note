# 二叉树的后序遍历

[二叉树的后序遍历-中等](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```
给定一个二叉树，返回它的 后序 遍历。

示例:

输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [3,2,1]
进阶: 递归算法很简单，你可以通过迭代算法完成吗？
```

## 方法1: 递归

[参考](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/er-cha-shu-de-hou-xu-bian-li-by-leetcode-solution/)

复杂度分析:

- 时间复杂度： O(n)，其中 n 是二叉搜索树的节点数。每一个节点恰好被遍历一次。
- 空间复杂度： O(n)，为递归过程中栈的开销，平均情况下为 O(logn)，最坏情况下树呈现链状，为 O(n)

```js
var postorderTraversal = function(root) {
  const res = []
  postorder(root, res)
  return res
};

function postorder (root, res) {
  if (!root) return;
  postorder(root.left, res)
  postorder(root.right, res)
  res.push(root.val)
}
```

## 方法2: 迭代

复杂度分析

- 时间复杂度: O(n)，其中 n 是二叉搜索树的节点数。每一个节点恰好被遍历一次
- 空间复杂度: O(n)，为迭代过程中显式栈的开销，平均情况下为 O(logn)，最坏情况下树呈现链状，为 O(n)

```js
var postorderTraversal = function (root) {
  const res = []
  if (!root) return res;

  const stack = []
  let prev = null
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (!root.right || root.right === prev) {
      res.push(root.val)
      prev = root
      root = null
    } else {
      stack.push(root)
      root = root.right
    }
  }

  return res
}
```

## 方法3: Morris遍历

复杂度分析：比较绕，暂时没有仔细体会

- 时间复杂度：O(n)，其中 n 是二叉树的节点数。没有左子树的节点只被访问一次，有左子树的节点被访问两次
- 空间复杂度：O(1)。只操作已经存在的指针（树的空闲指针），因此只需要常数的额外空间

```js
var postorderTraversal = function (root) {
  const res = []
  if (!root) {
    return res;
  }

  let p1 = root, p2 = null;

  while (p1) {
    p2 = p1.left;
    if (p2) {
      while (p2.right && p2.right !== p1) {
        p2 = p2.right;
      }
      if (!p2.right) {
        p2.right = p1;
        p1 = p1.left;
        continue;
      } else {
        p2.right = null;
        addPath(res, p1.left);
      }
    }
    p1 = p1.right;
  }
  addPath(res, root);
  return res;
}

function addPath (res, node) {
  const tmp = []
  while (node != null) {
    tmp.push(node.val);
    node = node.right;
  }
  for (let i = tmp.length - 1; i >= 0; --i) {
    res.push(tmp[i]);
  }
}
```

