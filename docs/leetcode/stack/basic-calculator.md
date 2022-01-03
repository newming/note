# 基本计算器

[基本计算器-困难](https://leetcode-cn.com/problems/basic-calculator/)

```
给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

示例 1：
输入：s = "1 + 1"
输出：2

示例 2：
输入：s = " 2-1 + 2 "
输出：3

示例 3：
输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23

提示：
1 <= s.length <= 3 * 10^5
s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
s 表示一个有效的表达式
```

## 方案 1: 括号展开+栈

复杂度分析

- 时间复杂度：O(n)，其中 n 为字符串 s 的长度。需要遍历字符串 s 一次，计算表达式的值。
- 空间复杂度：O(n)，其中 n 为字符串 s 的长度。空间复杂度主要取决于栈的空间，栈中的元素数量不超过 n。

```js
// https://leetcode-cn.com/problems/basic-calculator/solution/ji-ben-ji-suan-qi-by-leetcode-solution-jvir/
var calculate = function(s) {
  const ops = [1];
  let sign = 1;

  let ret = 0;
  const n = s.length;
  let i = 0;
  while (i < n) {
    if (s[i] === " ") {
      i++;
    } else if (s[i] === "+") {
      sign = ops[ops.length - 1];
      i++;
    } else if (s[i] === "-") {
      sign = -ops[ops.length - 1];
      i++;
    } else if (s[i] === "(") {
      ops.push(sign);
      i++;
    } else if (s[i] === ")") {
      ops.pop();
      i++;
    } else {
      let num = 0;
      while (i < n && !isNaN(Number(s[i])) && s[i] !== " ") {
        num = num * 10 + s[i].charCodeAt() - "0".charCodeAt();
        i++;
      }
      ret += sign * num;
    }
  }
  return ret;
};
```
