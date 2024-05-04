# React

React 是由 `facebook` 推出，当下前端最流行的开源框架，学好 React 势在必行。

- [hooks 各种问题汇总](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [React Hooks 使用误区，驳官方文档](https://mp.weixin.qq.com/s/DLN9jjkAhJSJHksos_t43A)
- [React 全家桶汇总](https://juejin.cn/post/7085542534943883301)
- [How to use SVGs in React](https://blog.logrocket.com/how-to-use-svgs-in-react/)
- [react 中实现动画](https://segmentfault.com/a/1190000030696292)
- [rc-field-form实现](https://juejin.cn/post/6922595635396870152)
- [rc-field-form实现](https://juejin.cn/post/6897038502517555207)
- [react源码系列文章](https://juejin.cn/post/7166547963517337614)

## 目录

- [jsx](jsx.md)
- [redux guide](reduxguide.md)
- [vdom](vdom.md)

## react hooks 为啥不能放在 if 中

react 是根据 useState 出现的顺序来定的，react 规定我们必须把 hooks 写在函数的最外层，不能写在 ifelse 等条件语句当中，来确保 hooks 的执行顺序一致

## ReactNode 和 ReactElement 的差异

```ts
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
  key: Key | null;
}

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
```

## 函数组件和类组件的相同点和不同点

### 相同点

- 它们都可以接收属性并且返回 React 元素

### 不同点

- 编程思想不同: 类组件需要创建实例，是基于面向对象的方式编程，而函数式组件不需要创建实例，接收输入，返回输出，是基于函数式编程的思路来编写的
- 内存占用：类组件需要创建并保存实例，会占用一定内存，函数组件不需要创建实例，可以节约内存占用
- 捕获特性：函数组件具有值捕获特性
- 可测试性: 函数式组件更方便编写单元测试
- 状态: 类组件有自己的实例，可以定义状态，而且可以修改状态更新组件，函数式组件以前没有状态，现在可以使用 useState 使用状态
- 生命周期: 类组件有自己完整的生命周期，可以在生命周期内编写逻辑，函数组件以前没有生命周期，现在可以使用 useEffect 实现类似生命周期的功能
- 逻辑复用: 类组件可以通过继承实现逻辑的复用，但官方推荐组合优于继承，函数组件可以通过自定义 Hooks 实现逻辑的复用
- 跳过更新: 类组件可以通过 shouldComponentUpdate 和 PureComponent 来跳过更新，而函数式组件可以使用 React.memo 来跳过更新
- 发展前景: 未来函数式组件将会成为主流，因为它可以更好的屏蔽 this 问题、规范和复用逻辑、更好的适合时间分片和并发渲染

## react18 新特性

- 新的 render API，createRoot 等
- setState 自动批处理，性能优化。批处理是一个破坏性改动，如果你想退出批量更新，可以使用 flushSync
- 组件返回值支持了 undefined，不在报错
- Suspense 不再需要 fallback 来捕获

### Concurrent Mode（并发模式）

## 优化手段

对于正常的项目优化，一般都涉及到几个方面，开发过程中、上线之后的首屏、运行过程的状态

- 首屏优化一般涉及到几个指标 FP、FCP、FMP;要有一个良好的体验是尽可能的把 FCP 提前，需要做一个工程化处理，去优化资源的加载
- 方式以及分包策略，资源的减少是最有效的加快首屏打开的方式
- 对于 CSR 的应用，FCP 的过程一般是首先加载 js 与 css 资源，js 在本地执行完成，然后加载数据回来，做内容初始化渲染，这中间就有几次的网络反复请求的过程；所以 CSR 可以考虑使用骨架屏以及预渲染(部分结构预渲染)、suspence 与 lazy 做懒加载动态组件的方式
- 当然还有另外一种方式就是 ssr 的方式，ssr 对于首屏的优化有一定的优势，但是这种瓶颈一般在 node 服务器端的处理，建议使用 stream 流的方式来处理，对于体验与 node 端的内存管理等都有优势
- 不管对于 CSR 或 SSR，都建议配合使用 Service worker，来控制资源的调配以及骨架屏秒开的体验
- react 项目上线后，首先需要保障的是可用性，所以可以通过 React.Profiler 分析组件的渲染次数以及好事的一些任务，但是 Profile 记录的是 commit 阶段的数据，所以对于 react 的调和阶段就需要结合 performance API 一起分析
- 由于 React 是父级 props 改变之后，所有与 props 不相关子组件在没有添加条件控制的情况下，也会触发 render 渲染，这是没有必要的，可以结合 React 的 PureComponent 以及 React.memo 等做浅比较处理，当然也可以结合使用 ShouldComponentUpdate 做深比较处理
- 所有的运行状态优化，都是减少不必要的 render，React.mome 与 React.callback 也是可以做很多优化的地方
- 在很多应用中，都会涉及到使用 redux 以及在使用 context，这两个都可能造成许多不必要的 render，在使用的时候，也需要谨慎的处理一些数据；
- 最后就是保证整个应用的可用性，为组件创建错误边界，可以使用 componentDidCatch 来处理
- 保证数据的不可变性
- 使用唯一的键值迭代
- 使用 web worker 做密集型的任务处理
- 不在 render 中处理数据
- 不必要的标签，使用 React.Fragment
