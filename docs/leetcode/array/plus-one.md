# 加一

[加一-简单](https://leetcode-cn.com/problems/plus-one/)

```
给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。

示例 2:
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```

## 方法1: 数组转数字+1

```js
// 数组长度过长会溢出
var plusOne = function(digits) {
  return (Number(digits.join('')) + 1).toString().split('').map(num => +num)
}
```

## 方法2: 从数组最后以为分析，+1，碰到9，进行进位

```js
// https://leetcode-cn.com/problems/plus-one/solution/java-shu-xue-jie-ti-by-yhhzw/
var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    digits[i]++;
    digits[i] = digits[i] % 10
    if (digits[i] != 0) {
      return digits
    }
  }
  // 如果走到这里说明碰到了 99 || 999 这类的，将数组长度 +1 补0
  digits.unshift(1)
  return digits
}

console.log(plusOne([1, 2, 3]))
```
