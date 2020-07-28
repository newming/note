# 虚拟 DOM

virtual DOM，以下简称 vdom。这里使用 snabbdom 说明

## 什么是 vdom

- virtual dom，虚拟 DOM
- 用 js 模拟 DOM 结构
- DOM 变化的对比，放在 js 层来做(图灵完备语言)
- 提高重绘性能

```html
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
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
