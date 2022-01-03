# 从前序与中序遍历序列构造二叉树

[从前序与中序遍历序列构造二叉树-中等](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal)

```
给定一棵树的前序遍历 preorder 与中序遍历 inorder。请构造二叉树并返回其根节点。

示例 1:
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

示例 2:
Input: preorder = [-1], inorder = [-1]
Output: [-1]

提示:
1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder 和 inorder 均无重复元素
inorder 均出现在 preorder
preorder 保证为二叉树的前序遍历序列
inorder 保证为二叉树的中序遍历序列
```

## 方案 1: 递归

```js
// https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/cong-qian-xu-yu-zhong-xu-bian-li-xu-lie-gou-zao-9/
function buildTree(preorder, inorder) {
  function myBuildTree(preorderLeft, preorderRight, inorderLeft, inorderRight) {
    if (preorderLeft > preorderRight) {
      return null;
    }
    // 前序遍历第一个节点就是根节点
    let preorderRoot = preorderLeft;
    // 在中序遍历中定位根节点
    let inorderRoot = indexMap[preorder[preorderRoot]];

    // 先把根节点建立起来
    let root = new TreeNode(preorder[preorderRoot]);
    // 得到左子树中的节点数目
    let sizeLeftSubtree = inorderRoot - inorderLeft;
    // 递归地构造左子树，并连接到根节点
    // 先序遍历中「从 左边界+1 开始的 size_left_subtree」个元素就对应了中序遍历中「从 左边界 开始到 根节点定位-1」的元素
    root.left = myBuildTree(
      preorderLeft + 1,
      preorderLeft + sizeLeftSubtree,
      inorderLeft,
      inorderRoot - 1
    );
    // 递归地构造右子树，并连接到根节点
    // 先序遍历中「从 左边界+1+左子树节点数目 开始到 右边界」的元素就对应了中序遍历中「从 根节点定位+1 到 右边界」的元素
    root.right = myBuildTree(
      preorderLeft + sizeLeftSubtree + 1,
      preorderRight,
      inorderRoot + 1,
      inorderRight
    );
    return root;
  }

  let n = preorder.length;
  let indexMap = {};
  for (let i = 0; i < n; i++) {
    indexMap[inorder[i]] = i; // 记录 inorder 的每个数字所在索引
  }

  return myBuildTree(0, n - 1, 0, n - 1);
}
```

## 方法 2: 递归

```js
// 参数相比1少了一些，另外 inorder 位置查找改成了 while 查找
var buildNode = function(preorder, inorder) {
  if (!preorder.length) return null;
  // 查找根结点在中序遍历中的位置
  let p = 0;
  while (inorder[p] !== preorder[0]) {
    p++;
  }
  // 构建根节点
  let root = new TreeNode(preorder[0]);

  let leftIn = inorder.slice(0, p); // 左子树 中序数组
  let rightIn = inorder.slice(p + 1); // 右子树 中序数组

  let leftPr = preorder.slice(1, p + 1); // 左子树 前序数组
  let rightPr = preorder.slice(p + 1); // 右子树 前序数组

  root.left = buildNode(leftPr, leftIn);
  root.right = buildNode(rightPr, rightIn);
  return root;
};
var buildTree = function(preorder, inorder) {
  return buildNode(preorder, inorder);
};
```

## 方案 3: 迭代

```js
// https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/cong-qian-xu-yu-zhong-xu-bian-li-xu-lie-gou-zao-9/
function buildTree(preorder, inorder) {
  if (!preorder) {
    return null;
  }

  let root = new TreeNode(preorder[0]);
  let stack = [root];
  let inorderIndex = 0;
  for (let i = 1; i < preorder.length; i++) {
    let preorderVal = preorder[i];
    let node = stack[stack.length - 1];
    if (node.val !== inorder[inorderIndex]) {
      node.left = new TreeNode(preorderVal);
      stack.push(node.left);
    } else {
      while (
        stack &&
        stack.length &&
        stack[stack.length - 1].val === inorder[inorderIndex]
      ) {
        node = stack.pop();
        inorderIndex += 1;
      }
      node.right = new TreeNode(preorderVal);
      stack.push(node.right);
    }
  }
  return root;
}
```
