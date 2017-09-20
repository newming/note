# js 盒子模型

js 盒子模型是指通过 js 中提供的一系列的属性和方法，获取页面中元素样式的信息值

```js
var box = document.getElementById('box')
// box 的原型链 __proto__ 指向
// #box -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype -> Node.prototype -> EventTarget.prototype -> Object.prototype
```

### js 盒子模型部分重要属性：

- clientHeight/clientWidth: 内容的高度／宽度 + 上下／左右的填充（注意，不包含 border）
- clientLeft/clientTop: 左／上 边框的宽度(borderWidth)
- offsetHeight/offsetWidth: 内容的高度／宽度 + 上下／左右的填充 + 上下／左右的边框。如果上下，左右边框相等，等于 clientHeight+clientTop*2/clientWidth+clientLeft*2
- offsetParent: 当前元素的父级参照物
- offsetLeft/offsetTop: 当前元素的外边框(border)相对父级参照物的内边框的偏移量
- scrollHeight/scrollWidth: 和 cleientHeight/clientWidth 相同（前提是当前元素内容没有溢出），如果溢出，等于真实内容的高度／宽度（包含溢出） + 上／左填充。获取到的结果都是约等于的值，因为同一个浏览器，是否设置 overflow 对于最终结果有影响，在不同的浏览器中获取到的结果不同
- scrollLeft/scrollTop: 滚动条卷去的宽度／高度

js 盒子模型特点：
- 获取的数值没有小数，都是整数，会在真实结果的基础上做四舍五入
- 获取浏览器可视区域的宽高：document.documentElement.clientHeight,document.documentElement.clientHeight
- 获取整个浏览器真实内容高度/宽度：document.documentElement.scrollHeight/scrollWidth
- scrollTop/scrollLeft: document.documentElement.scrollTop/scrollLeft = 0，需要获取 document.body.scrollTop
- 所以，操作浏览器本身盒子模型属性时，想要都兼容，需要写两套

```js
document.documentElement[attr] || document.body[attr]
// 必须 documentElement 在前，设置属性也需要写两套
document.documentElement.scrollTop = 0
document.body.scrollTop = 0
```

##### 编写一个操作浏览器属性的方法

```js
// 两个参数，只传一个是获取，两个是设置
function win (attr, val) {
  if (typeof val === 'undefined') {
    return document.documentElement[attr] || document.body[attr]
  } else {
    document.documentElement[attr] = val
    document.body[attr] = val
  }
}
```

### 获取元素样式属性值

1. 元素.style.属性：样式必须写在行内样式(不常用)
2. 通过 window 提供的一个方法 getComputedStyle 来获取所有经过浏览器计算过的（只要当前元素标签可以在页面中呈现出来，那么它的样式都是经过浏览器的计算／渲染过的，哪怕有些样式没有写，同样可以获取）样式属性。IE 6,7,8 不兼容
3. 在 IE 6,7,8 下使用 currentStyle 来获取元素的样式属性，不支持伪类 box.currentStyle[attr]

```js
// 第一个参数是要获取的 dom 元素，第二个是伪类，一般不用，获取到的是当前元素的所有的样式
window.getComputedStyle('元素', '伪类')[attr]

// 兼容，不同浏览器获取到的属性不一定相同，主要是 IE 的其他的问题
function getStyle (element, attr) {
  let val = null
  if ('getComputedStyle' in window) {
    val = window.getComputedStyle(element)[attr]
  } else {
    // IE 6,7,8
    if (attr === 'opacity') {
      val = element.currentStyle['filter'] // 将数字除以 100 为标准浏览器的 opacity
      let reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i // 第二次升级：匹配 0-100 的整数或小数，将第一个分组捕获，?: 只匹配不捕获
      val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
    } else {
      val = element.currentStyle[attr]
    }
  }
  let reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i // 第一次升级：去掉数值单位，数字开头px,pt等单位结尾的单个数值
  return reg.test(val) ? parseFloat(val) : val
}
getStyle(box, 'width') // 需要去掉单位的功能
getStyle(box, 'opacity') // IE 6-8 不设置这个属性，设置的是 filter: alpha(opacity=10)
```

### 其他 dom 属性：

- contentEditable: 内容是否可编辑
- dataset: 获取 dom 元素上 data-* 的属性，例如设置了 data-test，可以拿到 test
- draggable: 是否允许拖放，这个是一大块内容
- firstChild: 第一个子元素（包含文本，注释啥的），是个对象
- firstElementChild: 第一个子标签元素对象
- hidden: 隐藏，是个属性，如同 class
- id: dom 的 id
- innerHTML: 内部的 html，包含标签，会车，空格啥的
- innerText: 内部的文本
- lastChild: 最后一个子元素（包含文本，注释啥的），是个对象
- lastElementChild: 最后一个子标签元素对象
- nextElementSibling: 下一个相邻的标签元素节点
- nextSibling: 下一个相邻元素节点，包含空格，会车等
- nodeName: 节点名称
- nodeType: 节点类型
- nodeValue: 节点 value 值
- outerHTML: 包含当前标签元素的 html
- outerText: 和 innerText 一样
- parentElement: 父级元素节点
- parentNode: 父级节点，一般和 parentElement 相同
- previousElementSibling: 上一个相邻的标签元素对象
- previousSibling: 上一个相邻的元素对象
