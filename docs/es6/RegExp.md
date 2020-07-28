# 正则拓展

[阮一峰 正则](http://es6.ruanyifeng.com/#docs/regex)

- 构造函数的变化
- 正则方法的拓展
- u 修饰符
- y 修饰符
- s 修饰符

```js
// 1. 构造函数的变化
// 在 ES5 中，RegExp构造函数的参数有两种情况。
// 第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

// 第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

// 但是，ES5 不允许此时使用第二个参数添加修饰符，否则会报错。
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

// ES6 改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
new RegExp(/abc/ig, 'i').flags
// "i"
// 上面代码中，原有正则对象的修饰符是ig，它会被第二个参数i覆盖。

// 2. 正则方法拓展
// 字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。
// ES6 将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
String.prototype.match 调用 RegExp.prototype[Symbol.match]
String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
String.prototype.search 调用 RegExp.prototype[Symbol.search]
String.prototype.split 调用 RegExp.prototype[Symbol.split]

// 3. u 修饰符
// ES6 对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
// 大于\uFFFF的 Unicode 字符即为占两个字节的字符。例如 '𠮷'.length = 2，他的 unicode 码为 '\uD83D\uDC2A'
// 要注意 '.' 是匹配除换行符和行结束符等的单个字符，无法匹配大于 \uFFFF 的字符
/^.$/.test('𠮷') // false

// 4. y 修饰符
// y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
// 实际上，y修饰符号隐含了头部匹配的标志^。

// 在split方法中使用y修饰符，原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。
// 没有找到匹配
'x##'.split(/#/y)
// [ 'x##' ]
// 找到两个匹配
'##x'.split(/#/y)
// [ '', '', 'x' ]
// 后续的分隔符只有紧跟前面的分隔符，才会被识别。
'#x#'.split(/#/y)
// [ '', 'x#' ]
'##'.split(/#/y)
// [ '', '', '' ]

// 5. s 修饰符
// 正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是行终止符（line terminator character）除外。
// 以下四个字符属于”行终止符“。

// U+000A 换行符（\n）
// U+000D 回车符（\r）
// U+2028 行分隔符（line separator）
// U+2029 段分隔符（paragraph separator）
// 上面代码中，因为.不匹配\n，所以正则表达式返回false。

// 但是，很多时候我们希望匹配的是任意单个字符，这时有一种变通的写法。
/foo[^]bar/.test('foo\nbar')
// true

// 通过引入/s修饰符，使得.可以匹配任意单个字符，进入 dotAll 模式。但目前只是一个提案
/foo.bar/s.test('foo\nbar') // true
```

### 新增正则属性

```js
// 1. sticky 属性
// 与y修饰符相匹配，ES6 的正则对象多了sticky属性，表示是否设置了y修饰符。
var r = /hello\d/y;
r.sticky // true

// 2. flags 属性
// ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。

// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'

// 3. dotAll
// 这被称为dotAll模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个dotAll属性，返回一个布尔值，表示该正则表达式是否处在dotAll模式。

const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar') // true
re.dotAll // true
re.flags // 's'
```