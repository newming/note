# 有效的字母异位词

[有效的字母异位词-简单](https://leetcode-cn.com/problems/valid-anagram/)

```
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

示例 1:
输入: s = "anagram", t = "nagaram"
输出: true

示例 2:
输入: s = "rat", t = "car"
输出: false

说明:
你可以假设字符串只包含小写字母。

进阶:
如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
```

## 方法1: 查找删除

```js
var isAnagram = function (s, t) {
  let n = s.length
  if (n !== t.length) {
    return false
  }
  for (let i = 0; i < n; i++) {
    t = t.replace(s[i], '') // 只替换一个字符
    if (t.length !== n - 1 - i) {
      return false
    }
  }
  return true
}
```

## 方法2: 排序比较

```js
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false
  }
  let str1 = s.split('')
  let str2 = t.split('')
  str1.sort()
  str2.sort()
  return str1.join('') === str2.join('')
}
```

## 方法3: hash表构建计数器

```js
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false
  }
  let counter = new Array(26).fill(0)
  let startCharCode = 'a'.charCodeAt(0)
  for (let i = 0; i < s.length; i++) {
    counter[s[i].charCodeAt(0) - startCharCode]++
    counter[t[i].charCodeAt(0) - startCharCode]--
  }
  for (let i = 0; i < counter.length; i++) {
    if (counter[i] !== 0) {
      return false
    }
  }
  return true
}
```

## 方法4: 优化方法3

先计算完毕s，用t去减少计数器中的每个字母计数，在任何时候小于0，返回false

```js
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false
  }
  let counter = new Array(26).fill(0)
  let startCharCode = 'a'.charCodeAt(0)
  for (let i = 0; i < s.length; i++) {
    counter[s[i].charCodeAt(0) - startCharCode]++
  }
  for (let i = 0; i < t.length; i++) {
    counter[t[i].charCodeAt(0) - startCharCode]--
    if (counter[t[i].charCodeAt(0) - startCharCode] < 0) {
      return false
    }
  }
  return true
}

console.log(isAnagram("anagram", "nagaram"))
console.log(isAnagram("rat", "car"))
```
