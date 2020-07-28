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
        rating: [7]
      },
      {
        id: 222,
        title: 'c',
        author: 'aaa',
        rating: [7]
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
        rating: [9]
      },
      {
        id: 444,
        title: 'php',
        author: 'aaa',
        rating: [4]
      }
    ]
  }
]
```

仍然是上一个问题，取出 rating 大于 5 的书籍的 title，这个时候因为 bookDetails 为一个数组，map 遍历后返回的数组中包含了另外的数组，通过上面的方法已经不可以了。

```js
map(books, book => book.bookDetails)
// 使用 map 函数处理后，无法直接交给 filter 处理
[
  [
    {
      id: 111,
      title: 'js',
      author: 'aaa',
      rating: [7]
    },
    {
      id: 222,
      title: 'c',
      author: 'aaa',
      rating: [7]
    }
  ],
  [
    {
      id: 333,
      title: 'go',
      author: 'aaa',
      rating: [9]
    },
    {
      id: 444,
      title: 'php',
      author: 'aaa',
      rating: [4]
    }
  ]
]
```

这时我们需要一个 concatAll 的函数，将所有嵌套的数组连接到一个数组中。

### concatAll 函数

```js
const concatAll = (array, fn) => {
  let results = []
  for (const value of array) {
    results.push.apply(results, value)
  }
  return results
}

// 使用
concatAll(
  map(books, book => book.bookDetails)
)
```

这时我们得到的结果将会这样的：

```js
[
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
  },
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
```

现在可以继续使用 filter 函数了

```js
let goodRating = book => book.rating
filter(
  concatAll(
    map(books, book => book.bookDetails)
  )
, goodRating)
```

## reduce 函数

reduce 函数的第一个实现：

```js
const reduce = (array, fn) => {
  let accumlator = 0
  for (const value of array) {
    accumlator = fn(accumlator, value)
  }
  return accumlator
}
```

上面的只支持加法，因为没有接受默认参数。最终实现：

```js
const reduce = (array, fn, initialValue) => {
  let accumlator
  if (initialValue !== undefined) {
    accumlator = initialValue
  } else {
    accumlator = array[0]
  }

  if (initialValue === undefined) {
    for (let i = 1; i < array.length; i++) {
      accumlator = fn(accumlator, array[i])
    }
  } else {
    for (const value of array) {
      accumlator = fn(accumlator, value)
    }
  }

  return accumlator
}
```

## zip 函数

zip 函数的任务是合并两个给定的数组。例如要将下面两个数组合并起来：

```js
// 第一个数组，包含了书籍详情
let books = [
  {
    name: 'beginners',
    bookDetails: [
      {
        id: 111,
        title: 'C# 6.0',
        author: 'newming',
        rating: [6.8]
      },
      {
        id: 112,
        title: 'javascript',
        author: 'newming',
        rating: [8],
        reviews: []
      }
    ]
  },
  {
    name: 'pro',
    bookDetails: [
      {
        id: 113,
        title: 'python',
        author: 'newming',
        rating: [8.5]
      },
      {
        id: 114,
        title: 'nodejs',
        author: 'newming',
        rating: [8.8],
        reviews: []
      }
    ]
  },
]
// 第二个数组包含了 reviews 评价详情
let reviewsDetails = [
  {
    id: 111,
    reviews: [{good: 4, excellent: 12}]
  },
  {
    id: 112,
    reviews: []
  },
  {
    id: 113,
    reviews: []
  },
  {
    id: 114,
    reviews: [{good: 14, excellent: 2}]
  },
]
```

实现将两个数组合并到一个数组中。

### zip 函数的实现：

```js
const zip = (leftArr, rightArr, fn) => {
  let index, results = []
  for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++) {
    results.push(fn(leftArr[index], rightArr[index]))
  }

  return results
}
```

使用 zip 实现两个数组相同位置数值相加：

```js
zip([1, 2, 3], [5, 8, 10], (x, y) => x + y)
// [6, 10, 13]
```

使用 zip 解决上边图书信息合并：

```js
let bookDetails = concatAll(
  map(books, book => book.bookDetails)
)

let mergedBookDetails = zip(bookDetails, reviewsDetails, (book, review) => {
  if (book.id === review.id) {
    let clone = Object.assign({}, book)
    clone.ratings = review
    return clone
  }
  return book // 书上没有这句，如果 book 和 review 的顺序不一致，数据可能就都丢了
})
```

<!-- done -->