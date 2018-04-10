# 数组的函数式编程

## 5.1 数组的函数式方法

本节创建的所有函数称为投影函数(Projecting Function)。把函数应用于一个值并创建一个新值的过程称为投影。

### map 函数

```js
const map = (array, fn) => {
  let results = []
  for(let value of array) {
    results.push(fn(value))
  }
  return results
}

// 使用
map([1, 2, 3], x => x * 2)
// [2, 4, 6]
```

### filter 函数

与 map 函数类似，只需要增加一个断言就可以：

```js
const filter = (array, fn) => {
  let results = []
  for (let value of array) {
    fn(value) ? results.push(value) : undefined
  }
  return results
}

// 使用
let books = [
  {name: 'ruby', rating: 5},
  {name: 'vb', rating: 2},
  {name: 'php', rating: 6},
  {name: 'js', rating: 8}
]

filter(books, book => book.rating > 5)
```

## 5.2 连接操作

假设现在我们有下面的一个数据，我们需要找出 rating 大于 5 的书籍的 title:

```js
let books = [
  {title: 'js', author: 'newming', year: 2018, rating: 6},
  {title: 'php', author: 'lilei', year: 2013, rating: 7},
  {title: 'python', author: 'guoyongfeng', year: 2014, rating: 2},
  {title: 'java', author: 'ruanyifeng', year: 2012, rating: 4},
  {title: 'c++', author: 'tj', year: 2013, rating: 8}
]
```

利用上边的 map 和 filter 可以实现：

```js
var goodBooks = filter(books, book => book.rating > 5)
goodBooks = map(goodBooks, book => ({title: book.title}))

// 连接
var goodBooks = map(filter(books, book => book.rating > 5), book => ({title: book.title}))
```

现在 books 做了一些更新

```js
var books = [
  {
    name: 'beginners',
    bookDetails: [
      {
        id: 111,
        title: 'js',
        author: 'aaa',
        rating: 7
      },
      {
        id: 222,
        title: 'c',
        author: 'aaa',
        rating: 7
      }
    ]
  },
  {
    name: 'beginners',
    bookDetails: [
      {
        id: 333,
        title: 'go',
        author: 'aaa',
        rating: 9
      },
      {
        id: 444,
        title: 'php',
        author: 'aaa',
        rating: 4
      }
    ]
  }
]
```

仍然是上一个问题，取出 rating 大于 5 的书籍的 title

