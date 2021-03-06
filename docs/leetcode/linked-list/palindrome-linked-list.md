# 回文链表

[回文链表-简单](https://leetcode-cn.com/problems/palindrome-linked-list/)

```
请判断一个链表是否为回文链表。

示例 1:
输入: 1->2
输出: false

示例 2:
输入: 1->2->2->1
输出: true

进阶：
你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
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

## 方法1: 循环链表 生成array比较

```js
var isPalindrome = function (head) {
  let resAry = []
  let point = head
  while (point) {
    resAry.push(point.val)
    point = point.next
  }
  return resAry.join('') === resAry.reverse().join('')
}
```

## 方法2: 循环链表放入数组中，双指针比较

```js
// https://leetcode-cn.com/problems/palindrome-linked-list/solution/hui-wen-lian-biao-by-leetcode/
var isPalindrome = function (head) {
  let vals = []

  // Convert LinkedList into ArrayList.
  let currentNode = head
  while (currentNode != null) {
    vals.push(currentNode.val)
    currentNode = currentNode.next
  }

  // Use two-pointer technique to check for palindrome.
  let front = 0
  let back = vals.length - 1
  while (front < back) {
    // Note that we must use ! .equals instead of !=
    // because we are comparing Integer, not int.
    if (vals[front] !== vals[back]) {
      return false
    }
    front++
    back--
  }
  return true
}
```

## 方法3: 递归 很高级 和 反转链表2 的递归类似

```js
// https://leetcode-cn.com/problems/palindrome-linked-list/solution/hui-wen-lian-biao-by-leetcode/
// 缺点：frontPointer 还是会从头找到尾，即需要重复比较一次
var isPalindrome = function (head) {
  let frontPointer = head
  var recursivelyCheck = function (currentNode) {
    if (currentNode != null) {
      if (!recursivelyCheck(currentNode.next)) return false;
      if (currentNode.val != frontPointer.val) return false;
      frontPointer = frontPointer.next;
    }
    return true
  }
  return recursivelyCheck(head)
}
```

## 方法4: 使用快慢指针反转链表后半部分，进行比较

```js
// https://leetcode-cn.com/problems/palindrome-linked-list/solution/hui-wen-lian-biao-by-leetcode/
var isPalindrome = function (head) {
  if (head == null) return true

  // Find the end of first half and reverse second half.
  let firstHalfEnd = endOfFirstHalf(head)
  let secondHalfStart = reverseList(firstHalfEnd.next)

  // Check whether or not there is a palindrome.
  let p1 = head
  let p2 = secondHalfStart
  let result = true
  // 当链表是奇数位时，p1(前半段)比p2(后半段)长，所以这里判断 p2 不为空即可识别是否比较完毕
  while (result && p2 != null) {
    if (p1.val !== p2.val) result = false;
    p1 = p1.next
    p2 = p2.next
  }

  // Restore the list and return the result.
  firstHalfEnd.next = reverseList(secondHalfStart)
  return result
}
// Taken from https://leetcode.com/problems/reverse-linked-list/solution/
var reverseList = function (head) {
  let prev = null
  let curr = head
  while (curr != null) {
    let nextTemp = curr.next
    curr.next = prev
    prev = curr
    curr = nextTemp
  }
  return prev
}
var endOfFirstHalf = function (head) {
  // 快慢指针找中点，快指针一次前进两步，慢指针一次前进一步
  let fast = head
  let slow = head
  while (fast.next != null && fast.next.next != null) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}
```
