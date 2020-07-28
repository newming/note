# 合并两个有序链表

[合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

```
将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的

示例：
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

## 前置条件

```js
    // 单向列表
    function ListNode(val) {
      this.val = val;
      this.next = null;
    }
```

## 方法一: 递归

https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/he-bing-liang-ge-you-xu-lian-biao-by-leetcode/

```js
var mergeTwoLists = function (l1, l2) {
  if (l1 == null) {
    return l2;
  } else if (l2 == null) {
    return l1;
  } else if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}
```

## 方法二: 同上，只是创建了新的链表，没有破坏原先的链表

```js
var mergeTwoLists1 = function(l1, l2) {
  if (l1 === undefined || l1 === null) return l2
  if (l2 === undefined || l2 === null) return l1

  const current = new ListNode('')
  if (l1.val >= l2.val) {
    current.val = l2.val
    current.next = mergeTwoLists(l1, l2.next)
  } else {
    current.val = l1.val
    current.next = mergeTwoLists(l1.next, l2)
  }
  return current
}
```

## 方法3: 迭代

```js
// https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/he-bing-liang-ge-you-xu-lian-biao-by-leetcode/
var mergeTwoLists = function (l1, l2) {
  // maintain an unchanging reference to node ahead of the return node.
  let prehead = new ListNode(-1)

  let prev = prehead
  while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) {
      prev.next = l1
      l1 = l1.next
    } else {
      prev.next = l2
      l2 = l2.next
    }
    prev = prev.next
  }

  // exactly one of l1 and l2 can be non-null at this point, so connect
  // the non-null list to the end of the merged list.
  prev.next = l1 == null ? l2 : l1

  return prehead.next
}
```
