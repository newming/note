# 柯里化与偏应用

## 柯里化

柯里化是把一个多参数函数转换为一个嵌套的一元函数的过程。

简单演示柯里化：

```js
// 非柯里化
const add = (x, y) => x + y

// 将上边的函数柯里化
const addCurried = x => y => x + y
```

### curry 函数

curry 函数实现(只能处理两个参数)：

```js
const curry = binaryFn => {
  return function (firstArg) {
    return function (secondArg) {
      return binaryFn(firstArg, secondAry)
    }
  }
}
```

使用 curry 函数将上边 add 函数转换为一个柯里化版本：

```js
let autoCurriedAdd = curry(add)
autoCurriedAdd(2)(6) // 8
```

完善 curry 函数：

```js
let curry = fn => {
  if (typeof fn !== 'function') {
    throw Error('No function provided')
  }

  return function curriedFn (...args) {
    return fn.apply(null, args)
  }
}
```

使用完善的 curry 函数：

```js
const multiply = (x, y, z) => x * y * z

curry(multiply)(1, 2, 3) // 2
curry(multiply)(1, 2, 0) // 0
```

完善后的 curry 函数不符合定义将多参数函数转换为嵌套的一元函数，继续完善 curry 函数：

```js
let curry = fn => {
  if (typeof fn !== 'function') {
    throw Error('No function provided')
  }

  return function curriedFn (...args) {
    if (args.length < fn.length) {
      return function () {
        return curriedFn.apply(null, args.concat([].slice.call(arguments))) // 注意这里第二个参数，concat 将传入的参数与原有的参数拼接为新的数组
      }
    }
    return fn.apply(null, args)
  }
}

// 使用 es6 改写 curry 方法
const curry = func => {
  const g = (...allArgs) => allArgs.length >= func.length ?
    func(...allArgs)
    : (...args) => g(...allArgs, ...args)

  return g
}
```

使用完成后的 curry:

```js
let multiply = (x, y, z) => x * y * z

curry(multiply)(3)(2)(1)
```

### 利用 curry 处理日志问题

```js
const loggerHelper = (mode, initialMessage, errorMessage, lineNo) => {
  if (mode === 'DEBUG') {
    console.debug(initialMessage, errorMessage + 'at line:' + lineNo)
  } else if (mode === 'ERROR') {
    console.error(initialMessage, errorMessage + 'at line:' + lineNo)
  } else if (mode === 'WARN') {
    console.warn(initialMessage, errorMessage + 'at line:' + lineNo)
  } else {
    throw 'Wrong mode'
  }
}

// 正常使用 loggerHelper:
loggerHelper('ERROR', 'Error At Stats.js', 'Invalid argument passed', 23)

// 下面使用 curry 解决重复使用前两个参数的问题：
let errorLogger = curry(loggerHelper)('Error')('Error At Atats.js')
let debugLogger = curry(loggerHelper)('DEBUG')('Debug At Atats.js')
let warnLogger = curry(loggerHelper)('WARN')('Warn At Atats.js')

// 用于错误：
errorLogger('Error Message', 21)
// 用于调试：
debugLogger('Debug Message', 21)
// 用于警告：
warnLogger('Warn Message', 21)
```

## 柯里化实战

### 在数组内容中查找数字

```js
let match = curry(function (expr, str) {
  return str.match(expr)
})

let hasNumber = match(/[0-9]+/)
console.log(hasNumber('4563fdff'))
```

### 柯里化的 filter 函数

```js
let filterAry = curry(function (f, ary) {
  return ary.filter(f)
})
```

组合使用 hasNumber 以及 filterAry

```js
let findNumbersInArray = filter(hasNumber)

findNumbersInArray(['js', 'number3'])
```

### 求数组的平方

```js
let map = curry(function (f, ary) {
  return ary.map(f)
})

let squareAll = map((x) => x * x)

squareAll([1, 2, 3])
```

## 数据流

### 偏函数

允许开发者部分地应用函数参数。代码实现：

```js
const partial = function (fn, ...partialArgs) {
  let args = partialArgs
  return function (...fullArguments) {
    let arg = 0
    for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = fullArguments[arg++] // 注意这里的 arg++ 先返回值了，然后相加
      }
    }
    return fn.apply(null, args)
  }
}

// 快速使用 partial 实现延迟执行
let delayTenMs = partial(setTimeout, undefined, 10)
delayTenMs(() => console.log('10 ms later logger'))
```

美化 JSON 输出([JSON.stringify 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify))：

```js
let obj = {name: 'newming', age: 12}
JSON.stringify(obj, null, 4)
```

这里我们使用 JSON.stringify 函数调用的最后两个参数总是相同的，'null, 2'，可以使用 partial 移除样板代码：

```js
let prettyPrintJson = partial(JSON.stringify, undefined, null, 2) // 这里 null, 2 已经被固定应用，只需再次调用传入 undefined 的值即可

prettyPrintJson({name: 'newming', age: 12})
```

这里的偏函数实现中有个 bug，例如再次调用 delayTenMs 传入不同的参数，打印的结果仍为第一次执行 delayTenMs 的结果，原因是因为在修改 args 中 undefined 的值，利用的是数组，而数组传递的是引用。