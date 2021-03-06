# 反转链表2

[反转链表2-中等](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

```
反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

## 前置条件

```js
/**
  * Definition for singly-linked list.
  * function ListNode(val) {
  *     this.val = val;
  *     this.next = null;
  * }
  */
/**
  * @param {ListNode} head
  * @param {number} m
  * @param {number} n
  * @return {ListNode}
  */
```

## 方法1: 递归

```js
// https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/bu-bu-chai-jie-ru-he-di-gui-di-fan-zhuan-lian-biao/
var reverseBetween = function (head, m, n) {
  let successor = null // 后驱节点

  // 反转以 head 为起点的 n 个节点，返回新的头结点
  var reverseN = function (head, n) {
    if (n === 1) {
      // 记录第 n + 1 个节点
      successor = head.next
      return head
    }
    // 以 head.next 为起点，需要反转前 n - 1 个节点
    let last = reverseN(head.next, n - 1)

    head.next.next = head
    // 让反转之后的 head 节点和后面的节点连起来
    head.next = successor
    return last
  }

  // base case
  if (m == 1) {
    return reverseN(head, n)
  }
  // 前进到反转的起点触发 base case
  head.next = reverseBetween(head.next, m - 1, n - 1)
  return head
}
```

## 方法2: 双指针递归

```js
// https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/fan-zhuan-lian-biao-ii-by-leetcode/
// 双指针交换节点的 val(最好不要这么干)，注意递归中的 left 和 right，left 可以通过 next 往下寻找，即往右移动，所以放在全局了，但是 right 无法找到上一级，所以作为递归中的一个局部变量了，每次递归都单独存了对应 left 的 right 值
var reverseBetween = function (head, m, n) {
  // Object level variables since we need the changes
  // to persist across recursive calls and Java is pass by value.
  let left = head
  let stop = false

  var recurseAndReverse = function (right, m, n) {
    // base case. Don't proceed any further
    if (n === 1) {
      return
    }

    // Keep moving the right pointer one step forward until (n === 1)
    right = right.next

    // Keep moving left pointer to the right until we reach the proper node
    // from where the reversal is to start.
    if (m > 1) {
      left = left.next
    }

    // Recurse with m and n reduced.
    recurseAndReverse(right, m - 1, n - 1)

    // In case both the pointers cross each other or become equal, we
    // stop i.e. don't swap data any further. We are done reversing at this
    // point.
    if (left === right || right.next === left) {
      stop = true
    }

    // Until the boolean stop is false, swap data between the two pointers
    if (!stop) {
      let t = left.val
      left.val = right.val;
      right.val = t

      // Move left one step to the right.
      // The right pointer moves one step back via backtracking.
      left = left.next;
    }
  }
  recurseAndReverse(head, m, n)
  return head
}
```

## 方法3: 迭代链接反转

```js
// https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/fan-zhuan-lian-biao-ii-by-leetcode/
var reverseBetween = function (head, m, n) {
  // Empty list
  if (head == null || head.next == null) {
    return head
  }

  // Move the two pointers until they reach the proper starting point
  // in the list.
  let cur = head, prev = null
  while (m > 1) {
    prev = cur
    cur = cur.next
    m--
    n--
  }

  // The two pointers that will fix the final connections.
  let con = prev, tail = cur

  // Iteratively reverse the nodes until n becomes 0.
  let third = null
  while (n > 0) {
    third = cur.next
    cur.next = prev
    prev = cur
    cur = third
    n--
  }

  // Adjust the final connections as explained in the algorithm
  if (con != null) {
    con.next = prev
  } else {
    head = prev
  }

  tail.next = cur
  return head
}

// 测试
function ListNode (val) {
  this.val = val
  this.next = null
}
let head = null
for (let i = 5; i > 0; i--) {
  let newNode = new ListNode(i)
  newNode.next = head
  head = newNode
}
console.log(head)
console.log(reverseBetween(head, 2, 4))
```
