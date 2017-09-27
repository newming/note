# 图片延迟加载／图片懒加载

作用：保证页面的打开速度，减少 http 请求

原理：
1. 对于首屏内容中的图片，首先给对应的区域一张默认图片占着位置（默认图片需要非常的小，一般可以维持在5kb以内），当首屏内容都加载完成后（或者也可以给一个延迟的时间），在开始加载真实的图片
2. 对于其他屏的图片，也是给一个默认的图片占位，当滚动条滚动到对应区域的时候开始加载真实的图片

数据的异步加载：开始只把前两屏的数据加载绑定进来，后面的数据不进行处理，当页面滚动到对应区域的时候从新请求数据然后进行渲染绑定

```js
// 1. 首屏加载单张图片加载
function lazyload() {
  var oImg = new Image()
  oImg.src = imgdom.getAttribute('trueimg')
  oImg.onload = function () {
    imgdom.src = this.src
    oImg = null
  }
}

// 2. 单张图片加载，其他屏，滚动到对应位置加载，这里按当图片元素完全进入可视区域后加载
// 获取元素的 offset
function offset (curEle) {
  let totalLeft = null,
    totalTop = null,
    par = curEle.offsetParset
  totalLeft += curEle.offsetLeft
  totalTop += curEle.offsetTop
  while (par) {
    if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
      totalLeft += par.clientLeft
      totalTop += par.clientTop
    }
    totalLeft += par.offsetLeft
    totalTop += par.offsetTop

    par = par.offsetParent
  }

  return {top: totalTop, left: totalLeft}
}
// 获取浏览器属性
function win (attr, val) {
  if (typeof val === 'undefined') {
    return document.documentElement[attr] || document.body[attr]
  } else {
    document.documentElement[attr] = val
    document.body[attr] = val
  }
}

window.onscroll = function () {
  // 如果已经加载过了就不去执行了，自己记录一个 flag
  if (imgdom.isLoad) {
    return
  }
  var distanceA = imgdom.offsetHeight + offset(imgdom).top
  var distanceB = win('clientHeight') + win('scrollTop')
  if (distanceA < distanceB) {
    let oImg = new Image
    oImg.src = imgdom.getAttribute('trueImg')
    oImg.onload = function () {
      imgdom.src = this.src
      oImg = null
    }
    imgdom.isLoad = true // if 的内容执行一次就行
  }
}
```