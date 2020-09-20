# 将有序数组转换为二叉搜索树

[将有序数组转换为二叉搜索树-简单](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

```
将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定有序数组: [-10,-3,0,5,9],

一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
```

## 方法1: 中序遍历

https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/solution/jiang-you-xu-shu-zu-zhuan-huan-wei-er-cha-sou-s-33/

复杂度分析：

- 时间复杂度： O(n)，其中 n 是数组的长度。每个数字只访问一次。
- 空间复杂度： O(logn)，其中 n 是数组的长度。空间复杂度不考虑返回值，因此空间复杂度主要取决于递归栈的深度，递归栈的深度是 O(logn)。

```js
// 1. 总是选择中间位置左边的数字作为根节点
var sortedArrayToBST = function(nums) {
  return helper(nums, 0, nums.length - 1)
};

function helper(nums, left, right) {
  if (left > right) {
    return null
  }
  let mid = Math.floor((left + right) / 2)

  let root = new TreeNode(nums[mid])
  root.left = helper(nums, left, mid - 1)
  root.right = helper(nums, mid + 1, right)
  return root
}
```

```js
// 2. 总是选择中间位置右边的数字作为根节点
var sortedArrayToBST = function(nums) {
  return helper(nums, 0, nums.length - 1)
};

function helper(nums, left, right) {
  if (left > right) {
    return null
  }
  let mid = Math.floor((left + right + 1) / 2)

  let root = new TreeNode(nums[mid])
  root.left = helper(nums, left, mid - 1)
  root.right = helper(nums, mid + 1, right)
  return root
}
```

```js
// 3. 选择任意一个中间位置数字作为根节点
var sortedArrayToBST = function(nums) {
  return helper(nums, 0, nums.length - 1)
};

function helper(nums, left, right) {
  if (left > right) {
    return null
  }
  let mid = Math.floor((left + right + Math.round(Math.random())) / 2)

  let root = new TreeNode(nums[mid])
  root.left = helper(nums, left, mid - 1)
  root.right = helper(nums, mid + 1, right)
  return root
}
```
