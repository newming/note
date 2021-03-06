# 反转链表

[反转链表-简单](https://leetcode-cn.com/problems/reverse-linked-list/)

```
反转一个单链表。

示例:
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
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

## 方法1 迭代

```js
// https://leetcode-cn.com/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-by-leetcode/
var reverseList = function (head) {
  let prev = null
  let curr = head
  while (curr !== null) {
    let nextTemp = curr.next
    curr.next = prev
    prev = curr
    curr = nextTemp
  }
  return prev
}
```

## 方法2: 递归

https://leetcode-cn.com/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-by-leetcode/

```js
var reverseList = function (head) {
  if (head == null || head.next == null) return head

  let p = reverseList(head.next) // 递归|回溯 一直找到结尾
  head.next.next = head
  head.next = null
  return p
}
```

## 方法3: 迭代 使用了新的链表保存结果&&增加了缓存

```js
var reverseList = function(head) {
  if (head == null || !head.next) {
    return head
  }
  let cur = head
  let pre = null
  let cache
  let newHead
  while (cur) {
    cache = cur.next; // 缓存下一个节点 next
    newHead = cur;
    newHead.next = pre; // 更改当前节点的指向, 会直接断开旧的链接, 因此需要提前缓存下一个节点

    // 指针前移
    pre = cur;
    cur = cache; // 从缓存中获取下一个节点
  }
  return newHead
}
```
