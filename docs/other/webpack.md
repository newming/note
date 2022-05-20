# webpack

## webpack 的构建流程

webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 确定入口：根据配置中的 entry 找出所有的入口文件；
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，在递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第四步使用 loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：再确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

> 在以上系统中，webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 webpack 提供的 API 改变 webpack 的运行结果

## Loader 和 Plugin 的区别

1. 作用不同：

- Loader 直译为"加载器"。Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 文件，如果想将其他文件也打包的话，就会用到 loader。 所以 Loader 的作用是让 webpack 拥有了加载和解析非 JavaScript 文件的能力。
- Plugin 直译为"插件"。Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

2. 用法不同：

- Loader 在 module.rules 中配置，也就是说作为模块的解析规则而存在。类型为数组，每一项都是一个 Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
- Plugin 在 plugins 中单独配置。 类型为数组，每一项是一个 plugin 的实例，参数都通过构造函数传入。

### 常见的 loader 以及作用

- raw-loader：加载文件原始内容（utf-8）
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader:和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中
- source-map-loader:加载额外的 Source Map 文件，以方便断点调试
- svg-inline-loader：将压缩后的 SVG 内容注入代码中
- image-loader：加载并且压缩图片文件
- json-loader 加载 JSON 文件（默认包含）
- handlebars-loader: 将 Handlebars 模版编译成函数并返回
- babel-loader：把 ES6 转化成 ES5
- ts-loader: 将 TypeScript 转换成 JavaScript
- awesome-typescript-loader：将 TypeScript 转换成 JavaScript，性能优于 ts-loader
- css-loader：加载 css，支持模块化、压缩、文件导入等特性
- style-loader：把 css 代码注入到 js 中，通过 DOM 操作去加载 css
- eslint-loader：通过 ESLint 检查 JS 代码
- tslint-loader：通过 TSLint 检查 TypeScript 代码
- postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
- vue-loader：加载 Vue.js 单文件组件
- cache-loader: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

### 常见的 plugin 以及作用

- define-plugin：定义环境变量(Webpack4 之后指定 mode 会自动配置)
- ignore-plugin：忽略部分文件
- commons-chunk-plugin：提取公共代码
- html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)
- web-webpack-plugin：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
- uglifyjs-webpack-plugin：不支持 ES6 压缩 (Webpack4 以前)
- terser-webpack-plugin: 支持压缩 ES6 (Webpack4)
- mini-css-extract-plugin: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代- extract-text-webpack-plugin)
- webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
- serviceworker-webpack-plugin：为网页应用增加离线缓存功能
- clean-webpack-plugin: 目录清理
- ModuleConcatenationPlugin: 开启 Scope Hoisting
- speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
- webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

## Import 和 CommonJs 在 webpack 打包过程中有什么不同

1. es6 模块调用 commonjs 模块: 可以直接使用 commonjs 模块，commonjs 模块将不会被 webpack 的模块系统编译而是原样输出，并且 commonjs 模块没有 default 属性
2. es6 模块调用 es6 模块: 被调用的 es6 模块不会添加{esModule:true}，只有调用者才会添加{esModule:true}，并且可以进行 tree-shaking 操作，如果被调用的 es6 模块只是 import 进来，但是并没有被用到，那么被调用的 es6 模块将会被标记为/_ unused harmony default export _/，在压缩时此模块将被删除(如果被调用的 es6 模块里有立即执行语句，那么这些语句将会被保留)
3. commonjs 模块引用 es6 模块: es6 模块编译后会添加{\_\_esModule:true}。如果被调用的 es6 模块中恰好有 export default 语句，那么编译后的 es6 模块将会添加 default 属性
4. commonjs 模块调用 commonjs 模块: commonjs 模块会原样输出

## 打包文件 hash

1. Hash 值: webpack 生态中存在多种计算 hash 的方式

- hash
- chunkhash
- contenthash

hash 代表每次 webpack 编译中生成的 hash 值，所有使用这种方式的文件 hash 都相同。每次构建都会使 webpack 计算新的 hash。 chunkhash 基于入口文件及其关联的 chunk 生成，某个文件的改动只会影响与它有关联的 chunk 的 hash 值，不会影响其他文件 contenthash 根据文件内容创建。当文件内容发生变化时，contenthash 发生变化

2. 避免相同随机值

webpack 在计算 hash 后分割 chunk。产生相同随机值可能是因为这些文件属于同一个 chunk，可以将某一个文件提到独立的 chunk(如放入 entry)

## 使用 import 时，webpack 对 node_modules 里的依赖会做什么

ES6 Module: 不同于 CommonJS 和 AMD 的模块加载方法，ES6 在 JS 语言层面上实现了模块功能。它的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系。在遇到模块加载命令 import 时，不会去执行模块，而是只生成一个引用。等到真的需要用到的时候，再到模块里面去取值。这和 CommonJS 模块规范的最大不同。

### webpack 会对 node_modules 里的依赖做什么?

webpack 会根据定义的引入方式判断模块类型，再进行相关编译转化。当使用 import 引入时，babel 默认会把 ES6 的模块转化成 CommonJS 规范，然后会将 node_module 里的依赖打包成自执行函数的样式

```
(function(modules){
    //执行逻辑
})([模块数组])
```

在模块数组中将模块传入，在函数体中经过一系列操作最终将模块通过 module.exports 导出

## Tree-shaking 原理

tree-shaking 是一种通过清除多余代码方式来优化项目打包体积的技术

- 利用 ES6 模块的特点
- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量，不能动态引入模块
- import 引入的模块不能再进行修改的 虽然 tree-shaking 的概念在 1990 年就提出来了，但是直到 ES6 的 ES6-style 模块出现后才真正被利用起来。这是因为 tree-shaking 只能在静态模块下工作。ES6 模块加载是静态的，因此在 ES6 种使用 tree-shaking 是非常容易地。而且，tree-shaking 不仅支持 import/export 级别，而且也支持声明级别

### 关于副作用

副作用是指那些当 import 的时候会执行一些动作，但是不一定会有任何 export。比如 ployfill,ployfills 不对外暴露方法给主程序使用

tree-shaking 不能自动识别哪些代码属于副作用，因此手动指定这些代码显得非常重要，如果不指定可能会出现一些意想不到的问题

在 webpack 中，是通过 package.json 的 sideEffects 属性来实现的

```
"name":"tree-shaking",
"sideEffects":false
```

如果所有的代码都不包含副作用，我们就可以简单地将该属性标记为 false 来告知 webpack，它可以安全地删除未用到的 export 导出。

如果你的代码确实有一些副作用，那么可以改为提供一个数组：

```
"name":"tree-shaking",
"sideEffects":[
  "./src/public/polyfill.js"
]
```

## webpack Runtime 和 Manifest 代码的作用

主要是管理所有模块的交互。

**Runtime** 主要是指在浏览器运行时，webpack 用来连接模块化的应用程序的所有代码。runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。

**Manifest**在代码经过编译打包之后，形成如 index.html 文件、一些 bundle 和各种资源加载到浏览器中，是不是 src 目录下的文件结构现在已经不存在了，那 webpack 如何管理所有模块之间的交互呢？这就是 manifest 数据的由来

当编译器开始执行，解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合成为 manifest，当完成打包并发送到浏览器时，会在运行时通过 manifest 来解析加载模块。无论选择哪种模块语法，那些 import 或 require 语句都已经转化为**webpack_require**方法，此方法指向模块标识符。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索背后对应的模块。

总结

- runtime：根据 manifest 数据管理模块代码。主要是指模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑
- manifest：记录在打包过程中，各个模块之间的信息以及关联关系。

## Prerender 预渲染

在 webpack 打包结束并生成文件后(after-emit hook),会启动一个 server 模拟网站的运行，用 puppeteer(google 官方的 headless 无头浏览器)访问指定的页面 route，得到相应的 html 结构，并将结果输出指定目录，过程类似爬虫。

即利用打包工具对应用进行预先渲染，让用户在首次获取到 html 文件的时候就已经能看到我们的内容，接着等待 Bundle 下载解析完成之后再进行接管。

打包构建预渲染的核心原理又是什么呢?其实这里就要用到无头浏览器来帮助实现这项功能，他会在本地启动一个无头浏览器，并访问我们配置好的路由，接着将渲染好的页面 html 内容输出到我们的 html 文件中，并建立相关的目录

一般常用的无头 比如:phantomjs、puppeteer,对于 prerender-spa-plugin 插件来说，它内部就是采用了 phantomjs 作为无头浏览器进行预渲染。

应用场景

- seo 优化:对于一些动态数据利用 renderAfterTime 也可以进行预渲染出来。当动态数据渲染出来之后，客户端代码比如 bundle.js 会马上接管 dom 操作，对于 spa 优化有便捷性
- 骨架屏:把骨架屏当做预渲染页面，当 ajax 获取到数据之后再把骨架屏替换掉;prerender-spa-plugin 提供了 postProcessHtml 钩子

预渲染不适用经常变化的数据，比如说股票代码网站，天气预报网站。因为此时的数据是动态的，而预渲染时已经生成好了 dom 节点。如果要兼容 seo 可以使用 SSR。预渲染不适用大量的路由页面，比如成千上百个路由，此时打包后预渲染将会非常慢。预渲染最好的应用场景是需要 seo 的活动页面

优点

- seo:对于搜索引擎爬虫来说(先排除高级爬虫)，它不会等待你的 JS 执行完成之后才进行抓取，如果不进行预渲染，对于客户端渲染应用来说，HTML 文件中几乎没有什么内容，故会影响你的搜索排名。采用预渲染就能保证在首次加载就能获取到相关的 html 内容，利用 seo
- 弱网环境：对于网络条件比较差的用户来说，你的 bundle 文件过大，会导致页面长时间白屏，这将使你白白流失很多用户，所以首次内容的快速呈现也是很重要的，解决白屏问题。

## 优化 webpack 的打包体积

- 压缩代码

```
webpack-paralle-uglify-plugin

uglifyjs-webpack-plugin 开启parallel参数(不支持ES6)

terser-webpack-plugin 开启paraller参数

多进程并行压缩

通过 mini-css-extract-plugin 提取Chunk中的CSS代码到单独文件，通过 optimize-css-assets-webpack-plugin 插件，开启cssnano 压缩css
```

- 提取页面公共资源

```
使用 html-webpack-externals-plugin，将基础包通过CDN引入，不打入bundle中

使用SplitChunksPlugin进行(公共脚本、基础包、页面公共文件)分离(webpack4内置)，替代了 CommonsChunkPlugin 插件

基础包分离：将一些基础库放到cdn，比如vue、webpack配置 external 是vue的不打入bundle
```

- Tree shaking

```
purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用(仅仅是建议)

打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的bundle中去掉(只能对ES6 Module生效)开发中尽可能使用 ES6 Module 的模块，提高tree shaking的效率

禁用babel-loader的模块依赖解析，否则 webpack 接收到的就是转换过的commonJS形式的模块，无法进行tree shaking

使用 PurifyCSS(不在维护)或者uncss去除无用css代码
```

- Scope hoisting

```
构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突

必须是ES6的语法，因为有很多第三方库仍采用CommonJS 语法，为了充分发挥Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的ES6模块化语法
```

- 图片压缩

```
使用基于node库的imagemin(很多定制选项、可以处理多种图片格式)

配置 image-webpack-loader
```

- 动态 Ployfill

```
建议采用 polyfill-service 只给用户返回需要的polyfill，社区维护。

@babel-preset-env中通过useBuiltIns:"usage" 参数来动态加载polyfill
```

- 借助工具分析性能瓶颈

speed-measure-webpack-plugin，简称 SMP，分析出 webpack 打包过程中 Loader 和 Plugin 的耗时时，有助于找到构建过程中的性能瓶颈。

## webpack 和 gulp 的优缺点

两者同属于构建工具，但是侧重点不同

### glup 侧重于对开发流程的控制管理

优点：

- 轻量，配置文件比较简单
- 基于 nodeJS 强大的 stream 能力，构建速度快
- 适合多页 web 应用以及 node 服务端应用

缺点：不太适合单页或自定义模块的开发

### webpack 侧重于模块的打包

优点：

- 任何资源都可以作为模块处理
- 社区资源丰富，有很多插件和 loader

缺点：

- 配置复杂
- 不适合 node 服务端应用
- 构建速度较慢，需要做很多性能优化

## 如何组织 css

webpack 中处理 css，css-loader、style-loader 是必不可少的

- cssModule css-loader 中配置 module 可以开启模块化，防止类名污染，实现 css 局域化 缺点：生成的 className 语义化降低
- postCss 兼容性强以及写法前置，集成了 css-next 以及 autoprefix、css in js、css module 等众多特点，可选配置，人性化
- less\sass\stylus css 预处理器 增加变成的特性，无需考虑兼容的问题，可以使用变量、函数等，不过 postCss 都支持。

## webpack 热更新的原理

基础概念

1. webpack compiler：将 js 编译成 Bundle
2. Bundle Server：提供文件在浏览器的访问，实际上就是一个服务器
3. HMR Server：将热更新的文件输出给 HMR Runtime
4. HMR Runtime：会注入到 bundle.js 中，与 HRM Server 通过 webSocket 链接，接收文件变化，并更新对应文件
5. bundle.js：构建输出的文件

### 原理

1.启动阶段

- webpack Compiler 将对应文件打包成 bundle.js(包含注入的 HMR Server)，发送给 Bundler Server
- 浏览器即可访问服务器的方式去获取 bundle.js

  2.更新阶段(文件发生变化)

- webpack compiler 重新编译，发送给 HMR Server
- HMR Server 可以知道有哪些资源、哪些模块发生了变化，通知 HRM Runtime
- HRM Runtime 更新代码

### HMR 原理详解

使用 webpack-dev-server 去启动本地服务，内部实现使用了 webpack、express、websocket

- 使用 express 启动本地服务，当浏览器访问资源时对此响应
- 服务端和客户端使用 websocket 实现长连接
- webpack 监听源文件的变化，即当开发者保存文件时触发 webpack 的重新编译
  - 每次编译都会生成 hash 值，已改动模块的 json 文件、已改动模块代码的 js 文件
  - 编译完成后通过 socket 向客户端推送当前编译的 hash 戳
- 客户端的 websocket 监听到有文件改动推送过来的 hash 戳，会和上一次对比
  - 一致就走缓存
  - 不一致就通过 ajax 和 jsonp 向服务端获取最新资源
- 使用内存文件系统去替换有修改的内容实现局部刷新

1. server 端

- 启动 webpack-dev-server 服务器
- 创建 webpack 实例
- 创建 server 服务器
- 添加 webpack 的 done 事件回调
- 编译完成向客户端发送消息
- 创建 express 应用 app
- 设置文件系统为内存文件系统
- 添加 webpack-dev-middleware 中间件
- 中间件负责返回生成的文件
- 启动 webpack 编译
- 创建 http 服务器并启动服务
- 使用 sockjs 在浏览器端和服务端之间建立一个 websocket 长连接
- 创建 socket 服务器

2. client 端

- webpack-dev-server/client 端会监听到此 hash 消息
- 客户端收到 ok 消息后会执行 reloadApp 方法进行更新
- 在 reloadApp 中会进行判断，是否支持热更新，如果支持的话发生 webpackHotUpdate 事件，如果不支持就- 直接刷新浏览器
- 在 webpack/hot/dev-server.js 会监听 webpackHotUpdate 事件
- 在 check 方法里会调用 module.hot.check 方法
- HotModuleReplacement.runtime 请求 Manifest
- 通过调用 JsonpMainTemplate.runtime 的 hotDownloadManifest 方法
- 调用 JsonpMainTemplate.runtime 的 hotDownloadUpdateChunk 方法通过 JSONP 请求获取最新的模块代码
- 补丁 js 取回来或会调用 JsonpMainTemplate.runtime.js 的 webpackHotUpdate 方法
- 然后会调用 HotModuleReplacement.runtime.js 的 hotAddUpdateChunk 方法动态更新模块代码
- 然后调用 hotApply 方法进行热更新
