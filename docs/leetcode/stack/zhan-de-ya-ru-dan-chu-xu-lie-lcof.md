# 验证图书去除顺序-判断出栈队列是否合法

- [验证图书去除顺序-判断出栈队列是否合法](https://leetcode.cn/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/description/)
- [验证栈序列](https://leetcode.cn/problems/validate-stack-sequences/description/)

```
现在图书馆有一堆图书需要放入书架，并且图书馆的书架是一种特殊的数据结构，只能按照 一定 的顺序 放入 和 拿取 书籍。

给定一个表示图书放入顺序的整数序列 putIn，请判断序列 takeOut 是否为按照正确的顺序拿取书籍的操作序列。你可以假设放入书架的所有书籍编号都不相同。

示例 1：

输入：putIn = [6,7,8,9,10,11], takeOut = [9,11,10,8,7,6]
输出：true
解释：我们可以按以下操作放入并拿取书籍：
push(6), push(7), push(8), push(9), pop() -> 9,
push(10), push(11),pop() -> 11,pop() -> 10, pop() -> 8, pop() -> 7, pop() -> 6
示例 2：

输入：putIn = [6,7,8,9,10,11], takeOut = [11,9,8,10,6,7]
输出：false
解释：6 不能在 7 之前取出。


提示：

0 <= putIn.length == takeOut.length <= 1000
0 <= putIn[i], takeOut < 1000
putIn 是 takeOut 的排列。
```

## 方法一：栈模拟

这道题需要利用给定的两个数组 pushed 和 popped 的如下性质：

- 数组 pushed 中的元素互不相同；
- 数组 popped 和数组 pushed 的长度相同；
- 数组 popped 是数组 pushed 的一个排列。

根据上述性质，可以得到如下结论：

- 栈内不可能出现重复元素；
- 如果 pushed 和 popped 是有效的栈操作序列，则经过所有的入栈和出栈操作之后，每个元素各入栈和出栈一次，栈为空。

因此，可以遍历两个数组，模拟入栈和出栈操作，判断两个数组是否为有效的栈操作序列。

模拟入栈操作可以通过遍历数组 pushed 实现。由于只有栈顶的元素可以出栈，因此模拟出栈操作需要判断栈顶元素是否与 popped 的当前元素相同，如果相同则将栈顶元素出栈。由于元素互不相同，因此当栈顶元素与 popped 的当前元素相同时必须将栈顶元素出栈，否则出栈顺序一定不等于 popped。

根据上述分析，验证栈序列的模拟做法如下：

1. 遍历数组 pushed，将 pushed 的每个元素依次入栈；
2. 每次将 pushed 的元素入栈之后，如果栈不为空且栈顶元素与 popped 的当前元素相同，则将栈顶元素出栈，同时遍历数组 popped，直到栈为空或栈顶元素与 popped 的当前元素不同。

遍历数组 pushed 结束之后，每个元素都按照数组 pushed 的顺序入栈一次。如果栈为空，则每个元素都按照数组 popped 的顺序出栈，返回 true。如果栈不为空，则元素不能按照数组 popped 的顺序出栈，返回 false

```js
// https://leetcode.cn/problems/validate-stack-sequences/solutions/1785639/yan-zheng-zhan-xu-lie-by-leetcode-soluti-cql0/
var validateStackSequences = function(pushed, popped) {
  const stack = [];
  const n = pushed.length;
  for (let i = 0, j = 0; i < n; i++) {
    stack.push(pushed[i]);
    while (stack.length && stack[stack.length - 1] == popped[j]) {
      stack.pop();
      j++;
    }
  }
  return stack.length === 0;
};
```
