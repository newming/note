# nodejs 部分学习笔记

进入严格模式

```bash
node --use_strict
```

### 全局变量

- global: 如同浏览器的 window 对象
- process: 获取当前的 Node 进程信息，一般用于获取环境变量之类的信息
- console: 与浏览器相似process.stdin.setEncoding('utf8');

```js
process.stdout.getWindowSize() // node 获取命令行窗口宽高
```

### 异步编程(错误优先，callback往后)

- Node 采用 Chrome V8 引擎处理 JavaScript 脚本，V8 最大的特点就是单线程运行，一次只能运行一个任务。
- Node 大量采用异步操作(asynchronous operation)，即任务不是马上执行，而是插在任务队列的尾部，等到前面的任务运行完后再执行。
- 提高代码的相应能力

### 进程

- 每一个正在运行的应用程序都称之为进程
- 每一个应用程序运行都至少有一个进程
- 进程是用来给应用程序提供一个运行的环境
- 进程是操作系统为应用程序分配资源的一个单位

node 进程启动后会默认创建一个线程（main thread），用于执行我们带代码

### 线程

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
const fs = require('fs')

fs.stat('./README1.md', (err, stats) => {
  if (err) {
    console.log(err)
    fs.writeFile('./README1.md', 'haha',function (err) {
      if (err) return console.log('new file falied')
      console.log('文件创建成功')
    })
    return
  }
  // console.log(stats)
  fs.unlink('./README1.md', (err) => {
    if (err) return console.log('remove falied')
    console.log('already remove')
    fs.writeFile('./README1.md', 'haha',function (err) {
      if (err) return console.log('new file falied')
      console.log('文件删除成功后创建')
    })
  })
})
```

node 本身将所有的阻塞操作交给了内部实现的线程池，node 本身主线程主要就是不断的调度

### 模块化

##### Module
每个模块内部都是一个独立（私有）作用域，模块与模块之间不会有冲突

-  node 采用的模块化结构是 `CommonJS` 规范
- 模块和文件是一一对应，即加载一个模块，实际上就是记载对应的一个文件模块

模块中的全局变量（在 REPL 中无效）：
- __dirname: 脚本所在路径
- __filename: 文件所在路径(包含文件名)

module, exports 对象：

```js
console.log(module) // object
// Module {
//   id: '.', // 文件路径，如果是入口文件则是 .
//   exports: {},
//   parent: null, // 被谁加载，即被谁引用了，如果 parent 为 null 则该文件为入口文件
//   filename: '/Users/newming/doc/note/node/test.js',
//   loaded: false,
//   children: [],
//   paths:[
//     '/Users/newming/doc/note/node/node_modules',
//     '/Users/newming/doc/note/node_modules',
//     '/Users/newming/doc/node_modules',
//     '/Users/newming/node_modules',
//     '/Users/node_modules',
//     '/node_modules'
//   ]
// }

// module.exports 与 exports 关系
// exports 是 module.exports 的别名
// var module = {}
// module.exports = {}
// var export = module.exports
```

module 对象：
- node 内部提供一个 Module 构造函数，所有模块都是 Module 实例，属性如下：
  - module.id 模块的标识符，通常是带有绝对路径的模块文件名
  - module.filename 模块定义的文件绝对路径
  - module.loaded 返回一个布尔值，表示模块是否已经被加载
  - module.parent 返回一个对象，表示调用该模块的模块
  - module.children 返回一个数组，表示该模块要用到的其他模块
  - module.exports 表示模块对外输出的值
- 载入一个模块就是构建一个 Module 实例

##### require

```js
// 自己实现一个 require
function $require (id) {
  
}
```