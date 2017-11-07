# 基本概念

### 3.4 数据类型

5中简单数据类型（基本数据类型）
- Undefined：只有一个值: undefined
- Null：只有一个值: null
- Boolean
- Number
- String

1中复杂数据类型
- Object

##### 3.4.1 typeof 操作符

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
// 对未申明，未初始化的变量执行 typeof 同样返回 undefined

null == undefined // true
```

##### 3.4.4 Boolean 类型

可以通过调用 Boolean() 方法讲值转换为 Boolean 值

返回 false 的情况:
- false
- '' // 空字符串
- 0
- NaN
- null
- undefined

##### 3.4.5 Number 类型

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

##### 3.4.6 字符串类型

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

##### 3.4.7 Object 类型

Object 的每个实例都具有下列属性和方法：
- constructor
- hasOwnProperty(propertyName)
- isPrototypeOf(object)
- propertyIsEnumerable(propertyName)
- toLocaleString()
- toString()
- valueOf(): 返回对象的字符串、数值或布尔值表示。通常与 toString() 方法的返回值相同

### 3.5 操作符

##### 3.5.1 一元操作符

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

##### 3.5.2 位操作符

这节内容偏底层，没怎么在开发中用过，这里略过

##### 3.5.3 布尔操作符

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

##### 3.5.4 乘性操作符
