# 事件

事件分为两部分：
1. 行为部分：（DOM0 级事件绑定）浏览器天生就赋予其的行为，是dom对象的私有属性 onclick, onmouseover等，即使我们没有绑定也存在，只是什么都不做
2. 事件绑定：（DOM2 级事件绑定）给元素的某一个行为绑定方法 addEventListener，这个属性是定义在当前元素所属类 EventTarget 这个类的原型上的

```js
var dom = document.getElementById('box')
// 把一个匿名函数当作值赋给了 dom 的 onclick 属性（函数表达式，没执行）
// 这是一个异步的操作。当点击行为触发时执行，并且浏览器还默认给这个方法传递了一个参数值，即事件对象
dom.onclick = function (e) {
  console.log(arguments) // -> MouseEvent 对象
  console.log(e || window.event) // IE6~8 没有事件对象e
}

// MouseEvent 对象，包含了很多属性和方法，记录的是唯一鼠标触发时的信息，在各个对象上触发相同
// MouseEvent -> UIEvent -> Event -> Object
// e.clientX/clientY: 当前鼠标触发点距离屏幕左上角的x/y轴的坐标
// e.pageX/e.pageY: 当前鼠标触发点距离body左上角的x/y轴的坐标，IE6~8中不存在，通过 e.clientY + document.documentElement.scrollTop || document.body.scrollTop 获取
// e.type: 当前鼠标触发的行为类型
// e.target: 事件源，当前鼠标触发的是哪个元素，存储的就是哪个元素，IE6~8中不存在，使用 e.srcElement
// e.preventDefault(): 组织浏览器默认行为，部分默认行为可以通过 return false 阻止
// e.stopPropagation(): 阻止事件的冒泡传播，IE6~8使用 e.cancelBubble=true 阻止

// KeyboardEvent 对象，键盘事件对象
// e.keyCode: 当前键盘上每一个键对应的值。如enter->13,space->32等
```

默认事件的传播机制：
```js
dom.onclick = function () {} // dom 0 级
```
- 捕获阶段：从外向内依次查找元素
- 目标阶段：当前事件源本身的操作
- 冒泡阶段：从内到外依次触发相关的行为（最常用）

```js
dom.addEventListener('click', function () {}, false) // true，在捕获阶段执行，false，在冒泡阶段执行
```