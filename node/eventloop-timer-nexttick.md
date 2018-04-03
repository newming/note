# nodejs 事件循环，计时器和 process.nextTick()

翻译 nodejs 官网 [guide](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) 的一篇文章

[阮一峰的翻译](http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html)

太难了。。。佩服软老师的翻译功底。先按 Google 翻译的贴上。

## 什么是事件循环

事件循环允许Node.js执行非阻塞I / O操作 - 尽管JavaScript是单线程的 - 只要有可能就将操作卸载到系统内核。

由于大多数现代内核都是多线程的，他们可以处理在后台执行的多个操作。 当其中一个操作完成时，内核会通知Node.js，以便可以将适当的回调添加到轮询队列中以最终执行。 我们将在本主题后面进一步详细解释这一点。

## 解析事件循环

当Node.js启动时，它会初始化事件循环，处理提供的输入脚本（或放入REPL，本文档未涉及），这可能会导致异步API调用，调度定时器或调用process.nextTick（）， 然后开始处理事件循环。

下图显示了事件循环的操作顺序的简化概述。

```
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

> 注意：每个方框将被称为事件循环的“阶段”。

每个阶段都有一个执行回调的FIFO队列。虽然每个阶段都有其特定的方式，但通常情况下，当事件循环进入给定阶段时，它将执行特定于该阶段的任何操作，然后在该阶段的队列中执行回调，直到队列耗尽或回调的最大数量 已执行。 当队列耗尽或达到回调限制时，事件循环将移至下一个阶段，依此类推。

由于这些操作中的任何一个都可以调度更多操作，并且在轮询阶段处理的新事件由内核排队，所以轮询事件可以在轮询事件正在处理时排队。因此，长时间运行的回调可以使轮询阶段的运行时间远远超过计时器的阈值。 有关更多详细信息，请参阅定时器和轮询部分。

> 注意：Windows和Unix / Linux实现之间略有差异，但这对此演示不重要。 最重要的部分在这里。 实际上有七八个步骤，但我们关心的那些 - Node.js实际使用的那些 - 就是上述那些。

## 各个阶段概述

- times: 这个阶段执行 setTimeout 和 setInterval 的回调
- I/O callbacks: 执行几乎所有的回调，除了关闭回调，定时器计划的回调和 setImmediate()。比如 readFile 的回调
- idle, prepare: 只在内部使用。不用管了。
- poll: 检索新的 I/O 事件; 适当时节点将在此处阻塞。
- check: setImmediate() 的回调在这里被调用。
- close callbacks: socket.on('close', ...) 等等。

在事件循环的每次运行之间，Node.js检查它是否正在等待任何异步 I/O 或定时器，并在没有任何异步 I/O 或定时器时清除关闭。

## 各阶段详情

### times

计时器指定阈值，之后可以执行提供的回调，而不是人们希望执行的确切时间。 定时器回调将在指定的时间过后，按照预定的时间运行; 但是，操作系统调度或其他回调的运行可能会延迟它们。

> 从技术上讲，轮询阶段控制何时执行定时器。

例如，假设您计划在 100ms 阈值后执行超时，那么您的脚本将异步开始读取需要 95ms 的文件：

```js
const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

当事件循环进入轮询阶段时，它有一个空队列（fs.readFile()尚未完成），因此它将等待剩余的毫秒数，直到达到最快计时器的阈值。当它等待95ms传递时，fs.readFile（）完成读取文件，并且需要10ms完成的回调被添加到轮询队列并执行。当回调完成时，队列中没有更多的回调，所以事件循环会看到已经达到最快计时器的阈值，然后回到计时器阶段以执行计时器的回调。 在这个例子中，你会看到被调度的定时器和它正在执行的回调之间的总延迟将是105ms。

> 为了防止轮询阶段事件循环过量，libuv（实现Node.js事件循环的C库以及该平台的所有异步行为）在其停止轮询更多事件之前也有一个硬性最大值（依赖于系统）。

### I/O callbacks

此阶段为某些系统操作（如TCP错误类型）执行回调。 例如，如果尝试连接时TCP套接字收到ECONNREFUSED，则某些* nix系统要等待报告错误。这将排队在 I/O 回调阶段执行。

### poll

这个阶段是轮询时间，用于等待还未返回的 I/O 事件，比如服务器的回应、用户移动鼠标等等。

这个阶段的时间会比较长。如果没有其他异步任务要处理（比如到期的定时器），会一直停留在这个阶段，等待 I/O 请求返回结果。

轮询阶段有两个主要功能：

1. 执行已经到时的定时器
2. 处理轮询队列中的事件

当事件循环进入轮询阶段并且没有计时器时，会发生以下两件事之一：

- 如果轮询队列不为空，则事件循环将遍历其回调队列，同步执行它们，直到队列耗尽或达到系统相关硬限制
- 如果轮询队列为空，还有两件事情会发生
  - 如果脚本已由 setImmediate() 调度，则事件循环将结束轮询阶段并继续执行 check 阶段以执行这些预定脚本
  - 如果脚本没有通过 setImmediate() 进行调度，则事件循环将等待回调被添加到队列中，然后立即执行它们

一旦轮询队列为空，事件循环将检查已达到时间阈值的定时器。 如果一个或多个定时器准备就绪，则事件循环将回退到定时器阶段以执行这些定时器的回调。

### check

此阶段允许一个人在轮询阶段结束后立即执行回调。如果轮询阶段变得空闲并且脚本已用 setImmediate() 排队，则事件循环可能会继续进行检查阶段而不是等待。

setImmediate() 实际上是一个特殊的定时器，它在事件循环的一个单独的阶段中运行。它使用libuv API来调度回调，以在轮询阶段完成后执行。

通常，随着代码的执行，事件循环将最终进入轮询阶段，在那里它将等待传入的连接，请求等。但是，如果使用setImmediate() 计划了回调并且轮询阶段变为空闲，将结束并继续进行检查阶段，而不是等待轮询事件。

### close callbacks

如果套接字或句柄突然关闭（例如socket.destroy()），则在此阶段将发出'close'事件。 否则它将通过process.nextTick() 发出。

## setImmediate() VS setTimeout()

setImmediate 和 setTimeout 是相似的，但是取决于何时被调用，其行为方式有所不同。

- setImmediate() 用于在当前轮询阶段完成后执行脚本。
- setTimeout() 定时脚本在经过最小阈值（以毫秒为单位）后运行。

定时器执行的顺序取决于它们被调用的上下文。如果两者都是在主模块内调用的，那么时序将受到进程性能的限制（可能会受到计算机上运行的其他应用程序的影响）。

例如，如果我们运行以下不在 I/O 周期内的脚本（即主模块），则两个定时器的执行顺序是非确定性的，因为它受过程执行的约束：

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```

```bash
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
```

但是，如果将两个调用移到 I/O 周期，则 setImmediate 总是首先执行：

```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

```bash
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

使用 setImmediate() 的主要优点是，如果在 I/O 周期内进行调度，将始终在任何计时器之前执行 setImmediate()，而不管有多少个计时器。

## process.nextTick()

### 理解 process.nextTick()

您可能已经注意到 process.nextTick() 没有显示在图中，即使它是异步API的一部分。这是因为 process.nextTick() 在技术上并不是事件循环的一部分。相反，nextTickQueue将在当前操作完成后处理，而不管事件循环的当前阶段如何。

回顾一下我们的图，只要你在给定的阶段调用 process.nextTick()，所有传递给 process.nextTick() 的回调都将在事件循环继续之前被解析。这可能会造成一些不好的情况，因为它允许您通过递归 process.nextTick() 调用来“饿死”您的 I/O，从而防止事件循环到达轮询阶段。

### 为什么允许这么做？

为什么像这样的东西被包含在Node.js中？其中一部分是一种设计理念，即即使不需要，API也应该始终是异步的。以此代码片段为例：

```js
function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(callback, new TypeError('argument should be string')); }
```

代码片段进行参数检查，如果不正确，它会将错误传递给回调函数。最近更新的API允许将参数传递给 process.nextTick()，允许它将回调后传递的任何参数作为参数传播给回调函数，因此您不必嵌套函数。

我们正在做的是将错误传递给用户，但只有在我们允许执行其余用户的代码之后。通过使用 process.nextTick()，我们保证 apiCall() 总是在用户代码的其余部分之后并且允许继续进行事件循环之前运行其回调。为了达到这个目的，JS调用堆栈被允许展开，然后立即执行提供的回调，允许一个人递归调用process.nextTick() 而不会达到 `RangeError：Maximum call stack size exceeded from v8`

这种理念会导致一些潜在的问题。以此片段为例：

```js
let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { callback(); }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall has completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1;
```

用户定义 someAsyncApiCall() 具有异步签名，但它实际上是同步运行的。当它被调用时，提供给 someAsyncApiCall() 的回调将在事件循环的相同阶段被调用，因为 someAsyncApiCall() 实际上并不会异步执行任何操作。因此，回调会尝试引用栏，即使它在范围中可能没有该变量，因为该脚本无法运行到完成状态。

通过将回调放置在 process.nextTick() 中，脚本仍然具有运行到完成的能力，允许在调用回调之前对所有变量，函数等进行初始化。它还具有不允许事件循环继续的优点。在事件循环被允许继续之前，用户被告知错误可能是有用的。以下是使用 process.nextTick() 的前一个示例：

```js
let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;
```

这里是另一个真实的例子：

```js
const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
```

当只有一个端口通过时，该端口会立即绑定。所以，listen 回掉可以立即被调用。问题是 `.on('listening')` 回调不会在那个时候设置。

为了解决这个问题，'listening' 事件在 nextTick() 中排队等待脚本运行完成。这允许用户设置他们想要的任何事件处理程序。

## process.nextTick() VS setImmediate()

就用户而言，我们有两个类似的调用，但他们的名字很混乱。

- process.nextTick() 同一阶段立即触发
- setImmediate() 在 check 后触发

实质上，名称应该交换。process.nextTick() 比 setImmediate() 触发的更早，但这是过去的人为因素，不太可能改变。制作这个开关会在npm上打破大部分的软件包。每天都有更多的新模块被添加，这意味着我们每天都在等待，发生更多潜在的破坏。虽然他们混淆，名字本身不会改变。

我们建议开发人员在所有情况下都使用 setImmediate()，因为它更容易推理（并且会导致代码与更广泛的环境兼容，如浏览器JS）。

## 为什么使用 process.nextTick()?

这里主要有两个原因：

- 允许用户处理错误，清理任何不需要的资源，或者可能在事件循环继续之前再次尝试请求。
- 有时需要在调用堆栈解除后，但事件循环继续之前，允许回调运行。

一个例子是匹配用户的期望。简单的例子：

```js
const server = net.createServer();
server.on('connection', (conn) => { });

server.listen(8080);
server.on('listening', () => { });
```

Say that listen() is run at the beginning of the event loop, but the listening callback is placed in a setImmediate(). Unless a hostname is passed, binding to the port will happen immediately. For the event loop to proceed, it must hit the poll phase, which means there is a non-zero chance that a connection could have been received allowing the connection event to be fired before the listening event.

另一个例子是运行一个函数构造函数，该函数构造函数是从 EventEmitter 继承的，并且它想要在构造函数中调用一个事件：

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

您不能立即从构造函数发出事件，因为脚本不会处理到用户为该事件分配回调的位置。因此，在构造函数本身中，您可以使用 process.nextTick() 来设置回调，以在构造函数完成后发出事件，这会提供预期的结果：

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(() => {
    this.emit('event');
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```