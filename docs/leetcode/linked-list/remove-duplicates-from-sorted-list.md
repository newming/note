# 删除排序链表中的重复元素

[删除排序链表中的重复元素-简单](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

```
存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。

返回同样按升序排列的结果链表。
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

## 方法1: 一次遍历

复杂度分析

- 时间复杂度：O(n)，其中 n 是链表的长度
- 空间复杂度：O(1)

```js
var deleteDuplicates = function(head) {
  let pre = head
  while(pre && pre.next) {
    if(pre.next.val === pre.val) {
      pre.next = pre.next.next
    } else {
      pre = pre.next
    }
  }
  return head
};
```
