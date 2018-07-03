# Generator 异步编程

使用 setTimeout 模拟异步操作：

```js
let getDataOne = (cb) => {
  setTimeout(function () {
    cb('dummy data one')
  }, 1000)
}

let getDataTwo = (cb) => {
  setTimeout(function () {
    cb('dummy data two')
  }, 1000)
}
```

调用上边的两个异步函数：

```js
getDataOne(data => console.log(data))
getDataTwo(data => console.log(data))
// 如果想顺序执行就会需要回调嵌套了
```

使用 Generator 改造代码：

```js
let generator
let getDataOne = () => {
  setTimeout(function () {
    generator.next('dummy data one')
  }, 1000)
}

let getDataTwo = () => {
  setTimeout(function () {
    generator.next('dummy data two')
  }, 1000)
}

function* main () {
  let dataOne = yield getDataOne()
  let dataTwo = yield getDataTwo()
  console.log(dataOne)
  console.log(dataTwo)
}

generator = main()
generator.next() // 两秒后一下都打印了
// {value: undefined, done: false}
// dummy data one
// dummy data two
```

<!-- done -->