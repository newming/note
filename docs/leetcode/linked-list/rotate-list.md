# 旋转链表

[旋转链表-中等](https://leetcode-cn.com/problems/rotate-list)


```
给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

示例 1：
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]


示例 2：
输入：head = [0,1,2], k = 4
输出：[2,0,1]

提示：
链表中节点的数目在范围 [0, 500] 内
-100 <= Node.val <= 100
0 <= k <= 2 * 10^9
```

## 方案1: 闭合为环

[官方题解](https://leetcode-cn.com/problems/rotate-list/solution/xuan-zhuan-lian-biao-by-leetcode-solutio-woq1/)

```js
var rotateRight = function(head, k) {
  if (k === 0 || !head || !head.next) {
    return head;
  }
  let n = 1;
  let cur = head;
  while (cur.next) {
    cur = cur.next;
    n++;
  }

  let add = n - k % n;
  if (add === n) {
    return head;
  }

  cur.next = head;
  while (add) {
    cur = cur.next;
    add--;
  }

  const ret = cur.next;
  cur.next = null;
  return ret;
};
```

## 方法2: 快慢指针

```js
// https://leetcode-cn.com/problems/rotate-list/solution/java-shuang-zhi-zhen-100-by-programmery-31h5/
function rotateRight(head, k) {
  if(!head || k == 0){
    return head;
  }
  let temp = head;
  let fast = head;
  let slow = head;
  let len = 1;
  while (head.next) {
    head = head.next;
    len++;
  }

  if(k % len == 0){
    return temp;
  }

  while((k % len) > 0){
    k--;
    fast = fast.next;
  }

  while(fast.next != null){
    fast = fast.next;
    slow = slow.next;
  }
  let res = slow.next;
  slow.next = null;
  fast.next = temp;
  return res;
}
```
