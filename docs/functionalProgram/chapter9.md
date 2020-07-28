# 深入理解 Monad

## 实现 join 方法

```js
MayBe.prototype.join = function () {
  return this.isNothing() ? MayBe.of(null) : this.value
}
```

使用：

```js
let joinExample = MayBe.of(MayBe.of(5))
// MayBe {value: MayBe {value: 5}}

joinExample.join()
// MayBe {value: 5}
```

## 实现 chain

上边总是要在 map 后调用 join，下面把该逻辑封装到一个名为 chain 方法中

```js
MayBe.prototype.chain = function (f) {
  return this.map(f).join()
}
```

