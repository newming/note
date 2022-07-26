# nodejs 部分学习笔记

## 目录

- [buffer](buffer.md)
- [命令行动画](console-ani.md)
- [核心模块的意义](core.md)
- [Event 模块](event.md)
- [nodejs 事件循环，计时器和 process.nextTick()](eventloop-timer-nexttick.md)
- [文件操作](file-operate.md)
- [http 模块](http.md)
- [CommonJs 模块化](module.md)
- [获取 post 请求数据](post.md)
- [process 相关几个属性](process.md)
- [require](require.md)
- [处理命令行中的输入，模拟登陆](shell-login.md)
- [Socket 基础](socket.md)
- [stream 流](stream.md)

## 特点

- 单线程
- 异步 I/O
- 事件驱动

进入严格模式

```bash
node --use_strict
```

## 全局变量

- global: 如同浏览器的 window 对象
- process: 获取当前的 Node 进程信息，一般用于获取环境变量之类的信息
- console: 与浏览器相似 process.stdin.setEncoding('utf8');

```js
process.stdout.getWindowSize(); // node 获取命令行窗口宽高
```

## 异步编程(错误优先，callback 往后)

- Node 采用 Chrome V8 引擎处理 JavaScript 脚本，V8 最大的特点就是单线程运行，一次只能运行一个任务。
- Node 大量采用异步操作(asynchronous operation)，即任务不是马上执行，而是插在任务队列的尾部，等到前面的任务运行完后再执行。
- 提高代码的相应能力

## 进程

- 每一个正在运行的应用程序都称之为进程
- 每一个应用程序运行都至少有一个进程
- 进程是用来给应用程序提供一个运行的环境
- 进程是操作系统为应用程序分配资源的一个单位

node 进程启动后会默认创建一个线程（main thread），用于执行我们带代码

## 线程

- 用来执行应用程序中的代码
- 在一个进程内部，可以有很多的线程
- 在一个线程内部，同时只可以干一件事
- 而且传统的开发方式都是 I/O 阻塞的
- 所以需要多线程来更好的利用硬件资源
- 给人带来一种错觉，线程越多越好
  - 线程之间共享某些数据，同步某个状态都很麻烦
  - 创建线程耗费
  - 线程数量有限
  - CPU 在不同线程之间转换，有上下文转换，非常耗时

node 如何充分利用单线程

```js
const fs = require("fs");

fs.stat("./README1.md", (err, stats) => {
  if (err) {
    console.log(err);
    fs.writeFile("./README1.md", "haha", function (err) {
      if (err) return console.log("new file falied");
      console.log("文件创建成功");
    });
    return;
  }
  // console.log(stats)
  fs.unlink("./README1.md", (err) => {
    if (err) return console.log("remove falied");
    console.log("already remove");
    fs.writeFile("./README1.md", "haha", function (err) {
      if (err) return console.log("new file falied");
      console.log("文件删除成功后创建");
    });
  });
});
```

node 本身将所有的阻塞操作交给了内部实现的线程池，node 本身主线程主要就是不断的调度

## 调试

```bash
# 使用 chrome 调试
# 第一步 开启调试
node --inspect app.js

node --inspect-brk app.js # 在开头停住

# 第二步，打开 chrome://inspect/
```

## node 版本管理工具

- nvm
- volta
