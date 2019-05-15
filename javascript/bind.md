# bind函数的实现

- [mdn bind函数文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [实现自己的bind函数](https://zhuanlan.zhihu.com/p/38154740)

当执行var A = B.bind(this, arg1, arg2, ...) 函数时，实际上做了以下几件事情：

1. 返回一个函数，且这个函数运行时的 this 就是 bind(this) 传入的 this
2. 接收参数，bind()接收到的的第二个及之后的参数会被插入到返回的目标函数的参数列表的开始位置，之后执行目标函数传入的参数会跟在他们的后面
3. 使用new操作bind函数返回的函数时，之前传入的this会被忽略

### 实现第一步

返回一个函数，并且这个函数运行时的 this 就是 bind(this) 传入的 this

```js
Function.prototype.Nbind = function (oThis) {
  // 这里从 MDN 拿过来的，判断调用 bind 函数的是否是 callable 函数
  // https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/JSAPI_reference/JS::IsCallable
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var fToBind = this // 调用 bind 的函数 如 a.bind() 则为 a
  return function () {
    return fToBind.apply(oThis) // 注意这里的 return，将原函数执行结果返回
  }
}
```

上面简单实现了第一步，返回一个新的函数，并且指定了新的this指向，依赖于原生 apply 方法

测试：

```js
var obj = {}

function step1 () {
  this.name = 'step1'
}
var bindThis = step1.Nbind(obj)

bindThis()
console.log(obj) // {name: 'step1'}
```

### 实现第二步

考虑传参的问题，这里先看一下 bind 函数是如何传参数的

```js
// 这种用法也叫 偏函数
function add (a, b) {
  return a + b
}

var addBind = add.bind(null, 10)
var sum = addBind(20, 100)
console.log(sum) // 30
```

首先 add 方法接受两个参数 a, b，当执行 bind 的时候传入了 10 作为第一个参数，即 a，当执行bind返回的函数 addBind 的时候，传入了两个参数，但是只有 20 作为 add 函数的第二个参数即 b 被使用了，所以最终结果为 30

开始实现，主要是在 apply 函数调用的时候做一些手脚：

```js
Function.prototype.Nbind = function (oThis) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var fToBind = this // 调用 bind 的函数 如 a.bind() 则为 a
  var aArgs = Array.prototype.slice.call(arguments, 1) // 取出 bind 函数执行时第一个参数后的参数列表
  return function () {
    var finalArgs = aArgs.concat([].slice.call(arguments)) // 合并 bind 和 bind 返回的函数 执行时的参数
    return fToBind.apply(oThis, finalArgs)
  }
}
```

测试：

```js
function add (a, b) {
  return a + b
}

var addBind = add.Nbind(null, 10)
var sum = addBind(20, 100)
console.log(sum) // 30
```

### 实现第三步

使用new来调用bind返回的函数时，会忽略bind传入的this

new 操作符做了什么可以查看 `ProfessionalJS/chapter6.md` 内容

- 创建一个新对象
- 将构造函数的作用域赋给新对象(因此this就指向了这个新对象)
- 执行构造函数中的代码(为这个新对象添加属性)
- 返回新对象

当使用 new 来调用 bind 返回的函数时，即 `new (fun.bind(oThis))()`，这个时候我们其实要关注第三步，因为在第一，二步中的实现，在执行构造函数中的代码时，其实是 apply 了 bind 中收到的 oThis ，这样 new 出来的对象其实 this 指向是指向了 oThis，而bind规范是使用 new 操作符时，忽略 bind 中传入的 oThis

实现：

```js
Function.prototype.Nbind = function (oThis) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var fToBind = this // 调用 bind 的函数 如 a.bind() 则为 a
  var aArgs = Array.prototype.slice.call(arguments, 1) // 取出 bind 函数执行时第一个参数后的参数列表
  var boundFunc = function () {
    var finalArgs = aArgs.concat([].slice.call(arguments)) // 合并 bind 和 bind 返回的函数 执行时的参数
    // 这里的 this 是执行 bind(oThin)() 的时候的 this，如果是使用 new 操作符的话，这里由于 new 的原因 this 是 boundFunc 的实例
    var trueThis = this instanceof boundFunc ? this : oThis
    return fToBind.apply(trueThis, finalArgs)
  }

  return boundFunc
}
```

测试：

```js
var obj = {}

function people (name) {
  this.name = name
}

people.prototype.sayName = '我是people原型上的属性'

var createBind = people.Nbind(obj, 'danny')
var peter = new createBind

console.log(obj) // {}
console.log(peter) // boundFunc {name: "danny"}
console.log(peter.sayName) // undefined
```

我们发现 new 的处理已经正确，忽略了 bind 传入的 this 指向

但是我们又发现另外一个问题， peter 的原型链上继承了 boundFunc，而没有继承 people，这样也就无法调用 people 的原型及其原型链上相关属性、方法

### 修改原型的继承

```js
Function.prototype.Nbind = function (oThis) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var fToBind = this // 调用 bind 的函数 如 a.bind() 则为 a
  var fNOP = function() {} // 保存原始方法原型的函数 如 a.bind() 的a
  var aArgs = Array.prototype.slice.call(arguments, 1) // 取出 bind 函数执行时第一个参数后的参数列表
  var boundFunc = function () {
    var finalArgs = aArgs.concat([].slice.call(arguments)) // 合并 bind 和 bind 返回的函数 执行时的参数
    // 这里的 this 是执行 bind(oThin)() 的时候的 this，如果是使用 new 操作符的话，这里由于 new 的原因 this 是 boundFunc 的实例
    var trueThis = this instanceof boundFunc ? this : oThis
    return fToBind.apply(trueThis, finalArgs)
  }

  // 维护原型关系
  if (fToBind.prototype) {
    // Function.prototype doesn't have a prototype property
    fNOP.prototype = fToBind.prototype
  }
  // 下行的代码使fBound.prototype是fNOP的实例,因此
  // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
  boundFunc.prototype = new fNOP();
  boundFunc.prototype.haha = '我是 boundFunc 的属性'

  return boundFunc
}
```

为什么要使用 `fNOP.prototype = fToBind.prototype;boundFunc.prototype = new fNOP();`，而不是直接用 `boundFunc.prototype = fToBind.prototype;` 是因为这样写的话，修改boundFunc.prototype会影响到原函数的prototype

测试：

```js
var obj = {}

function people (name) {
  this.name = name
}

people.prototype.sayName = '我是people原型上的属性'

var createBind = people.Nbind(obj, 'danny')
var peter = new createBind

console.log(obj) // {}
console.log(peter) // boundFunc {name: "danny"}
console.log(peter.sayName) // 我是people原型上的属性
console.log(peter.haha) // 我是 boundFunc 的属性
```

that's all
