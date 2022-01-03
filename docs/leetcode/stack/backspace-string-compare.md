# 比较含退格的字符串

[比较含退格的字符串-简单](https://leetcode-cn.com/problems/backspace-string-compare)

```
给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，请你判断二者是否相等。# 代表退格字符。

如果相等，返回 true ；否则，返回 false 。

注意：如果对空文本输入退格字符，文本继续为空。

示例 1：
输入：s = "ab#c", t = "ad#c"
输出：true
解释：S 和 T 都会变成 “ac”。

示例 2：
输入：s = "ab##", t = "c#d#"
输出：true
解释：s 和 t 都会变成 “”。

示例 3：
输入：s = "a##c", t = "#a#c"
输出：true
解释：s 和 t 都会变成 “c”。

示例 4：
输入：s = "a#c", t = "b"
输出：false
解释：s 会变成 “c”，但 t 仍然是 “b”。

提示：
1 <= s.length, t.length <= 200
s 和 t 只含有小写字母以及字符 '#'

进阶：
你可以用 O(N) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？
```

## 方案 1: 重构字符串

```js
/**
 *  1. 非‘#’ 入栈操作
 *  2. '#' 弹栈操作
 */
var getResult = function(str) {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "#") {
      stack.pop();
    } else {
      stack.push(str[i]);
    }
  }
  return stack.join("");
};
var backspaceCompare = function(s, t) {
  return getResult(s) === getResult(t);
};
```

## 方法 2: 双指针

```js
// 逆序遍历
// https://leetcode-cn.com/problems/backspace-string-compare/solution/bi-jiao-han-tui-ge-de-zi-fu-chuan-by-leetcode-solu/
function backspaceCompare(S, T) {
  let i = S.length - 1;
  let j = T.length - 1;
  let skipS = (skipT = 0);

  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (S[i] == "#") {
        skipS += 1;
        i -= 1;
      } else if (skipS > 0) {
        skipS -= 1;
        i -= 1;
      } else {
        break;
      }
    }
    while (j >= 0) {
      if (T[j] == "#") {
        skipT += 1;
        j -= 1;
      } else if (skipT > 0) {
        skipT -= 1;
        j -= 1;
      } else {
        break;
      }
    }
    if (i >= 0 && j >= 0) {
      if (S[i] !== T[j]) {
        return false;
      }
    } else if (i >= 0 || j >= 0) {
      return false;
    }
    i -= 1;
    j -= 1;
  }

  return true;
}
```
