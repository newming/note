# require

### 模拟 require 简单功能

```js
function $require(id) {
  const fs = require('fs')
  const path = require('path')

  const filename = path.join(__dirname, id)
  const dirname = path.dirname(filename)
  // 同步读取文件
  let code = fs.readFileSync(filename, 'utf8')
  // 执行代码，需要营造一个私有空间，将全局变量传入进去，这里只传部分测试
  let module = {
    id: filename,
    exports: {}
  }
  let exports = module.exports

  // 这里也可以使用 new Function 来实现，传入的最后一个参数为函数体内部字符，不需要 eval
  // 1. 字符串拼接 function
  code = `
    (function ($require, module, exports, __dirname, __filename) {
      ${code}
    })($require, module, exports, dirname, filename)
  `
  // 执行代码
  eval(code)
  // 返回读取文件导出的内容
  return module.exports
  // 2. 使用new Function 实现
  // let fn = new Function('$require', 'module', 'exports', '__dirname', '__filename', code + '\n return module.exports')
  // return fn($require, module, exports, dirname, filename, code)
}
// use
var test = $require('./test1.js')
```

### require 加载机制

require 加载文件时可以省略拓展名：

```js
// 第一种不省略相对路径
require('./module') // 省略拓展名
// 第一步按 js 文件加载 require('./module.js')
// 第二步按 json 文件加载 require('./module.json')
// 第三步按预编译好的 c++ 文件加载 require('./module.node')
// 第四步当作文件夹找文件夹下的 package.json 文件 main 属性指向文件
// 第五步找文件夹下的 index.[js|json|node]
```

省略 ./ 或 /
```js
// 找核心模块
// 按目录向上依次去找 node_modules，越近的优先级越高
```

### 模块的缓存

目的是为了加速代码执行，一般不会处理，如果需要避免缓存，可以导出方法

- 第一次加载某个模块时，node 会缓存该模块，以后在加载该模块就直接从缓存取出该模块
- 如果需要多次执行模块中的代码，一般可以让模块暴露行为（函数）
- 模块的缓存可以通过 require.cache 拿到，同样也可以删除

```js
// 模块
module.exports = {
  date: new Date()
}

// 入口文件
var pre
setInterval(() => {
  // console.log(require.cache) // 缓存对象，类似 module 对象
  // 删除缓存
  // Object.keys(require.cache).forEach(key => {
  //   delete require.cache[key]
  // })
  var a = require('./test')
  console.log(pre === a) // 第一次打印 false，之后都是 true

  pre = a
  console.log(a.date) // 发现每次打印的时间相同
}, 1000)
```

### 增加 require 的缓存机制

```js
function $require(id) {
  const fs = require('fs')
  const path = require('path')

  const filename = path.join(__dirname, id)
  // 如果有缓存，直接返回缓存中的数据
  $require.cache = $require.cache || {}
  if ($require.cache[filename]) {
    return $require.cache[filename].exports
  }

  const dirname = path.dirname(filename)
  // 同步读取文件
  let code = fs.readFileSync(filename, 'utf8')
  // 执行代码，需要营造一个私有空间，将全局变量传入进去，这里只传部分测试
  let module = {
    id: filename,
    exports: {}
  }
  let exports = module.exports

  code = `
    (function ($require, module, exports, __dirname, __filename) {
      ${code}
    })($require, module, exports, dirname, filename)
  `
  // 执行代码
  eval(code)
  // 第一次，没有缓存，将 module 记录到缓存中
  $require.cache[filename] = module
  // 返回读取文件导出的内容
  return module.exports
}
// use
var test = $require('./test1.js')
```