# JSX 语法

JSX 是 React 的一项非常高明的创新。是语法糖，最终还是需要转为 js 执行。并且已经成为了一个标准。

## 为什么需要 vdom

- vdom 是 React 初次推广开来的，结合 JSX
- JSX 就是模版，最终要渲染成 html
- 初次渲染 + 修改 state 后的 re-render，正好符合 vdom 的应用场景

```js
React.createElement(tag, props, children)

// 初次渲染，回触发 patch(container, vnode)
ReactDOM.render(<App />, container)

// re-render -> setState，触发 patch(newVnode, oldVnode)
```

## 自定义组件的解析

```js
React.createElement('div', null, React.createElement(
  Test, null
))

// 注意：正常 html 标签是一个字符串，自定义组件是传入了一个 class
```

- 'div' 直接渲染 `<div>` 即可，vdom 可以做到
- Test 是自定义组件(class)，vdom 默认不认识
- 因此 Test 组件定义的时候必须声明 render 函数
- 根据 props 初始化实例，然后执行实例的 render 函数
- render 函数返回的还是 vnode 对象

## setState 异步

组件每次 setState 后会执行继承过来的 renderComponent 方法，实现更新。在 renderComponent 内实现虚拟 dom 更新

为何需要异步：

- 可能会一次执行多次 setState
- 无法规定、限制用户如何使用 setState
- 没必要每次 setState 都重新渲染，考虑性能
- 即便是每次重新渲染，用户也看不到中间的效果

## React VS Vue

两者有什么本质区别（模版、组件化）：

- vue 本质是 MVVM 框架，由 MVC 发展而来
- React 本质是前端组件化框架，由后端组件化发展而来
- vue 使用模版（最初由 angular 提出）
- React 使用 JSX
- React 本身就是组件化，没有组件化就不是 React
- vue 也支持组件化，不过是在 MVVM 上的拓展

模版语法上，更喜欢 JSX，因为 JSX 写起来更像 html ，用 `{}` 包起来的是 js 语法，风格统一，学习成本低。但是模版与各种 js, css 混在一起，不是很清楚。

模版分离上，更喜欢 Vue，但是 Vue 的写法上有一些不是很直观的东西，比如 v-if="ok"，这里 ok 是一个变量，容易造成误解，增加学习成本。

两者共同点：

- 都支持组件化
- 都是数据驱动视图

选择：

- 国内使用，首推 vue，文档易读、易学、社区够大
- 如果团队水平够高，推荐使用 React。组件化和 JSX