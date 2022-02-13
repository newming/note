# 树

树是一种非顺序数据结构，他对于存储需要快速查找的数据非常有用。

生活中的家谱或公司的组织架构。

相关术语：

- 节点
  - 内部节点: 至少有一个子节点的节点
  - 外部节点: 没有子节点的节点称为外部节点或叶子节点
- 根节点
- 父节点
- 子节点
- 子树
- 深度: 取决于它的祖先节点的数量
- 高度: 取决于所有节点深度的最大值

一些分类(简单描述)

- 完全二叉树: complete binary tree，只有最后一层的右节点不满，可以用连续的空间存储(数组)。编号为 i(从 1 开始)的子节点，其左孩子编号为 2\*i，右孩子 2\*i + 1
- 满二叉树: 没有不为 1 的子节点
- 完美二叉树: 看起来是个三角形

## 二叉树和二叉搜索树

二叉树中的节点最多只能有两个子节点: 一个是左侧子节点，另一个是右侧子节点。这些定义有助于写出更高效的 向/从 树中插入、查找和删除节点的算法。应用非常广泛。

二叉树的性质

- 在二叉树的第 i 层上最多有 2^(i-1)个节点(i>=1)
- 二叉树中如果深度为 k，那么最多有 2^k - 1 个节点(k>=1)
- 节点数 = 边数 + 1
- 度为 0 的节点比度为 2 的节点多一个。推导过程：度为 0，1，2 的节点数的和为 n0 + n1 + n2 = 边数(0 + n1 + 2 \* n2) + 1。得出 n0 = n2 + 1

二叉搜索树(BST)是二叉树中的一种，但是它只允许在左侧节点存储比父节点小的值，在右侧节点存储比父节点大或者等于的值。

## 创建 BinarySearchTree 类

```js
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
// 生成子节点
class Node {
  constructor(key) {
    this.key = key;
    this.left = undefined;
    this.right = undefined;
  }
  toString() {
    return `${this.key}`;
  }
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = undefined;
  }
  insert(key) {
    // special case: first key
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  // 插入节点
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 往左边插入
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      // 往右边插入
      node.right = new Node(key);
    } else {
      // 往右边插入
      this.insertNode(node.right, key);
    }
  }
  getRoot() {
    return this.root;
  }
  // 查找一个键
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    return true;
  }
  // 通过中序遍历方式遍历所有节点(左、根、右): 从最小到最大的顺序访问
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
  // 通过先序遍历方式遍历所有节点(根、左、右):以优先于后代节点的顺序访问每个节点
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  // 通过后序遍历方式遍历所有节点(左、右、根): 先访问节点的后代节点，在访问节点本身
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
  // 返回树中最小的值
  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }
  // 返回树中最大的值
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  // 从树中移除某个值
  remove(key) {
    this.root = this.removeNode(this.root, key); // 注意这里的赋值操作，父节点需要改变指针
  }
  removeNode(node, key) {
    if (node == null) {
      return undefined;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key); // 注意这里的赋值操作，父节点需要改变指针
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key); // 注意这里的赋值操作，父节点需要改变指针
      return node;
    }
    // key is equal to node.item
    // handle 3 special conditions
    // 1 - a leaf node
    // 2 - a node with only 1 child
    // 3 - a node with 2 children
    // case 1
    if (node.left == null && node.right == null) {
      node = undefined;
      return node;
    }
    // case 2
    if (node.left == null) {
      node = node.right;
      return node;
    } else if (node.right == null) {
      node = node.left;
      return node;
    }
    // case 3 （1）找到需要移除的节点，然后找到这个节点右边子树中最小的节点（2）用它右侧子树中最小节点的键去更新这个节点的值，这个时候已经将需要删除的节点给删掉了（3）移除右侧子树中的最小节点，因为它已经拿到上边，代替了移除掉的节点（4）向他的父节点返回更新后的值
    const aux = this.minNode(node.right);
    node.key = aux.key;
    node.right = this.removeNode(node.right, aux.key);
    return node;
  }
}
```

- 中序遍历: 排序
- 先序遍历: 打印结构化的文档
- 后序遍历: 计算一个目录和它的子目录中所有文件所占空间大小

## 自平衡树

二叉搜索树存在一个问题：取决于添加的节点数，树的一条边可能会非常深。这会在需要在某条边上添加、移除、搜索某个节点时引起一些性能问题。为了解决这个问题，有一种树叫做 Adelson-Velskii-Landi 树(AVL 树)。

AVL 树是一种自平衡二叉搜索树，意思是任何一个节点的左右两侧子树的高度之差最多为 1。也就是说这种树会在添加或移除节点时尽量试着成为一颗完全树。

```js
const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};
// 在上边的 二叉搜索树 的基础上开发
class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }
  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }
  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }
  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }
  /**
   * Left right case: rotate left then right
   * @param node Node<T>
   */
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }
  /**
   * Right left case: rotate right then left
   * @param node Node<T>
   */
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }
  getBalanceFactor(node) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }
  insertNode(node, key) {
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // duplicated key
    }
    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // Left left case
        node = this.rotationLL(node);
      } else {
        // Left right case
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // Right right case
        node = this.rotationRR(node);
      } else {
        // Right left case
        return this.rotationRL(node);
      }
    }
    return node;
  }
  removeNode(node, key) {
    node = super.removeNode(node, key); // {1}
    if (node == null) {
      return node;
    }
    // verify if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // Left left case
      if (
        this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.left) ===
          BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      // Left right case
      if (
        this.getBalanceFactor(node.left) ===
        BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationLR(node.left);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // Right right case
      if (
        this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.right) ===
          BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      // Right left case
      if (
        this.getBalanceFactor(node.right) ===
        BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationRL(node.right);
      }
    }
    return node;
  }
}
```
