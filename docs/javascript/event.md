# 事件

事件分为两部分：

1. 行为部分：（DOM0 级事件绑定）浏览器天生就赋予其的行为，是 dom 对象的私有属性 onclick, onmouseover 等，即使我们没有绑定也存在，只是什么都不做。在冒泡阶段执行
2. 事件绑定：（DOM2 级事件绑定）给元素的某一个行为绑定方法 addEventListener，这个属性是定义在当前元素所属类 EventTarget 这个类的原型上的。可以对同一个事件绑定多个方法

```js
var dom = document.getElementById("box");
// 把一个匿名函数当作值赋给了 dom 的 onclick 属性（函数表达式，没执行）
// 这是一个异步的操作。当点击行为触发时执行，并且浏览器还默认给这个方法传递了一个参数值，即事件对象
dom.onclick = function(e) {
  console.log(arguments); // -> MouseEvent 对象
  console.log(e || window.event); // IE6~8 没有事件对象e
};

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

### 传播机制

默认事件的传播机制：

```js
dom.onclick = function() {}; // dom 0 级
```

- 捕获阶段：从外向内依次查找元素
- 目标阶段：当前事件源本身的操作
- 冒泡阶段：从内到外依次触发相关的行为（最常用）

```js
dom.addEventListener("click", function() {}, false); // true，在捕获阶段执行，false，在冒泡阶段执行
```

### addEventListener(DOM 2)

- 同一个事件可以绑定多个不同的方法，按绑定顺序执行，绑定相同的方法会忽略，只执行一次
- DOM 2 可以绑定 DOM 0 中的行为，还有一些 DOM 0 中没有的事件，比如 DOMContentLoaded
- 通过 removeEventListener 移除监听，必须三个参数完全相同
- 在 IE 6~8 中不支持，通过 attachEvent/detachEvent 实现监听/移除，没有第三个参数，只能在冒泡阶段执行，行为需要添加 on。box.attachEvent('onclick', fn)。而且顺序回乱，绑定多个相同的方法时，都会执行，this 指向为 window

> 小问题: 在一个 DOM 上同时绑定两个点击事件：一个用捕获，一个用冒泡。事件会执行几次?先执行的是冒泡还是捕获?

冒泡是从下向上，DOM 元素绑定的事件被触发时，此时该元素为目标元素，目标元素执行后，它的祖先元素绑定的事件会向上顺序执行。addEventListener 函数的第三个参数设置为 false，说明不为捕获事件，即为冒泡事件。

捕获则和冒泡相反，目标元素被触发后，会从目标元素的最顶层祖先元素往下执行到目标元素为止。当一个元素绑定了两个事件，一个是冒泡，一个是捕获。

首先需要明确的是，绑定了几个事件就会执行几次。

对于执行顺序的问题需要注意以下。该 DOM 上的事件如果被触发，会有这几种情况。

- 如果该 DOM 是目标元素，则按事件绑定顺序执行，不区分冒泡还是捕获
- 如果该 DOM 是出于事件流中的非目标元素，则先执行捕获后执行冒泡

因为 W3C 标准有说明，先发生捕获事件，后发生冒泡事件。所有事件的顺序是：其它元素捕获阶段事件---本元素代码顺序事件---其他元素冒泡阶段事件。需要注意的是：在冒泡阶段，向上执行的过程中，已经执行的捕获事件不再执行，只执行冒泡事件

### bind 通用事件方法

```js
// 绑定
function bind (curEle, eventType, Fn) {
  if ('addEventListener' in document) {
    curEle.addEventListener(eventType, Fn, false)
    return
  }
  // 以下为兼容 ie 6~8
  // 为了保持能够将来移除掉，并且需要保存多个事件，同时需要将封装后的方法挂载到 dom 上，因为在 unbind 的时候也拿不到这个 tempFn，只能拿到 curEle，Fn。所以这里将封装的事件挂载到了 curEle 对象上，并且携带了 eventType ，避免不同事件绑定相同方法时 unbind 错
  if (!curEle['myBind' + eventType]) {
    curEle['myBind' + eventType] = []
  }
  // 同时解决 ie 6~8 可以重复添加问题，如果发现有相同事件绑定，直接返回
  var arr = curEle['myBind' + eventType]
  for(var i = 0; i < arr.length; i++) {
    var cur = arr[i]
    if (cur.photo === Fn) {
      return
    }
  }
  // 解决 ie 6~8 的 this 指向问题，封装传入的方法，并且需要将原来的方法保存下来，将来移除时用，因为移除的时候只能拿到没有封装的方法
  var tempFn = function () {
    Fn.call(curEle)
  }
  tempFn.photo = Fn
  arr.push(tempFn) // 将事件记录到 curEle 属性数组中，这里 arr 和 curEle['myBind' + eventType] 指向同一个内存地址
  // 绑定事件，执行的是封装后的
  curEle.attachEvent('on' + eventType, tempFn)
}
// 解除绑定
function unbind (curEle, eventType, Fn) {
  if ('removeEventListener' in document) {
    curEle.removeEventListener(eventType, Fn, false)
    return
  }
  // 以下为兼容 ie 6~8
  // 移除事件，必须先找 dom 上记录的 myBind 中的 tempFn，并且去对比的是 tempFn 的 photo 与传入的 Fn
  var arr = curEle['myBind' + eventType]
  if (arr) {
    for (var i = 0, i < arr.length, i++) {
      var cur = arr[i];
      if (cur.photo === Fn) {
        curEle.detachEvent('on' + eventType, cur);
        arr.splice(i, 1);
        break;
      }
    }
  }
}

// 为了解决 ie 6~8 下同一个事件绑定多个方法，执行时顺序混乱问题，不用浏览器自带的事件池，而是自己模拟标准浏览器事件池实现
// on: 创建事件池，并且把需要给当前元素绑定的方法依次的增加到事件池
function on(curEle, eventType, Fn) {
  if (!curEle['myEvent' + eventType]) {
    curEle['myEvent' + eventType] = []
  }

  var arr = curEle['myEvent' + eventType]
  for (var i = 0; i < arr.length; i++) {
    var cur = arr[i]
    if (cur === Fn) {
      return
    }
  }
  arr.push(Fn)

  bind(curEle, eventType, run) // bind方法已经解决了 this 问题，直接通过 bind 将事件绑定到 run 上，顺序执行
}

// off: 在自己的事件池中把某一个方法移除
function off (curEle, eventType, Fn) {
  var arr = curEle['myEvent' + eventType] // 移除的时候只需要将 on 实现的事件池中的移除
  for (var i = 0; i <arr.length; i++) {
    var cur = arr[i]
    if (cur === Fn) {
      // arr.splice(i, 1) // 会导致数组塌陷问题(比如某个事件同时移除了好几个和它绑定一样绑定在同一个事件上的事件)
      arr[i] === null
      break
    }
  }
}
// run: 只给当前元素的某个行为绑定一个方法 run， 当触发这个行为时，执行 run 方法，run 方法中根据 on 事件池中保存的事件顺序执行
function run (e) {
  e = e || window.event
  var flag = e.target ? true : false // IE 6~8 的一些兼容处理
  if (!flag) {
    e.target = e.srcElement
    e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)
    e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
    e.preventDefault = function () {
      e.returnValue = false
    }
    e.stopPropagation = function () {
      e.cancelBubble = true
    }
  }
  // 获取自己事件池中绑定的方法，并且让这些方法依次执行
  var arr = this['myEvent' + e.type]
  for (var i = 0; i < arr.length; i++) {
    var tempFn = arr[i]
    if (typeof tempFn === 'function') {
      tempFn.call(this)
    } else {
      // 当前这一项是 null
      arr.splice(i, 1)
      i--
    }
  }
}

/*
* 最终总结：
*   bind(curEle, eventType, Fn)：实现了事件绑定在 IE 6~8 下 this 指向问题及重复绑定相同方法问题，需要包装 Fn，并且将包装前后的方法记载到 curEle 属性中，已便于 unbind 移除
*   unbind(curEle, eventType, Fn)：移除 bind 绑定的事件，通过 curEle 中记录的属性进行对比
*
*   on(curEle, eventType, Fn)：在 bind 基础上实现了 ie 6~8 同一个事件绑定多个方法时，执行顺序混乱问题。on 为自己实现的事件池，顺序记录了 curEle 绑定的事件，挂载在 curEle 对象上，为一个数组
*   off(curEle, eventType, Fn)：移除 on 方法绑定的事件，直接将 curEle 对象中记录事件数组中某一天数据移除
*   run(e)：内部实现的统一调度的事件执行方法。on 方法中将所有事件记录起来，并最终为每一个事件绑定了 run 方法，此处会注意携带 this 指向及重复问题，当事件触发，执行 run 方法，到 on 中的事件池数组中依次执行，从而解决顺序问题。
*
*   最终，调用 on 及 off 方法进行绑定及移除即可
*/
```
