# this 指向

this 是谁和在哪定义、在哪里执行没有关系，和函数执行时候的主体有关系，而且this只出现在function中或者全局作用域下

## this 指向的规律

### 1. 方法执行，看方法名前面是否有“.”，有的话”.“前面是谁，this指向就指向谁，没有的话this指向window（严格模式下undefined）

```js
function fn() {
  console.log(this.html);
}

var html = 'i am window';
var obj = {
  html: 'i am obj',
  objFn: fn
}
oBox.onclick = fn; // oBox
obj.objFn() // obj
fn() // window
oBox.onclick = function () {
  fn() // window 注意如果一个方法没有主体执行，默认指向window
}
```

```js
function Fn() {
  this.x = 100
}
Fn.prototype.getX = function () {
  console.log(this.x);
}
var fn = new Fn;
fn.getX() // this->fn 100
fn.__proto__.getX() // this->fn.__proto__ undefined
Fn.prototype.getX() // this->Fn.prototype undefined
```

### 2. 自执行函数中的this永远指向window（严格模式下undefined）
```js
;(function fn() {
  console.log(this);
})()
~function fn() {
  console.log(this);
}()
```

### 3. 给元素的某一个行为绑定一个方法，当行为触发执行对应的方法，此时方法中的this是当前这个元素，排除attachEvent

```js
function fn() {
  console.log(this);
}
oBox.onclick = fn; // oBox
oBox.onclick = function () {
  fn() // window
}
```

### 4. 构造函数中，类中出现的this.xxx中的this指向类的实例

### 5. 使用call/apply/bind强制改变this指向
```js
var obj = {
  fn: function () {
    console.log(this);
  }
}
obj.fn() //obj
obj.fn.call(666) //666
```

```js
let obj = {}
function sum(num1, num2) {
  this.total = num1+num2
  console.log(this);
}
sum(100, 200) // window
sum.call(100, 200) //100
sum.call() //window 严格模式下 undefined
// 注意，在非严格模式下，call中的第一个参数不写或者null，undefined，默认的this都指向window
// 在严格模式下，call中的第一个参数是谁，this就指向谁，（null -> null,undefined -> undefined），不写也指向 undefined
sum.apply(obj,[100,200])
```

### 6. 箭头函数中没有执行主体，所用到的this都是其所处上下文中的 this

```js
function func() {
  console.log(this)
  var arrowFunc = () => {
    console.log('arrow', this)
  }
  arrowFunc()
}

func();
new func()
// window window
// {} {}
```
