# 验证回文字符串II

[验证回文字符串II-简单](https://leetcode-cn.com/problems/valid-palindrome-ii/)

```
给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

示例 1:
输入: "aba"
输出: True

示例 2:
输入: "abca"
输出: True
解释: 你可以删除c字符

注意:
1. 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000
```

## 方法1: 暴力法

依次删除一个字符，判断剩余字符串是否符合

```js
// 超出时间限制
var validPalindrome = function(s) {
  let n = s.length
  // 这里只考虑了删除一个字符的情况，没有考虑完整字符串的情况，因为完整字符串如果是回文字符串，那么删除一位，仍然能够保证回文 例如: abccba，删除中间的一个c
  for (let i = 0; i < n; i++) {
    let partStr = s.substring(0, i) + s.substring(i + 1) // 删除一个字符
    let strArr = partStr.split('')
    if (strArr.join('') === strArr.reverse().join('')) {
      // console.log(i)
      return true
    }
  }
  return false
}
```

## 方法2: 自己实现的一版 贪心算法||双指针

```js
var validPalindrome = function(s) {
  let n = s.length
  var palindrome = function (left, right, jumped) {
    if (left >= right) {
      return true
    }
    if (s[left] === s[right]) {
      left++
      right--
      return palindrome(left, right, jumped)
    } else {
      if (jumped) {
        return false
      } else {
        // 注意这里不能 ++left 会影响后一个 palindrome 的 left 值
        return palindrome(left + 1, right, true) || palindrome(left, right - 1, true)
      }
    }
  }
  return palindrome(0, n - 1, false)
};
```

## 方法3: 贪心算法||双指针

算是方法2的一个简单优化，通过 continue 跳过了很多递归调用

```js
var validPalindrome = function (s) {
  let n = s.length
  for(let i = 0; i < n; ++i) {
    if(s[i] === s[n - 1 - i]) continue
    return helper(s, i + 1, n - 1 - i) || helper(s, i, n - 1 - i - 1)
  }
  return true
}
function helper (s, start, end) {
  let l = end - start + 1
  for(let i = 0; i < Math.floor(l / 2); ++i) {
    if(s[start + i] !== s[end - i]) {
      return false
    }
  }
  return true
}
```

## 方法4: 算是双指针

https://leetcode-cn.com/problems/valid-palindrome-ii/solution/yan-zheng-hui-wen-zi-fu-chuan-ii-by-leetcode/156983

```js
var validPalindrome = function (s) {
  let chars = s.split('')
  let left = 0, right = chars.length - 1, deleteIndex = -1
  while (left < right){
    if(chars[left] !== chars[right]){
      if(deleteIndex === -1){
        deleteIndex = left
        left++;
      } else if (deleteIndex === chars.length) {
        return false
      } else {
        left = deleteIndex
        right= chars.length - left - 2
        deleteIndex = chars.length
      }
    }else{
      left++
      right--
    }
  }
  return true
}


console.log(validPalindrome('aba'))
console.log(validPalindrome('abca'))
console.log(validPalindrome('abcaa'))
console.log(validPalindrome('cbbcc'))
```
