# 对象(Object)

## 单例模式

在项目中，为了避免使用全局的变量或方法导致的冲突，我们通常把需要的方法和变量当作一个对象数据类型的属性名和属性值保存起来。我们把创建的对象的名称为命名空间。

对象字面量只是用于创建单例的方法之一，并非所有的对象字面量都是单体。如果它是用来模仿关联数组或容纳数据的话，就显然不是单例。如果它用来组织一批相关方法和属性，那就可能是单例。这主要区别在于设计的意图。

1. 使用单例模式可以很好的组织代码，使代码的调试和维护更高效。
2. 但就对创建对象的生产方式而言，显然，这种生产方式是很落后的。相应的，在 js 中创建对象数据类型也是这样的，纯粹的用对象直接量来单次的描述对象在编程中非常的不方便，需要改进这种创建对象数据类型的方式，工厂模式可以提高这种落后的“生产方式” 。

```js
// 单例模式(一)
var obj = {
  name: "aaa",
  check: function() {},
};
// 全局
var name = "aaa";
function check() {}
// (二)
var obj = (function() {
  function check() {}
  function submit() {}
  return {
    check,
    submit,
  };
})();
obj.check();
```

## 工厂模式

```js
function factory(material) {
  var obj = {};
  obj.material = meterial; //原料
  obj.attr1 = "";
  obj.attr2 = "";
  obj.fn = function() {}; //流程
  return obj; //产品
}
var p1 = factory("aaa");
var p2 = factory("aaadd");
var p3 = factory("aaaee");
```

## 构造函数

```js
function FE(name, age) {
  this.name = name;
  this.age = age;
  this.writeCss = function() {
    console.log(this.name);
  };
}
FE.prototype.writeJs = function() {
  console.log(this.age);
};
var p1 = new FE("aa", 34);
var p2 = new FE("aaaa", 34);
console.log(p1.writeCss == p2.writeCss); // false
console.log(p1.writeJs == p2.writeJs); // true
// 注意私有方法属性不相同，公共的相同
```

## Object.create()

```js
var obj = Object.create({ a: 1 });
obj.a; // 1
obj.hasOwnProperty("a"); // false
```

## Object.getOwnPropertyDescriptor(Object, 'proto')

获取对象某个属性的描述

## getter/setter

```js
var man = {
  name: "newming",
  age: 25,
  get age() {
    return new Date().getFullYear() - 1993;
  },
  set age(val) {
    console.log("Age cna't be set to " + val);
  },
};
console.log(man.age); // 25
man.age = 100; // Age cna\'t be set to 100
console.log(man.age); // stille 25
```

```js
var o = {};
Object.defineProperty(o, "x", { value: 1 }); // writbale=false, configurable=false
var obj = Object.create(o);

obj.x; // 1
obj.x = 200;
obj.x; // still 1 can't change it

Object.defineProperty(obj, "x", {
  writable: true,
  configurable: true,
  value: 100,
});
obj.x; // 100
obj.x = 500;
obj.x; // 500
```

## 属性级的权限设置

获取一个对象属性的描述： Object.getOwnPropertyDescriptor(obj, proto)

```js
Object.getOwnPropertyDescriptor({ a: 1 }, "a"); // {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor({ a: 1 }, "b"); // undefined
/*
  * writable: 是否可写
  * enumerable: 是否可枚举
  * configurable: 指定对象的属性描述可以被改变或者属性可被删除
  * get: function () {}
  * set: function () {}

  通过 Object.defineProperty, Object.defineProperties 定义对象属性时，这几个属性默认为 false
*/
```

## Object.defineProperty

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### Object.defineProperties

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

## 对象标签

- proto: 指向对象的原型
- class: 是否是一个类
- extensible: 是否可拓展，是否可以在上边添加新的属性

```js
// class 标签
var toString = Object.prototype.toString;
function getType(o) {
  return toString.call(o).slice(8, -1);
}

toString.call(null); // '[object Null]'
getType(null); // 'Null'
getType(undefined); // 'Undefined'
getType(1); // 'Number'
getType(new Number(1)); // 'Number'
typeof new Number(1); // 'Number'
getType(true); // Boolean
getType(new Boolean(true)); // 'Boolean'
```

```js
var obj = [(x: 1), (y: 2)];
Object.isExtensible(obj); // true
Object.preventExtensions(obj);
Object.isExtensible(obj); // false
obj.z = 1;
obj.z; // undefined, add new proterty failed
Object.getOwnPropertyDescriptor(obj, "x"); // Object {value: 1, writable: true, enumerable: true, configurable: true}

// 是否密封，密封后 configurable 为 false [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
Object.seal(obj);
Object.getOwnPropertyDescriptor(obj, "x"); // Object {value: 1, writable: true, enumerable: true, configurable: false}
Object.isSealed(obj); // true

// 是否冻结，冻结后都不可写
Object.freeze(obj);
Object.getOwnPropertyDescriptor(obj, "x"); // Object {value: 1, writable: false, enumerable: true, configurable: false}
Object.isFrozen(obj); // true
```

## 对象序列化

- JSON.stringify()

### 序列化-自定义

```js
var obj = {
  x: 1,
  y: 2,
  o: {
    o1: 1,
    o2: 2,
    toJSON: function() {
      return this.o1 + this.o2;
    },
  },
};

JSON.stringify(obj); // "{"x": 1, "y": 2, "o": 3}"
```

- toString()
- valueOf()

```js
var obj = { x: 1, y: 2 };
obj.toString(); // "[object Object]"
obj.toString = function() {
  return this.x + this.y;
};
"Result " + obj; // "Result 3", by toString

+obj; // 3, from toString

obj.valueOf = function() {
  return this.x + this.y + 100;
};
+obj; // 103, from valueOf

"Result " + obj; // still "Result 103"
// 优先调用 valueOf，然后是 toString
```
