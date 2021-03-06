# 无重复字符的最长子串

[无重复字符的最长子串-String-中等](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

```
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

  输入: "abcabcbb"
  输出: 3
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:

  输入: "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:

  输入: "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

## 方法一：暴力法

- 时间复杂度 O(n^3)
- 空间复杂度 O(min(n, m))

```js
function lengthOfLongestSubstring(s) {
  let n = s.length
  let ans = 0
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
      if (allUnique(s, i, j)) {
        ans = Math.max(ans, j - i)
      }
    }
  }
  return ans
}

function allUnique(s, start, end) {
  let obj = {}
  for (let i = start; i < end; i++) {
    let word = s.charAt(i)
    if (obj[word]) return false;
    obj[word] = 1
  }
  return true;
}
```

## 方法二：滑动窗口

- 时间复杂度 O(2n)=O(n)
- 空间复杂度 O(min(m, n))

```js
function lengthOfLongestSubstring(s) {
  let n = s.length
  let arr = [],
    ans = 0,
    i = 0, // 滑动门(字符串s)左下标
    j = 0 // 滑动门(字符串s)右下标
  while (i < n && j < n) {
    // 如果 arr 中没有 j 位的字符，就填充，同时
    if (arr.indexOf(s.charAt(j)) === -1) {
      arr.push(s.charAt(j++)) // 这里注意 j++ 先 push 后自增一
      ans = Math.max(ans, j - i)
    } else {
      // 如果 arr 中有 j 位的字符，则 arr 从头依次删除一个字符，同时移动 i ，直到将与 j 位相同的字符删掉
      arr.splice(0, 1)
      i++
    }
  }
  return ans
}
```

## 方法三：优化的滑动窗口

- 时间复杂度 O(n)
- 空间复杂度 O(min(m, n))

```js
var lengthOfLongestSubstring = function (s) {
  var len = s.length;
  var arr = [],
    ans = 0,
    i = 0, // 这里的 i 是 arr 的下标
    j = 0; // 滑动门(字符串s)右下标
  for (; j < len; j++) {
    // 这里的 if 等同于上一种方法的 else ，优化了移动 i 的操作，直接移动 i 到了 arr 中与 j 位置，不在是递增 i
    if (arr.indexOf(s[j]) !== -1) {
      i = arr.lastIndexOf(s[j]) + 1;
      arr.splice(0, i); // 这里从当前 arr 里删掉重复字符索引及之前的字符
    }
    ans = Math.max(ans, arr.length + 1); // 这里加一是因为 push 操作放到了下边
    arr.push(s[j]);
  }
  return ans;
};
console.log(lengthOfLongestSubstring("pwwkew"))
```
