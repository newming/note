# vue 与 jquery 的区别

- 数据和视图的分离，解耦
- vue以数据驱动视图，只关心数据变化，DOM操作被封装

## MVVM

Model View ViewModel

## vue 三要素

- 响应式：vue如何监听到 data 的每个属性变化
- 模版引擎：vue的模版如何被解析，指令如何处理
- 渲染：vue的模版如何被渲染成 html，以及渲染过程

### 什么时响应式

- 修改 data 属性之后，vue 立刻监听到
- data 属性被代理到 vm 上

### defineProperty

```js
var vm = {}
var data = {
  name: 'zhangsan',
  age: 20
}

var key, value

for (key in data) {
  (function (key) {
    Object.defineProperty(vm, key, {
      get: function () {
        console.log('get', data[key])
        return data[key]
      },
      set: function (newVal) {
        console.log('set', data[key])
        data[key] = newVal
      }
    })
  })(key)
}
```

### 模版是什么

- 本质：字符串
- 有逻辑，如 v-if
- 与 html 格式很像，但有很大区别
- 最终还是转化为 html 来显示
- 模版最终必须转化为 js 代码，因为必须使用 js 完成逻辑

### 模版解析

render 函数，详见 jsdemo -> MVVM-explain -> vue模版.html

render 函数执行返回的是 vnode，内部有一个 with 纯字符串，如下：

```js
with(this){return _c('div',{attrs:{"id":"app"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(price),expression:"price"}],attrs:{"type":"text"},domProps:{"value":(price)},on:{"input":function($event){if($event.target.composing)return;price=$event.target.value}}}),_v(" "),(show)?_c('p',[_v(_s(price))]):_e(),_v(" "),_c('button',{on:{"click":submit}}),_v(" "),_c('div',[_c('ul',_l((list),function(item){return _c('li',[_v(_s(item))])}))])])}
```

### 渲染

updateComponent，首次渲染将虚拟 dom 插入到页面，及更新时 diff 计算

首次渲染，显示页面，且绑定依赖

### 为何监听 get，直接监听 set 不行吗？

- data 中有很多属性，有些被用到，有些可能不被用到
- 被用到的会走 get，不被用到的不会走 get
- 未走到 get 中的属性，set 的时候我们也无需关心
- 避免不必要的重复渲染

### data 属性变化

- 属性修改，被响应式的 set 监听到
- set 中执行 updateComponent
- updateComponent 重新执行 vm._render()
- 生成的 vnode 和 preVnode，通过 patch 对比
- 渲染到 html 中