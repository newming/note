(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{418:function(s,t,a){"use strict";a.r(t);var n=a(40),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"正则拓展"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#正则拓展"}},[s._v("#")]),s._v(" 正则拓展")]),s._v(" "),a("p",[a("a",{attrs:{href:"http://es6.ruanyifeng.com/#docs/regex",target:"_blank",rel:"noopener noreferrer"}},[s._v("阮一峰 正则"),a("OutboundLink")],1)]),s._v(" "),a("ul",[a("li",[s._v("构造函数的变化")]),s._v(" "),a("li",[s._v("正则方法的拓展")]),s._v(" "),a("li",[s._v("u 修饰符")]),s._v(" "),a("li",[s._v("y 修饰符")]),s._v(" "),a("li",[s._v("s 修饰符")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1. 构造函数的变化")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在 ES5 中，RegExp构造函数的参数有两种情况。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xyz'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'i'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 等价于")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/xyz/i")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/xyz/i")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 等价于")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/xyz/i")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 但是，ES5 不允许此时使用第二个参数添加修饰符，否则会报错。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/xyz/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'i'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ES6 改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/abc/ig")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'i'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("flags\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// "i"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 上面代码中，原有正则对象的修饰符是ig，它会被第二个参数i覆盖。")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2. 正则方法拓展")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ES6 将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("match 调用 "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Symbol"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("match"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("replace 调用 "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Symbol"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("replace"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("search 调用 "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Symbol"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("search"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("split 调用 "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Symbol"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("split"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3. u 修饰符")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ES6 对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于\\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 大于\\uFFFF的 Unicode 字符即为占两个字节的字符。例如 '𠮷'.length = 2，他的 unicode 码为 '\\uD83D\\uDC2A'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 要注意 '.' 是匹配除换行符和行结束符等的单个字符，无法匹配大于 \\uFFFF 的字符")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("$"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'𠮷'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// false")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 4. y 修饰符")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" s "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'aaa_aa_a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" r1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/a+/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" r2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/a+/y")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nr1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// ["aaa"]')]),s._v("\nr2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// ["aaa"]')]),s._v("\n\nr1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// ["aa"]')]),s._v("\nr2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// null")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 实际上，y修饰符号隐含了头部匹配的标志^。")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在split方法中使用y修饰符，原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 没有找到匹配")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'x##'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/#/y")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// [ 'x##' ]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 找到两个匹配")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'##x'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/#/y")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// [ '', '', 'x' ]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 后续的分隔符只有紧跟前面的分隔符，才会被识别。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'#x#'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/#/y")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// [ '', 'x#' ]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'##'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/#/y")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// [ '', '', '' ]")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 5. s 修饰符")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是行终止符（line terminator character）除外。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 以下四个字符属于”行终止符“。")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// U+000A 换行符（\\n）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// U+000D 回车符（\\r）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// U+2028 行分隔符（line separator）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// U+2029 段分隔符（paragraph separator）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 上面代码中，因为.不匹配\\n，所以正则表达式返回false。")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 但是，很多时候我们希望匹配的是任意单个字符，这时有一种变通的写法。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("bar"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'foo\\nbar'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 通过引入/s修饰符，使得.可以匹配任意单个字符，进入 dotAll 模式。但目前只是一个提案")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("bar"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'foo\\nbar'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br"),a("span",{staticClass:"line-number"},[s._v("59")]),a("br"),a("span",{staticClass:"line-number"},[s._v("60")]),a("br"),a("span",{staticClass:"line-number"},[s._v("61")]),a("br"),a("span",{staticClass:"line-number"},[s._v("62")]),a("br"),a("span",{staticClass:"line-number"},[s._v("63")]),a("br"),a("span",{staticClass:"line-number"},[s._v("64")]),a("br"),a("span",{staticClass:"line-number"},[s._v("65")]),a("br"),a("span",{staticClass:"line-number"},[s._v("66")]),a("br"),a("span",{staticClass:"line-number"},[s._v("67")]),a("br"),a("span",{staticClass:"line-number"},[s._v("68")]),a("br"),a("span",{staticClass:"line-number"},[s._v("69")]),a("br"),a("span",{staticClass:"line-number"},[s._v("70")]),a("br"),a("span",{staticClass:"line-number"},[s._v("71")]),a("br"),a("span",{staticClass:"line-number"},[s._v("72")]),a("br"),a("span",{staticClass:"line-number"},[s._v("73")]),a("br"),a("span",{staticClass:"line-number"},[s._v("74")]),a("br"),a("span",{staticClass:"line-number"},[s._v("75")]),a("br"),a("span",{staticClass:"line-number"},[s._v("76")]),a("br"),a("span",{staticClass:"line-number"},[s._v("77")]),a("br")])]),a("h3",{attrs:{id:"新增正则属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#新增正则属性"}},[s._v("#")]),s._v(" 新增正则属性")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1. sticky 属性")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 与y修饰符相匹配，ES6 的正则对象多了sticky属性，表示是否设置了y修饰符。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" r "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/hello\\d/y")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("sticky "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2. flags 属性")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ES5 的 source 属性")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回正则表达式的正文")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("abc"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("ig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("source\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// "abc"')]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ES6 的 flags 属性")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回正则表达式的修饰符")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("abc"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("ig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("flags\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 'gi'")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3. dotAll")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 这被称为dotAll模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个dotAll属性，返回一个布尔值，表示该正则表达式是否处在dotAll模式。")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" re "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/foo.bar/s")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 另一种写法")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// const re = new RegExp('foo.bar', 's');")]),s._v("\n\nre"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'foo\\nbar'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\nre"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("dotAll "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\nre"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("flags "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 's'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);