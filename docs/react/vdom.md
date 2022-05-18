# 虚拟 DOM

virtual DOM，以下简称 vdom，虚拟 DOM 就是一个描述真实 DOM 的纯 JS 对象。这里使用 snabbdom 说明

react 中 **React.createElement** 函数所返回的就是一个虚拟 DOM

## 什么是 vdom

- virtual dom，虚拟 DOM
- 用 js 模拟 DOM 结构
- DOM 变化的对比，放在 js 层来做(图灵完备语言)
- 提高重绘性能

## 优点

- 处理了浏览器兼容性问题，避免用户操作真实 DOM，那么又麻烦又容易出错
- 内容经过了 XSS 处理，可以防范 XSS 攻击
- 容易实现跨平台开发 Android、iOS、VR 应用
- 更新的时候可以实现差异化更新，减少更新 DOM 的操作

## 缺点

- 虚拟 DOM 需要消耗额外的内存
- 首次渲染其实并不一定会更快

```html
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
</ul>
```

js 描述的虚拟 DOM:

```js
{
  tag: 'ul',
  attrs: {
    id: 'list'
  },
  children: [
    {
      tag: 'li',
      attrs: { className: 'item' },
      children: ['Item 1']
    },
    {
      tag: 'li',
      attrs: { className: 'item' },
      children: ['Item 2']
    }
  ]
}
```

## 核心 api

- h('<标签名>', {...属性}, [...子元素||字符串])
- patch(container, vnode) 注册 dom
- patch(vnode, newVnode) 重新渲染
