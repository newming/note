# 反转字符串中的元音字母-简单

[反转字符串中的元音字母-简单](https://leetcode.cn/problems/reverse-vowels-of-a-string/description/)

```
给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。

元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。

示例 1：

输入：s = "hello"
输出："holle"

示例 2：

输入：s = "leetcode"
输出："leotcede"

提示：

1 <= s.length <= 3 * 105
s 由 可打印的 ASCII 字符组成
```

## 方法 1: 双指针

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
  const res = [];
  const n = s.length;
  if (n <= 1) {
    return s;
  }
  let left = 0;
  let right = n - 1;

  const map = {
    a: 1,
    e: 1,
    i: 1,
    o: 1,
    u: 1,
    A: 1,
    E: 1,
    I: 1,
    O: 1,
    U: 1,
  };

  while (left <= right) {
    while (left < n && !map[s[left]]) {
      res[left] = s[left];
      left++;
    }
    while (right > 0 && !map[s[right]]) {
      res[right] = s[right];
      right--;
    }

    if (left <= right) {
      // 交换位置
      let temp = s[left];
      res[left] = s[right];
      res[right] = temp;
      left++;
      right--;
    }
  }

  return res.join("");
};
```

## 方法 2: 双指针

```js
var reverseVowels = function(s) {
  const n = s.length;
  const arr = Array.from(s);
  let i = 0,
    j = n - 1;
  while (i < j) {
    while (i < n && !isVowel(arr[i])) {
      ++i;
    }
    while (j > 0 && !isVowel(s[j])) {
      --j;
    }
    if (i < j) {
      swap(arr, i, j);
      ++i;
      --j;
    }
  }
  return arr.join("");
};

const isVowel = (ch) => {
  return "aeiouAEIOU".indexOf(ch) >= 0;
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// 链接：https://leetcode.cn/problems/reverse-vowels-of-a-string/solutions/944385/fan-zhuan-zi-fu-chuan-zhong-de-yuan-yin-2bmos/
```
