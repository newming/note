# 字符串中的第一个唯一字符

[字符串中的第一个唯一字符-简单](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

```
给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

案例:
s = "leetcode"
返回 0.

s = "loveleetcode",
返回 2.
```

## 方法1: 根据字符串从首部和尾部出现位置判断是否重复

https://leetcode-cn.com/problems/first-unique-character-in-a-string/solution/zi-fu-chuan-zhong-de-di-yi-ge-wei-yi-zi-fu-by-pyy-/

```js
var firstUniqueChar = function (s) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i
    }
  }
  return -1
}
```

## 方法2: hashMap

```js
var firstUniqueChar = function (s) {
  let count = {}
  let n = s.length
  for (let i = 0; i < n; i++) {
    if (count[s[i]]) {
      count[s[i]]++
    } else {
      count[s[i]] = 1
    }
  }
  for (let i = 0; i < n; i++) {
    if (count[s[i]] === 1) {
      return i
    }
  }
  return -1
}
```

## 方法3: 优化方法2 根据字符串长度是否大于 26 个字母，进行不同处理

```js
// 同时在存储 count 上，使用数组了
var firstUniqueChar = function (s) {
  let n = s.length
  let startCharCode = 'a'.charCodeAt(0)
  if (n < 26) {
    let charNum = new Array(26).fill(0)
    for (let i = 0; i < n; i++) {
      charNum[s[i].charCodeAt(0) - startCharCode]++
    }
    for (let i = 0; i < n; i++) {
      if (charNum[s[i].charCodeAt(0) - startCharCode] === 1) {
        return i
      }
    }
    return -1
  }
  // 当字符串大于 26 位时，只需要遍历26个字母
  let index = -1
  for (let i = 0; i < 26; i++) {
    let ch = String.fromCharCode(startCharCode + i)
    let beginIndex = s.indexOf(ch)
    if (beginIndex !== -1 && beginIndex === s.lastIndexOf(ch)) {
      index = (index === -1 || index > beginIndex) ? beginIndex : index
    }
  }
  return index
}

console.log(firstUniqueChar("yekbsxznylrwamcaugrqrurvpqybkpfzwbqiysrdnrsnbftvrnszfjbkbmrctjizkjqoxqzddyfnavnhqeblfmzqgsjflghaulbadwqsyuetdelujphmlgtmkoaoijypvcajctbaumeromgejtewbwqptotrorephegyobbstvywljboeihdliknluqdpgampjyjpinxhhqexoctysfdciqjbzilnodzoihihusxluqoayenluziobxiodrfdkinkzzozmxfezfvllpdvogqqtquwcsijwachefspywdgsohqtlquhnoecccgbkrzqcprzmwvygqwddnehhi"))
console.log(firstUniqueChar('leetcode'))
console.log(firstUniqueChar('loveleetcode'))
```
