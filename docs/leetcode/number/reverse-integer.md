# 整数反转

[整数反转](https://leetcode-cn.com/problems/reverse-integer/)

```
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

输入: 123
输出: 321

示例 2:

输入: -123
输出: -321

示例 3:

输入: 120
输出: 21

注意:
假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
```

## 方法1: 转字符串，反转，然后转数字

```js
/**
 * @param {number} x
 * @return {number}
 * @description 方法一：转字符串，反转，然后转数字
 */
var reverse = function (x) {
  const res = (Math.abs(x) + '').split('').reverse().join('') * (x > 0 ? 1 : -1);
  return res < -Math.pow(2, 31) || res > Math.pow(2, 31) - 1 ? 0 : res;
};
```

## 方法2: 利用余数进行求解

```js
/**
 * 方法二：利用余数进行求解
 * 复杂度：时间复杂度 O(logn) 空间复杂度 o(1)
 * 算法步骤：
 * 1. 执行 x%10 可以得到 x 的最后一位数字，这也是我们所得结果的第一位数字
 * 2. 执行 x = x/10，由于 x 自身是 int 类型，运算完成之后，实际上等同于将 x 的最后一位舍弃
 * 3. 执行 result = result * 10 + pop 就可以将每一位的数字进行反转
 * 边界考虑：由于需要考虑超出 32 位时溢出的情况，那么，result = result * 10 + pop 在什么情况下溢出呢？result 为正值的情况下，如果 result 大于 Integer.MAX_VALUE / 10，那么就一定会溢出，如果 result 等于 Integer.MAX_VALUE / 10，那么，pop 如果大于 Integer.MAX_VALUE % 10 也会产生溢出的情况。相反的，如果 result 为负值，也是一样的原理
 * 这里比较惨的是 js 中没有区分小数和正数类型，但是在计算过程中其实需要的是整数，所以需要不断取整
 */
var reverse = function (x) {
  let rev = 0;
  // 用来比较是否越界，注意取整过程中正数和负数的区别
  var MAX_VALUE_COMPARE = Math.floor((Math.pow(2, 31) - 1) / 10);
  var MIN_VALUE_COMPARE = Math.ceil((-Math.pow(2, 31)) / 10);
  var IntegerMethod = x > 0 ? Math.floor : Math.ceil

  while (x !== 0) {
    let pop = x % 10; // 这里取余的时候负数的还是负数
    x = IntegerMethod(x / 10);
    console.log(x)
    if (rev > MAX_VALUE_COMPARE || (rev === MAX_VALUE_COMPARE && pop > 7)) return 0; // 7 和 -8 实际是根据 Math.pow(2, 31) 的最后一位得出得 MAX_VALUE_COMPARE % 10
    if (rev < MIN_VALUE_COMPARE || (rev == MIN_VALUE_COMPARE && pop < -8)) return 0;
    rev = rev * 10 + pop;
  }
  return rev;
}
console.log(reverse(-102))
```
