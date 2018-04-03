# jquery deferred

jquery 1.5 之前 ajax 的写法

```js
var ajax = $.ajax({
  url: 'data.json',
  success: function () {
    console.log('success')
  },
  error: function () {
    consoole.log('error')
  }
})
console.log(ajax) // 返回一个 XHR 对象
```

1.5 之后写法

```js
var ajax = $.ajax('data.json')
ajax.done(function () {
  console.log('success')
}).fail(function () {
  console.log('error')
}).done(function () {
  console.log('success 2')
})
console.log('ajax') // 返回一个 deferred 对象
```

### 使用 jQuery Deferred

```js
// 一段非常简单的异步操作代码，使用 setTimeout 函数
var wait = function () {
  var task = function () {
    console.log('执行完成')
  }
  setTimeout(task, 2000)
}
wait()

// 新增需求：要在执行完成之后进行某些特别复杂的操作，代码可能会很多，而且分好几个步骤
function waitHandle () {
  var dtd = $.Deferred() // 创建一个 deferred 对象

  var wait = function (dtd) {
    var task = function () {
      console.log('执行完成')
      dtd.resolve() // 表示异步任务已经完成
      // dtd.reject() // 表示异步任务失败或出错
    }
    setTimeout(task, 2000)
    return dtd // 要求返回 deferred 对象
  }
  // 注意这里一定要有返回值
  return wait(dtd)
}

var w = waitHandle()
w.then(function () {
  console.log('ok 1')
}, function () {
  console.log('err 1')
}).then(function () {
  console.log('ok 2')
}, function () {
  console.log('err 2')
})
```