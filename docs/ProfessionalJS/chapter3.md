# 基本概念

## 3.4 数据类型

5中简单数据类型（基本数据类型）
- Undefined：只有一个值: undefined
- Null：只有一个值: null
- Boolean
- Number
- String

1中复杂数据类型
- Object

### 3.4.1 typeof 操作符

可能返回的结果:
- undefined
- boolean
- string
- number
- object: null 或对象，注意对象包括的东西很多，比如日期，数组，正则等
- function

```js
var message
typeof message // undefined
typeof age // undefined
// 对未声明，未初始化的变量执行 typeof 同样返回 undefined

null == undefined // true
```

### 3.4.4 Boolean 类型

可以通过调用 Boolean() 方法讲值转换为 Boolean 值

返回 false 的情况:
- false
- '' // 空字符串
- 0
- NaN
- null
- undefined

### 3.4.5 Number 类型

1. 浮点数值精度远远不如整数， 0.1 + 0.2 != 0.3
2. 数值范围: Number.MAX_VALUE - Number.MIN_VALUE，超出后为 +/- Infinity
3. NaN: NaN == NaN // false，可以通过 isNaN 判断是否不是数值
4. 数值转换: Number()可以用于任何数据类型, parseInt()、parseFloat() 用于字符串。而且转换规则也不相同，转换结果不一定相同(P30)

例如：Number 转换的结果：

- Boolean: 0,1
- Number: Number, 3 -> 3, 3.400 -> 3.4
- null: 0
- undefined: NaN
- String: number/NaN,'0.3' -> 0.3, '3x' -> NaN
- Object: NaN

parseInt/ParseFloat:只有两种结果：number/NaN，例如: parseInt('123blue') -> 123, parseInt('aaa123blue') -> NaN

### 3.4.6 字符串类型

1.字符字面量

| 字面量 | 含义 |
| --- | --- |
| \n | 换行 |
| \t | 制表(tab) |
| \b | 退格 |
| \r | 回车 |
| \f | 进纸 |
| \\ | 斜杠 |
| \' | 单引号 |
| \" | 双引号 |
| \xnn | 以十六进制代码 nn 表示的一个字符，n 为 0-f，例如：'\x41' -> A |
| \unnnn | 以十六进制代码 nnnn 表示的一个 Unicode 字符，n 为 0-f，例如：'\u03a3' -> "Σ" |

2.转换为字符串：
1. toString()
2. String()

数值、布尔值、对象和字符串值都有 `toString()` 方法，null、undefined 没有该方法。

在调用数字的 `toString()` 方法时也可以传递一个参数，将返回该数值其他进制表示的字符串。例如：10.toString() -> '10', 10.toString(2) -> '1010'

在不知道要转换的值是否为 null, undefined，可以使用转型函数 String()，该函数能够将任何数据类型转换为字符串，遵循以下规则。
1. 如果值有 `toString()` 方法，则调用该方法并返回结果
2. null: 'null'
3. undefined: 'undefined'

### 3.4.7 Object 类型

Object 的每个实例都具有下列属性和方法：
- constructor
- hasOwnProperty(propertyName)
- isPrototypeOf(object)
- propertyIsEnumerable(propertyName)
- toLocaleString()
- toString()
- valueOf(): 返回对象的字符串、数值或布尔值表示。通常与 toString() 方法的返回值相同

## 3.5 操作符

### 3.5.1 一元操作符

1. 递增和递减操作符

```js
// 前置
let num1 = 2
let num2 = 20
let num3 = --num1 + num2 // 21
let num4 = num1 + num2 // 21

// 后置
let num1 = 2
let num2 = 20
let num3 = num1-- + num2 // 22
let num4 = num1 + num2 // 21
```

2. 一元加和减操作符

```js
let num = 25
num = +num // 25

// 对于非数值应用一元 加 操作符时会调用 Number() 进行数据类型转换
// 对于非数值应用一元 减 操作符时会调用 Number() 进行数据类型转换，然后在将得到的数据转换为负数
```

### 3.5.2 位操作符

这节内容偏底层，没怎么在开发中用过，这里略过

### 3.5.3 布尔操作符

1. 逻辑非

逻辑非操作符由一个叹号(!)表示，可以应用与 ECMAScript 中的任何值。无论这个值是什么数据类型，这个操作符都会返回一个布尔值。逻辑非操作符首先会将它操作的值转为一个布尔值，然后在对其求反。

也可以同时使用两个逻辑非操作符，实现 Boolean() 功能

2. 逻辑与(&&)

逻辑与操作符由两个 `&` 表示，有两个操作数

```js
let result = true && false
```

逻辑与操作可以应用与任何数据类型的操作数，而不仅仅是布尔值。再有一个操作数不是布尔值的情况下，逻辑与操作就不一定返回布尔值；遵循以下规则：

- 如果第一个操作数是对象，则返回第二个操作数
- 如果第二个操作数是对象，则只有在第一个操作数的求职结果为 true 的情况下才会返回该对象
- 如果两个操作数都是对象，则返回第二个操作数
- 如果第一个操作数为 NaN，则返回 NaN
- 如果有第个操作数是 undefined，则返回 undefined

逻辑与操作属于短路操作，即如果第一个参数能够决定结果，就不会在往下走了，不会对第二个操作数进行求值。如果第一个操作数是 false,则无论第二个操作数是什么值，结果都不再可能是 true 了。

```js
false && aaa // false
null && aaa // null
undefined && aaa // undefined
0 && aaa // 0
'' && aaa '' // ""
true && aaa // 报错
```

3. 逻辑或(||)

通上(&&)，也是短路操作，如果第一个是 true，就返回第一个操作数，不会继续往下走

### 3.5.4 乘性操作符

1. 乘法(*)

如果又一个操作数不是数值，则在后台调用 Number() 将其转换为数值

2. 除法(/)

如果是非零的有限数被除零，则结果是 Infinity 或 -Infinity

3. 求模(%)

```js
let res = 26 % 5 // 1
```

### 3.5.5 加性操作符

1. 加法

如果两个操作符都是数值，执行常规的加法计算

如果有一个操作数是字符串，就会进行字符串拼接

如果有一个操作数是对象则调用他的 toString() 方法取到相应的字符串值，布尔值则转为数字进行求和，对于 null 和 undefined 则调用 String()——此处（67页）有误

使用加法需要谨慎，因为他有字符串拼接的作用

```js
let a = 5, b = 10
console.log('the result is' + a + b)
console.log('the result is' + (a + b))
```

2. 减法

不是数字会尝试转数字

### 3.5.6 关系操作符

<, >, <=, >= 这几个关系操作符都会返回布尔值

- 两个操作数都是数值，则执行数值比较
- 两个操作数都是字符串，则比较两个字符串对应的字符串编码值
- 如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较
- 如果一个操作数是对象，则调用这个对象的 valueOf() 方法，用得到的结果按照前面的规则执行比较。如果对象没有 valueOf() 方法，则调用 toString() 方法，并用得到的结果根据前面的规则进行比较
- 如果一个操作数是布尔值，则将其转换为数值，然后执行比较
- 任何操作数与 NaN 进行关系比较，结果都是 false

```js
"23" < "3" // true
"23" < 3 // false

"a" < 3 // false "a" -> NaN
"a" > 3 // false

" " < 3 // true "" -> 0
```

### 3.5.7 相等操作符

1. 相等和不相等 == 和 !=

- 如果有一个操作数是布尔值，则在比较之前先将其转化为数值，false为0，true为1
- 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值
- 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf() 方法，用得到的基本类型值按照前面的规则进行比较
- null 和 undefined 是相等的
- 在比较相等性之前，不能将 null 和 undefined 转换成其他任何值
- 如果有一个操作数是 NaN，则相等操作符返回 false，而不相等操作符返回 true，NaN 不等于 NaN
- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等

2. 全等和不全等 === 和 !==

在比较之前不转换操作数，其余同相等和不相等操作符相同。

```js
null == undefined // true
null === undefined // false
```

### 3.5.8 条件操作符(三目运算符)

```js
var a = b > 3 ? 1 : 0
```

### 3.5.9 赋值操作符(=)

简单的赋值操作(=)将右侧的值赋给左侧的变量

复合赋值操作: *=, /=, %=, +=, -=, <<=, >>=, >>>=。设计这些操作符的主要目的就是简化赋值操作，使用它们不会带来任何性能提升。

### 3.5.10 逗号操作符

使用逗号操作符可以在一条语句中执行多个操作，如下面的例子所示：

```js
var a = 1, b = 2, c = 3;
```

> 逗号操作符多用于声明变量；但除此之外，逗号操作符还可以用于赋值。在用于赋值的时候，逗号操作符总会返回表达式中的最后一项。

```js
var num = (5, 1, 4, 8); // num 的值为 0
```

## 3.6 语句

### 3.6.1 if 语句

```js
// 推荐写法，其他各种省略不要写
if (condition1) {
  statement1
} else if (condition2) {
  statement2
} else {
  statements
}
```

### 3.6.2 do-while 语句

do-while 语句是一种后测试循环语句，即只有循环体中的代码执行之后，才会测试出口条件。换句话说，在对条件表达式求值之前，循环体内的代码至少会被执行一次。

```js
do {
  statement
} while (expression)
```

### 3.6.3 while 语句

while 语句属于前测试循环语句。

```js
while (expression) statement
```

### 3.6.4 for 语句

for 语句属于前测试循环语句。但它具有在执行之前初始化变量和定义循环后要执行的代码的能力。

> 使用 while 循环做不到的，使用 for 循环也同样做不到。

```js
for (;;) {
  doSomething() // 无限循环
}

// 同 while
var count = 10
var i = 0
for (; i < count; ) {
  alert(i)
  i ++
}
```

### 3.6.5 for-in 语句

for-in 语句是一种精准的迭代语句，可以用来枚举对象的属性。

```js
for (property in expression) statement
```

### 3.6.6 label 语句

使用 label 语句可以在代码中添加标签，以便将来使用。

```js
label: statement

// example
start: for (var i=0; i< 10; i++) {
  alert(i)
}
// 这个例子中定义的 start 标签可以在将来由 break 或 continue 语句引用。加标签的语句一般都要与 for 语句等循环语句配合使用。
```

这个没用过，[mdn 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)

### 3.6.7 break 和 continue 语句

注意 break 和 continue 的区别。前者是立即退出循环，后者是进行下次循环代码。

### 3.6.8 with 语句

`with` 语句的作用是将代码的作用域设置到一个特定的对象中。

```js
with (expression) statement;
```

定义 `with` 语句的目的只要是为了简化多次编写同一个对象的工作，如下面的例子所示：

```js
var qs = location.search.substring(1)
var hostname = location.hostname
var url = location.href

// 使用 with 语句简化
with (location) {
  var qs = search.substring(1)
  var hostname = hostname
  var url = href
}
```

这里在 with 语句的代码块中，每个变量首先会被认为是一个局部变量，而如果局部环境中找不到该变量的定义，就会查询 location 对象中是否具有同名属性，如果有则将这个属性值当作变量的值。

> 严格模式下不允许使用 with 语句，否则将视为语法错误。

### 3.6.9 switch 语句

> 注意 switch 语句在比较值时使用的是全等操作符，因此不会发生类型转换。

## 3.7 函数

### 3.7.1 理解参数

### 3.7.2 理解参数

## 3.8 小节