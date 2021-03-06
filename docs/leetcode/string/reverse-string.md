# 反转字符串

[反转字符串-简单](https://leetcode-cn.com/problems/reverse-string/)

```
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

示例 1：
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]

示例 2：
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

## 方法1: 交换位置

```js
var reverseString = function(s) {
  let n = s.length
  for (let i = 0; i < Math.floor(n / 2); i++) {
    let temp = s[i]
    s[i] = s[n - 1 - i]
    s[n - 1 - i] = temp
  }
  return s
}
```

## 方法2: reverse方法

```js
var reverseString = function (s) {
  return s.reverse()
}
```

## 方法3: 递归

```js
// https://leetcode-cn.com/problems/reverse-string/solution/fan-zhuan-zi-fu-chuan-by-leetcode/
// 思想同方法1
var helper = function (s, left, right) {
  if (left >= right) return
  let tmp = s[left]
  s[left++] = s[right]
  s[right--] = tmp
  helper(s, left, right)
}

var reverseString = function (s) {
  helper(s, 0, s.length - 1)
  return s
}
```

## 方法4: 同上 使用了 while 循环

```js
var reverseString = function (s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    let tmp = s[left];
    s[left++] = s[right];
    s[right--] = tmp;
  }
  return s
}
```

## 方法5:

```js
// 1.先倒着循环一圈，依次push，这样出来的结果一个镜像过的数组
// 2.然后从零删除掉之前的长度，剩下就是要的数组了
var reverseString = function(s) {
  let n = s.length
  for(let i = n - 1; i >= 0; i--){
    s.push(s[i])
  }
  s.splice(0, n)
  return s
};


let str = ["H","a","n","n","a","h"]
console.log(reverseString(str))
```
