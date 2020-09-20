# 对称二叉树-简单

[对称二叉树-简单](https://leetcode-cn.com/problems/symmetric-tree/)

```
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3


但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3


进阶：

你可以运用递归和迭代两种方法解决这个问题吗？
```

## 方法1: 递归

[参考](https://leetcode-cn.com/problems/symmetric-tree/solution/dui-cheng-er-cha-shu-by-leetcode-solution/)

复杂度分析：

假设树上一共 n 个节点。

- 时间复杂度：这里遍历了这棵树，渐进时间复杂度为 O(n)。
- 空间复杂度：这里的空间复杂度和递归使用的栈空间有关，这里递归层数不超过 n，故渐进空间复杂度为 O(n)。

```ts
const check = (p: TreeNode | null, q: TreeNode | null): boolean => {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
}
var isSymmetric = function(root: TreeNode | null): boolean {
  return check(root, root);
};
```

## 方法2: 迭代

复杂度分析

- 时间复杂度： O(n)，同「方法一」。
- 空间复杂度：这里需要用一个队列来维护节点，每个节点最多进队一次，出队一次，队列中最多不会超过 n 个点，故渐进空间复杂度为 O(n)。

```ts
const check = (u: TreeNode | null, v: TreeNode | null): boolean => {
  const q: (TreeNode | null)[] = [];
  q.push(u),q.push(v);

  while (q.length) {
      u = q.shift()!;
      v = q.shift()!;

      if (!u && !v) continue;
      if ((!u || !v) || (u.val !== v.val)) return false;

      q.push(u.left);
      q.push(v.right);

      q.push(u.right);
      q.push(v.left);
  }
  return true;
}
var isSymmetric = function(root: TreeNode | null): boolean {
  return check(root, root);
};
```
