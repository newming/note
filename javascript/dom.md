# js DOM元素获取的方法(8种)

DOM: Document object model 文档对象模型，描述整个html页面中节点关系的谱图

### document.getElementById('id')

通过id获取元素，如果id重复了，获取到的是第一个，区分大小写（在 IE 6,7中不区分）

在 IE 6,7 中会把元素的 name 当作 id 来使用

如果没有获取到则返回 null,可以用id直接代表这个对象，而不去提前获取。上下文只能是 document
```js
// html
<p id='test'>js中可以直接通过id拿到我</p>
// js
console.log(test);
```

### context.getElementsByTagName('li')

通过元素的标签名获取一组元素，有几个获取几个。可以根据上下文(context)获取我们获取元素的范围。

```js
document.getElementsByTagName('li');
oDIv.getElementsByTagName('li');
```

### document.getElementsByName('text')
通过元素的name属性获取一组元素

注意在 IE浏览器下只对表单元素起作用。这个方法常用于获取具有相同name的表单元素

### context.getElementsByClassName('class')

在 IE 6~8 会报错

### document.documentElement,document.body
分别获取 html,body 元素，通常用来获取文档属性
```js
var winW = document.documentElement.clientWidth || document.body.clientWidth // 兼容所有的浏览器获取当前浏览器宽度
```

### document.querySelector,document.querySelectorAll

在移动端常用的方法，IE6～8不支持。

前者只获取一个元素，后者获取全部
```js
document.querySelector('#id')
document.querySelector('.class')
document.querySelector('li')
document.querySelectorAll('#id li') // 后代选择器
document.querySelectorAll("input[type='text']") // 属性选择器
```

# DOM 中的节点和关系属性
[w3chool的文档](http://www.w3school.com.cn/jsref/dom_obj_all.asp)
### 获取关系的属性

节点：node 一个html页面中的元素标签、文本、注释。。。都是节点。在标准浏览器下，空格和Enter（回车）都是文本节点
```js
oBox.childNodes // 获取所有的子节点
oBox.children // 获取所有的元素子节点
oBox.parentNode // 获取元素的父亲节点
oBox.previousSibling // 获取元素位于相同节点树层级的前一个元素，注意空格回车文本节点也会获取。(哥哥)
oBox.nextSibling // 获取元素位于相同节点树层级的后一个元素。(弟弟)
oBox.firstChild // 获取第一个子元素的第一个
oBox.lastChild // 获取第一个子元素的最后一个
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
```

#### 小案例，获取sibling

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
// 获取上一个兄弟节点
var li3 = document.getElementById('li3')

function prev(ele) {
  var pre = ele.previousSibling;
  while (pre && pre.nodeType !== 1) {
    pre = pre.previousSibling;
  }
  return pre
}
prev(li3)
console.log(pre);

// 获取所有的上级兄弟节点
var li3 = document.getElementById('li3')
function prevAll(ele) {
  var pre = ele.previousSibling;
  var ary = [];
  while (pre) {
    if (pre.nodeType === 1) {
      ary.unshift(pre)
    }
    pre = pre.previousSibling;
  }
  return ary
}
prevAll(li3)
console.log(pre);
```

# DOM 增删改

- document.createElement('div'); 动态创建一个标签元素
- box.appendChild() 将元素添加到指定的容器中的末尾
- insertBefore(newItem,existingItem) 把新的元素插入到老得元素之前
- removeChild(item) 删除元素
- cloneNode(true || false) 克隆元素默认false只克隆当前元素，true clone 子孙
- replaceChild(newnode,oldnode)

属性的增删改查
- setAttribute()
- getAttribute()
- removeAttribute() 在IE 6~8 中不能修改class属性 box.className可以
