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

##### 3.4.6

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

