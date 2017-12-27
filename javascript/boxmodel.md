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
- scrollLeft/scrollTop: 滚动条卷去的宽度／高度，可读写。存在最大(内容最大卷去值)最小(0)值。最大值 = dom.scrollHeight - dom.clientHeight

js 盒子模型特点：
- 获取的数值没有小数，都是整数，会在真实结果的基础上做四舍五入
- 获取浏览器可视区域的宽高：document.documentElement.clientWidth,document.documentElement.clientHeight
- 获取整个浏览器真实内容高度/宽度：document.documentElement.scrollHeight/scrollWidth
- scrollTop/scrollLeft: document.documentElement.scrollTop/scrollLeft = 0，需要获取 document.body.scrollTop
- 所以，操作浏览器本身盒子模型属性时，想要都兼容，需要写两套
- client 和 offset 系列以及 scrollWidth, scrollHeight 都是只读属性，只能获取对于的属性值，不可以修改
- scrollTop/scrollLeft: 滚动条卷去的高度／宽度，可读写

```js
document.documentElement[attr] || document.body[attr]
// 必须 documentElement 在前，设置属性也需要写两套
document.documentElement.scrollTop = 0
document.body.scrollTop = 0
```

### offset 部分

offsetTop/offsetLeft 当前元素的外边框(border)相对父级参照物的内边框(不含border)的偏移量，父级参照物可以通过 dom.offsetParent 获取。在同一页面中，最外层的元素是里面所有元素的父级参照物，和 html 层级结构没有必然联系，一般来说，所有元素的父级参照物都是 body。document.body.offsetParent = null

想要改变父级参照物，可以通过 position 定位来实现。可以改变的值为 absolute, fixed, relative。设置了以上属性的元素其自身的 offsetParent 不会改变，仍为 body，其内部子元素的 offsetParent 会变成设置了 position 属性的这个元素

```js
// 模拟 jquery 的 offset 方法，实现获取页面中任意一个元素，距离 body 的偏移(包括上，左偏移)，不管当前元素的父级参照物是谁
function offset (curEle) {
  let totalLeft = null,
    totalTop = null,
    par = curEle.offsetParent
  // 首先累加自己本身的偏移
  totalLeft += curEle.offsetLeft
  totalTop += curEle.offsetTop
  // 只要父级参照物还不是 body 的父级(null)，就去继续累加父级参照物的偏移。需要注意 body 的 offset 也是需要加的，因为 body 本身也有可能有 border，还有需要注意的是 body 的 margin 是不会被计算到的
  while (par) {
    if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
      // 如果不是 IE 8，就累加父级的 border 宽度，因为 IE 8 会自动加上这部分，就是 offset 是从当前元素的外边框到父级的外边框
      // 累加父级参照物的边框的宽度(border)
      totalLeft += par.clientLeft
      totalTop += par.clientTop
    }
    // 累加父级参照物的偏移量
    totalLeft += par.offsetLeft
    totalTop += par.offsetTop

    par = par.offsetParent
  }

  return {top: totalTop, left: totalLeft}
}
```

### 回到顶部功能

```js
// 1. 匀速回到顶部
// 总时间(duration): 500ms
// 频率(interval): 多长时间走一步 10ms
// 总距离(target): 当前的位置(当前的 scrollTop 值) - 目标的位置(0)
// 步长(step): 每一次走的距离 target/duration -> 每 1ms 走的距离 * interval -> 每一次走的距离
function goTop () {
  var duration = 500,
    interval = 10
    target = document.documentElement.scrollTop || document.body.scrollTop
  var step = (target / duration) * interval

  var timer = window.setInterval(function () {
    var curTop = document.documentElement.scrollTop || document.body.scrollTop
    if (curTop === 0) {
      window.clearInterval(timer)
      return
    }
    curTop -= step
    document.documentElement.scrollTop = curTop
    document.body.scrollTop = curTop
  }, interval)
}
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
