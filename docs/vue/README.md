# vue

- [vue3各种资源汇总](https://vue3js.cn/)

## mvvm

- mvc: 传统的mvc指的是用户操作会请求服务端路由，路由会调用对应的控制器来处理，控制器获取数据，将结果返回给前端，页面重写渲染
- mvvm: 传统的前端会将数据手动渲染到页面上，mvvm模式不需要用户手动操作dom元素，将数据绑定到viewModel层上，而是会自动的将数据渲染到页面中，视图变化会通知viewModel层更新数据，viewModel就是mvvm中的桥梁

## 响应式数据原理

- 核心点是Object.defineProperty
- 默认vue会在初始化数据时，会给data中的属性使用Object.defineProperty重新定义所有属性，当页面取到对应属性时，会进行依赖收集(收集当前组件的watcher)，如果属性发生变化，会通知相关依赖进行更新操作

步骤:

1. initData: 初始化用户传入的data数据
2. new Observer: 将数据进行观测
3. this.walk(value): 进行对象的处理
4. defineReactive: 循环对象属性定义响应式变化
5. Object.defineProperty: 使用Object.defineProperty重新定义数据，该过程中会在getter中进行依赖收集dep，当setter时，进行通知dep.notify

## vue中是如何检测数组变化

- 使用函数劫持的方式，重写了数组的方法
- vue中将data中的数组，进行了原型链重写，指向了自己定义的数组原型方法，这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型在次进行监控

## 为何vue采用异步渲染

因为如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染，所以为了性能考虑，vue会在本轮数据更新后，再去异步更新视图

1. def.nofity(): 通知watcher进行更新操作
2. subs[i].update(): 依次调用watcher的update
3. queueWatcher: 将watcher去重放到队列中
4. nextTick(flushSchedulerQueue): 异步清空watcher队列

## nextTick实现原理

nextTick方法主要是使用了宏任务和微任务，定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列，所以这个nextTick方法就是异步方法

1. nextTick(cb): 调用nextTick传入用户注册的cb
2. callbacks.push(cb): 将回调函数存入数组中
3. timeFunc(): 调用timeFunc，尝试使用Promise、MutationObserver、setImmediate、setTimeout
4. 返回promise

## vue中computed的特点

computed也是一个watcher，但是他是具备缓存的，只有当他依赖的属性发生变化时才会更新视图

1. initComputed
2. new Watcher: lazy true。默认 dirty: true，默认watcher不执行(不执行用户方法)
3. defineComputed: 将属性定义到实例上
4. createComputedGetter: 创建getter当取值时会执行此方法
5. 当用户取值时，如果 dirty 为 false，放回上次计算结果，如果 dirty 为 true，调用 watcher.evaluate，计算最新结果，计算时会进行依赖收集，dirty更改为 false

## watch中的deep:true是如何实现的

当用户指定了watch中的deep属性为true时，如果当前监控的值是对象类型，会对对象中的每一项进行求值，此时会将当前watcher存入对应的属性依赖中，这样当对象的任何属性发生变化，都会通知watcher数据更新

- 渲染watcher: 渲染页面使用
- 计算watcher: 计算属性使用
- user watcher: 用户自定义watcher，优先级较高

## vue组件的生命周期函数

- beforeCreate: 在实例初始化之后，数据观察(data observer)之前被调用。
- created: 实例已经创建完成之后被调用，在这一步，实例已经完成以下的配置：数据观测(data observer)，属性和方法的运算，watch/event($on/$emit之类的)事件回调，这里没有$el
- beforeMount: 在挂载开始之前被调用，相关的render函数首次被调用
- mounted: el被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子函数，服务端渲染时不支持该方法
- beforeUpdate: 数据更新时调用，发生在虚拟dom重新渲染和打补丁之前
- updated: 由于数据更改导致的虚拟dom重新渲染和打补丁，在这之后会调用该钩子
- beforeDestroy: 在实例销毁之前调用，在这一步，实例仍然完全可用
- destroyed: vue实例销毁后调用，调用后，vue实例指示的所有东西都会解绑，所有的事件监听会被移除，所有的子实例也会被销毁，该钩子在服务器端渲染期间不被调用

各个阶段可以做什么：

- created: 实例已经创建完成，因为它是最早出发的原因可以进行一些数据、资源的请求
- mounted: 实例已经完成挂载，可以进行dom操作
- beforeUpdate: 可以在这个钩子中进行进一步的更改状态，这不会触发附加的重新渲染过程
- updated: 可以执行依赖于dom的操作。但是应该避免在这个期间更改状态，因为这可能会导致更新无限循环，该钩子函数在服务端渲染期间不被调用
- destroyed: 可以执行一些优化操作，清空定时器，解除事件绑定

## vue中模版编译原理

将 template 编译成 render 函数

1. 将模版转化为ast，描述了 html 代码
2. 优化ast树，标记
3. 将ast生成代码
