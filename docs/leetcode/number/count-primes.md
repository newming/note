# 计数质数

[计数质数](https://leetcode-cn.com/problems/count-primes)

```
统计所有小于非负整数 n 的质数的数量。

示例 1：
输入：n = 10
输出：4
解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。

示例 2：
输入：n = 0
输出：0

示例 3：
输入：n = 1
输出：0

提示：
0 <= n <= 5 * 10^6
```

## 方案1: 暴力法|枚举

时间复杂度: O(\sqrt{n})

```js
// https://leetcode-cn.com/problems/count-primes/solution/ji-shu-zhi-shu-by-leetcode-solution/
const isPrime = (x) => {
  // 注意这里 i  i <=x
  for (let i = 2; i * i <= x; ++i) {
    if (x % i == 0) {
      return false;
    }
  }
  return true;
}

var countPrimes = function(n) {
  let ans = 0;
  for (let i = 2; i < n; ++i) {
    ans += isPrime(i);
  }
  return ans;
};
```

## 方法2: 埃氏筛

时间复杂度: O(nloglogn)

```js
// https://leetcode-cn.com/problems/count-primes/solution/ji-shu-zhi-shu-by-leetcode-solution/
var countPrimes = function(n) {
  const isPrime = new Array(n).fill(1); // 1 认为是质数
  let ans = 0;
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      ans += 1;
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  return ans;
};
```

## 方法3: 线性筛

优化方法2

时间复杂度: O(n)

```js
// https://leetcode-cn.com/problems/count-primes/solution/ji-shu-zhi-shu-by-leetcode-solution/
var countPrimes = function(n) {
  const isPrime = new Array(n).fill(1);
  const primes = [];
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      primes.push(i);
    }
    for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
      isPrime[i * primes[j]] = 0;
      if (i % primes[j] === 0) {
        break;
      }
    }
  }
  return primes.length;
};
```
