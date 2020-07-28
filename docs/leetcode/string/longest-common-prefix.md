# 最长公共前缀

[最长公共前缀-简单](https://leetcode-cn.com/problems/longest-common-prefix/)

```
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:
输入: ["flower","flow","flight"]
输出: "fl"

示例 2:
输入: ["dog","racecar","car"]
输出: ""

解释: 输入不存在公共前缀。
说明:

所有输入只包含小写字母 a-z
```

[参考文档](https://leetcode-cn.com/problems/longest-common-prefix/solution/zui-chang-gong-gong-qian-zhui-by-leetcode/)

## 方法1

```js
function longestCommonPrefix(strs) {
  if (strs.length == 0) return "";
  prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1)
      if (!prefix) return ""
    }
  }
  return prefix
}
```

## 方法2

```js
function longestCommonPrefix1(strs) {
  if (strs.length == 0) return "";
  for (let i = 0; i < strs[0].length; i++) {
    let c = strs[0].charAt(i)
    for (let j = 1; j < strs.length; j++) {
      // 这里注意 i 是索引，需小于length
      if (i === strs[j].length || strs[j].charAt(i) !== c) {
        return strs[0].substring(0, i)
      }
    }
  }
  return strs[0]
}
```

## 方法3 分治法

```js
function longestCommonPrefix2(strs) {
  if (strs == null || strs.length === 0) {
    return ""
  }

  return longestCommonPrefix(strs, 0, strs.length - 1)

  function longestCommonPrefix (strs, l, r) {
    if (l === r) {
      return strs[l]
    } else {
      let mid = Math.floor((l + r) / 2)
      let lcpLeft = longestCommonPrefix(strs, l , mid)
      let lcpRight = longestCommonPrefix(strs, mid + 1, r)
      return commonPrefix(lcpLeft, lcpRight)
    }
  }

  function commonPrefix (left, right) {
    let min = Math.min(left.length, right.length)
    for (let i = 0; i < min; i++) {
      if (left.charAt(i) !== right.charAt(i)) {
        return left.substring(0, i)
      }
    }
    return left.substring(0, min)
  }
}
```

## 方法4 二分查找法

```js
function longestCommonPrefix3(strs) {
  if (strs == null || strs.length == 0) {
    return ""
  }
  let minLen = Number.MAX_SAFE_INTEGER
  strs.forEach(str => minLen = Math.min(str.length, minLen))

  let low = 1
  let high = minLen
  while (low <= high) {
    let middle = Math.floor((low + high) / 2)
    if (isCommonPrefix(strs, middle)) {
      low = middle + 1
    } else {
      high = middle - 1
    }
  }
  return strs[0].substring(0, Math.floor((low + high) / 2))
}

function isCommonPrefix (strs, len){
  let str1 = strs[0].substring(0, len)
  for (let i = 1; i < strs.length; i++) {
    if (!strs[i].startsWith(str1)) {
      return false
    }
  }
  return true
}
```

## 方法5 字典树

暂未实现

```js
console.log(longestCommonPrefix(["flower", "flow", "flight"]))
console.log(longestCommonPrefix1(["flower", "flow", "flight"]))
console.log(longestCommonPrefix2(["flower", "flow", "flight"]))
console.log(longestCommonPrefix3(["flower", "flow", "flight"]))
```
