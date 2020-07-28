# 第6章 面向对象的程序设计

面向对象(Object-Oriented, OO)的语言有一个标志，那就是它们都有类的概念，而通过类可以创建任意多个具有相同属性和方法的对象。

## 6.1 理解对象

### 6.1.1 属性类型

ECMA-262 定义了一些特性是为了实现 JavaScript 引擎用的，因此在 JavaScript 中不能直接访问它们。为了表示特性是内部值，该规范把它们放到了两对括号中，例如 [[Enumerable]]

ECMAScript 中有两种属性: 数据属性和访问器属性

**1. 数据属性**

数据属性有4个描述其行为的特性:

- [[Configurable]]: 能否修改属性的特性、delete属性重新定义
- [[Enumerable]]: 表示能否通过 for-in 循环返回属性
- [[Writable]]: 表示能否修改属性值
- [[Value]]: 包含这个属性的数据值

```js
var person = {}

Object.defineProperty(person, 'name', {
  writable: false,
  value: 'newming'
})

person.name // newming
person.name = 'danny' // 严格模式下，还会报错
person.name // newming
```

> 在调用 Object.defineProperty() 方法时，如果不指定 configurable, enumerable 和 writable，它们的默认值都是 false

**2. 访问器属性**

访问器属性不包含数据值，它们包含一对 getter 和 setter 函数，这两个函数都不是必须的。访问器属性有以下4个特性:

- [[Configurable]]: 能否修改属性的特性、delete属性重新定义
- [[Enumerable]]: 表示能否通过 for-in 循环返回属性
- [[Get]]: 在读取属性时调用的函数
- [[Set]]: 在写入属性时调用的函数

```js
var book = {
  _year: 2018,
  edition: 1
}

Object.defineProperty(book, 'year', {
  get: function () {
    return this._year
  },
  set: function (newValue) {
    if (newValue < 2018) {
      this._year = newValue
      this.edition += 2018 - newValue
    }
  }
})
```

getter 和 setter 不需要同时指定。

### 6.1.2 定义多个属性

Object.defineProperties(target, desc)

### 6.1.3 读取属性的特性

Object.getOwnPropertyDescriptor(target, key)

## 6.2 创建对象

### 6.2.1 工厂模式

```js
function createPerson (name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    alert(this.name)
  }
  return o
}

var person1 = createPerson('newming', 25, 'FE')
var person2 = createPerson('newming1', 25, 'FE')
```

> 不需要 new，仅仅是函数调用，每次都显式的创建对象，然后返回这个对象

### 6.2.2 构造函数模式

```js
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    alert(this.name)
  }
}

var person1 = new Person('newming', 25, 'FE')
var person2 = new Person('newming1', 25, 'FE')
```

与工厂模式的几个区别:

- 没有显式的创建对象
- 直接将属性和方法赋值给了 this 对象
- 没有 return 语句
- 函数名大写，按照惯例，构造函数始终都应该以一个大写字母开头

当使用 new 操作符创建 Person 的新实例的时候，会经历以下4个步骤:

- 创建一个新对象
- 将构造函数的作用域赋给新对象(因此this就指向了这个新对象)
- 执行构造函数中的代码(为这个新对象添加属性)
- 返回新对象

**1. 将构造函数当作函数**

```js
Person('global', 23, 'HR')
// 这个时候属性会添加到 window 上
window.sayName() // 'global'
```

**2. 构造函数的问题**

```js
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  // 实例两遍 sayName 没有必要
  // this.sayName = function () {
  //   alert(this.name)
  // }
  this.sayName = sayName
}
function sayName () {
  alert(this.name)
}
```

### 6.2.3 原型模式

```js
function Person () {
}
Person.prototype.name = 'Nicholas'
Person.prototype.age = 25
Person.prototype.job = 'FE'
Person.prototype.sayName = function () {
  alert(this.name)
}

var person1 = new Person()
person1.sayName()
```

**1. 理解原型对象**

```js
Person.prototype.isPrototypeOf(person1) // true

Object.getPrototypeOf(person1) === Person.prototype // true

person1.hasOwnProperty('name') // false
```

**2. 原型与in操作符**

```js
'name' in person1 // true

person1.name = 'newming'

'name' in person1 // true
```

同时使用 hasOwnProperty() 和 in 操作符，判断某个属性是否存在与原型中:

```js
function hasPrototypeProperty (object, name) {
  return !object.hasOwnProperty(name) && (name in object)
}
```

- for...in... 返回的是所有能够通过对象访问的、可枚举的(enumerated)属性，包含实例属性和原型上的属性
- Object.keys() 方法返回的是一个包含所有可枚举属性的字符串数组。
- Object.getOwnPropertyNames() 返回的是一个包含所有实例属性的数组，不论是否可枚举

**3. 更简单的原型语法**

```js
function Person () {
}

Person.prototype = {
  // constructor: Person,
  name: 'Nicholas',
  age: 25,
  jog: 'fe',
  sayName () {
    alert(this.name)
  }
}
```

上边的操作，由于是重写 Person.prototype，所以丢失了 constructor 信息，导致新对象的 constructor 指向 Object

```js
var friend = new Person

friend instanceof Object // true
friend instanceof Person // true
frient.constructor == Person // false
frient.constructor == Object // true
```

所以可以在重写的时候设置 constructor ，但是 constructor 默认的 enumerable 是 false，因此可以使用 Object.defineProperty()

```js
function Person () {
}

Person.prototype = {
  name: 'Nicholas',
  age: 25,
  jog: 'fe',
  sayName () {
    alert(this.name)
  }
}

Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
})
```

**4. 原型的动态性**

```js
function Persion () {
}

var friend = new Person

Person.prototype.sayHi = function () {
  alert('Hi')
}
friend.sayHi() // 'Hi'
```

但是如果是重写原型，就不可以了

```js
function Persion () {
}

var friend = new Person

Person.prototype = {
  sayHi () {
    alert('Hi')
  }
}

friend.sayHi() // error
```

**5. 原生对象的原型**

```js
String.prototype.startsWith = function (text) {
  return this.indexOf(text) === 0
}
```

**6. 原型对象的问题**

原型中所有属性是被很多实例共享的，这种共享对于函数来说非常合适。对于是属性值为基本数据类型的属性也说的过去，因为可以在实例上添加一个同名属性，来隐藏原型中的对应属性。但是对于属性值为引用数据类型的属性来说，问题比较突出:

```js
function Person () {
}

Person.prototype = {
  constructor: Person,
  friends: ['A', 'B']
}

var person1 = new Person
var person2 = new Person

person1.friends.push('C')

person1.finends // ['A', 'B', 'C']
person2.finends // ['A', 'B', 'C']
person1.finends === person2.finends // true
```

### 6.2.4 组合使用构造函数模式和原型模式

构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。

```js
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['one', 'two'];
}

Person.prototype = {
  constructor: Person,
  sayName () {
    alert(this.name);
  }
}
```

### 6.2.5 动态原型模式

```js
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['one', 'two'];

  if (typeof this.sayName !== 'function') {
    Person.prototype.sayName = function () {
      alert(this.name);
    }
  }
}
```

### 6.2.6 寄生(parasitic)构造函数模式

```js
function Person (name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    alert(this.name);
  }

  return o;
}
```

这里除了使用 new 操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象的实例。而通过在构造函数的末尾添加一个 return 语句，可以重写调用构造函数时返回的值。

例如需要创建一个具有额外方法的特殊数组，但是我们不能直接修改 Array 构造函数，可以使用这个模式:

```js
function SpecialArray () {
  var values = new Array();
  values.push.apply(values, arguments);
  values.toPipedString = function () {
    return this.join('|');
  }
  return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
colors.toPipedString() // 'red|blue|green'
```

### 6.2.7 稳妥构造函数模式

稳妥对象(durable objects)指的是没有公共属性，而且其方法也不引用this的对象。稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的实例方法不引用this；二是不使用new操作符调用构造函数。

```js
function Person (name, age, job) {
  var o = new Object();
  o.sayName = function () {
    alert(name);
  }

  return o;
}
// 除了使用 sayName 方法外，没有其他方法访问 name 的值
var friend = Person('aa', 25, 'FE');
friend.sayName(); // 'aa'
```

## 6.3 继承

许多OO语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。由于函数没有签名，在ECMAScript中无法实现接口继承。ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的。

### 6.3.1 原型链

181