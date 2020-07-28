# Module 模块模式

用于实现模块的方法：

- 对象字面量表示法
- Module 模式
- AMD 模块
- CommonJS 模块
- ECMAScript Hormony 模块

## 私有

```js
var myNamespace = (function () {
  // 私有计数器
  var privateVar = 0
  // 记录所有参数的私有函数
  var privateMethod = function (foo) {
    console.log(foo)
  }

  return {
    // 公有变量
    publicVar: 'foo',
    // 调用私有函数和变量的公有方法
    publicMethod: function (bar) {
      privateVar++
      privateMethod(bar)
    }
  }
})()
```

## 引入混入

全局变量作为参数传递给模块的匿名函数，允许我们引入他们并按照我们所希望的为它们去个本地别名

```js
var myModule = (function (JQ, _) {
  function privateMethod () {
    JQ('.box').html('123')
  }

  return {
    publicMethod () {
      privateMethod()
    }
  }
})(jQuery, _) // 引入 jquery 和 underscore
```

## 引出

允许我们声明全局变量而不需要实现它们。

```js
var myModule = (function () {
  var module = {}
  function privateMethod = function () {
    console.log(123)
  }

  module.publicProperty = 'Foo'
  module.publicMethod = function () {
    privateMethod()
  }
  return module
})()
```

> 优点：支持私有数据

> 缺点：由于访问公有私有成员的方式不同，当想改变可见性时，必须修改每一个曾经使用过该成员的地方