# 表格排序

```html
<ul id='ul'>
  <li>67</li>
  <li>656</li>
  <li>644</li>
  <li>34</li>
  <li>62</li>
</ul>
```

```js
var oUl = document.getElementById('ul')
var oLis = oUl.getElementsByTagName('li')

// 将元素集合类数组转为数组(for循环或者slice)
var ary = Array.prototype.slice.call(oLis, 0)
// 排序
ary.sort(function (a, b) {
  return parseFloat(a.innerHTML) - parseFloat(b.innerHTML)
})
// 将排序后的结果渲染出来
var frg = document.createDocumentFragment()
for (var i = 0; i < ary.length; i++) {
  frg.appendChild(ary[i])
}
oUl.appendChild(frg) // 这里不会生成多余的li，dom映射
frg = null
```