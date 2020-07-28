# 引用类型

ECMAScript 提供了很多原生引用类型（例如Object），以便于开发人员用以实现常见的计算任务。

## 5.1 Object 类型

- new Object()
- var a = {}

## 5.2 Array 类型

```js
var arr = [1, 2, 3]
arr.length = 2 // length 不是只读的，会将3移除
```

### 5.2.1 检测数组

```js
// 1. instanceof
value instanceof Array

// 2 Array.isArray(value)
```

### 5.2.2 转换方法

- toString()
- toLocaleString()

### 5.2.3 栈方法

```js
// push()
// pop()
```

### 5.2.4 队列方法

```js
// shift() // 删除第一项
// unshift // 向第一项添加
```

### 5.2.5 重排序方法

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

### 5.2.6 操作方法

- concat
- slice
- splice


### 5.2.7 位置方法

- indexOf
- lastIndexOf

### 5.2.8 迭代方法

- every
- filter
- forEach
- map
- some

### 5.2.9 缩小方法

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

### 5.3.1 继承的方法

- toString()
- toLocaleString()
- valueOf() 返回毫秒数

### 5.3.2 日期格式化方法

- toDateString()
- toTimeString()
- toLocaleDateString()
- toLocaleTimeString()
- toUTCString()

### 5.3.3 日期/时间组件方法

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

## 5.4 RegExp 类型

> var expression = /pattern/flags

模式中使用的所有元字符都必须转义。元字符包括：( [ { \ ^ $ | } ? * + . ] )

### 5.4.1 RegExp 实例属性

- global
- ignoreCase
- lastIndex: 整数，表示开始搜索下一个匹配项的字符位置，从0算起
- multiline
- source

```js
var reg = /a/g

alert(reg.global)
```

### RegExp 实例方法

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

### 5.4.3 RegExp 构造函数属性

- input
- lastMatch
- lastParen
- leftContext
- multiline
- rightContext
- $1,$2...$9

### 5.4.4 模式的局限性

## 5.5 Function 类型

### 5.5.1 没有重载

### 5.5.2 函数声明与函数表达式

解析器会率先读取函数声明，并使其在执行任何代码之前可用。函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

### 5.5.3 作为值的函数

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

### 5.5.4 函数内部属性

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

### 函数属性和方法

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

## 5.6 基本包装类型

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

> 考点啊：引用类型与基本包装类型的主要区别就是对象的生存期。使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这意味着不能在运行时为基本类型值添加属性和方法。如下：

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

### 5.6.1 Boolean 类型

Boolean 对象在 ECMAScript 中的用处不大。

理解基本类型的布尔值与 Boolean 对象之间的区别非常重要，建议是永远不要使用 Boolean 对象

### 5.6.2 Number 类型

toPrecision() 方法可能返回固定大小(fixed)格式，也可能返回指数(exponential)格式，具体规则是看哪种格式最合适。接收一个参数，即表示数值的所有数字的位数(不包括指数部分)

```js
var num = 99
console.log(num.toPrecision(1)) // 1e+2
console.log(num.toPrecision(2)) // 99
console.log(num.toPrecision(3)) // 99.0
```

### 5.6.3 String 类型

**字符串操作方法**

- slice: 第一个参数指定子字符串的开始位置，第二个参数指定的是子字符串最后一个字符后面的位置
- substr: 第一个参数指定子字符串的开始位置，第二个参数指定的是返回的字符个数。
- substring: 第一个参数指定子字符串的开始位置，第二个参数指定的是子字符串最后一个字符后面的位置


```js
var str = 'hello world'
str.slice(3) // 'lo world'
str.substring(3) // 'lo world'
str.substr(3) // 'lo world'

str.slice(3, 7) // 'lo w'
str.substring(3, 7) // 'lo w'
str.substr(3, 7) // 'lo worl'
```

当这三个方法的参数是负数的时候:

- slice: 会将传入的负值与字符串的长度相加
- substr: 将负的第一个参数加上字符串的长度，而将负的第二个参数转换为0
- substring: 会把所有负值参数都转换为0

```js
var str = 'hello world'
str.slice(-3) // 'rld'
str.substring(-3) // 'hello world'
str.substr(-3) // 'rld'

str.slice(3, -4) // 'lo w' 相当于 (3, 7)
str.substring(3, -4) // 'hel' 相当于 (3, 0) -> (0, 3)
str.substr(3, -4) // '' 相当于 (3, 0)
```

**字符串位置方法**

- indexOf
- lastIndexOf

通过循环调用 indexof 或者 lastIndexof 来找到所有匹配的子字符串:

```js
var str = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates ex perferendis id expedita repellat in ad aliquid, libero a nulla provident cumque recusandae quas quia aperiam, modi illo vitae molestias!'

var positions = []
var pos = str.indexOf('e')

while (pos > -1) {
  positions.push(pos)
  pos = str.indexOf('e', pos + 1) // 跳过多少位
}

console.log(positions)
```

**字符串的模式匹配方法**

- match
- search
- split
- replace

replace 的第二个参数如果是字符串，可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中:

| 字符序列 | 替换文本 |
| ------- | ------- |
| $$ | $ |
| $& | 插入匹配的子串 |
| $` | 插入当前匹配的子串左边的内容 |
| $' | 插入当前匹配的子串右边的内容 |
| $n | 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始 |

## 5.7 单体内置对象

ECMA-262 对内置对象的定义是：“由ECMAScript实现提供的、不依赖于宿主环境的对象，这些对象在ECMAScript程序执行之前就已经存在了”。意思就是说，开发人员不必显示地实例化内置对象，因为它们已经实例化了。例如 Object、Array 和 String。另外还有 Global 和 Math

### 5.7.1 Global 对象

Global(全局)对象可以说是 ECMAScript 中最特别的一个对象，因为不管从什么角度去看，这个对象都是不存在的。ECMAScript 中的 Global 对象在某种意义上是作为一个终极的“兜底对象”来定义的。换句话说，不属于任何其他对象的属性和方法，最终都是它的属性和方法。事实上，没有全局变量或全剧函数，所有在全局作用域中定义的属性和函数，都是 Global 对象的属性。例如 isNaN()、isFinite()、parseInt()等，除此之外，Global对象还包含其他一些方法。

**1. URI编码方法**

- encodeURI(): 主要用于整个URI，不会对本身属于URI的特殊字符进行编码，例如 冒号(:)、正斜杆(/)、问号(?)和井字号(#)
- encodeURIComponent(): 主要对URI中的某一段，会对它发现的任何非标准字符进行编码

```js
var url = 'https://www.baidu.com/path?q=1&s=8?哈 呵'

encodeURI(url)
// "https://www.baidu.com/path?q=1&s=8?%E5%93%88%20%E5%91%B5"

encodeURIComponent(url)
// "https%3A%2F%2Fwww.baidu.com%2Fpath%3Fq%3D1%26s%3D8%3F%E5%93%88%20%E5%91%B5"
```

- decodeURI(): 只能对使用 encodeURI() 替换的字符进行解码。如 %20 替换为空格，但是对 %23 就不作处理，因为 %23 代表 #，而 encodeURI 不会替换 #
- decodeURIComponent(): 能够解码使用 encodeURIComponent() 编码的所有字符

**2. eval()方法**

ECMAScript 语言中最强大的一个方法。eval方法就像是一个完整的 ECMAScript 解释器，接受一个参数，即要执行的 ECMAScript(或JavaScript) 字符串。

eval() 执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与该执行环境相同的作用域链。这意味着通过 eval() 执行的代码可以引用在包含环境中定义的变量：

```js
var msg = 'hello'
eval('alert(msg)') // 'hello'

function test () {
  var x = 'world'
  eval('alert(x)') // 'world'
}
```

在 eval() 中调用定义一个函数或者变量，在外部中可以引用:


```js
eval('function sayHi () {alert("Hi");}')
sayHi() // 'Hi'

eval('var a = 100;')
alert(a) // 100
```

> 注意，在eval中创建的任何变量和函数都不会被提升，因为在解析代码的时候，它们被包含在一个字符串中，只在 eval 执行的时候创建

> 严格模式下，外部访问不到 eval 中创建的任何变量或函数，即上边两个例子将导致错误。同时在严格模式下，为 eval 赋值将导致错误

```js
"use strict";
eval = 'hi' // Uncaught SyntaxError: Unexpected eval or arguments in strict mode
```

**3. Global对象的属性**

- undefined
- NaN
- Infinity
- Object
- Array
- Function
- Boolean
- String
- Number
- Date
- RegExp
- Error
- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TyprError
- URIError

ES5明确禁止给 undefined、NaN 和 Infinity 赋值，即使是非严格模式下也会报错

**4. window对象**

ECMAScript 虽然没有指出如何直接访问 Global 对象，但 web 浏览器都是将这个全局对象作为 window 对象的一部分加以实现的。因此，在全局作用域中声明的所有变量和函数，就都成为了 window 对象的属性。

### 5.7.2 Math 对象

## 5.8 小结