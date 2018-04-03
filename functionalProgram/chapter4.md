# 闭包与高阶函数

闭包是一个内部函数，它是在另一个函数内部的函数。

## 4.2 真实的高阶函数

**tap 函数**

```js
const tap = value =>
  (fn) => (
    typeof fn === 'function' && fn(value),
    console.log(value)
  )

// tap 函数第一次执行返回一个闭包函数，在这个必包函数内部保存了第一次传入的参数

// 调用
tap('fun')(it => console.log('value is ', it))
// value is fun
// fun

// 使用
forEach([1,2,3], a =>
  tap(a)(() => console.log(a))
)
```

**unary 函数**

首先来看一下数组 map 方法的使用：

```js
[1, 2, 3].map((a, i, ary) => a * a)
// [1, 4, 9]
```

可以看到 map 会传入三个参数给函数。假设现在我们要实现把字符串数组转为整数数组，我们有一个内置的函数 parseInt，它接受两个参数 parse 和 radix，如果可能，它将把传入的 parse 转为数字。

```js
['1', '2', '3'].map(parseInt)
// [1, NaN, NaN]
```

从上面的结果看到，并不是我们期望的，原因是因为 parseInt 拿到了 map 传入的第二个参数。需要把 parseInt 函数转换为另一个只接受一个参数的函数。下面来实现 unary 函数。它的任务是接受一个给定的多参数函数，并把它转化为一个直接受一个参数的函数：

```js
const unary = fn => fn.length === 1 ? fn : (arg) => fn(arg)
// 检测传入的 fn 是否有一个长度为 1 的参数列表(fn.length)，如果又就什么都不做，如果没有，就返回一个新的函数，它只接受一个参数 arg，并用该参数调用 fn

// 利用 unary 实现上边的问题：
['1', '2', '3'].map(unary(parseInt))
// [1, 2, 3]
// 简单分析，在 unary 函数内，fn 即为 parseInt，它拿到了三个参数，所以 unary(parseInt) 执行后返回的结果为 (arg) => fn(arg)，然后被 map 调用
```