# 面向对象&继承

-[创建对象的方式](https://wangyaxing.cn/blog/interview/JavaScript/JavaScript%E7%9A%84%E5%87%A0%E7%A7%8D%E5%88%9B%E5%BB%BA%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%96%B9%E5%BC%8F.html)

- [继承方式](https://wangyaxing.cn/blog/interview/JavaScript/JavaScript%E7%9A%84%E5%87%A0%E7%A7%8D%E7%BB%A7%E6%89%BF%E6%96%B9%E5%BC%8F.html)

## 继承

继承是 oo 语言中的一个最为人津津乐道的概念。许多 oo 语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。由于 js 中方法没有签名，在 EMACScript 只支持实现继承，而且其实现继承是依靠原型链来继承的。

## 构造函数、原型和实例的关系：

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。

```js
function Father() {
  this.property = true;
}
Father.prototype.getFatherValue = function() {
  return this.property;
};
function Son() {
  this.sonProperty = false;
}
//继承 Father
Son.prototype = new Father(); //Son.prototype被重写,导致Son.prototype.constructor也一同被重写
Son.prototype.getSonVaule = function() {
  return this.sonProperty;
};
var instance = new Son();
alert(instance.getFatherValue()); //true
```

但是需要注意的是：原型链并非十分完美，会存在以下问题：

- 当原型链中包含引用类型值的原型时，该引用类型值会被所有实例共享
- 在创建子类型时，不能想超类型的构造函数中传递参数

所以在实践中，很多会单独使用原型链。从而出现了一些弥补方案：

- 借用构造函数继承
- 组合继承
- 原型继承
- 寄生式继承
- 寄生组合式继承
