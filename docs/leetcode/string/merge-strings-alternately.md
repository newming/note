# 交替合并字符串-简单

[交替合并字符串-简单](https://leetcode.cn/problems/merge-strings-alternately/description/)

```
给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。

返回 合并后的字符串 。

示例 1：
输入：word1 = "abc", word2 = "pqr"
输出："apbqcr"
解释：字符串合并情况如下所示：
word1：  a   b   c
word2：    p   q   r
合并后：  a p b q c r

示例 2：
输入：word1 = "ab", word2 = "pqrs"
输出："apbqrs"
解释：注意，word2 比 word1 长，"rs" 需要追加到合并后字符串的末尾。
word1：  a   b
word2：    p   q   r   s
合并后：  a p b q   r   s

示例 3：
输入：word1 = "abcd", word2 = "pq"
输出："apbqcd"
解释：注意，word1 比 word2 长，"cd" 需要追加到合并后字符串的末尾。
word1：  a   b   c   d
word2：    p   q
合并后：  a p b q c   d


提示：
1 <= word1.length, word2.length <= 100
word1 和 word2 由小写英文字母组成
```

## 方法 1: 遍历

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
  var res = "";
  const maxLen = Math.max(word1?.length || 0, word2?.length || 0);

  for (let i = 0; i < maxLen; i++) {
    res += word1[i] || "";
    res += word1[i] || "";
  }
  return res;
};
```

## 方法 2: 双指针

```js
var mergeAlternately = function(word1, word2) {
  const m = word1.length,
    n = word2.length;
  let i = 0,
    j = 0;

  const ans = [];
  while (i < m || j < n) {
    if (i < m) {
      ans.push(word1[i]); // undefined 添加到数组中也可以，后续 join 的时候自动过滤了
      ++i;
    }
    if (j < n) {
      ans.push(word2[j]);
      ++j;
    }
  }
  return ans.join("");
};
// 链接：https://leetcode.cn/problems/merge-strings-alternately/solutions/1913930/jiao-ti-he-bing-zi-fu-chuan-by-leetcode-ac4ih/
```
