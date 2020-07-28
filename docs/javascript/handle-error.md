# 前端异常监控、上报

- [掘金-前端异常监控、上报及js压缩代码定位](https://juejin.im/post/5b55c3495188251acb0cf907)
- [js错误监控](https://www.cnblogs.com/warm-stranger/p/9417084.html)

### window.onerror

```js
window.addEventListener('error', (msg, url, row, col, error) => {
  console.log('我知道错误了');
  console.log(
    msg, url, row, col, error
  );
  return true;
}, true);
```

- window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx。
- window.onerror 是无法捕获到网络异常的错误。由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，但是这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 。还需要配合服务端日志才进行排查分析才可以。

### promise 错误


```js
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('我知道 promise 的错误了');
  console.log(e.reason);
  return true;
});
```
