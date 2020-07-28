# 两数相加

[两数相加-Array-中等](https://leetcode-cn.com/problems/add-two-numbers/)


```
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

## 方法1: 暴力法

```js
var addTwoNumbers = function (l1, l2) {
  var n1 = +l1.reverse().join('')
  var n2 = +l2.reverse().join('')
  return ((n1 + n2) + '').split('').reverse()
};
console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]))
```

## 方法2: 链表

```js
// 这个是答案，使用的是链表 可以查看 DataStructuresAndAlgorithms/chapter5.md
var addTwoNumbers = function (l1, l2) {
  var re = [];

  function add(l1, l2, index) {
    var sum = l1.val + l2.val;
    var aaa = 0; // 这里的aaa就是进位，0/1
    if (sum >= 10) {
      aaa = parseInt(sum / 10);
      sum = sum % 10;
    }
    re[index] = sum
    index++;
    if (l1.next == null && l2.next == null) {
      if (aaa != 0) {
        re[index] = aaa;
      }
      return
    } else if (l1.next == null) {
      l1.next = new ListNode(aaa);
      add(l1.next, l2.next, index);
    } else if (l2.next == null) {
      l2.next = new ListNode(aaa);
      add(l1.next, l2.next, index);
    } else {
      l1.next.val += aaa;
      add(l1.next, l2.next, index);
    }
  }
  add(l1, l2, 0)
  return re
};
```
