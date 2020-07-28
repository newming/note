# 删除链表的倒数第N个节点

[删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

```
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.

说明：
给定的 n 保证是有效的。

进阶：
你能尝试使用一趟扫描实现吗？
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
 * @param {number} n
 * @return {ListNode}
 */
```

## 方法1: 两次遍历算法

```js
// https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/shan-chu-lian-biao-de-dao-shu-di-nge-jie-dian-by-l/
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(0) // 哑节点
  dummy.next = head
  let length  = 0;
  let first = head
  while (first != null) {
    length++;
    first = first.next;
  }
  length -= n;
  first = dummy;
  while (length > 0) {
    length--;
    first = first.next;
  }
  first.next = first.next.next;
  return dummy.next
}
```

## 方法2: 双指针实现一次遍历

```js
// https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/shan-chu-lian-biao-de-dao-shu-di-nge-jie-dian-by-l/
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(0)
  dummy.next = head
  let first = dummy
  let second = dummy
  // Advances first pointer so that the gap between first and second is n nodes apart
  // 让 first 和 second 保持 n 的间距
  for (let i = 1; i <= n + 1; i++) {
    first = first.next
  }
  // Move first to the end, maintaining the gap
  while (first !== null) {
    first = first.next
    second = second.next
  }
  second.next = second.next.next
  return dummy.next
}
```
