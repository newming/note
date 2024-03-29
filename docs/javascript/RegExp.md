# 正则表达式

正则就是一个规则，用来处理字符串的一个规则，注意只能用来处理字符串。

- 判断一个字符串是否符合我们制定的规则 -> reg.test(str)
- 把字符串中符合我们的规则的内容捕获到 -> reg.exec(str)

## 创建正则

```js
// 字面量方式
var reg = /\d/;

// 实例创建方式
var reg = new RegExp("d");
// 这里需要注意的是这两种创建方式是有区别的。这个与对象、数组等表现的不一样。
```

每一个正则表达式都是由元字符和修饰符组成的。

元字符是指在 `//` 之间的具有意义的一些字符。

1.具有特殊意义的元字符：

- \ :转义字符，转译后面字符所代表的含义
- ^ :以某一个元字符开始，不占位置
- \$ :以某一个元字符结尾，不占位置

  2.代表出现次数的量词元字符：

- \*:匹配前面的子表达式零次或多次
- +:匹配前面的子表达式一次或多次
- ?:匹配前面的子表达式零次或一次
- {n}:n  是一个非负整数。匹配确定的  n  次
- {n,}:n  是一个非负整数。至少匹配 n  次
- {n,m}:m  和  n  均为非负整数，其中 n<=m。最少匹配  n  次且最多匹配  m  次
- .:匹配除  "\n"  之外的任何单个字符，若要匹配小数点，需要转译 `\.`
- ():分组，把一个大的正则划分成几个小的正则
- x|y:匹配 x 或 y
- [xyz]:字符集合。匹配所包含的任意一个字符
- [^xyz]:负值字符集合。匹配未包含的任意字符
- [a-z]:可以匹配  'a'  到  'z'  范围内的任意小写字母字符
- [^a-z]:可以匹配除了  'a'  到  'z'  范围内的任意字符
- \d:一个 0-9 之间的数字
- \D:除了 0-9 之间的任意一个字符
- \b:匹配一个单词边界，也就是指单词和空格间的位置
- \w:匹配包括下划线的任何单词字符。等价于'[A-Za-z0-9_]'
- \W:匹配任何非单词字符。等价于  '[^a-za-z0-9_]'
- \s:匹配任何空白字符，包括空格、制表符、换页符等等。等价于  [ \f\n\r\t\v]
- \n:匹配一个换行符

## 两种正则创建方式的区别

```js
var name = 'newming'
// 错误示例，无法将name这个变量拼到正则中
var reg = /^\d+"+name+"\d+$/g;
reg.test('1234newming4321') // false
reg.test('1234"""nameeee"4321') // true
// 1.在字面量方式中，//之间包起来的所有内容都是元字符，有的具有特殊意义，大部分都是代表本身含义的普通的元字符，如果需要字符串拼接，只能用实例创建方式
var reg = new RegExp("^\\d+" + name + "\\d+$", "g") // 这里要注意如果只是单写 \d 的话，会被认为是单纯的字符串，需要在加一个 \ 进行转义
reg.test('1234newming4321') // true
reg.test('1234"""nameeee"4321') // false

区别：
  1.字面量方式中出现的一切都是元字符，所以不能进行变量值的拼接，而实例创建的可以
  2.字面量中直接写 \d 就可以，但是在实例创建中需要把它转义 \\d
```

## 正则应用

```js
// 1.简单验证手机
var reg = /^1\d{10}/;

// 2.有效数字的正则（正数，负数，0，小数）
// 12,+12,-12,12.3,0.2
// '.'可以出现也可以不出现，但是一但出现，后面必须跟着一位或多位数字 /(\.\d+)?/
// 最开始可以有 +/- ，可以没有 /^[+-]?/
// 整数部分，一位数可以是0-9中的一个，多位数不能以0开头 /^(\d|([1-9]\d+))$/
var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;
// 注意：在中括号中出现的字符都是代表本身意思的字符，没有特殊含义

// 3.年龄介于18~65之间
var reg = /^[18-65]$/; // 这种不行，中括号不识别两位数。
// 例如 /^[12-68]$/，实际是1，2-6之间的一个，8三个中的一个
// /^[\w-]$/ 匹配数字，字母，下划线，- 中的一个，发现如果 - 的右边没有东西的话，就是代表 - 的本身意思，不是连接符
// 划分为三个部分18-19,20-59,60-65
var reg = /^(1[8-9]|[2-5]\d|6[0-5])$/;
console.log(reg.test(45));

// 4.验证邮箱
// 简版
var reg = /^[\w.-]+@[0-9a-zA-Z]+(\.[a-zA-Z]{2,4}){1,2}$/;

// 5.中国标准真实姓名验证 2-4为姓名
var reg = /^[\u4e00-\u9fa5]{2,4}$/;

// 6.身份证号码(简版)
// 18位，最后一位是数字或大写X
var reg = /^\d{17}(\d|X)$/;
```

### 分组案例

```js
var reg = /^\d+newming\d+$/;
reg.test("1234newming4321"); // true

var reg = /^(\d+)newming(\d+)$/;
reg.test("1234newming4321"); // true
```

## 分组的作用一：改变 x|y 默认的优先级

```js
var reg = /^18|19$/;
// 可以匹配 18，19，181，189,1819,819,119，默认的 | 匹配优先级比较混乱

var reg = /^(18|19)$/;
// 只能匹配18或19
```

## 分组的作用二：分组引用

```js
// \1代表和第一个分组出现的内容一模一样，\2代表出现的内容和第二个分组的内容一模一样，注意要在有这个分组后才可以用。这里要注意是一模一样
var reg = /^(\w)\1(\w)\2$/;
console.log(reg.test("nnmm")); // true
console.log(reg.test("n0m3")); // false
```

## 分组的作用三：分组捕获

正则在捕获的时候不仅仅把大正则匹配的内容捕获到，还可以把小分组匹配的内容捕获到

```js
var reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|X)$/;
var str = "130722199311032517";
console.log(reg.exec(str)); // ["130722199311032517", "13", "0722", "1993", "11", "03", "25", "1", "7", index: 0, input: "130722199311032517"]
// 第一个是所有分组捕获到的内容，之后分别是每个小的分组捕获到的内容
var reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(?:\d{2})(\d)(\d|X)$/;
var str = "130722199311032517";
console.log(reg.exec(str)); // ["130722199311032517", "13", "0722", "1993", "11", "03", "1", "7", index: 0, input: "130722199311032517"] 注意结果少了 25
// ?: 在分组中的作用，只匹配，不捕获
```

## 正则捕获

exec 正则捕获方法。捕获到的内容是一个数组。每一次捕获的时候都是先进行默认的匹配，如果没有匹配成功的，捕获的结果为 null，只有有匹配的内容才能捕获到数组。

- 数组第一项是当前捕获的内容
- index: 捕获内容在字符串中开始的索引
- input: 原始字符串

正则捕获的特点：

- 懒惰性，每次执行 exec 方法只捕获第一个匹配的内容，通过在结尾加 /g 修饰符解决
- 贪婪性，正则的捕获每次都是按匹配最长的结果

修饰符： g, i, m

### 懒惰性

懒惰性：加了全局修饰符 g，正则每一次捕获结束后，正则的 lastIndex 值都会变成最新的值，下一次捕获从最新的位置开始查找，通过这样的方式，可以把所有需要捕获的内容获取到

```js
var reg = /\d+/g;
console.dir(reg);
var str = "new1993ming1103";

console.log(reg.lastIndex); // 0
console.log(reg.exec(str)); // ["1993", index: 3, input: "new1993ming1103"]

console.log(reg.lastIndex); // 7
console.log(reg.exec(str)); // ["1103", index: 11, input: "new1993ming1103"]

console.log(reg.lastIndex); // 15
console.log(reg.exec(str)); // null

// 捕获并保存全部的数据
var res = [];
var test = reg.exec(str);
while (test) {
  res.push(test[0]);
  test = reg.exec(str);
}
console.log(res);
```

### 贪婪性

```js
var reg = /\d+/;
var str = "newming1993";
console.log(reg.exec(str)); // 1993 贪婪性，捕获匹配到最长的结果
```

如何解决=>在量词元字符后面加 ?

```js
var reg = /\d+?/;
var str = "newming1993";
console.log(reg.exec(str)); // 1
```

? 在正则中的多个意思

```js
var reg = /\d?/; // 放在普通元字符后面，代表出现0-1次
var reg = /\d+?/; // 放在量词元字符后面，代表取消捕获时的贪婪性
```

### 字符串中的 match 方法

把所有和正则匹配的字符都获取到。但是 match 方法也有它的局限性，在分组捕获的情况下，match 只能捕获到大正则匹配的内容，而小正则匹配的内容是无法捕获的

```js
var reg = /\d+?/g;
var str = "newming1993and1103";
var ary = str.match(reg);
console.log(ary);

var reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(?:\d{2})(\d)(\d|X)$/;
var str = "130723199311043517";
console.log(str.match(reg)); // ["130723199311043517", "13", "0723", "1993", "11", "04", "1", "7", index: 0, input: "130722199311043517"] 同正则捕获一样

// 不同点
var reg = /newming(\d+)/g;
var str = "newming123newming456newming789";

console.log(reg.exec(str)); // ["newming123", "123", index: 0, input: "newming123newming456newming789"]
console.log(reg.exec(str)); // ["newming456", "456", index: 10, input: "newming123newming456newming789"]
console.log(reg.exec(str)); // ["newming789", "789", index: 20, input: "newming123newming456newming789"]
// 这里执行三次exec，每一次不仅仅把大正则捕获到，还会捕获到小正则

console.log(str.match(reg)); // ["newming123", "newming456", "newming789"]
// match 执行一次就可以将大正则所有内容捕获，不会再去捕获小正则
```
