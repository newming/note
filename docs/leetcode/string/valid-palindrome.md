# 验证回文串

[验证回文串-简单](https://leetcode-cn.com/problems/valid-palindrome/)

```
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:
输入: "A man, a plan, a canal: Panama"
输出: true

示例 2:
输入: "race a car"
输出: false
```

## 方法1: 先将非字母和数字字符过滤在进行匹配

```js
var isPalindrome = function (s) {
  if (!s) {
    return true
  }
  let reg = /\d|\w/
  s = s.split('').filter(i => reg.test(i)).join('')
  let n = s.length
  for (let i = 0; i < Math.floor(n / 2); i++) {
    if (s[i].toLowerCase() !== s[n - 1 - i].toLowerCase()) {
      return false
    }
  }
  return true
}
```

## 方法2: 双指针 指针跳过非字母数字项

```js
var isPalindrome = function (s) {
  if (!s) {
    return true
  }
  let l = 0
  let r = s.length - 1
  let reg = /\d|\w/
  while (l < r) {
    if (!reg.test(s[l])) {
      l++
      continue
    }
    if (!reg.test(s[r])) {
      r--
      continue
    }
    if (s[l].toLowerCase() !== s[r].toLowerCase()) {
      return false
    } else {
      l++;
      r--
    }
  }
  return true
}
```

## 方法3: 方法2双指针优化 先处理一下字符串

```js
var isPalindrome = function (s) {
  s = s.replace(/[^0-9a-zA-Z]/g,'').toLowerCase()
  let n = s.length
  let left = 0
  let right = n - 1
  while(left < right){
    if(s[left] !== s[right]){
      return false
    }
    left++
    right--
  }
  return true
}
```

## 方法4: 字符串转小写去多余字符双端比较

```js
var isPalindrome = function (s) {
  if (!s) {
    return true
  }
  let reg = /\d|\w/
  s = s.split('').filter(i => reg.test(i)).map(i => i.toLowerCase()).join('')

  for(let i = 0, j = s.length - 1; i < j; i++, j--) {
    if(s[i] !== s[j]) {
      return false
    }
  }

  return true
}
```

## 方法5: 调用现成函数

```js
var isPalindrome = function (s) {
  let strArr = s.replace(/[^0-9a-zA-Z]/g,"").toLowerCase().split('')
  return strArr.join('') === strArr.reverse().join('')
}

console.log(isPalindrome('A man, a plan, a canal: Panama'))
console.log(isPalindrome('race a car'))
```
