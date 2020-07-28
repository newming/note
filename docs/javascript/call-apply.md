# call vs apply

## call(this,parameter1,parameter2...)

call 方法的作用是：改变某一涵数中的this关键字,然后执行该方法。例如 fn.call(obj) 在执行call方法时，让 fn 中的 this 变为了第一个参数 obj，然后执行fn

- 首先fn通过__proto__找到 Function.prototype上的call方法
- 原型上的call方法执行，形成一个私有作用域（型参赋值->预解析->代码执行）
- 让fn中的this指向变为第一个参数obj
- 执行fn

### 模拟call方法

```js
let obj = {name: 'newming'}
function fn() {
  console.log(this);
}
Function.prototype.call = function (parameter1) {
  // call内部的this是fn
  // 首先将fn即this的内部this指向改为obj，然后执行fn，即this
  this()
}
fn.call(obj) //call方法中的this为fn
```

#### 面试题

```js
function fn1() {
  console.log(1);
}
function fn2() {
  console.log(2);
}
fn1.call(fn2) // 1
fn1.call.call(fn2) // 2
Function.prototype.call.call(fn1) // 1
```

## apply(this,[parameter1,parameter2...])

apply 方法和 call 方法非常相似，都是执行对应的方法，并且改变方法内部的this指向为第一个参数

#### 区别
- call 在传递函数的参数值时是一个个的传递进来，而 apply 则是把需要传递的参数放到一个数组中一起传入进来，也是相当于给函数一个个传递参数

## call,apply应用

#### 1.获取数组中的最大值最小值
```js
var arr = [23,45,46,22,11,67,4,56]

// 方法一，先排序，在获取
arr.sort(function (a,b) {
  return a - b
})
var min = arr[0]
var max = arr[arr.length-1]

// 2.假设法，假设第一个是最小值，和数组后面每一项进行比较，如果假设错误，让假设值变为当前最小值
var min = max = arr[0]
for (var i = 0; i < arr.length; i++) {
  var cur = arr[i]
  cur<min ? min=cur : null;
  cur>max ? max=cur : null;
}
console.log(min, max);

// 3.Math.min,Math.max
var min = Math.min.apply(null,arr)
var max = Math.max.apply(null,arr)
```

#### 2.获取平均数
```js
// 去掉最高分，去掉最低分
// 1...
function avgFn() {
  console.log(arguments);// 注意arguments是一个类数组，不是数组
  // 1.把arguments转化为数组
  let arr = [];
  for (var i = 0; i < arguments.length; i++) {
    arr[arr.length] = arguments[i]
  }
  // 2.数组进行排序，去掉首尾
  arr.sort(function (a,b) {
    return a - b
  })
  arr.shift()
  arr.pop()
  // 3.求和求平均
  var total=0;
  for (var i = 0; i < arr.length; i++) {
    total+=arr[i]
  }
  return (total/arr.length).toFixed(2)
}

var res = avgFn(3,5,6,7,10,7);
console.log(res);

// 2...
function avgFn() {
  // 借用数组方法将类数组转为数组
  // 注意，借用数组方法slice将类数组（arguments，dom元素集合）转化为数组的时候，arguments在所以浏览器都兼容，dom元素集合在ie6~8不兼容，可以利用for循环实现兼容
  var arr = Array.prototype.slice.call(arguments)
  // 2.数组进行排序，去掉首尾
  arr.sort(function (a,b) {
    return a - b
  })
  arr.shift()
  arr.pop()
  // 3.求和求平均
  return ( eval(arr.join('+')) / arr.length ).toFixed(2)
}

var res = avgFn(3,5,6,7,10,7);
console.log(res);

// 3...
function avgFn() {
  // 借用数组方法
  [].sort.call(arguments,function (a,b) {
    return a - b
  })
  [].shift.call(arguments)
  [].pop.call(arguments)
  // 2.求和求平均
  return ( eval([].join.call(arguments, '+')) / arguments.length ).toFixed(2)
}

var res = avgFn(3,5,6,7,10,7);
console.log(res);

// 4...
function avgFn(...arr) {
  // 1.数组进行排序，去掉首尾
  arr.sort(function (a,b) {
    return a - b
  })
  arr.shift()
  arr.pop()
  // 2.求和求平均
  return ( eval(arr.join('+')) / arr.length ).toFixed(2)
}

var res = avgFn(3,5,6,7,10,7);
console.log(res);
```
