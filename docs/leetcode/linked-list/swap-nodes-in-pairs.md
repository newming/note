# 两两交换链表中的节点

[两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs)

```
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例 1：
输入：head = [1,2,3,4]
输出：[2,1,4,3]

示例 2：
输入：head = []
输出：[]

示例 3：
输入：head = [1]
输出：[1]

提示：
链表中节点的数目在范围 [0, 100] 内
0 <= Node.val <= 100

进阶：你能在不修改链表节点值的情况下解决这个问题吗?（也就是说，仅修改节点本身。）
```

## 方案1: 递归

[官方题解](https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/liang-liang-jiao-huan-lian-biao-zhong-de-jie-di-91/)

复杂度分析

- 时间复杂度：O(n)，其中 n 是链表的节点数量。需要对每个节点进行更新指针的操作。
- 空间复杂度：O(n)，其中 n 是链表的节点数量。空间复杂度主要取决于递归调用的栈空间。

```js
var swapPairs = function(head) {
  if (head === null|| head.next === null) {
    return head;
  }
  const newHead = head.next;
  head.next = swapPairs(newHead.next);
  newHead.next = head;
  return newHead;
};
```

## 方案2: 迭代

复杂度分析

- 时间复杂度：O(n)，其中 n 是链表的节点数量。需要对每个节点进行更新指针的操作。
- 空间复杂度：O(1)

```js
var swapPairs = function(head) {
  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let temp = dummyHead;
  while (temp.next !== null && temp.next.next !== null) {
    const node1 = temp.next;
    const node2 = temp.next.next;
    temp.next = node2;
    node1.next = node2.next;
    node2.next = node1;
    temp = node1;
  }
  return dummyHead.next;
};
```
