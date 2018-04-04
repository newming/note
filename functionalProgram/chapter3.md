# 高阶函数

> 定义：高阶函数是接受函数作为参数并且/或者返回函数作为输出的函数

```js
const crazy = () => String

crazy()('123') // 123
```

## 抽象和高阶函数

**遍历数组：**

```js
// 定义
const forEach = (array, fn) => {
  for (let i = 0; i < array.length; i++) {
    fn(array[i])
  }
}

// 使用
forEach([1, 2, 3], data => {
  console.log(data) // 1 2 3
})
```

**遍历对象：**

```js
// 定义
const forEachObject = (obj, fn) => {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      fn(property, obj[property])
    }
  }
})

// 使用
var object = {a: 1, b: 2}
forEachObject(obj, (key, value) => {
  console.log(key + ':' + value)
})
// a:1
// b:2
```

**unless 函数定义**

unless 函数接受一个断言，值为true/false，如果 predicate 为 false，则调用 fn:

```js
const unless = (predicate, fn) => {
  if (!predicate) {
    fn()
  }
}
```

利用 unless 函数实现查找一个列表中的偶数功能：

```js
forEach([1, 2, 3, 4], number => {
  unless(number % 2, () => {
    console.log(number, ' is even')
  })
})

// 2 is even
// 4 is even
```

上面已经实现了从给定数组中获取偶数。如果要从0-100中获取数组呢？这时就不可以使用 forEach([1, 2, 3, ...100], fn) 来实现了。下面来实现 times 函数，实现根据用户传入的数字，调用传入的函数对应的次数。

```js
const times = (time, fn) => {
  for (let i = 0; i < time; i++) {
    fn(i)
  }
}
```

times 与 forEach 类似，只不过操作的是 Number。

下面来实现从 0 到给定数字之间的偶数：

```js
times(100, n => {
  unless(n % 2, () => {
    console.log(n, ' is even')
  })
})
```

## 真实的高阶函数

**every 函数**

每一个都符合条件就返回 true

```js
const every = (arr, fn) => {
  let result = true
  for (const value of arr) {
    result = result && fn(value) // 这是书上的写法，感觉有点浪费
    // if (!fn(value)) {
    //   result = false
    //   break
    // }
  }
  return result
}
```

**some 函数**

有一个符合条件就返回 true

```js
const some = (arr, fn) => {
  let result = false
  for (const value of arr) {
    result = result || fn(value)
  }
  return result
}

// 使用，检测数组中是否有个 NaN
some([4, 3, NaN], isNaN)
```

**sortBy 函数**

首先要知道 Array.prototype.sort 的工作原理 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)：

arr.sort([compareFunction])

compareFunction 是可选的。如果没传 compareFunction，元素将被转换为字符串并按 Unicode 编码点顺序排序。compareFunction 的实现应该是下面的逻辑：

```js
function compareFunction (a, b) {
  if (a < b) {
    // 根据某种排序标准
    return -1
  }
  if (a > b) {
    return 1
  }
  // a = b
  return 0
}
```

下面根据 compareFunction 标准实现 sortBy 函数

```js
const sortBy  = (property) => {
  return (a, b) => {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
    return result
  }
}

// 使用
let arr = [
  {firstName: 'aaa', lastName: 'bbbb'},
  {firstName: 'dfd', lastName: 'gf'},
  {firstName: 'gdga', lastName: 'afdf'},
  {firstName: 'wed', lastName: 'sfd'}
]

arr.sort(sortBy('firstName'))
```

<!-- done -->