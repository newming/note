# fiber

- [从setState, forceUpdate, unstable_batchedUpdates看React的批量更新](https://juejin.cn/post/6844903886407352334?from=search-suggest)
- [今天让你彻底搞懂setState是同步还是异步](https://zhuanlan.zhihu.com/p/350332132)

只要你进入了 react 的调度流程，那就是异步的(<18会做自动合并)。只要你没有进入 react 的调度流程，那就是同步的。什么东西不会进入 react 的调度流程？ setTimeout setInterval ，直接在 DOM 上绑定原生事件等。这些都不会走 React 的调度流程，你在这种情况下调用 setState ，那这次 setState 就是同步的。 否则就是异步的。

而 setState 同步执行的情况下， DOM 也会被同步更新，也就意味着如果你多次 setState ，会导致多次更新，这是毫无意义并且浪费性能的。

## 1.背景简介

react 在进行组件渲染时，从 setState 开始到渲染完成整个过程是同步的。如果需要渲染的组件比较大，js 执行会占据主线程时间较长，会导致页面响应效果变差，使 react 在动画、手势方面应用效果比较差

页面卡顿: Stack reconciler 的工作流程像函数的调用过程。父组件调用子组件像是函数递归；对于庞大的 dom 树来说，recognition 过程会很长，超过了 16ms。在其期间，主线程是被 js 占用的，因此任何交互、布局、渲染都会停止，给用户的画面是页面被卡住了

## 2. 实现原理

旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，会一直执行到空栈为止。而 fiber 实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式是使用了浏览器的 rerequestIdleCallback 这一个 api。fiber 其实指得是一种数据结构，它可以用一个纯 js 对象来进行表示。

react 内部运转分三层：

- Virtual DOM 层: 描述页面长什么样子
- Reconciler 层: 负责调用组件声明周期方法，进行 Diff 运算等
- Renderer 层: 根据不同的平台，渲染出相应的页面，常见的是 react-dom

为了实现不卡顿的效果，需要有一个调度器(Scheduler)来进行分配。优先级高的任务(键盘输入)可以打断优先级低的任务(diff)的执行，从而更快的生效。任务的优先级有六种：

- synchronous，与之前的 Stack Reconciler 操作一样，同步执行
- task，在 next tick 之前执行
- animation，下一帧之前执行
- high，在不久的将来执行
- low，稍微延迟执行也没关系
- offscreen，下一次 render 时或 scroll 时才执行

Fiber Reconclier(react)执行阶段:

- 阶段 1：生成一个 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断
- 阶段 2：将需要更新的节点一次批量更新，这个过程不能被打断。

Fiber 树：Fiber Reconciler 在阶段 1 进行 diff 计算的时候，会基于 virtual DOM 树生成一颗 Fiber 树，它的本质是链表。

从 Stack Reconciler 到 Fiber Reconciler，源码层面其实是干了一件递归循环的事情

## React16+的渲染流程

- scheduler 选择高优先级的任务进入 reconciler
- reconciler 计算变更的内容
- react-dom 把变更的内容渲染到页面上

## fiber

- 我们可以通过某些调度策略合理分配 CPU 资源，从而提高用户的响应速度
- 通过 Fiber 架构，让自己的调和过程变成可被中断。 适时地让出 CPU 执行权，可以让浏览器及时地响应用户的交互

- React 目前的做法是使用链表, 每个 VirtualDOM 节点内部表示为一个 Fiber
- 从顶点开始遍历
- 如果有第一个儿子，先遍历第一个儿子
- 如果没有第一个儿子，标志着此节点遍历完成
- 如果有弟弟遍历弟弟
- 如果有没有下一个弟弟，返回父节点标识完成父节点遍历，如果有叔叔遍历叔叔
- 没有父节点遍历结束
