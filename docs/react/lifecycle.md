# react class 组件生命周期函数

[参考文章](https://zhuanlan.zhihu.com/p/225813191)

生命周期可被分为 3 个阶段：

- 挂载（Mounting）
  - constructor: 在生命周期中，类的构造函数 constructor() 会率先被执行，用于初始化组件的状态、接收外部传递进来的数据、绑定成员方法的 this 指向等工作。（只执行一次）
  - componentWillMount: 会运行在 render() 之前，它是渲染之前的回调函数。不过，由于在这个方法中执行的任务都能提前到 constructor() 中，因此实际项目中很少会用到它。（只执行一次）
  - render: 是在定义组件时必须声明的方法，它是一个无副作用的纯函数，可根据组件的 props 和 state 得到一个 React 元素、null 或 false 等返回值，并且在 render() 方法中不能调用改变组件状态的 this.setState() 方法。注意，将元素渲染到页面 DOM 中的工作都由 React 负责，而不是 render() 方法
  - componentDidMount: 会运行在 render() 之后，它是渲染之后的回调函数。此时组件已被挂载到页面中，可以执行 DOM 相关的操作，例如异步读取服务器中的数据并填充到组件中、调用 jQuery 代码等。（只执行一次）
- 更新（Updating）: props, state, forceUpdate()会触发组件更新
  - componentWillReceiveProps: 常用于执行 props 更新后的逻辑，只有 props 更新方式才会调用它
  - shouldComponentUpdate: 用于决定是否继续组件的更新，它能接收 2 个参数：nextProps 和 nextState
  - componentWillUpdate: 运行在 render() 之前，接收 2 个参数，提供更新之后的 props 和 state
  - componentDidUpdate: 运行在 render() 之后，接收 2 个参数，提供更新之前的 props 和 state，不可 setState，避免死循环
- 卸载（UnMounting）: 该方法内适合做些清理的工作，例如清除定时器、移除多余的 DOM 元素等
  - componentWillUnmount

在 16.3 之后，有三个生命周期被标记为过时: componentWillMount()、componentWillReceiveProps() 和 componentWillUpdate()

新增

- static getDerivedStateFromProps(nextProps, prevState): 用来替代 componentWillReceiveProps()，它在 render() 方法之前触发，包含两个参数：nextProps 和 prevState，分别表示新的 props 和旧的 state。如果返回一个对象，那么更新 state；如果返回 null，那么就不更新 state
- getSnapshotBeforeUpdate(prevProps, prevState): 用来替代 componentWillUpdate()。它在最近一次渲染输出（即更新 DOM）之前触发，包含两个参数：prevProps 和 prevState，分别表示旧的 props 和旧的 state，返回值会成为 componentDidUpdate() 的第三个参数
