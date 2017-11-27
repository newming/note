# 流

- 流是程序输入或输出的一个连续的字节序列
- 文件流、网络流
- 设备(鼠标、键盘、磁盘、打印机等)的输入输出都是用流处理的
- 文件流就是以面向对象的概念对文件数据进行的抽象
- 文件流定义了一些对文件数据的操作方式

在 nodejs 核心模块 fs 中定义了一些与流相关的 API

- fs.createReadStream() => 得到一个 ReadableStream
- fs.createWriteStream() => 得到一个 WritableStream

```js
const fs = require('fs')
const path = require('path')
// 创建文件的读取流，并没有读出正式的数据，开始了读取文件的任务
const reader = fs.createReadStream('./file-operate.md')
const writer = fs.createWriteStream('./file-operate1.md')

// console.log(reader)
fs.stat('./file-operate.md', (err, stats) => {
  if (stats) {
    let readTotal = 0
    reader.on('data', chunk => {
      // chunk 是一个 buffer，chunk.length 
      console.log('读了' + (readTotal + chunk.length) / stats.size * 100 + '%')
      writer.write(chunk, err => {
        console.log('写了' + (readTotal + chunk.length) / stats.size * 100 + '%')
      })
    })
    reader.on('end', () => {
      console.log('数据读完了')
    })
  }
})
```

pipe() 方法，支持链式调用

```js
const fs = require('fs')
// 创建文件的读取流，并没有读出正式的数据，开始了读取文件的任务
const reader = fs.createReadStream('./file-operate.md')
const writer = fs.createWriteStream('./file-operate1.md')

writer.on('pipe', src => {
  console.log(src === reader) // true src 是原对象
})

reader.pipe(writer)
```