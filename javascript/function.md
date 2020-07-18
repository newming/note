# 函数

### 参数求和
```js
function sum() {
  var total=null;
  for (var i = 0; i < arguments.length; i++) {
    var val = Number(arguments[i]);
    if (isNaN(val)) {
      continue;
    }
    total+=val
    console.log(total);
  }
  return total;
}
sum(6,8,78,'90')
sum('a',8,'-0','66')
```

js执行循序

- 开辟一个全局作用域(window)
- 在当前作用域(window)下进行预解析(带var和function)，var和function预解释不一样，var只是提前声明，function提前声明和定义都完成了
- 开始执行代码，遇到function定义直接跳过。所以函数定义可以写在后面，预解释已经声明定义了
- 每个函数执行时会形成一个新的私有作用域(栈内存)，在这个作用域内在进行预解释，然后在函数体内从上到下执行。在函数的这个私有作用域中定义的变量都是私有变量。形成的这个作用域保护里面的私有变量不受外界干扰，这种机制叫做闭包。函数执行一次就会形成一个新的私有作用域，重复这次步骤。
- 一般情况下，每一次函数执行完成后，函数新形成的作用域会自定销毁

注意：预解释是发生在当前作用域下的


### 自执行函数

定义和执行同时完成

```js
;(function (name) {
  console.log(name);
})('newming');

~function (name) {
  console.log(name);
}('newming');

-function (name) {
  console.log(name);
}('newming');

!function (name) {
  console.log(name);
}('newming');

+function (name) {
  console.log(name);
}('newming');
```

### 函数柯里化

```js
// bind 改变 this 指向，返回一个新的函数，不执行
function add (a, b, c) {
  return a + b + c
}

var func = add.bind(undefined, 100)
func(1, 2) // 103

var func2 = func.bind(undefined, 200)
func2(10) // 310
```

### bind 与 new

```js
function foo () {
  this.b = 100
  return this.a
}

var func = foo.bind({a: 1})

func() // 1
new func() // {b: 100}
// 注意 new 的时候会忽略 return 和 bind
```

### bind polyfill

具体实现原理会写篇文章论述一下，结合上边 bind 与 new 的代码

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          console.log(this instanceof fNOP) // 当通过 new 创建时为 true
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

### 函数预解析

```js
function test (a, b) {
  var c = 10
  function d () {}
  var e = function _e () {} // 函数表达式不会影响 VO
  (function x () {}) // 扩起来了，成为表达式，但没有执行，忽略了
  b = 20
}

text(10)
// 此时函数的执行上下文中进行的初始化为(AO 激活上下文, VO 执行上下文)
AO(text) = {
  a: 10,
  b: undefined,
  c: undefined,
  d: <ref to func 'd'>,
  e: undefined
}
```

VO 按照如下顺序进行填充：

- 函数参数（如未传入，初始化该参数值为 undefined）
- 函数声明（若发生命名冲突，会覆盖）
- 变量声明（初始化变量值为 undefined，若发生命名冲突，会忽略）

```js
// 1. 函数声明命名冲突，函数声明覆盖参数
function test1 (x) {
  function x () {}
  console.log(x)
}
test1(100) // f x() {}

// 2. 函数声明与变量声明冲突，变量声明忽略，注意是初始化阶段
function test2 () {
  function x () {}
  var x
  console.log(x)
}
test2() // f x () {} 说明 var x 被忽略了

function test3 () {
  function x () {}
  var x = 10
  console.log(x)
}
test3() // 10 var x 被忽略了，不过已经过了初始化阶段，在代码执行时覆盖了
```

### 原型链小例

OOP 原型链通过 Object.create() 继承

```js
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype.hi = function () {
  console.log('Hi, my name is ' + this.name + ', i am ' + this.age + ' years old.')
}

Person.prototype.LEGS_NUM = 2
Person.prototype.ARMS_NUM = 2
Person.prototype.walk = function () {
  console.log(this.name + ' is walking...')
}

function Student (name, age, className) {
  Person.call(this, name, age)
  this.className = className
}

// 通过 Object.create 继承，不会破坏 Person 的原型
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student
// 改写 hi 方法，不会破坏 Person 的 hi 方法
Student.prototype.hi = function () {
  console.log(`Hi, my name is ${this.name}, i am ${this.age} years old now, and from ${this.className}.`)
}

Student.prototype.learn = function (subject) {
  console.log(`${this.name} is learning ${subject} at ${this.className}.`)
}

// 测试
var newming = new Student('Newming', 25, 'Class 39')
newming.hi() // Hi, my name is Newming, i am 25 years old now, and from Class 39.
newming.LEGS_NUM // 2
newming.walk() // Newming is walking...
newming.learn('Math') // Newming is learning Math at Class 39.
```

### 模拟重载

根据参数列表的不同，执行不同的操作

```js
function Person () {
  var args = arguments
  if (typeof args[0] === 'object' && args[0]) {
    if (args[0].name) {
      this.name = args[0].name
    }
    if (args[0].age) {
      this.age = args[0].age
    }
  } else {
    if (args[0]) {
      this.name = args[0]
    }
    if (args[1]) {
      this.age = args[1]
    }
  }
}

Person.prototype.toString = function () {
  return 'name=' + this.name + ',age=' + this.age
}

var newming = new Person('Newming', 25)
newming.toString() // name=Newming,age=25

var newm = new Person({name: 'Newming', age: 25})
newm.toString() // name=Newming,age=25
```

调用子类方法

```js
function Person (name) {
  this.name = name
}

function Student (name, className) {
  this.className = className
  Person.call(this, name)
}

var bosn = new Student('Bosn', '39')
bosn // Student {className: 39, name: 'Bosn'}

Person.prototype.init = function () {}

Student.prototype.init = function () {
  // do sth...
  Person.prototype.init.apply(this, arguments)
}
```

### 链式调用

```js
function ClassManager () {}
ClassManager.prototype.addClass = function (str) {
  console.log('class: ' + str + ' added.')
  return this
}

var manager = new ClassManager()
manager.addClass('classA').addClass('classB').addClass('calssC')
// class: classA added.
// class: classB added.
// class: calssC added.
```

### 探测器例子

```js
!function (global) {
  function DetectorBase (configs) {
    if (!this instanceof DetectorBase) {
      throw new Error('Do not invoke without new.')
    }
    this.configs = configs
    this.analyze()
  }
  DetectorBase.prototype.detect = function () {
    throw new Error('Not implemented')
  }
  DetectorBase.prototype.analyze = function () {
    console.log('analyze...')
    this.data = '###data###'
  }

  function LinkDetector (links) {
    if (!this instanceof LinkDetector) {
      throw new Error('Do not invoke without new.')
    }
    this.links = links
    DetectorBase.apply(this, arguments)
  }

  function ContainerDetector (containers) {
    if (!this instanceof ContainerDetector) {
      throw new Error('Do not invoke without new.')
    }
    this.containers = containers
    DetectorBase.apply(this, arguments)
  }

  // inherit first
  inherit(LinkDetector, DetectorBase)
  inherit(ContainerDetector, DetectorBase)

  // expand later
  LinkDetector.prototype.detect = function () {
    console.log('Loading data:' + this.data)
    console.log('Link detection started')
    console.log('Scaning links:' + this.links)
  }
  ContainerDetector.prototype.detect = function () {
    console.log('Loading data:' + this.data)
    console.log('Container detection started')
    console.log('Scaning containers:' + this.containers)
  }

  // prevent from being altered
  Object.freeze(DetectorBase)
  Object.freeze(DetectorBase.prototype)
  Object.freeze(LinkDetector)
  Object.freeze(LinkDetector.prototype)
  Object.freeze(ContainerDetector)
  Object.freeze(ContainerDetector.prototype)

  // export to global object
  Object.defineProperties(global, {
    LinkDetector: {value: LinkDetector},
    ContainerDetector: {value: ContainerDetector},
    DetectorBase: {value: DetectorBase}
  })

  // 继承基类
  function inherit (subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype)
    subClass.prototype.constructor = subClass
  }
}(this)

var cd = new ContainerDetector('#abc #def #ghi')
var ld = new LinkDetector('http://www.taobao.com http://www.tmall.com http://www.baidu.com')

cd.detect()
ld.detect()
```