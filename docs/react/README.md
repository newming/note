# React

React 是由 `facebook` 推出，当下前端最流行的开源框架，学好 React 势在必行。

- [hooks 各种问题汇总](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [React Hooks 使用误区，驳官方文档](https://mp.weixin.qq.com/s/DLN9jjkAhJSJHksos_t43A)

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
