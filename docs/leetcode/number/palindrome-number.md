# 判断一个数字是否是回文数

[判断一个数字是否是回文数](https://leetcode-cn.com/problems/palindrome-number/)

```
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:
输入: 121
输出: true

示例 2:
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

示例 3:

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
进阶:

你能不将整数转为字符串来解决这个问题吗？

注意：题目要求不将数字转为字符串，另外反转数字，需要考虑是否溢出
```


## 方法一: 转字符串

```js
function isPalindrome (number) {
  if (number < 0) {
    return false
  }
  // 反转字符串需要转数组
  return number.toString() === number.toString().split('').reverse().join('')
}
```

## 方法二: 最佳方案，反转数字位数的一半进行比较

[最佳方案，反转数字位数的一半进行比较](https://leetcode-cn.com/problems/palindrome-number/solution/hui-wen-shu-by-leetcode/)

```js
function IsPalindrome (x) {
  // 特殊情况：
  // 如上所述，当 x < 0 时，x 不是回文数。
  // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
  // 则其第一位数字也应该是 0
  // 只有 0 满足这一属性
  if(x < 0 || (x % 10 === 0 && x !== 0)) {
    return false
  }

  let revertedNumber = 0
  while(x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + x % 10
    x = Math.floor(x / 10)
  }

  // 当数字长度为奇数时，我们可以通过 revertedNumber/10 去除处于中位的数字。
  // 例如，当输入为 12321 时，在 while 循环的末尾我们可以得到 x = 12，revertedNumber = 123，
  // 由于处于中位的数字不影响回文（它总是与自己相等），所以我们可以简单地将其去除。
  return x === revertedNumber || x === Math.floor(revertedNumber / 10)
}
```

## 方法三: 左边，右边依次取一个对比

[左边，右边依次取一个对比](https://leetcode-cn.com/problems/palindrome-number/solution/dong-hua-hui-wen-shu-de-san-chong-jie-fa-fa-jie-ch/)

```js
function isPalindrome2 (x) {
  //边界判断
  if (x < 0) {
    return false
  }
  let div = 1 // 获取最高位数字需要除以的数字，比如 x=23，div为10，div可以理解为 x的length * 10(注意，数字没有length)

  while (x / div >= 10) {
    div *= 10
  }
  while (x > 0) {
    let left = Math.floor(x / div)
    let right = x % 10
    if (left !== right) return false
    x = Math.floor((x % div) / 10)
    div = Math.floor(div / 100)
  }
  return true
}

console.log(isPalindrome(11))
console.log(IsPalindrome(121))
console.log(isPalindrome2(121))
```
