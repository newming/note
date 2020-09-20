# 二叉树的最大深度

[二叉树的最大深度-简单](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
```

## 递归

https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution/er-cha-shu-de-zui-da-shen-du-by-leetcode-solution/

```js
function maxDepth(root) {
  if (!root) {
    return 0;
  } else {
    let leftHeight = maxDepth(root.left);
    let rightHeight = maxDepth(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
}
```

## BFS(Breadth-First Search)

https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution/di-gui-bfsdfsde-3chong-jie-jue-fang-shi-by-sdwwld/

```js
function maxDepth(root) {
  if (!root) {
    return 0;
  }
  //创建一个队列
  let deque = new Array();
  deque.unshift(root);
  let count = 0;
  while (deque.length) {
    //每一层的个数
    let size = deque.length;
    while (size-- > 0) {
      let cur = deque.shift();
      if (cur.left !== null) {
        deque.push(cur.left);
      }
      if (cur.right !== null) {
        deque.push(cur.right);
      }
    }
    count++;
  }
  return count;
}
```

## DFS(Depth First Search)

```js
function maxDepth(root) {
  if (!root) {
    return 0;
  }
  //stack记录的是节点，而level中的元素和stack中的元素
  //是同时入栈同时出栈，并且level记录的是节点在第几层
  let stack = new Array();
  let level = new Array();
  stack.push(root);
  level.push(1);
  let max = 0;
  while (stack.length) {
    //stack中的元素和level中的元素同时出栈
    let node = stack.pop();
    let temp = level.pop();
    max = Math.max(temp, max);
    if (node.left !== null) {
      //同时入栈
      stack.push(node.left);
      level.push(temp + 1);
    }
    if (node.right !== null) {
      //同时入栈
      stack.push(node.right);
      level.push(temp + 1);
    }
  }
  return max;
}
```
