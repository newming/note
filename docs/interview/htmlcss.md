# html css面试题汇总

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
  <div class='box'></div>
  <div class='box sec'><h1>22222</h1></div>
</div>
```

## 2. 解释一下BFC，IFC，FFC

## 3. visibility:hidden 与 display:none 的区别

[答案](https://www.jianshu.com/p/da8e9fba48b7)

## 4. img 的 alt 与 title 的不同
