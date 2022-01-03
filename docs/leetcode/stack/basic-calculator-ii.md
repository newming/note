# 基本计算器 II

[基本计算器 II-中等](https://leetcode-cn.com/problems/basic-calculator-ii)

```
给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

整数除法仅保留整数部分。

示例 1：
输入：s = "3+2*2"
输出：7

示例 2：
输入：s = " 3/2 "
输出：1

示例 3：
输入：s = " 3+5 / 2 "
输出：5

提示：
1 <= s.length <= 3 * 10^5
s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
s 表示一个 有效表达式
表达式中的所有整数都是非负整数，且在范围 [0, 2^31 - 1] 内
题目数据保证答案是一个 32-bit 整数
```

## 方案 1: 栈

```js
// https://leetcode-cn.com/problems/basic-calculator-ii/solution/ji-ben-ji-suan-qi-ii-by-leetcode-solutio-cm28/
// 记录一个 preSign 来决定计算方式
// 加号：将数字压入栈；
// 减号：将数字的相反数压入栈；
// 乘除号：计算数字与栈顶元素，并将栈顶元素替换为计算结果。
var calculate = function(s) {
  s = s.trim();
  const stack = new Array();
  let preSign = "+";
  let num = 0;
  const n = s.length;
  for (let i = 0; i < n; ++i) {
    if (!isNaN(Number(s[i])) && s[i] !== " ") {
      num = num * 10 + s[i].charCodeAt() - "0".charCodeAt();
    }
    if (isNaN(Number(s[i])) || i === n - 1) {
      switch (preSign) {
        case "+":
          stack.push(num);
          break;
        case "-":
          stack.push(-num);
          break;
        case "*":
          stack.push(stack.pop() * num);
          break;
        default:
          stack.push((stack.pop() / num) | 0);
      }
      preSign = s[i];
      num = 0;
    }
  }
  let ans = 0;
  while (stack.length) {
    ans += stack.pop();
  }
  return ans;
};
```
