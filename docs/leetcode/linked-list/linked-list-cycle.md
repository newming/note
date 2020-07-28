# 环形链表

[环形链表-简单](https://leetcode-cn.com/problems/linked-list-cycle/)

```
给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

示例 1：
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png

示例 2：
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png

示例 3：
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png

进阶：
你能用 O(1)（即，常量）内存解决此问题吗？
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
 * @return {boolean}
 */
```

## 方法1: 置空法

https://leetcode-cn.com/problems/linked-list-cycle/comments/113606

```js
// 缺点：破坏了原链表(val&next关系)
// 使用特殊标记重写val，当通过next找到了该特殊标记，说明有环
var hasCycle = function (head) {
  if (!head) {
    return false
  }
  let specialVal = Symbol('sp') // 前端这里使用了 Symbol 的唯一性
  while (head.next && head.val !== specialVal) {
    head.val = specialVal
    head = head.next
  }
  // 这里其实没用 当 specialVal = null 时有用
  if (!head.next) {
    return false
  }
  return true
}
```

## 方法2: 类似方法1，也会破坏原链表

```js
// https://leetcode-cn.com/problems/linked-list-cycle/solution/huan-xing-lian-biao-by-leetcode/161824
// 不断删除节点，如果有环，最终会出现一个节点的next指向自己
// 缺点破坏了原链表
var hasCycle = function (head) {
  while(head != null){
    if(head == head.next){
      return true
    }
    if(head.next != null){
      head.next = head.next.next
    }
    head = head.next
  }
  return false
}
```

## 方法3: 哈希表(或者也可以在每个节点上增加新的标记，标识是否访问过)

```js
// https://leetcode-cn.com/problems/linked-list-cycle/solution/huan-xing-lian-biao-by-leetcode/
// 这里使用 Map 数据类型，将 node 作为 key 保存
// 不能使用每个节点的 val 作为 key，因为不唯一
var hasCycle = function (head) {
  let nodesSeen = new Map()
  while (head != null) {
    if (nodesSeen.has(head)) {
      return true
    } else {
      nodesSeen.set(head, '1')
    }
    head = head.next
  }
  return false
}
```

## 方法4: 双指针 优秀

```js
    // https://leetcode-cn.com/problems/linked-list-cycle/solution/huan-xing-lian-biao-by-leetcode/
    var hasCycle = function (head) {
      if (head == null || head.next == null) {
        return false
      }
      // 慢指针每次前进一步，快指针每次前进两步，快指针总是会追上慢指针
      let slow = head
      let fast = head.next
      while (slow != fast) {
        if (fast == null || fast.next == null) {
          return false
        }
        slow = slow.next
        fast = fast.next.next
      }
      return true
    }
```

## 方法5: 数组判重，类似方法3 只是 Map 换成了数组

```js
// https://leetcode-cn.com/problems/linked-list-cycle/solution/141-huan-xing-lian-biao-by-alexer-660/

// 方法6: 标记法 类似方法1，只不过不再是修改 val，而是在 node 节点上增加新特殊属性来标记
// https://leetcode-cn.com/problems/linked-list-cycle/solution/141-huan-xing-lian-biao-by-alexer-660/

// 测试
function ListNode (val) {
  this.val = val
  this.next = null
}
var node1 = new ListNode(1)
var node2 = new ListNode(2)
var node3 = new ListNode(3)
node1.next = node2
node2.next = node3
node3.next = node1
var head = node1
console.log(hasCycle(head))
```
