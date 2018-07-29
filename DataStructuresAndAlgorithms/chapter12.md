# 算法复杂度

## 大 O 表示法

用于描述算法的性能和复杂程度

| 符号 | 名称 |
| ---- | ---- |
| O(1) | 常数的 |
| O(log(n)) | 对数的 |
| O((log(n))c) | 对数多项式的 |
| O(n) | 线性的 |
| O(n<sup>2</sup>) | 二次的 |
| O(n<sup>c</sup>) | 多项式的 |
| O(c<sup>n</sup>) | 指数的 |

```js
// O(1)
function increment (num) {
  return ++num
}

// O(n)
function search (array, item) {
  for (let i = 0; i < array.length; i++) {
    if (item === array[i])
    return i
  }
  return -1
}

// O(n^2) 冒泡排序
```

## NP 完全理论概述

一般来说，如果一个算法的复杂度为 O(n^k)，其中 k 为常数，我们就认为这个算法是高效的，这就是多项式算法。

对于给定的问题，如果存在多项式算法，则计为 P(polynomial，多项式)

还有一类 NP(nondeterministic polynomial，非确定多项式)算法。如果一个问题可以在多项式时间内验证解是否正确，则计为 NP。

如果一个问题存在多项式算法，自然可以在多项式时间内验证其解。因此所有的 P 都是 NP。然而 P=NP 是否成立，仍然不得而知。

## 算法学习资源

- [UVa Online Judge](http://uva.onlinejudge.org)
- [Sphere Online Judge](http://www.spoj.com)
- [Coder Byte](http://coderbyte.com)
- [Peoject Euler](http://projecteuler.net)
- [Hacker Rank](http://www.hackerrank.com)
- [Code Chef](http://www.codechef.com)
- [Top Coder](http://www.topcoder.com)