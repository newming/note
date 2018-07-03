# 组合与管道

两个理念：

- 每个程序只做好一件事情，为了完成一项新的任务，重新构建要好于在复杂的旧程序中添加新"属性"
- 每个程序的输出应该是另一个尚未可知的程序的输入

## 回顾 map 和 filter

后边会用 compose 来处理这个问题

```js
// 从 apressBooks 数组中获取含有 title 和 author 字段且评级高于 4.5 的对象
let apressBooks = [
  {
    id: 111,
    title: 'C #',
    author: 'newming',
    rating: [4.7],
    reviews: [{good: 4, excellent: 12}]
  },
  {
    id: 222,
    title: 'efficient learning machines',
    author: 'peter',
    rating: [4.5],
    reviews: []
  },
  {
    id: 333,
    title: 'pro angularjs',
    author: 'lack',
    rating: [4.0],
    reviews: []
  },
  {
    id: 444,
    title: 'pro asp.net',
    author: 'jack',
    rating: [4.2],
    reviews: [{good: 14, excellent: 12}]
  }
]

// 使用 map 配合 filter 解决问题
map(filter(apressBooks, book => book.rating[0] > 4.5), book => {
  return {title: book.title, author: book.author}
})
```

### compose 函数实现

```js
const compose = (a, b) => (c) => a(b(c))
```

compose 函数接受两个函数 a, b 作为参数并且返回一个接受一个参数 c 的函数。当用 c 调用返回的函数时，它将用输入 c 调用函数 b，b的输出将作为 a 的输入。

### 应用 compose 函数

1. 对给定的数字四舍五入求值。给定的数字为浮点型。

```js
// 传统做法
let data = parseFloat('3.65')
let number = Math.round(data)

// 利用 compose 函数解决问题
let number = compose(Math.round, parseFloat) // 返回一个新的函数，等价于 number = c => Math.round(parseFloat(c))
number('3.68') // 4
```

2. 计算一个字符串中单词的数量

```js
let splitIntoSpaces = str => str.split(' ')
let count = array => array.length

// 调用 compose 组合函数
let countWords = compose(count, splitIntoSpaces)
countWords('hello your reading about composition') // 5
```

> 当前 compose 的缺点，只能接受两个函数，并且两个函数都只能接受一个参数

### 引入 curry 和 partial

上边的 compose 存在的问题是仅当函数接受一个参数时，才能将两个函数组合。如果存在多参数的情况，需要使用之前的 curry 和 partial

```js
let apressBooks = [
  {
    id: 111,
    title: 'java',
    author: 'newming',
    rating: [4.7],
    reviews: [{good: 4, excellent: 22}]
  },
  {
    id: 222,
    title: 'java script',
    author: 'newming123',
    rating: [4.5],
    reviews: []
  },
  {
    id: 333,
    title: 'nodejs',
    author: 'happynewming',
    rating: [4.0],
    reviews: []
  }
]
```

假设现在根据不同评级在代码库中定义了很多小函数用于过滤图书：

```js
// 过滤图书评分
let filterOutStandingBooks = book => book.rating[0] === 5
let filterGoodBooks = book => book.rating[0] > 4.5
let filterBackBooks = book => book.rating[0] < 3.5

// 取出 title author 字段
let projectTitleAndAuthor = book => ({title: book.title, author: book.author})
let projectAuthor = book => ({author: book.author})
let projectTitle = book => ({title: book.title})
```

获取评级高于 4.5 的图书的标题和作者，使用 compose 和 partial 实现：

```js
// 通过 partial 将接受两个参数的函数搞成接受一个函数的函数
let queryGoodBooks = partial(filter, undefined, filterGoodBooks)
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor)

let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks)
// 使用
titleAndAuthorForGoodBooks(apressBooks)
```

### 优化 compose

当前的 compose 函数目前只能组合两个给定的函数，接下来使它能接受多个函数。

```js
// 注意这里的 reduce 是 自己实现的 reduce，第一个参数是 array
const compose = (...fns) => value => reduce(fns.reverse(), (acc, fn) => fn(acc), value)
```

使用优化后的 compose 函数

```js
// 在上面旧的例子的基础上增加一个功能，知道给定字符串的单词数是 奇数 还是 偶数
let splitIntoSpaces = str => str.split(' ')
let count = array => array.length
let oddOrEven = ip => ip % 2 === 0 ? 'even' : 'odd'

// 通过 compose 函数，组合三个函数
const oddOrEvenWords = compose(oddOrEven, count, splitIntoSpaces)
oddOrEvenWords('hello world and go go go!') // even
```

## 管道/序列

上边的 compose 函数的数据是从右往左流的，下面实现 pipe 函数，功能与 compose 函数相同，只不过数据是从左往右流

### pipe

```js
// 注意这里的 reduce 是 自己实现的 reduce，第一个参数是 array
const pipe = (...fns) => value => reduce(fns, (acc, fn) => fn(acc), value)
```

## 组合的优势

### 组合满足结合率

```js
compose(f, compose(g, h)) == compose(compose(f, g), h)
```

这样上边的例子就可以这么写了:

```js
let oddOrEvenWords = compose(oddOrEven, compose(count, splitIntoSpaces))
```

### 调用 tap 函数调试

tap 是 underscore.js 中的一个函数，主要目的是在一个链式调用中对中间结果执行某些操作。下面实现 identity 函数，该函数的目的是接受参数并将其返回。

```js
const identity = it => {
  console.log(it)
  return it
}
```

假设我们有如下的函数调用：

```js
compose(oddOrEven, count, splitIntoSpaces)('Test string')

// 假设执行上面的代码时，如果 count 函数抛出错误，如何得知 count 函数接受到的参数是什么？只需要将 identity 添加到数据流中可能出现错误的位置。
compose(oddOrEven, count, inentity,splitIntoSpaces)('Test string')
```