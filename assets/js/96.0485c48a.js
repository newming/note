(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{455:function(t,s,a){"use strict";a.r(s);var n=a(40),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"js-盒子模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#js-盒子模型"}},[t._v("#")]),t._v(" js 盒子模型")]),t._v(" "),a("p",[t._v("js 盒子模型是指通过 js 中提供的一系列的属性和方法，获取页面中元素样式的信息值")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" box "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'box'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// box 的原型链 __proto__ 指向")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// #box -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype -> Node.prototype -> EventTarget.prototype -> Object.prototype")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("h3",{attrs:{id:"js-盒子模型部分重要属性："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#js-盒子模型部分重要属性："}},[t._v("#")]),t._v(" js 盒子模型部分重要属性：")]),t._v(" "),a("ul",[a("li",[t._v("clientHeight/clientWidth: 内容的高度／宽度 + 上下／左右的填充（注意，不包含 border）")]),t._v(" "),a("li",[t._v("clientLeft/clientTop: 左／上 边框的宽度(borderWidth)")]),t._v(" "),a("li",[t._v("offsetHeight/offsetWidth: 内容的高度／宽度 + 上下／左右的填充 + 上下／左右的边框。如果上下，左右边框相等，等于 clientHeight+clientTop"),a("em",[t._v("2/clientWidth+clientLeft")]),t._v("2")]),t._v(" "),a("li",[t._v("offsetParent: 当前元素的父级参照物")]),t._v(" "),a("li",[t._v("offsetLeft/offsetTop: 当前元素的外边框(border)相对父级参照物的内边框的偏移量")]),t._v(" "),a("li",[t._v("scrollHeight/scrollWidth: 和 cleientHeight/clientWidth 相同（前提是当前元素内容没有溢出），如果溢出，等于真实内容的高度／宽度（包含溢出） + 上／左填充。获取到的结果都是约等于的值，因为同一个浏览器，是否设置 overflow 对于最终结果有影响，在不同的浏览器中获取到的结果不同")]),t._v(" "),a("li",[t._v("scrollLeft/scrollTop: 滚动条卷去的宽度／高度，可读写。存在最大(内容最大卷去值)最小(0)值。最大值 = dom.scrollHeight - dom.clientHeight")])]),t._v(" "),a("p",[t._v("js 盒子模型特点：")]),t._v(" "),a("ul",[a("li",[t._v("获取的数值没有小数，都是整数，会在真实结果的基础上做四舍五入")]),t._v(" "),a("li",[t._v("获取浏览器可视区域的宽高：document.documentElement.clientWidth,document.documentElement.clientHeight")]),t._v(" "),a("li",[t._v("获取整个浏览器真实内容高度/宽度：document.documentElement.scrollHeight/scrollWidth")]),t._v(" "),a("li",[t._v("scrollTop/scrollLeft: PC端获取浏览器滚动距离，document.documentElement.scrollTop/scrollLeft，mobile 需要获取 document.body.scrollTop/scrollLeft，而且需要注意，在设置 scrollTop 时，PC 通过 document.documentElement.scrollTop/scrollLeft 可以，moblie 需要通过 window.scrollTo()，所以为了兼容都用 window.scrollTo()")]),t._v(" "),a("li",[t._v("所以，操作浏览器本身盒子模型属性时，想要都兼容，需要写两套")]),t._v(" "),a("li",[t._v("client 和 offset 系列以及 scrollWidth, scrollHeight 都是只读属性，只能获取对于的属性值，不可以修改")]),t._v(" "),a("li",[t._v("scrollTop/scrollLeft: 滚动条卷去的高度／宽度，可读写")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("attr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("attr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 必须 documentElement 在前，设置属性也需要写两套")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("h3",{attrs:{id:"offset-部分"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#offset-部分"}},[t._v("#")]),t._v(" offset 部分")]),t._v(" "),a("p",[t._v("offsetTop/offsetLeft 当前元素的外边框(border)相对父级参照物的内边框(不含border)的偏移量，父级参照物可以通过 dom.offsetParent 获取。在同一页面中，最外层的元素是里面所有元素的父级参照物，和 html 层级结构没有必然联系，一般来说，所有元素的父级参照物都是 body。document.body.offsetParent = null")]),t._v(" "),a("p",[t._v("想要改变父级参照物，可以通过 position 定位来实现。可以改变的值为 absolute, fixed, relative。设置了以上属性的元素其自身的 offsetParent 不会改变，仍为 body，其内部子元素的 offsetParent 会变成设置了 position 属性的这个元素")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 模拟 jquery 的 offset 方法，实现获取页面中任意一个元素，距离 body 的偏移(包括上，左偏移)，不管当前元素的父级参照物是谁")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("offset")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("curEle")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" totalLeft "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    totalTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    par "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" curEle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetParent\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 首先累加自己本身的偏移")]),t._v("\n  totalLeft "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" curEle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetLeft\n  totalTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" curEle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetTop\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 只要父级参照物还不是 body 的父级(null)，就去继续累加父级参照物的偏移。需要注意 body 的 offset 也是需要加的，因为 body 本身也有可能有 border，还有需要注意的是 body 的 margin 是不会被计算到的")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("par"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("navigator"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("userAgent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'MSIE 8.0'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果不是 IE 8，就累加父级的 border 宽度，因为 IE 8 会自动加上这部分，就是 offset 是从当前元素的外边框到父级的外边框")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 累加父级参照物的边框的宽度(border)")]),t._v("\n      totalLeft "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" par"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientLeft\n      totalTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" par"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientTop\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 累加父级参照物的偏移量")]),t._v("\n    totalLeft "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" par"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetLeft\n    totalTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" par"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetTop\n\n    par "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" par"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("offsetParent\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("top"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" totalTop"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" left"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" totalLeft"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br")])]),a("h3",{attrs:{id:"回到顶部功能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回到顶部功能"}},[t._v("#")]),t._v(" 回到顶部功能")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1. 匀速回到顶部")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 总时间(duration): 500ms")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 频率(interval): 多长时间走一步 10ms")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 总距离(target): 当前的位置(当前的 scrollTop 值) - 目标的位置(0)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 步长(step): 每一次走的距离 target/duration -> 每 1ms 走的距离 * interval -> 每一次走的距离")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("goTop")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" duration "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    interval "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("\n    target "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" step "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" duration"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" interval\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" timer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setInterval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" curTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("curTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clearInterval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    curTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-=")]),t._v(" step\n    document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" curTop\n    document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scrollTop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" curTop\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" interval"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br")])]),a("h3",{attrs:{id:"其他-dom-属性："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其他-dom-属性："}},[t._v("#")]),t._v(" 其他 dom 属性：")]),t._v(" "),a("ul",[a("li",[t._v("contentEditable: 内容是否可编辑")]),t._v(" "),a("li",[t._v("dataset: 获取 dom 元素上 data-* 的属性，例如设置了 data-test，可以拿到 test")]),t._v(" "),a("li",[t._v("draggable: 是否允许拖放，这个是一大块内容")]),t._v(" "),a("li",[t._v("firstChild: 第一个子元素（包含文本，注释啥的），是个对象")]),t._v(" "),a("li",[t._v("firstElementChild: 第一个子标签元素对象")]),t._v(" "),a("li",[t._v("hidden: 隐藏，是个属性，如同 class")]),t._v(" "),a("li",[t._v("id: dom 的 id")]),t._v(" "),a("li",[t._v("innerHTML: 内部的 html，包含标签，会车，空格啥的")]),t._v(" "),a("li",[t._v("innerText: 内部的文本")]),t._v(" "),a("li",[t._v("lastChild: 最后一个子元素（包含文本，注释啥的），是个对象")]),t._v(" "),a("li",[t._v("lastElementChild: 最后一个子标签元素对象")]),t._v(" "),a("li",[t._v("nextElementSibling: 下一个相邻的标签元素节点")]),t._v(" "),a("li",[t._v("nextSibling: 下一个相邻元素节点，包含空格，会车等")]),t._v(" "),a("li",[t._v("nodeName: 节点名称")]),t._v(" "),a("li",[t._v("nodeType: 节点类型")]),t._v(" "),a("li",[t._v("nodeValue: 节点 value 值")]),t._v(" "),a("li",[t._v("outerHTML: 包含当前标签元素的 html")]),t._v(" "),a("li",[t._v("outerText: 和 innerText 一样")]),t._v(" "),a("li",[t._v("parentElement: 父级元素节点")]),t._v(" "),a("li",[t._v("parentNode: 父级节点，一般和 parentElement 相同")]),t._v(" "),a("li",[t._v("previousElementSibling: 上一个相邻的标签元素对象")]),t._v(" "),a("li",[t._v("previousSibling: 上一个相邻的元素对象")])])])}),[],!1,null,null,null);s.default=e.exports}}]);