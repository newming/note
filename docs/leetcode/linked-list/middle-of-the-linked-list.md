# 链表的中间节点

[链表的中间节点-简单](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

```
给定一个带有头结点 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

示例 1：
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.

示例 2：
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。

提示：
给定链表的结点数介于 1 和 100 之间。
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
 * @return {ListNode}
 */
```

## 方法一：循环统计链表长度，然后找到中间节点

```js
var middleNode = function (head) {
  if (!head) {
    return head
  }
  let n = 0
  let tmp = head
  while (tmp) {
    tmp = tmp.next
    n++
  }
  let middle = Math.floor(n / 2) + 1
  tmp = head
  while (middle > 1) {
    tmp = tmp.next
    middle--
  }
  return tmp
}
```

## 方法2: 快慢指针寻找中点

```js
var middleNode = function (head) {
  let fast = head
  let slow = head
  while (fast && fast.next != null) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}
```

## 方法3: 将节点输出到数组，找数组中点

```js
// https://leetcode-cn.com/problems/middle-of-the-linked-list/solution/lian-biao-de-zhong-jian-jie-dian-by-leetcode/
var middleNode = function(head) {
  let A = [head]
  while (A[A.length - 1].next != null) {
    A.push(A[A.length - 1].next)
  }
  return A[Math.trunc(A.length / 2)]
}

// 测试
function ListNode(val) {
  this.val = val;
  this.next = null;
}
let node1 = new ListNode(1)
let node2 = new ListNode(2)
let node3 = new ListNode(3)
let node4 = new ListNode(4)
node1.next = node2
node2.next = node3
node3.next = node4
console.log(middleNode(node1))
```
