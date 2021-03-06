# 去除重复字母

[去除重复字母](https://leetcode-cn.com/problems/remove-duplicate-letters/)

```
给定一个仅包含小写字母的字符串，去除字符串中重复的字母，使得每个字母只出现一次。需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）。

示例 1:
输入: "bcabc"
输出: "abc"

示例 2:
输入: "cbacdcbc"
输出: "acdb"
```

## 方法1: 贪心算法

```js
/**
 * 注意题目重的要求：需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）
 * https://github.com/yinxin630/blog/issues/9
 * 1. 贪心算法, 用栈存储 result
 * 2. 记录各字母出现次数, 备用
 * 3. 对于每个字母
 *    a. 如果 result 中已经有了, 则直接弃掉
 *    b. 如果当前字母小于栈顶字母, 并且栈顶字母计数大于0(即后面还有), 则抛弃当前栈顶元素
 *    c. 然后将当前字母入栈
 * 4. 初始值设为 ['0'] 是为了方便初始处理, 因为所有字母都大于 '0'
 */
var removeDuplicateLetters = function (s) {
  if (s.length === 0) {
    return '';
  }

  const count = {};
  for (let i = 0; i < s.length; i++) {
    count[s[i]] = (count[s[i]] || 0) + 1;
  }

  const result = ['0'];
  for (let i = 0; i < s.length; i++) {
    count[s[i]]--;

    if (result.indexOf(s[i]) !== -1) {
      continue;
    }

    while (true) {
      const top = result[result.length - 1];
      if (count[top] > 0 && s[i] < top) {
        result.pop();
      } else {
        break;
      }
    }
    result.push(s[i]);
  }

  return result.slice(1).join('');
};
```
