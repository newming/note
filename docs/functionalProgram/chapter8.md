# 函子

函子(Functor): 用一种函数式的方式帮助我们处理错误。

## 什么是函子

函子是一个普通对象(在其他语言中，可能是一个类)，他实现了 map 函数，在遍历每个对象值的时候生成一个新对象。

### 函子是容器

```js
const Container = function (val) {
  this.value = val
}

var cont = new Container(1)
// container 持有了内部的值
```

为 Container 创建一个名为 of 的静态工具类方法，帮助我们在创建新对象时省略 new 关键字

```js
Container.of = function (val) {
  return new Container(val)
}

var test = Container.of(3)
```

### 函子实现了 map 方法

```js
// map 函数定义
Container.prototype.map = function (fn) {
  return Container.of(fn(this.value))
}
```

使用函子：

```js
let double = x => x + x

Container.of(3).map(double).map(double).map(double) // {value: 24}
```

## MayBe 函子

它使我们能够以更加函数式的方式处理代码中的错误。

### 实现 MayBe 函子

```js
const MayBe = function (val) {
  this.value = val
}

MayBe.of = function (val) {
  return new MayBe(val)
}

MayBe.prototype.isNothing = function () {
  return (this.value === null || this.value === undefined)
}

MayBe.prototype.map = function (fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
}
// 这里 map 函数在应用传入的函数之前先使用 isNothing 函数检测容器中的值是否为 null 或 undefined
```

### 使用 MayBe 函子

```js
MayBe.of('string').map(x => x.toUpperCase())
// {valuie: 'STRING'}
```

上边我们调用 x.toUpperCase() 不需要关心 x 是否是 unll 或者 undefined，如果 string 的值为 null 会如何：

```js
MayBe.of(null).map(x => x.toUpperCase())
// {value: null}
// 代码没有崩溃
```

链式调用：

```js
MayBe.of('newming')
  .map(x => x.toUpperCase())
  .map(x => 'Mr. ' + x)
// 链式调用过程中同样不关心各个中间过程的 null 和 undefined

MayBe.of('newming')
  .map(x => undefined)
  .map(x => 'Mr. ' + x)
// {value: null}
```

### 真实用例

这个跳过了。。。

## Either 函子

它能够解决分支拓展问题。

例如：

```js
MayBe.of('Geoge')
  .map(() => undefined)
  .map(x => 'Mr. ' + x)

// MayBe {value: null} // 与预期结果一致，但是我们不知道哪个 map 调用时执行失败了
```

### 实现 Either 函子

```js
const Nothing = function (val) {
  this.value = val
}

Nothing.of = function (val) {
  return new Nothing(val)
}

Nothing.prototype.map = function (f) {
  return this
}

const Some = function (val) {
  this.value = val
}

Some.of = function (val) {
  return new Some(val)
}

Some.prototype.map = function (fn) {
  return Some.of(fn(this.value))
}
```

上边两个函数的区别是可以在 Some 上运行函数，而不能在 Nothing 上运行

```js
Some.of('test').map(x => x.toUpperCase())
// Some {value: 'TEST'}

Nothing.of('test').map(x => x.toUpperCase())
// Nothing {value: 'test'}
```

下面将两个对象封装到 Either 对象中：

```js
const Either = {
  Some: Some,
  Nothing: Nothing
}
```

这里请查看 p132 的实例