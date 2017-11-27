# 文件操作

相关模块：

- fs: 基础的文件操作 api
- path: 提供和路径相关的操作 api
- readline: 用于读取大文本文件，一行一行的读
- fs-extra: (第三方)

### 同步或异步调用

fs 模块对文件的操作几乎都有同步和异步两种形式，例如 readFile() 和 readFileSync()。区别：

- 同步调用会阻塞代码的执行，异步则不会
- 异步调用会将读取任务下达到任务队列，直道任务执行完成才会调用
- 异常处理方面，同步必须使用 try catch 方式，异步可以通过回掉函数的第一个参数

### path 模块

- Windows vs. POSIX: 处理 win 上的不同表现
- path.basename(path[, ext]): 返回路径的最后一部分
- path.delimiter: 属性，获取不同操作系统中默认的路径分隔符(unix: ':'，win: ';')，可以通过 process.env.PATH 拿到系统的环境变量
- path.dirname(path): 获取文件的所在位置目录名称
- path.extname(path): 获取路径中的拓展名
- path.format(pathObject): 将对象路径转换为路径字符串
- path.isAbsolute(path): 判断路径是否为绝对路径
- path.join([...paths]): 路径拼接
- path.normalize(path): 常规化一个路径，解析 .. 和 .
- path.parse(path): 将一个路径字符串转换为对象，包含 root, dir, base, ext, name 属性
- path.posix: 在任何系统使用 unix 的方式操作路径
- path.relative(from, to): 返回从 from 到 to 的相对路径（基于当前工作目录）
- path.resolve([...paths]): 把一个路径或路径片段的序列解析为一个绝对路径
- path.sep: 提供了平台特定的路径片段分隔符，win: \，unix: /
- path.win32: 在任何系统使用 windows 的方式操作路径

### Buffer
[Buffer 编码](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html#buffer_buffers_and_character_encodings)

读取文件时如果没有指定编码，默认读取的是一个Buffer(缓存区)

```js
// readFile 默认读出来的是 Buffer，而且是一次性读完
const fs = require('fs')

fs.readFile('./README.md', (err, data) => {
  console.log(data)
  console.log(data.toString('utf8'))
})
```

**Node 默认支持的编码**

Buffers 和 JavaScript 字符串对象之间转换时需要一个明确的编码方法。下面是字符串的不同编码。对于 nodejs 不支持的编码类型，可以通过第三方模块 `iconv-lite` 进行 decode

- 'ascii': 7位的 ASCII 数据。这种编码方式非常快，它会移除最高位内容。
- 'utf8': 多字节编码 Unicode 字符。大部分网页和文档使用这类编码方式。
- 'utf16le': 2个或4个字节, Little Endian (LE) 编码 Unicode 字符。编码范围 (U+10000 到 U+10FFFF) 。
- 'ucs2': 'utf16le'的子集。
- 'base64': Base64 字符编码。
- 'binary': 仅使用每个字符的头8位将原始的二进制信息进行编码。在需使用 Buffer 的情况下，应该尽量避免使用这个已经过时的编码方式。这个编码方式将会在未来某个版本中弃用。
- 'hex': 每个字节都采用 2 进制编码。

### 文件读取

- fs.readFile
- fs.readFileSync
- fs.createReadStream
- readline

### 文件写入

- fs.writeFile 默认重写
- fs.writeFileSync 默认重写
- fs.createWriteStream

文件写入错误：

- 意外错误
- 文件权限问题
- 文件夹不存在（不会自动创建文件夹）

```js
const fs = require('fs')

var writeStream = fs.createWriteStream('./a.txt')

writeStream.write('123', 'utf8', (err) => {

})
```

### 文件追加

和 write, writeSync 类似，不过是追加

- fs.appendFile
- fs.appendFileSync

### 监视文件

- fs.watchFile
- fs.watch

### 文件操作其他 api

- fs.stat(path, cb): 查看文件的状态
- fs.exists(path, callback): 文件是否存在
- fs.rename: 重命名，移动
- fs.unlink: 删除文件
- fs.mkdir: 创建文件夹
- fs.rmdir: 删除空文件夹
- fs.readdir: 读取一个文件夹

```js
// 创建文件夹，只能一级级创建，见下方例子
fs.mkdir(path.join(__dirname, 'demo'), err => {
  console.log(err)
})
// 多级创建不可以，可以通过递归一级级创建 win 路径 demo\\demo2
fs.mkdir(path.join(__dirname, 'demo/demo2'), err => {
  console.log(err)
})
```

### 缓存区处理（二进制数据）

- 缓存区就是内存中操作数据的容器
- 只是数据容器而已
- 通过缓存去可以很方便的操作二进制数据
- 在有大文件操作时必须要有缓存区

为什么要有缓存区

- JS 是比较擅长处理字符串，但是早期的应用场景主要用于处理 HTML 文档，不会有太大篇幅的数据处理，也不会接触到二进制的数据。
- 而在 Node 中操作数据、网络通信是没办法完全以字符串的方式操作的，简单来说
- 所以在 Node 中引入了一个二进制的缓冲区的实现：Buffer


#### 打印当前目录所有文件

```js
const fs = require('fs')
const path = require('path')

let target = path.join(__dirname, process.argv[2] || './')

fs.readdir(target, (err, files) => {
  if (err) {
    console.log('路径错误')
  }
  files.forEach(file => {
    // console.log(path.join(target, file))
    // 异步读取，顺序不一定
    fs.stat(path.join(target, file), (err, stats) => {
      if (err) {
        return
      }
      console.log(`${stats.mtime.toLocaleString()}\t${stats.size}\t${file}`)
    })
    // 同步读取，按文件顺序
    // let stats = fs.statSync(path.join(target, file))
    // console.log(`${stats.mtime.toLocaleString()}\t${stats.size}\t${file}`)
  })
})
```

#### 递归加载目录树

```js
const fs = require('fs')
const path = require('path')

const load = function (dirpath, hideFile = true) {
  let root = path.dirname(module.parent.filename)
  let target = path.join(root, dirpath || './')

  function loading(target, depth) { // 缩进等级
    // let prefix = '│ '.repeat(depth) // 缩进前缀 es6 写法
    let prefix = new Array(depth + 1).join('│ ') // 缩进前缀
    let dirinfos = fs.readdirSync(target)

    let dirs = [], files = []

    dirinfos.forEach(info => {
      let stats = fs.statSync(path.join(target, info))
      // 跳过隐藏文件
      if (/^\..+/.test(info) && hideFile) {
        return
      }
      if (stats.isFile()) {
        files.push(info)
      } else {
        dirs.push(info)
      }
    })

    dirs.forEach(dir => {
      console.log(`${prefix}├──${dir}`)
      loading(path.join(target, dir), depth + 1)
    })
    let count = files.length - 1
    files.forEach(file => {
      console.log(`${prefix}${count -- ? '├──' : '└──'}${file}`)
    })
  }

  loading(target, 0)
}

module.exports = load

// 调用
const load = require('./node/test.js')

let dirpath = process.argv[2] || './'

load(dirpath, false) // 第二个参数：是否跳过隐藏文件，默认 true，跳过
```

#### 循环创建层级目录

```js
const fs = require('fs')
const path = require('path')

function mkdirs(pathname, callback) {
  // 注意不能乱用 __dirname
  let root = path.dirname(module.parent.filename) // 拿到调用这个模块的文件位置
  // 判断是否是一个绝对路径
  pathname = path.isAbsolute(pathname) ? pathname : path.join(root, pathname)

  // 获取要创建的部分 root: /Users/newming/doc, 目标: /Users/newming/doc/demo/demo1
  let relativePath = path.relative(root, pathname)
  let folders = relativePath.split(path.sep)

  try {
    let pre = ''
    folders.forEach( folder => {
      if (!fs.existsSync(path.join(root, pre, folder))) {
        fs.mkdirSync(path.join(root, pre, folder))
      }
      pre += '/' + folder
    })
    callback && callback(null)
  } catch (error) {
    callback && callback(error)
  }
}

module.exports = mkdirs
```