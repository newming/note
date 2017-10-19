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

