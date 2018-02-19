# 引用类型

ECMAScript 提供了很多原生引用类型（例如Object），以便于开发人员用以实现常见的计算任务。

### 5.1 Object 类型

- new Object()
- var a = {}

### 5.2 Array 类型

```js
var arr = [1, 2, 3]
arr.length = 2 // length 不是只读的，会将3移除
```

##### 5.2.1 检测数组

```js
// 1. instanceof
value instanceof Array

// 2 Array.isArray(value)
```

##### 5.2.2 转换方法

- toString()
- toLocaleString()

##### 5.2.3 栈方法

```js
// push()
// pop()
```

##### 5.2.4 队列方法

```js
// shift() // 删除第一项
// unshift // 向第一项添加
```

##### 5.2.5 重排序方法

```js
// reverse() 反转

// sort() 默认从小到大，也可以接受一个 function 作为参数，这个函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数。

function compare(value1, value2) {
  if (value1 < value2) {
    return -1
  } else if (value1 > value2) {
    return 1
  } else {
    return 0
  }
}

var values = [0, 1, 5, 10, 15]
values.sort(compare) // [0, 1, 5, 10, 15]

// 可以通过修改比较函数产生降序结果，只需要交换比较函数返回值
function compare(value1, value2) {
  if (value1 < value2) {
    return 1
  } else if (value1 > value2) {
    return -1
  } else {
    return 0
  }
}

// 简写
function compare(value1, value2) {
  return value2 - value1
}
```

##### 5.2.6 操作方法

- concat
- slice
- splice


##### 5.2.7 位置方法

- indexOf
- lastIndexOf

##### 5.2.8 迭代方法

- every
- filter
- forEach
- map
- some

##### 5.2.9 缩小方法

- reduce
- reduceRight

### 5.3 Date 类型

```js
var start = Date.now()
dosomething()
var end = Date.now()
var res = end -start

// 在不支持 Date.now() 的浏览器可以通过 + 号实现
var start = +new Date()
```

##### 5.3.1 继承的方法

- toString()
- toLocaleString()
- valueOf() 返回毫秒数

##### 5.3.2 日期格式化方法

- toDateString()
- toTimeString()
- toLocaleDateString()
- toLocaleTimeString()
- toUTCString()

##### 5.3.3 日期/时间组件方法

- getTime
- setTime
- getFullYear
- getUTCFullYear
- setFullYear
- setUTCFullYear
- getMonth
- getUTCMonth
- setMonth
- setUTCMonth
- getDate
- getUTCDate
- setDate
- setUTCDate
- getDay
- getUTCDay
- getHours
- getUTCHours
- setHours
- setUTCHours

...

### 5.4 RegExp 类型

> var expression = /pattern/flags

模式中使用的所有元字符都必须转义。元字符包括：( [ { \ ^ $ | } ? * + . ] )

##### 5.4.1 RegExp 实例属性

- global
- ignoreCase
- lastIndex: 整数，表示开始搜索下一个匹配项的字符位置，从0算起
- multiline
- source

```js
var reg = /a/g

alert(reg.global)
```

##### RegExp 实例方法

**exec() 方法**

```js
var text = 'mom and dad and baby'
var reg = /mom( and dad( and baby)?)?/gi

var matches = reg.exec(text)
console.log(mactches.index) // 0
console.log(mactches.input) // 'mom and dad and baby'
console.log(mactches[0]) // 'mom and dad and baby'
console.log(mactches[1]) // ' and dad and baby'
console.log(mactches[2]) // ' and baby'
```

对于 exec() 方法而言，即使在模式中设置了全局标志 (g)，它每次也只会返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用 exec() 将始终返回第一个匹配项的信息。而在设置全局标志的情况下，每次调用 exec() 则都会在字符串中继续查找新匹配项，如下面的例子：

```js
var text = 'cat, bat, sat, fat'
var reg = /.at/

var matches = reg.exex(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(matches.lastIndex) // 0

matches = reg.exex(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(matches.lastIndex) // 0

var reg = /.at/g

var matches = reg.exex(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(matches.lastIndex) // 0

matches = reg.exex(text)
console.log(matches.index) // 5
console.log(matches[0]) // bat
console.log(matches.lastIndex) // 8
```

在全局匹配模式下， lastIndex 的值在每次调用 exec() 后都会增加，而在非全局模式下则始终保持不变。

**test()方法**

##### 5.4.3 RegExp 构造函数属性

- input
- lastMatch
- lastParen
- leftContext
- multiline
- rightContext
- $1,$2...$9

##### 5.4.4 模式的局限性

### 5.5 Function 类型

##### 5.5.1 没有重载

##### 5.5.2 函数声明与函数表达式

解析器会率先读取函数声明，并使其在执行任何代码之前可用。函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

##### 5.5.3 作为值的函数

```js
function createComparisonFunction (propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]

    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else {
      return 0
    }
  }
}

// 使用
var data = [{name: 'Zac', age: 24}, {name: 'Na', age: 28}]

data.sort(createComparisonFunction('name'))
console.log(data[0].name) // Na
data.sort(createComparisonFunction('age'))
console.log(data[0].name) // Zac
```

##### 5.5.4 函数内部属性

- arguments
- this
- arguments.callee

```js
// 递归实现阶乘
function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num-1)
  }
}

// 使用 arguments.callee
function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    return num * arguments.callee(num-1)
  }
}
// 在这个重写的 factorial 函数的函数体内，没有在引用函数名 factorial。这样，无论引用函数时使用的是什么名字，都能保证正常完成递归。例如：
var trueFactorial = factorial

factorial = function () {
  return 0
}
console.log(trueFactorial(5)) // 120
console.log(factorial(5))
```

##### 函数属性和方法

属性：

- length: 表示函数希望接收到的命名参数的个数
- prototype: 所有实例方法的真正所在

方法：

- apply()
- call()
- bind(): 会创建一个函数实例
- toString(): 返回函数的代码
- toLocaleString(): 返回函数的代码

```js
window.color = 'red'
var o = {red: 'blue'}

function sayColor () {
  console.log(this.color)
}

sayColor.call(this) // red
sayColor.call(window) // red
sayColor.call(this) // blue

var objectSayColor = sayCOlor.bind(o)
objectSayColor() // blue
```

### 5.6 基本包装类型

为了便于操作基本数据类型，ECMAScript 还提供了3个特殊的引用类型: Booolean, Number 和 String。

```js
var s = 'text'
s1 = s.substring(2)
```

第二步中后台会自动完成下列处理

1. 创建 String 类型的一个实例
2. 在实例上调用指定的方法
3. 销毁这个实例

```js
// 等同于
var s = new String('text')
var s1 = s.substring(2)
s = null
```

经过此番处理，基本的字符串值就变得跟对象一样了。而且，上面这三个步骤也分别适用于 Boolean 和 Number 类型对应的布尔值和数字值。

引用类型与基本包装类型的主要区别就是对象的生存期。使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这意味着不能在运行时为基本类型值添加属性和方法。如下：

```js
var s1 = 'text'
s1.color = 'red'
alert(s1.color) // undefined
```

对基本包装类型的实例调用 `typeof` 会返回 `object`，而且所有的基本包装类型的对象都会被转换为布尔值 true。如下：

```js
var a = new String('')
typeof a // object
if (a) {
  console.log('i am true') // 会执行
}
```

Object 构造函数也会像工厂方法一样，根据传入值的类型返回相应基本包装类型的实例。例如：

```js
var obj = new Object('text')

alert(obj instanceof String) // true
```

> 注意，使用 new 调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的。例如：

```js
var value = '25'
var number = Number(value) // 转型函数
typeof number // number

var obj = new Number(value)
typeof obj // object
```

不建议显式地创建基本包装类型的对象。

##### 5.6.1 Boolean 类型

Boolean 对象在 ECMAScript 中的用处不大。

理解基本类型的布尔值与 Boolean 对象之间的区别非常重要，建议是永远不要使用 Boolean 对象

##### 5.6.2 Number 类型

toPrecision() 方法可能返回固定大小(fixed)格式，也可能返回指数(exponential)格式，具体规则是看哪种格式最合适。接收一个参数，即表示数值的所有数字的位数(不包括指数部分)

```js
var num = 99
console.log(num.toPrecision(1)) // 1e+2
console.log(num.toPrecision(2)) // 99
console.log(num.toPrecision(3)) // 99.0
```

##### 5.6.3 String 类型

141