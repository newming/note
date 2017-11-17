# 模块化

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
var module = {}
module.exports = {}
var export = module.exports
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
