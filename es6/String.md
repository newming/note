# 字符串拓展

[阮一峰](http://es6.ruanyifeng.com/#docs/string)

- Unicode 表示法
- 遍历接口
- 模版字符串
- 新增方法

```js
// 1. Unicode 表示法
// JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。

"\u0061"
// "a"
// 但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。其中十六进制转为十进制为65535

"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"

// 上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。

// ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
// 上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。

// 有了这种表示法之后，JavaScript 共有6种方法可以表示一个字符。

'\z' === 'z'  // true
'\172' === 'z' // true 八进制，省略0前导
'\x7A' === 'z' // true 十六进制
'\u007A' === 'z' // true unicode
'\u{7A}' === 'z' // true

// 2. codePointAt()
// ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。

// 3. String.fromCodePoint()
// 与codePointAt方法相反，将 UTF-16 的转为字符，可以识别大于 0xFFFF 的
// codePointAt <=> fromCodePoint es6 新增识别 32 位的方法(四个字节)
// charCodeAt <=> fromCharCode 只能识别 16 的(两个字节)

// 4. 遍历器接口 for...of
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
// 可以识别大于 0xFFFF 的码点，传统的 for 无法识别
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
// 上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符。

// 5. at()
// ES5 对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。

'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"
// 上面代码中，charAt方法返回的是UTF-16编码的第一个字节，实际上是无法显示的。

// 目前，有一个提案，提出字符串实例的at方法，可以识别 Unicode 编号大于0xFFFF的字符，返回正确的字符。

'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"

// 6. normalize()
// 用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化

// 7. includes(), startsWith(), endWith()
// 传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

// 这三个方法都支持第二个参数，表示开始搜索的位置。
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
// 上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

// 8. repeat()
// repeat方法返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

// 参数如果是小数，会被取整。
'na'.repeat(2.9) // "nana"

// 如果repeat的参数是负数或者Infinity，会报错。
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError

// 但是，如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于-0，repeat视同为0。
'na'.repeat(-0.9) // ""

// 参数NaN等同于0。
'na'.repeat(NaN) // ""

// 如果repeat的参数是字符串，则会先转换成数字。
'na'.repeat('na') // "" na -> NaN -> 0
'na'.repeat('3') // "nanana"

// 9. padStart()，padEnd()
// ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
// 上面代码中，padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

// 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

// 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
'abc'.padStart(10, '0123456789')
// '0123456abc'

// 如果省略第二个参数，默认使用空格补全长度。
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

// padStart的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

// 另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

// 10. 模板字符串
// 这里强调一点：模板字符串可以表示多行字符串，所有的空格和缩紧都会被保留在输出之中，而传统的 '' 不可以换行

// 11. 实例：模板编译
// 太难看不懂唉，等着

// 12. 标签模版
let user = {
  name: 'newming',
  sex: 1
}

function tag(s, v1, v2) {
  console.log(s, v1, v2)
  return s[0] + v1 + s[1] + v2 + s[3]
}
console.log(tag`hello, i am ${user.name},and i am a ${user.sex ? 'boy' : 'girl'}`)

// 13. String.raw()
// ES6还为原生的String对象，提供了一个raw方法。

// String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

 
// "Hi\\n5!"

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'
// 如果原字符串的斜杠已经转义，那么String.raw不会做任何处理。

String.raw`Hi\\n`
// "Hi\\n"
// String.raw的代码基本如下。

String.raw = function (strings, ...values) {
  let output = "";
  for (let index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
// String.raw方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

// String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。

String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'

// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
```