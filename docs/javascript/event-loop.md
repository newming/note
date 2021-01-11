# event loop事件循环

- [文章](https://juejin.im/post/5b73d7a6518825610072b42b)

## js中的同步异步编程

- js是单线程的，一次只能干一件事情，同步
- 任务队列的机制，遇到需要异步执行的任务(定时器，事件绑定，AJAX，Promise)，先把任务放置在任务队列当中，接下来继续执行同步任务，当同步任务执行完，浏览器渲染线程闲下来了，再去任务队列中按照指定顺序把异步任务执行
  - Event Loop
  - Event Quene: 微任务(Promise)，宏任务(setTimeout)。先找微任务，在找宏任务

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})

console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// promise3
// setTimeout
```

```js
function func1(){
  console.log('func1 start');
  return new Promise(resolve=>{
    resolve('OK');
  });
}
function func2(){
  console.log('func2 start');
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve('OK');
    },10);
  });
}
console.log(1);
setTimeout(async () => {
  console.log(2);
  await func1(); // 注意这里 await 后直接成功同步调用下方的console
  console.log(3);
}, 20);
for (let i = 0; i < 90000000; i++) {} //循环大约要进行80MS左右
console.log(4);
func1().then(result=>{
  console.log(5);
});
func2().then(result=>{
  console.log(6);
});
setTimeout(() => {
  console.log(7);
}, 0);
console.log(8);

// 输出结果
// 1
// 4
// func1 start
// func2 start
// 8
// 5
// 2
// func1 start
// 3
// 7
// 6
```
