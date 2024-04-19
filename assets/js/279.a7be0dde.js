(window.webpackJsonp=window.webpackJsonp||[]).push([[279],{651:function(e,a,r){"use strict";r.r(a);var s=r(40),t=Object(s.a)({},(function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"babel"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#babel"}},[e._v("#")]),e._v(" babel")]),e._v(" "),r("h2",{attrs:{id:"babel-是如何工作的"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#babel-是如何工作的"}},[e._v("#")]),e._v(" babel 是如何工作的")]),e._v(" "),r("p",[e._v("Babel 是一个转译器----区分下编译器(因为编译器最终生成的机器指令，已经和最初的代码不一样了)。转译器只是将高级别的语言转为低级别的语言，能更好的兼容。")]),e._v(" "),r("p",[e._v("Babel 的工作流程，简单来说，就是传入 code 字符串，经过一系列处理后，吐出 code 字符串，就像这样：")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("Code => do something => Code\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br")])]),r("p",[e._v("babel 的转义过程分为三个阶段，这三部具体是：")]),e._v(" "),r("ul",[r("li",[e._v("解析 Parse：将代码解析生成抽象语法树(即 AST)，也就是计算机理解我们代码的方式(扩展：一般来说每个 js 引擎都有自己的 AST，比如熟知的 v8，chrome 浏览器会把 js 源码转换为抽象语法树，再进一步转换为字节码或机器代码)，而 babel 则是通过 babylon 实现的。简单来说就是一个对于 JS 代码的一个编译过程，进行了词法分析与语法分析的过程，Babel 会顺带进行语法的正确性校验。")]),e._v(" "),r("li",[e._v("转换 Transform：对于 AST 进行变换一系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进行遍历，在此过程中进行添加、更新及移除等操作。")]),e._v(" "),r("li",[e._v("生成 Generate：将变换后的 AST 再转换为 JS 代码，使用到的模块是 babel-generator。")])]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("补充环节：\nplugin 是用在do something的时候，如果没有plugin，code还是原字符串返回，不作处理\nplugin 会运行在preset之前\nplugin 是从前往后，而preset是从后往前执行\n\npreset是用来组合plugin的，无需手动安装很多plugin，而是提供了一组插件的集合\n比如我们用react的时候，我们就要添加@babel/preset-react，用ts的时候，就要添加@babel/preset-typescript\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br"),r("span",{staticClass:"line-number"},[e._v("5")]),r("br"),r("span",{staticClass:"line-number"},[e._v("6")]),r("br"),r("span",{staticClass:"line-number"},[e._v("7")]),r("br")])]),r("h2",{attrs:{id:"其他一些相关包"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#其他一些相关包"}},[e._v("#")]),e._v(" 其他一些相关包")]),e._v(" "),r("h3",{attrs:{id:"babel-core"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#babel-core"}},[e._v("#")]),e._v(" @babel/core")]),e._v(" "),r("p",[e._v("这个包里提供了很多代码转化的 API，可以直接用里面的 API 对某一段代码进行转化，但是大部分情况我们不会手动调用，可是这个包确实必须要用的，因为其它的包会用到它。")]),e._v(" "),r("h3",{attrs:{id:"babel-preset-env"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#babel-preset-env"}},[e._v("#")]),e._v(" @babel/preset-env")]),e._v(" "),r("p",[e._v("它是多个 preset 的集合，并且不断在更新，我们可以通过配置项来决定需要支持的平台（浏览器或者 node 平台，不同版本下），然后按需加载插件，如果不配置，默认情况下和 babel-preset-latest 等同，会加载从 es2015 开始的所有 preset")]),e._v(" "),r("h3",{attrs:{id:"babel-register"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#babel-register"}},[e._v("#")]),e._v(" @babel/register")]),e._v(" "),r("p",[e._v("每当使用 require 命令加载 .js, .jsx, .es, .es6 的后缀名文件时，会先用 babel 进行转码。 使用时必须先加载 require('@babel/register')，这个通常我们会在做服务端编译的时候，引入这个。")]),e._v(" "),r("h3",{attrs:{id:"babel-polyfill"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#babel-polyfill"}},[e._v("#")]),e._v(" @babel/polyfill")]),e._v(" "),r("p",[e._v("从 7.4 版本开始，不推荐使用了，下面讲一下原因： babel 默认只转换 js 语法，不转换新的 API，比如 Iterator， Generator， Set， Maps， Proxy， Reflect， Symbol， Promise 等全局对象，以及一些定义在全局对象上的方法，比如 Array.from， Object.assign ，如果想用这些方法，就必须使用 @babel/polyfill ，它内部集成了 core-js， regenerator")]),e._v(" "),r("p",[e._v("使用时必须在所有代码运行之前加:require('@babel/polyfill');所以之前通常也是在服务端代码中加入这个。")]),e._v(" "),r("p",[e._v("缺点： 打出来的包非常大，因为它是一个整体，会一次性将所有的方法都加到原型链上，没用到的那些方法也会加上去，所以可以单独使用 core-js 的某个类库来解决；会污染全局变量，因为直接在原型上做修改")]),e._v(" "),r("p",[e._v("如何解决这些缺点？使用 @babel/plugin-transform-runtime 和 @babel/runtime")]),e._v(" "),r("h3",{attrs:{id:"babel-plugin-transform-runtime-babel-runtime"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#babel-plugin-transform-runtime-babel-runtime"}},[e._v("#")]),e._v(" @babel/plugin-transform-runtime @babel/runtime")]),e._v(" "),r("p",[e._v("简单来说，它能有效的减少重复代码，并且可以实现在需要进行转换的时候才转换，不会像 @babel/polyfill 那样一次性全部处理")]),e._v(" "),r("p",[e._v("使用时必须将 @babel/runtime 添加到 dependencies 中")]),e._v(" "),r("h2",{attrs:{id:"es6-代码转化成-es5-代码的实现思路"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#es6-代码转化成-es5-代码的实现思路"}},[e._v("#")]),e._v(" ES6 代码转化成 ES5 代码的实现思路")]),e._v(" "),r("p",[e._v("ES6 转化为 ES5 大致分为三个步骤：")]),e._v(" "),r("ul",[r("li",[e._v("将代码字符串解析成抽象语法树，即所谓的 AST")]),e._v(" "),r("li",[e._v("对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应的转化，即转化成 ES5 代码")]),e._v(" "),r("li",[e._v("根据处理后的 AST 在生成代码字符串")])])])}),[],!1,null,null,null);a.default=t.exports}}]);