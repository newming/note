# 判断子序列-简单

[判断子序列-简单](https://leetcode.cn/problems/is-subsequence/description/)

```
给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

进阶：

如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

示例 1：

输入：s = "abc", t = "ahbgdc"
输出：true

示例 2：

输入：s = "axc", t = "ahbgdc"
输出：false

提示：
0 <= s.length <= 100
0 <= t.length <= 10^4
两个字符串都只由小写字符组成。
```

## 方案 1: 双指针+贪心

本题询问的是，s 是否是 t 的子序列，因此只要能找到任意一种 s 在 t 中出现的方式，即可认为 s 是 t 的子序列。

而当我们从前往后匹配，可以发现每次贪心地匹配靠前的字符是最优决策。

> 假定当前需要匹配字符 c，而字符 c 在 t 中的位置 x1 和 x2 ​ 出现（x1<x2），那么贪心取 x1 是最优解，因为 x2 后面能取到的字符，x1 也都能取到，并且通过 x1 与 x2 之间的可选字符，更有希望能匹配成功。

这样，我们初始化两个指针 i 和 j，分别指向 s 和 t 的初始位置。每次贪心地匹配，匹配成功则 i 和 j 同时右移，匹配 s 的下一个位置，匹配失败则 j 右移，i 不变，尝试用 t 的下一个字符匹配 s。

最终如果 i 移动到 s 的末尾，就说明 s 是 t 的子序列。

```js
// 链接：https://leetcode.cn/problems/is-subsequence/solutions/346539/pan-duan-zi-xu-lie-by-leetcode-solution/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  let n = s.length;
  let m = t.length;
  let i = 0;
  let j = 0;

  while (i < n && j < m) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }
  return i === n;
};
```

## 方案 2: 动态规划

暂未实现
