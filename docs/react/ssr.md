# React SSR 实现原理

## 核心原理

服务端接收到客户端的请求路由后，查找对应的数据，以 props、context、store 的形式注入组件中，然后基于 react 提供的 api:renderToString 将组件转换为 html 字符串输出到客户端。客户端使用该数据进行渲染，保证数据的一致性 React SSR 之所以能够实现，本质是虚拟 dom 的存在。判断环境是服务器环境，可以操作 JS 对象，把虚拟 DOM 映射成字符串输出。判断环境是客户端环境，可以操作 JS 对象，将虚拟 DOM 映射成真实 DOM，完成页面挂载

## 注意事项

- 客户端需要使用 ReactDOM.hydrate 来渲染组件
- 客户端路由和服务端路由的机制不同，需要在两个环境中配置路由。服务端路由需要解析 url 从而渲染对应的 html 字符串，而客户端可以自动匹配 URL 中的路由，将对应的组件渲染成 DOM
- 服务端执行环境没有 window 和 document 等宿主对象，并且执行组件的 construct、componentWillReceiveProps、render 生命周期，所以必须避免代码中的此类调用。可以通过 typeof window 或 webpack.definePlugin 来对客户端和服务端做区分
- 服务端和客户端需要不同的 webpack 配置
- 入口文件不一样，服务端无需将第三方模块打包进源代码中，服务端渲染的代码，如果加载第三方模块，这些第三方模块是不需要被打包到最终的源码中，因为 node 环境下通过 npm 已经安装这些包，直接引用就好，不需要额外再打包到代码里。可以使用 webpack-node-externals 插件解决这个问题，服务端需要配置: target:node
- 服务端的数据仓库 store 的隔离性
- 数据的获取需要放在 componentDidMount 生命周期中执行，需要在服务端配置接口请求的代理
- hook 的异步更新机制在服务端不适用
- store 不能是单例，因为所有用户共享一个 store
- 服务端渲染的性能关键在于是否做好缓存，但要注意缓存，运用不当可能会引发内存泄漏以及数据的不一致性
