# 流

- 流是程序输入或输出的一个连续的字节序列
- 文件流、网络流
- 设备(鼠标、键盘、磁盘、打印机等)的输入输出都是用流处理的
- 文件流就是以面向对象的概念对文件数据进行的抽象
- 文件流定义了一些对文件数据的操作方式

四种基本的流类型

- Readable - 可读的流 (例如 fs.createReadStream()).
- Writable - 可写的流 (例如 fs.createWriteStream()).
- Duplex - 可读写的流 (例如 net.Socket).
- Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate()).

## 可读流的两种模式

- 可读流事实上工作在下面两种模式之一：**flowing** 和 **paused**
- 在 flowing 模式下， 可读流自动从系统底层读取数据，并通过 EventEmitter 接口的事件尽快将数据提供给应用。
- 在 paused 模式下，必须显式调用 stream.read() 方法来从流中读取数据片段。
- 所有初始工作模式为 paused 的 Readable 流，可以通过下面三种途径切换到 flowing 模式：
  - 监听 'data' 事件
  - 调用 stream.resume() 方法
  - 调用 stream.pipe() 方法将数据发送到 Writable
- 可读流可以通过下面途径切换到 paused 模式：
  - 如果不存在管道目标（pipe destination），可以通过调用 stream.pause() 方法实现。
  - 如果存在管道目标，可以通过取消 'data' 事件监听，并调用 stream.unpipe() 方法移除所有管道目标来实现。

> 如果 Readable 切换到 flowing 模式，且没有消费者处理流中的数据，这些数据将会丢失。比如，调用了 readable.resume() 方法却没有监听 'data' 事件，或是取消了 'data' 事件监听，就有可能出现这种情况。

## 缓存区

- Writable 和 Readable 流都会将数据存储到内部的缓冲器（buffer）中。这些缓冲器可以通过相应的 writable.\_writableState.getBuffer() 或 readable.\_readableState.buffer 来获取。
- 缓冲器的大小取决于传递给流构造函数的 highWaterMark 选项。 对于普通的流，highWaterMark 选项指定了总共的字节数。对于工作在对象模式的流， highWaterMark 指定了对象的总数。
- 当可读流的实现调用 stream.push(chunk)方法时，数据被放到缓冲器中。如果流的消费者没有调用 stream.read()方法，这些数据会始终存在于内部队列中，直到被消费。
- 当内部可读缓冲器的大小达到 highWaterMark 指定的阈值时，流会暂停从底层资源读取数据，直到当前 缓冲器的数据被消费 (也就是说，流会在内部停止调用 readable.\_read() 来填充可读缓冲器)。
- 可写流通过反复调用 writable.write(chunk) 方法将数据放到缓冲器。当内部可写缓冲器的总大小小于 highWaterMark 指定的阈值时，调用 writable.write() 将返回 true。一旦内部缓冲器的大小达到或超过 highWaterMark，调用 writable.write() 将返回 false 。
- stream API 的关键目标，尤其对于 stream.pipe() 方法，就是限制缓冲器数据大小，以达到可接受的程度。这样对于读写速度不匹配的源头和目标，就不会超出可用的内存大小。
- Duplex 和 Transform 都是可读写的。在内部，它们都维护了两个相互独立的缓冲器用于读和写。 在维持了合理高效的数据流的同时，也使得对于读和写可以独立进行而互不影响。

在 nodejs 核心模块 fs 中定义了一些与流相关的 API

- fs.createReadStream() => 得到一个 ReadableStream
- fs.createWriteStream() => 得到一个 WritableStream

```js
const fs = require("fs");
const path = require("path");
// 创建文件的读取流，并没有读出正式的数据，开始了读取文件的任务
const reader = fs.createReadStream("./file-operate.md");
const writer = fs.createWriteStream("./file-operate1.md");

// console.log(reader)
fs.stat("./file-operate.md", (err, stats) => {
  if (stats) {
    let readTotal = 0;
    reader.on("data", (chunk) => {
      // chunk 是一个 buffer，chunk.length
      console.log(
        "读了" + ((readTotal + chunk.length) / stats.size) * 100 + "%"
      );
      writer.write(chunk, (err) => {
        console.log(
          "写了" + ((readTotal + chunk.length) / stats.size) * 100 + "%"
        );
      });
    });
    reader.on("end", () => {
      console.log("数据读完了");
    });
  }
});
```

pipe() 方法，支持链式调用

```js
const fs = require("fs");
// 创建文件的读取流，并没有读出正式的数据，开始了读取文件的任务
const reader = fs.createReadStream("./file-operate.md");
const writer = fs.createWriteStream("./file-operate1.md");

writer.on("pipe", (src) => {
  console.log(src === reader); // true src 是原对象
});

reader.pipe(writer);
```
