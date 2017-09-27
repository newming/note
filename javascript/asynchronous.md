# js 异步编程思想

> js 是单线程的，只能同时做一件事情，在完成后才会接着做下一件事，js 大部分是同步编程

- 定时器: 每一个浏览器对于定时器的等待时间都有一个最小的值，谷歌: 5~6ms，IE: 10~13ms，如果设置的等待时间小于这个值，不起作用，还是需要等到最小时间才执行。比如设置了等待 0，也需要等这个最小时间
- ajax
- callback
- 事件绑定(eventbind)

```js
// 1
var n = 0
setTimeout(function () {
  n ++
  console.log(n) // 不执行
})
console.log(n) // 0
while (1) {
  n ++
}
console.log(n) // 不执行
```