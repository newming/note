# hybrid

- 移动端占大部分流量，已经远远超过 PC
- 一线互联网公司都有自己的 App
- 这些 App 中都有很大比例的前端代码

问题：

- hybrid 是什么，为何用 hybrid
- 介绍一下 hybrid 更新和上线的流程
- hybrid 和 h5 的主要区别
- 前端 js 和客户端如何通讯

## hybrid 是什么，为何使用 hybrid

- hybrid 即 '混合'，即前端和客户端的混合开发
- 需要前端开发人员和客户端开发人员配合完成
- 某些环节也可能涉及到 server 端
- 可以快速迭代更新【关键】(无需 app 审核)
- 体验流畅（和NA的体验基本类似）
- 减少开发和沟通成本，双端公用一套代码

## webview

- 是 app 中的一个组件（app 可以有 webview，也可以没有）
- 用于加载 h5 页面，即一个小型的浏览器内核

## file 协议

- file 协议：本地文件，快
- http(s)协议：网络加载，慢

- 不是所有的场景都适合使用 hybrid
- 使用 NA:体验要求极致，变化不频繁
- 使用 hybrid:体验要求高，变化频繁
- 使用 h5:体验无要求，不常用

## 具体实现

- 前端做好静态页面(html, css, js)，将文件交给客户端
- 客户端拿到前端静态页面，以文件的形式存储在 app 中
- 客户端在一个 webview 中
- 使用 file 协议加载静态页面

## 更新流程

- 分版本，有版本号，如 201803211015
- 将静态文件压缩成 zip 包，上传到服务端
- 客户端每次启动，都去服务端检查版本号
- 如果服务端版本号大于客户端版本号，就去下载最新的 zip 包
- 下载完之后解压包，然后将现有文件覆盖

## hybrid 和 h5 区别

hybrid 缺点：

- 开发成本高。联调、测试、查 bug 都比较麻烦
- 运维成本高。

适用的场景：

- hybrid: 产品的稳定功能，体验要求高，迭代频繁
- h5: 单次的运营活动(如 xx 红包)或不常用的功能

## js 和 客户端 通讯

- js 访问客户端能力，传递参数和回调函数
- 客户端通过回调函数返回内容

## schema 协议简介和使用

```
/* 网上搜的微信的部分 schema 协议 */

weixin://dl/scan    扫一扫
weixin://dl/feedback    反馈
weixin://dl/moments    朋友圈
weixin://dl/settings    朋友圈
weixin://dl/nofifications   消息通知设置
weixin://dl/chat     聊天设置
weixin://dl/general    通用设置
weixin://dl/officialaccounts   公众号
weixin://dl/game   游戏
weixin://dl/help   帮助
weixin://dl/profile   个人信息
weixin://dl/features   功能插件
```

简单演示：

```js
var iframe = document.createElement('iframe')
iframe.style.display = 'none'
iframe.src = 'weixin://dl/scan'
var body = document.body || document.getElementByTagName('body')[0]
body.appengChild(iframe)

setTimeout(function () {
  body.removeChild(iframe)
  iframe = null
})
```

```js
window['_weixin_scan_callback'] = function (result) {
  alert(result)
}

iframe.src = 'weixin://dl/scan?k1=v1&k2=v2&callback=_weixin_scan_callback'
```