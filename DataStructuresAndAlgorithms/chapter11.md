# 算法模式

## 斐波那契数列

- 1 和 2 的斐波那契数是 1
- n(n>=2)的斐波那契数是 (n-1) 的斐波那契数加上 (n-2) 的斐波那契数

### 通过递归方式实现

```js
function fibonacci (num) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2)
}
```

### 非递归方式

```js
function fibonacciIterative(n) {
  let fibNMinus2 = 0; // 起点 0
  let fibNMinus1 = 1; // 起点 1
  let fibN = n;
  for (let i = 2; i <= n; i++) { // n >= 2
    fibN = fibNMinus1 + fibNMinus2; // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}
```

### 记忆型斐波那契数列

```js
function fibonacciMemoization(n) {
  const memo = [0, 1];
  const fibonacci = (n) => {
    if (memo[n] != null) return memo[n];
    return memo[n] = fibonacci(n - 1) + fibonacci(n - 2); // 注意这里反回的是等号右边的值
  };
  return fibonacci(n);
}
```

## 阶乘

```js
function factorialIterative(number) {
  if (number < 0) {
    return undefined;
  }
  let total = 1;
  for (let n = number; n > 1; n--) {
    total  = total * n;
  }
  return total;
}

function factorial(n) {
  // console.trace();
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
```