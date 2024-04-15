# html css 面试题汇总

## 1. css 基线相关

[问题详情](https://www.zhihu.com/question/28057944)

```css
.box {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: lightblue;
  /* 方案一. 添加非 visible 属性值的 overflow */
  /* overflow: hidden; */
}
.sec {
  /* 方案二. 使用 vertical-align */
  vertical-align: top;
}
```

```html
<!-- 对于一个 inline-block 元素，如果它内部没有内联元素，或者它的overflow属性不是visible，那么它的基线就是元素margin的底端。否则，就是它内部最后一个元素的基线。 -->
<div>
  <div class="box"></div>
  <div class="box sec"><h1>22222</h1></div>
</div>
```

## 2. 解释一下 BFC，IFC，FFC

BFC(Box Formatting Context):Box 是 css 布局的对象和基本单位，BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。 块级格式化上下文布局规则

- 内部的 BOX 会在垂直方向一个接一个的放置
- 属于同一个 BFC 的两个相邻 BOX 的 margin 会重叠；不同 BFC 就不会
- 是页面上一个隔离的独立容器，里面的元素不会影响到外面的元素；反之亦然
- BFC 的区域不会和 float box 重叠
- 计算 BFC 的高度，浮动元素也参与计算

### 触发条件

触发条件简要概括

- 根元素
- float 属性不为 none
- position 为 absolute 或 fixed
- overflow 不为 visible
- display 为 inline-block、table-cell、table-caption、flex、inline-flex

### 应用场景

- 清除内部的浮动，触发父元素的 BFC 属性，会包含 float 元素 防止浮动导致父元素高度塌陷父级设置 overflow：hidden，元素 float:right
- 分属于不同的 BFC，可以阻止 margin 重叠 避免 margin 重叠，两个块相邻就会导致外边距被折叠，给中间的设置 BFC 就会避免，方法就是套个父级设置 overflow：hindden
- 阻止元素被浮动元素覆盖，各自是独立的渲染区域；
- 自适应两栏布局

## 3. visibility:hidden 与 display:none 的区别

[答案](https://www.jianshu.com/p/da8e9fba48b7)

1. 是否占据空间

- display: none 不占据空间
- visibility:hidden 占据空间

2. 是否渲染

- display:none，会触发 reflow（回流），进行渲染。
- visibility:hidden，只会触发 repaint（重绘），因为没有发现位置变化，不进行渲染。

3. 是否是继承属性(株连性)

- display:none，display 不是继承属性，元素及其子元素都会消失。
- visibility:hidden，visibility 是继承属性，若子元素使用了 visibility:visible，则不继承，这个子孙元素又会显现出来。

## 4. img 的 alt 与 title 的不同

- title: 标题，鼠标滑动到元素上显示
- alt: 主要用于 img 和 area 元素中，它的作用是当 HTML 元素本身的物件无法被渲染是，就可以显示 alt 文字作为一种补救措施，也可以作为读屏器阅读图片时内容，提高图片可访问性，有利于搜索引擎分析。

## 伪类 vs 伪元素

[伪类 vs 伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素

- 伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover 来描述这个元素的状态。虽然它和普通的 css 类相似，可以为已有的元素添加样式，但是它只有处于 dom 树无法描述的状态下才能为元素添加样式，所以将其称为伪类。
- 伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过::before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

## css 组合选择器优先级计算

- 通配符选择器(\*)
- 标签选择器（div）
- class 选择器(.wrap)
- id 选择器（#wrap）
- 属性选择器(E[att], E[att=val], E[att~=val])
  - E[att]： 匹配所有具有 att 属性的 E 元素，不考虑它的值
  - E[att=val]：匹配所有 att 属性等于"val"的 E 元素
  - E[att~=val]：匹配所有 att 属性具有多个空格分隔的值、其中一个值等于"val"的 E 元素
- 相邻选择器(h1 + p)
- 子选择器（ul > li）
- 后代选择器（li a）
- 伪类选择器
  - E:first-child：匹配父元素的第一个子元素
  - E:link 匹配所有未被点击的链接
  - E:focus 匹配获得当前焦点的 E 元素
  - E:not(s) 反选伪类，匹配不符合当前选择器的任何元素
- 伪元素选择器
  - E::before/::after
  - E::first-letter/::first-line

优先级: !important > 内联样式(1000) > id(100) > class(10) > tag(1)

> 注意这里的优先级等级数字并不是完全准确的，只是一般按照这个规则来说。

## 为什么不建议使用通配符初始化 css 样式

采用**\*{pading:0;margin:0;}**这样的写法好处是写起来很简单，但是是通配符，需要把所有的标签都遍历一遍，当网站较大时，样式比较多，这样写就大大的加强了网站运行的负载，会使网站加载的时候需要很长一段时间，因此一般大型的网站都有分层次的一套初始化样式。出于性能的考虑，并不是所有标签都会有 padding 和 margin，因此对常见的具有默认 padding 和 margin 的元素初始化即可，并不需使用通配符\*来初始化。

## css 中 link 和@import 的区别是什么

1. 从属关系区别：link 是属于 html 标签，而@import 是 css 提供的
2. 加载顺序区别：页面被加载时，link 会同时加载，而@import 引用的 css 会等到页面被加载完再加载
3. 兼容性区别：import 只在 IE5 以上才能识别，而 link 是 html 标签，无兼容问题
4. dom 可操作性的区别：可以通过 js 操作 dom，插入 link 标签来改变样式；由于 dom 方法是基于文档的，无法使用@import 的方式插入样式
5. 权重区别：在.css 文件用 import 引入时，如果已经存在相同样式，@import 引入的这个样式将被该 css 文件本身的样式层叠掉，表现出 link 方式的样式权重高于@import 的权重这样的直观效果。简而言之：link 和@import，谁写在后面，谁的样式就被应用，后面的样式覆盖前面的样式

## css 预处理器

基本概念

- 为 css 增加编程特性的扩展性语言，可以使用变量、简单逻辑判断、函数等基本编程技巧
- CSS 预处理器编译输出还是标准的 CSS 样式
- Less、Sass 都是动态的样式语言，是 CSS 预处理器，CSS 上的一种抽象层。他们是一种特殊的语法/语言，最终编译成 CSS
- Less 的变量符号是@，Sass 变量符号是\$

解决的问题

- CSS 语法不够强大，因为无法嵌套导致很多重复的选择器，CSS 嵌套减少了大量的重复选择器，避免一些低级错误
- 没有变量和合理的样式复用机制，导致逻辑上相关的属性值只能以字面量的形式重复输出，难以维护
- css 代码更加整洁，更易维护，代码量更少
- 修改很快，基础颜色使用变量，一处动牵全身
- 常用代码使用代码块，节省大量代码
- 变量、混入大大提升了样式的复用性
- 额外的工具类似颜色函数(lighten/darken/transparentize 等等)，mixins，loops，这些方法使 css 更像一个编程语言，让开发者能够有能力生成更加复杂的 css 样式。

常用规范

- 变量、嵌套语法、混入、@import、运算、函数、继承等

## 响应式布局方案

1. 媒体查询: min-width, max-width 等
2. 百分比布局: 50%，需要注意 padding, margin 是相对于父元素的 width 来的
3. rem: 相对于 html 的 font-size，需要通过 js 动态设置 html 的 font-size 来适配
4. vw/vh
5. 图片响应式: srcset 适配不同 dpi 加载不同分辨率的图片

布局方案:

- 利用 media, rem 等 css 提供的响应式技术
- flex 弹性布局
- grid 网格布局
- columns 栅格系统，例如 bootstrap

## css 盒模型

一个元素占有空间的大小由几个部分构成，其中包括元素的内容(content)、元素的内边距(padding)，元素的边框(border)、元素的外边距(margin)四个部分

- 标准模型: 宽度=content(box-sizing: content-box)
- IE 盒模型: 宽度=content+padding+border(box-sizing: border-box)
