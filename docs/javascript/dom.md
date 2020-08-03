# js DOM元素获取的方法(8种)

DOM: Document object model 文档对象模型，描述整个html页面中节点关系的谱图

## document.getElementById('id')

通过id获取元素，如果id重复了，获取到的是第一个，区分大小写（在 IE 6,7中不区分）

在 IE 6,7 中会把元素的 name 当作 id 来使用

如果没有获取到则返回 null,可以用id直接代表这个对象，而不去提前获取。上下文只能是 document
```js
// html
<p id='test'>js中可以直接通过id拿到我</p>
// js
console.log(test);
```

## context.getElementsByTagName('li')

通过元素的标签名获取一组元素，有几个获取几个。可以根据上下文(context)获取我们获取元素的范围。

```js
document.getElementsByTagName('li');
oDIv.getElementsByTagName('li');
```

## document.getElementsByName('text')
通过元素的name属性获取一组元素

注意在 IE浏览器下只对表单元素起作用。这个方法常用于获取具有相同name的表单元素

## context.getElementsByClassName('class')

在 IE 6~8 会报错

## document.documentElement,document.body
分别获取 html,body 元素，通常用来获取文档属性
```js
var winW = document.documentElement.clientWidth || document.body.clientWidth // 兼容所有的浏览器获取当前浏览器宽度
```

## document.querySelector,document.querySelectorAll

在移动端常用的方法，IE6～8不支持。同时不存在映射关系

前者只获取一个元素，后者获取全部
```js
document.querySelector('#id')
document.querySelector('.class')
document.querySelector('li')
document.querySelectorAll('#id li') // 后代选择器
document.querySelectorAll("input[type='text']") // 属性选择器
```

## DOM 中的节点和关系属性
[w3chool的文档](http://www.w3school.com.cn/jsref/dom_obj_all.asp)
### 获取关系的属性

节点：node 一个html页面中的元素标签、文本、注释。。。都是节点。在标准浏览器下，空格和Enter（回车）都是文本节点
```js
oBox.childNodes // 获取所有的子节点
oBox.children // 获取所有的元素子节点
oBox.parentNode // 获取元素的父亲节点
oBox.previousSibling // 获取元素位于相同节点树层级的前一个元素，注意空格回车文本节点也会获取。(哥哥)
oBox.nextSibling // 获取元素位于相同节点树层级的后一个元素。(弟弟)
oBox.firstChild // 获取第一个子元素
oBox.lastChild // 获取元素的最后一个
```

### 节点
主要的节点类型及其属性。

| 节点类型        | nodeType | nodeName | nodeValue |
| :------------- | :------------- |
| 元素节点（元素标签）| 1   | 大写的标签名 | null |
| 文本节点（文字）| 3   | #text | 文字内容 |
| 注释节点 | 8   | #comment | 注释内容 |
| document | 9   | #document | null |

#### 小案例，模拟children方法
模拟children方法，实现获取指定元素下所有的元素子节点

```js
// 1. 获取 children 标签元素 可以设置筛选
function getChildren(ele,tagName) {
  var ary = [];
  var nodes = ele.childNodes; // 拿到元素下所有的子节点
  for (var i = 0; i < nodes.length; i++) {
    var cur = nodes[i];
    if (cur.nodeType===1) {
      if (tagName) {
        // 如果传了tagName，再次筛选
        if (cur.nodeName.toLowerCase() === tagName.toLowerCase()) {
          // 注意nodeName是大写，但是传入的参数不确定，所有先都转为小写
          ary.push(cur)
        }
      }else {
        // 如果没传tagName，默认将所有的子元素节点返回
        ary.push(cur)
      }
    }
  }
  return ary;
}
let box = document.getElementById('box');
getChildren(document.getElementById(box, 'p'))

// 2. 获取 children 标签元素 可以设置筛选，根据兼容处理
function childern (curEle, tagName) {
  var ary = []
  if (/MSIE (6|7|8)/i.test(navigator.userAgent)) {
    var nodes = ele.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      var cur = nodes[i];
      if (cur.nodeType === 1) {
        ary.push(cur)
      }
    }
    nodes = null
  } else {
    ary = Array.prototype.slice.call(curEle.children)
  }
  if (typeof tagName === 'string') {
    for (var k = 0; k < ary.length; k++) {
      var curEle = ary[k]
      if (curEle.nodeName.toLowerCase() !== tagName.toLowerCase()) {
        ary.splice(k, 1)
        k--
      }
    }
  }
  return ary
}
```

#### 小案例，获取siblings

html 结构
```html
<ul>
  <li>1</li>
  <li>2</li>
  <!-- 我是注释 -->
  <li id='li3'>3</li>
  <li>4</li>
</ul>
<!-- 如何通过js获取到3的上一个兄弟2 -->
<!-- 需要注意原生的 DOM 属性 previousSibling 会计算空格和回车还有注释等，所以往上找多少级不确定 -->
```

js 代码
```js
// 1.获取上一个兄弟节点，兼容IE
var li3 = document.getElementById('li3')

function prev(ele) {
  var pre = ele.previousSibling;
  while (pre && pre.nodeType !== 1) {
    pre = pre.previousSibling;
  }
  return pre
}
prev(li3)

// 2. 获取上一个兄弟节点，previousElementSibling 标准浏览器

// 3.获取所有的上级兄弟节点
var li3 = document.getElementById('li3')
function prevAll(ele) {
  var ary = [];
  var pre = ele.previousSibling;
  while (pre) {
    if (pre.nodeType === 1) {
      ary.unshift(pre)
    }
    pre = pre.previousSibling;
  }
  return ary
}
prevAll(li3)

// 4. 获取当前元素的索引
function index(curEle) {
  // 有几个哥哥就是几
  var ary = [];
  var pre = curEle.previousElementSibling;
  while (pre) {
    ary.unshift(pre)
    pre = pre.previousElementSibling;
  }
  return ary.length
}

// 5. firstchild 第一个元素节点
function firstChild (parentNode) {
  return parentNode.children[0] ? parentNode.children[0] : null
}
```

### DOM 增删改

- document.createElement('div'); 动态创建一个标签元素
- box.appendChild() 将元素添加到指定的容器中的末尾
- insertBefore(newItem,existingItem) 把新的元素插入到老得元素之前，如果老元素不存在，会放到末尾
- removeChild(item) 删除元素
- cloneNode(true || false) 克隆元素默认false只克隆当前元素，true clone 子孙
- replaceChild(newnode,oldnode)
- document.createDocumentFragment() 创建文档碎片

属性的增删改查
- setAttribute()
- getAttribute()
- removeAttribute() 在IE 6~8 中不能修改class属性 box.className可以

```js
// 1. append
function append (newEle, container) {
  container.appendChild(newEle)
}

// 2. prepend
function prepend (newEle, container) {
  var firstChild = container.children[0] ? parentNode.children[0] : null
  container.insertBefore(newEle, firstChild)
}

// 3. insertBefore
function insertBefore (newEle, oldEle) {
  oldEle.parentNode.insertBefore(newEle, oldEle)
}

// 4. insertAfter
function insertAfter (newEle, oldEle) {
  oldEle.parentNode.insertBefore(newEle, oldEle.nextElementSibling)
}
```

### dom 数据绑定方法

```js
// 1. 通过 document.createElement 进行创建插入，会造成多次 dom 回流，即重新渲染 dom，造成性能浪费，不影响原有的 dom
document.createElement
document.appendChild

// 2. 字符串拼接，只需要一次回流，但是会造成原有的 dom 丢失事件绑定
var str = '<span>aa</span>'
box.innerHTML = str

// 3. 文档碎片
var frg = document.createDocumentFragment() // 创建一个文档碎片相当于临时创建了一个容器
for (var i = 0; i < 5; i++) {
  var oLi = document.createElement('li')
  oLi.innerHTML = i
  frg.appendChild(oLi)
}
oUl.appendChild(frg) // 优点:不影响原有 li，一次回流
frg = null
```

### 操作元素 class 属性

```js
// 1. hasClass 是否包含某个class，可以直接用 dom.classList.contains
function hasClass (curEle, className) {
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  // var reg = new RegExp('(^| +)' + className + '( +|$)')
  return reg.test(curEle.className)
}

// 2. addClass支持传多个class，以空格隔开，可以直接用 dom.classList.add(class,class,...)，不过存在兼容问题
function addClass(curEle, className) {
  var ary = className.replace(/(^ +| +$)/g, '').split(/ +/g) // split(' ')

  for (var i = 0; i < ary.length; i++) {
    var curClass = ary[i]
    if (!hasClass(curEle, curClass)) {
      curEle.className += ' ' + curClass
    }
  }
}

// 3. removeClass，支持传多个class，以空格隔开，可以直接用 dom.classList.remove(class, class, ...)，不过存在兼容问题
function removeClass(curEle, className) {
  var ary = className.replace(/(^ +| +$)/g, '').split(/ +/g)

  for (var i = 0; i < ary.length; i++) {
    var curClass = ary[i]
    if (hasClass(curEle, curClass)) {
      var reg = new RegExp('(^| +)' + curClass + '( +|$)', 'g')
      curEle.className = curEle.className.replace(reg, ' ').trim()
    }
  }
}
```

### getElementsByClassName 的兼容处理

```js
// className: 要获取的元素的样式类名，可能一个也可能多个，多个之间用空格（几个都行）隔开
// context: 获取元素的上下文，不传的话默认为 document
function getElementsByClass (className, context) {
  context = context || document
  var classNameAry = className.replace(/(^ +| +$)/g, '').split(/ +/g)
  // 获取上下文包含的所有标签
  var nodeList = context.getElementsByTagName('*')
  var ary = []

  for (var i = 0; i < nodeList.length; i++) {
    var curNode = nodeList[i]
    var flag = true
    for (var k = 0; k < classNameAry.length; k++) {
      var reg = new RegExp('(^| +)' + classNameAry[k] + '( +|$)')
      if (!reg.test(curNode.className)) {
        flag = false
        break
      }
    }

    if (flag) {
      ary.push(curNode)
    }
  }
}
```

### 操作浏览器属性

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

### 修改 dom 样式
在 js 中给元素设置样式属性值，我们只能通过 dom.style[attr] = value 这种方式给当前元素设置行内样式

```js
// 1. 单个样式设置。某些传递进来的值没有单位，把默认单位补上
function setCss (curEle, attr, value) {
  // 兼容 float 样式值
  if (attr === 'float') {
    curEle['style']['cssFloat'] = value
    curEle['style']['styleFloat'] = value
    return
  }

  // 兼容 opacity
  if (attr === 'opacity') {
    curEle['style'][attr] = value
    curEle['style']['filter'] = 'alpha(opacity=' + value * 100 + ')' 
    return
  }

  var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/
  if (reg.test(attr)) {
    if (!isNaN(value)) {
      value += 'px'
    }
  }
  curEle['style'][attr] = value
}

// 2. 批量设置样式
function setGroupCss (curEle, options) {
  options = options || 0 // 防止没传值的时候调用 toString 方法出错
  // 检测 options 的数据类型
  if (options.toString() !== '[object Object]') {
    return
  }

  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      this.setCss(curEle, key, options[key])
    }
  }
}

// 3. 模拟 jquery 中的 css 方法。实现获取，单独设置，批量设置元素的样式
function css (curEle) {
  var argTwo = arguments[1]
  var ary = Array.prototype.slice.call(arguments, 1)
  if (typeof argTwo === 'string') {
    var argThree = arguments[2]
    if (typeof argThree === 'undefined') {
      // 第三个参数可能是数字 0，所以这里必须是 undefined
      return getStyle(curEle, argTwo)
    }
    setCss.apply(curEle, ary)
    // this.setCss(curEle, argTwo, argThree)
    return
  }
  // 设置多个样式
  argTwo = argTwo || 0
  if (argTwo.toString() === '[object Object]') {
    setGroupCss.apply(curEle, ary)
  }
}
```