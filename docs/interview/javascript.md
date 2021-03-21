# javascript 面试题汇总

## 1.计算出字符串中出现次数最多的字符是什么，出现了多少次？

```js
var str = 'adfdageilkjlioafdmyuyuierhk';
var maxLength = 0, result = '', oldStr;
while (str != '') {
  oldStr = str;
  getStr = str.charAt(0);
  str = str.replace(new RegExp(getStr,'g'), '');
  if (oldStr.length-str.length > maxLength) {
    maxLength = oldStr.length - str.length;
    result = getStr + '=' + maxLength;
  }
}
console.log(result);
```

## 2.点击下载图片
方法一
```html
<a href="url" download='url'>点击下载图片</a>
```
方法二
```js
//var img = reference to image
var url = img.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
window.open(url);
// Or perhaps: location.href = url;
// Or even setting the location of an <iframe> element,
```
方法三
```js
var img = document.images[0];
img.onclick = function() {
  // atob to base64_decode the data-URI
  var image_data = atob(img.src.split(',')[1]);
  // Use typed arrays to convert the binary data to a Blob
  var arraybuffer = new ArrayBuffer(image_data.length);
  var view = new Uint8Array(arraybuffer);
  for (var i=0; i<image_data.length; i++) {
    view[i] = image_data.charCodeAt(i) & 0xff;
  }
  try {
    // This is the recommended method:
    var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
  } catch (e) {
    // The BlobBuilder API has been deprecated in favour of Blob, but older
    // browsers don't know about the Blob constructor
    // IE10 also supports BlobBuilder, but since the `Blob` constructor
    //  also works, there's no need to add `MSBlobBuilder`.
    var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
    bb.append(arraybuffer);
    var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
  }

  // Use the URL object to create a temporary URL
  var url = (window.webkitURL || window.URL).createObjectURL(blob);
  location.href = url; // <-- Download!
};
```

## 3.前端如何读取上传文件
```js
fileReader
```

## 4.如何读取文件上传进度
```js
$.ajax({
  url : post_url,
  type: "POST",
  data : form_data,
  contentType: false,
  cache: false,
  processData:false,
  xhr: function(){
    //upload Progress
    var xhr = $.ajaxSettings.xhr();
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', function(event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        //update progressbar
        $(progress_bar_id +" .progress-bar").css("width", + percent +"%");
        $(progress_bar_id + " .status").text(percent +"%");
      }, true);
    }
    return xhr;
  },
  mimeType:"multipart/form-data"
}).done(function(res){ //
  $(my_form_id)[0].reset(); //reset form
  $(result_output).html(res); //output response from server
  submit_btn.val("Upload").prop( "disabled", false); //enable submit button once ajax is done
});
```

## 5.基础数据类型转换问题

```js
null == undefined  // true
[] == '' // true
[].toString() == '' // true,是上一个的解释
![] == false // true
[] == [] //false
({}) == '' // false
({}).toString() == '[object Object]' // 上一个的解释
```

## 6.for 循环中的 break,continue
```js
for (var i = 0; i < 10; i++) {
  if (i<=5) {
    i+=2;
    continue
  }
  i+=3;
  break;
  console.log(i);
}
console.log(i);//9
// 打印几次，值
// 在循环体中出现和continue,break后，这两个关键字后边的代码就都不会执行了，但是continue会继续下一轮循环，break会直接结束循环
```

## 7.let 的块级作用域
```js
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i); // 0,1,2,3,4
  },i*1000)
}
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i); // 5,5,5,5,5
  },i*1000)
}
```

## 8.预解析
```js
if (!("a" in window)) {
  var a ="猜猜我有没有？？？" ;
}
alert(a); // undefined
// a会预解析，所以 'a' in window 为 true，a的赋值则得不到执行。
```

## 9.预解析闭包

```js
function fo(){
	var i=0;
	return function(n){
		return n+i++;
	}
};

var f=fo();
var a = f(15); // 15
var b = fo()(15); // 15
var c = fo()(20); // 20
var d = f(20); // 21
```

## 10.预解析，闭包，this，作用域

```js
var number = 2;
var obj = {
	number: 4,
	fn1: (function() {
		this.number *= 2;
		number=number*2;
    console.log(number);// NaN
 		var number=3;
		return function() {
			this.number *= 2;
			number*=3;
			alert(number);
		}
	})(),
	db2:function(){this.number*=2}
};

var fn1 = obj.fn1;
alert(number);//4
fn1();//9
obj.fn1();//27

alert(window.number); //8
alert(obj.number); //8
```

## 11.括号表达式
```js
(1,2,3)+3 //6
//括号表达式：一个括号中放多项内容，用逗号隔开，获取到最后一项

function fn() {console.log(this)}
var obj = {fn: fn};
(fn,obj.fn)(); // 执行的是obj.fn()，但是注意this为window，并不是obj。这里有多项的时候，会将最后一项的函数体内容复制出来执行，指向window，和自执行方法一样

(obj.fn)() // obj，只有一项时是正常表现
```

## 12. setTimeout 参数

```js
for (var i = 1; i <= 4; i++) {
  var time = setTimeout(function (i) {
    clearTimeout(time)
    console.log(i)
  }, 1000, i)
}
console.log(i) // 5
console.log(time) // 可能为 4
// 1, 2, 3

/*
核心考察点
1. setTimeout 会返回一个正整数，表示定时器的编号。这个值可以传递给clearTimeout()来取消该定时。
2. 多次声明 time 会造成 time 的值的覆盖，最后 time 的值为 4，但是，因为 clearTimeout 在计时器内部，所以在循环刚结束后并没有执行，四个计时器并没有因为 time 的覆盖而丢失
3. setTimeout 从第三个开始后的参数，都将作为作为参数传递给 setTimeout 内部，形成闭包

所以，循环结束后，启动了 4 个计时器，time 的值为最后一次声明计时器返回的序号(4，但不一定)，1秒后依次执行计时器，每次执行到 clearTimeout 时，都将最后的一个计时器即 time 的值所代表的编号给清除掉。最终打印 1, 2, 3
*/
```

## 13. 函数节流

```js
document.addEventListener('scroll', throttle(function () {
  console.log(123)
}))
// 第一种，每隔一段时间执行一次
// ---1-2-3-4-5-6-7-8-9
// ---1-----------7----
function throttle (func, delay = 6000) {
  let lock = false
  return (...args) => {
    if (lock) return
    func(...args)
    lock = true
    setTimeout(() => {lock = false}, delay)
  }
}

// 第二种，停止操作后一段时间执行一次
// ---1---2--3----------4---5--6------
// -----------------3----------------6

function throttle (func, delay = 600, I = null) {
  return (...args) => {
    clearTimeout(I)
    // I = setTimeout(func.bind(null, ...args), delay)
    I = setTimeout((...args) => func(...args), delay)
  }
}
```

## 14. 柯里化

```js
const curry = func => {
  console.log(func.length)
  const g = (...allArgs) => allArgs.length >= func.length ?
    func(...allArgs)
    : (...args) => g(...allArgs, ...args)

  return g
}

const foo = curry((a,b,c,d) => {
  console.log(a,b,c,d)
})
foo(1)(2)(3)(4) // 1 2 3 4
foo(1)(2)(3) // 不返回
const f = foo(1)(2)(3)
f(5) // 1 2 3 5

// 对于 curry(foo)，g 函数参数足够4个，就调用 foo(a,b,c,d)，如果小于4个就返回一个可以继续积累参数的函数
```

## 15. 迭代器

```js
function strAdd (n, cb) {
  let str = ''
  ;(function it(i) {
    if (i >= n) {
      str += i
      cb(str)
      return
    }
    setTimeout(() => {
      str += i
      it(i + 1)
    }, 500)
  })(0)
}

strAdd(10, function (res) {
  console.log(res)
})
```

## 16 document.elementFromPoint(x, y)

返回当前文档上处于指定坐标位置最顶层的元素, 坐标是相对于包含该文档的浏览器窗口的左上角为原点来计算的, 通常 x 和 y 坐标都应为正数.

```js
let target = document.elementFromPoint(x, y)
```

## 17 阻止事件冒泡

```js
function doSomething(e){
  e = window.event || e; // window.event 为 IE
  e.cancelBubble = true; // IE
  if(e.stopPropagation){
    e.stopPropagation(); // 标准
  }
}
```

## 18 按数组中数字出现次数输出

```js
let sortByCount = function (arr) {
  let arrUni = [];
  let arrCnt = [];
  arr.forEach((val) => {
    let idx = arrUni.indexOf(val);
    if (idx < 0) {
      arrUni.push(val);
      arrCnt.push(1);
    } else {
      arrCnt[idx]++;
    }
  });
  let arrTmp = arrUni.slice();
  arrUni.sort((a, b) => {
    let idxa = arrTmp.indexOf(a);
    let idxb = arrTmp.indexOf(b);
    return arrCnt[idxb] - arrCnt[idxa];
  });
  return arrUni;
};

let res = sortByCount([2,2,2,3,4,2,3,4,5,4,2,3,5,6,7,8,5,4,3,2,4,56,6])
console.log(res)
```

## 19 面试题(原型，this等)

```js
Function.prototype.a = () => alert(1)
Object.prototype.b = () => alert(2)
function A () {}
var a = new A
a.a() // TypeError: a.a is not a function
a.b() // alert(2)
// 解释 a.__proto__ -> A.prototype -> A.prototype.__proto__ -> Object.prototype -> Object.prototype.__proto__(null)
// 这里要注意这个过程的另一条线，函数 A 的原型链
// A.__proto__ -> Function.proptotype -> Object.prototype
// 所以 A.a() 和 A.b() 都可以正确执行
```

## 20 nodejs定时器时间循环

```js
console.log(1)

setTimeout(() => {
  console.log(2)
})

process.nextTick(() => {
  console.log(3)
})

setImmediate(() => {
  console.log(4)
})

new Promise(resolve => {
  console.log(5)
  resolve()
  console.log(6)
}).then(() => {
  console.log(7)
})

Promise.resolve().then(() => {
  console.log(8)
  process.nextTick(() => {
    console.log(9)
  })
})
// 1
// 5
// 6
// 3
// 7
// 8
// 9
// 2
// 4
// http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html
// 同步任务 -> process.nextTick -> Promise.resolve().then() -> setTimeout -> setImmediate
```

## 21 parseInt

```js
[1, 2, 3, 4].map(parseInt)
// [1, NaN, NaN, NaN]
// parseInt([value]) 把value转换为数字，(内核机制，需要把value先转为字符串，然后从字符串左侧第一个字符查找，把找到的有效数字字符转换为数字，直到遇到一个非有效数字字符为止)
// parseInt([value], [n]) 第二个参数不写默认为10，特殊情况，如果字符串是以 0X 开头，默认值是 16 进制
// 解释：parseInt 第二个参数是介于2-36的基数(0和10一样，剩下基数都是NaN)，表示第一个参数是多少进制的数，然后返回一个十进制的整数
// map 会将 index 作为第二个参数传给 parseInt
// 当取出 1 的时候，index 为0，parseInt(1, 0)，返回1，经过测试， parseInt(n, 0) 返回的是 n
// 后边的几个，都是出现错误比如 parseInt(2, 1)，parseInt(3, 2)，第一个参数都超出了它们的进制数
[10.18, 0, 10, 25, 23].map(parseInt)
// [10, NaN, 2, 2, 11]

parseInt(310, 2) // NaN

const unary = fn => fn.length === 1 ? fn : (arg) => fn(arg)
// 利用 unary 实现上边的问题：
['1', '2', '3'].map(unary(parseInt))
```

## 22 数据类型转换(隐式转换)

- [隐式转换总结](https://www.w3cplus.com/javascript/javascriptss-addition-operator-demystified.html)
- [{}+0解释](https://stackoverflow.com/questions/11939044/why-does-return-0-in-javascript)

```js
let result = 100 + true + 21.2 + null + undefined + 'test' + [] + null + 9 + false
// 'NaNtestnull9false'
// 注意： undefined + 123 => NaN
// 1 + null => 1
// 1 + [] => '1'
// 'a' + [] => 'a'
// Number(null) => 0
// Number(undefined) => NaN
// 解析，当加号左右两边出现只要有一边出现字符串或者对象，就会按照字符串拼接来处理，对于对象需要先转字符串(toString，如果对象有原始值，会先调用 valueOf)，然后转数字。否则按数学运算计算，对于非数字的比如 false 这种，会进行隐式数字转化，调用的是 Number()


[] == false // true: 转为字符串比较？感觉像是转数字
![] == false // true: 相当于 false == false。!操作符优先级高
[] == 0 // true: 转数字比较
![] == 0 // true: 相当于 false == 0 => 0 == 0

// 解释，当以 {} 开头时，{}会被认为是一个语句块
{} + 0 // 0
{} + [] // 0
({}) + 0 // "[object Object]0"
```

在 `==` 比较过程中，数据转换的规则

- 类型一样
  - {} == {} => false，对象比较的是堆内存地址
  - [] == [] => false
  - NaN == NaN => false
- 数据类型不一样
  - null == undefined => true，但是 === 结果为 false，剩下 null/undefined 和其他任何数据类型都不相等
  - 字符串 == 对象，要把对象转为字符串
  - 剩下如果 == 两边数据类型不一致，都是需要转换为数字在进行比较

## 23堆栈内存

- ECStack 执行环境栈
- EC(G)全局执行上下文
- EC(BLOCK)块级上下文
- VO(G)全局变量对象
- AO(BLOCK)私有变量对象

```js
var a = {x: 1}
var b = a
a.x = a = {n: 1} // 正常赋值的话，是从右往左，带成员访问的优先集会提高
console.log(a) // {n: 1}
console.log(b) // {x: {n: 1}}
```

## 24变量提升(坑爹的函数提升)

- 初始时 {} 中的 function，在全局下只声明不定义(赋值)
- {} 中出现 function/const/let 会创建一个块级上下文

```js
var a = 0
if (true) {
  console.log(window.a, a) // 0, func a
  a = 1
  console.log(window.a, a) // 0, 1
  function a() {}
  console.log(window.a, a) // 1, 1
  a = 21
  console.log(window.a, a) // 1, 21
}
console.log(a) // 1

// 1. 全局声明变量 a: var a 和 function a
// 2. 全局 a = 0
// 3. 进入私有作用域，私有作用域内函数声明加定义，所以第一个 console 输出 func a
// 4. 私有块级作用域内 a = 1
// 5. 函数处理，在块级作用域内已经执行过，但是这里会有一个特殊处理：因为发现该变量在全局一上来声明过，所以这里会把这行代码之前所有对a的操作映射给全局一份，后面的则不会在处理了，认为后面的都是私有的，所以此时全局变量 a 会被赋值为1
// 6. a = 21，此时只会修改块级作用域内 a 的值为 21
// 7. 输出全局 a = 1
```

```js
{
  function foo() {}
  foo = 1;
  // foo => 1
}
console.log(foo); // foo => func

{
  function foo() {}
  foo = 1;
  function foo() {}
  // foo => 1
}
console.log(foo); // foo => 1

{
  function foo() {}
  foo = 1;
  function foo() {}
  foo = 2;
  // foo => 2
}
console.log(foo); // foo => 1
```

## 25 函数参数上下文

```js
var x = 1
function func(x, y = function anonymousl() {x = 2}) {
  x = 3
  y()
  console.log(x) // 2
}
func(5)
console.log(x) // 1
```

ES6中存在块级作用域(只要除对象之外的大括号 `{}` 出现 let/const/function)，另外有一种情况也会产生

1. 函数有形参赋值了默认值
2. 函数体中又单独声明过某个变量

这样在函数运行的时候，会产生两个上下文，可通过 debugger 调试(分别是local, block两个作用域)

1. 第一个: 函数执行形成的私有上下文 EC(func) => 作用域链/形参赋值/...
2. 第二个: 函数体大括号包起来的是一个块级上下文 EC(block)，该上下文是特殊的

```js
var x = 1
function func(x, y = function anonymousl() {x = 2}) {
  var x = 3 // 括号块级作用域的
  y() // 修改的是 func 执行上下文中的 x
  console.log(x) // 3
}
func(5)
console.log(x) // 1
```

## 26 compose

```js
const add1 = x => x + 1
const mult3 = x => x * 3
const div2 = x => x / 2

// 实现 compose 简化 div2(mult3(add1(add1(2))))
// 从左往右执行传入的参数
function compose (...funcs) {
  return function anonymous(...args) {
    if (funcs.length === 0) {
      return args
    }
    if (funcs.length === 1) {
      return funcs[0](...args)
    }
    let n = 0
    return funcs.reduce((a, b) => {
      n++;
      if (n === 1) {
        // 首次进来 a 和 b 都是函数，后续 a 是上个函数执行返回的结果，b是函数
        return b(a(...args))
      }
      return b(a)
    })
  }
}

let result = compose(add1, add1, mult3, div2)
console.log(result(0))

// 改写上边的 compose，注意和上边的区别，这里根据不同场景返回不同函数
function compose (...funcs) {
  if (funcs.length === 0) {
    return args => args
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => {
    return (...args) => b(a(...args))
  })
}
```

## 27 面向对象 模拟new

```js
function Dog(name) {
  this.name = name
}
Dog.prototype.bark = function() {
  console.log('wangwang')
}
Dog.prototype.sayName = function() {
  console.log('my name is ' + this.name)
}

function _new(Func, ...args) {
  // 实现你的代码
  // 第一步创建实例对象
  // let obj = {}
  // obj.__proto__  = Func.prototype
  let obj = Object.create(Func.prototype)

  // 第二步 执行方法，让里边的this是实例对象
  let result = Func.call(obj, ...args)

  // 分析返回结果
  if (result !== undefined && /^(object|function)$/.test(typeof result)) {
    return result
  } else {
    return obj
  }
}

let sanmao = _new(Dog, '三毛')
sanmao.bark() // 'wangwang'
sanmao.sayName() // 'my name is wangwang'
console.log(sanmao instanceof Dog) // true
```

## 28 重写call

```js
~function() {
  function change(context, ...args) {
    // 实现你的代码
    // this 是调用 change 的函数
    context = context == undefined ? window : context
    let type = typeof context
    if (!/^(object|function)$/.test(type)) {
      // 如果传入的参数不是一个 object
      if (/^(symbol|bigint)$/.test(type)) {
        // 如果是 symblo 或者 bigint
        context = Object(context)
      } else {
        context = new context.constructor(context)
      }
    }

    let key = Symbol('key')
    let result
    context[key] = this
    result = context[key](...args)
    delete context[key]
    return result
  }
  Function.prototype.change = change
}();

let obj = {name: 'test'}
function func(x, y) {
  this.total = x + y
  return this
}


let res = func.change(obj, 100, 200)
// res => {name: 'test', total: 300}
let res1 = func.change('string', 100, 200)
let res2 = func.change(Symbol('123'), 100, 200)

// call 的另外一个问题
// https://stackoverflow.com/questions/34916477/a-is-a-function-then-what-a-call-call-really-do
// 结论， .call....call(context) 相当于 context()
function fn1(){
  console.log('fn1');
}
function fn2(){
  console.log('fn2');
}
fn1.call(fn2); // fn1
fn1.call.call(fn2); // fn2
fn1.call.call.call(fn2); // fn2
Function.prototype.call(fn1); // undefined
Function.prototype.call.call.call(fn1); // fn1
```

## 29 重写bind

```js
~function() {
  function bind(context, ...args) {
    // this => func
    let _this = this
    // 实现你的代码
    // this 是调用 change 的函数
    context = context == undefined ? window : context
    let type = typeof context
    if (!/^(object|function)$/.test(type)) {
      // 如果传入的参数不是一个 object
      if (/^(symbol|bigint)$/.test(type)) {
        // 如果是 symblo 或者 bigint
        context = Object(context)
      } else {
        context = new context.constructor(context)
      }
    }

    return function anonymous(...innerArgs) {
      _this.call(context, ...args.concat(innerArgs))
    }
  }
  Function.prototype.bind = bind
}();

var obj = {
  name: 'test'
}

function func() {
  console.log(this, arguments)
}
document.body.onclick = func.bind(obj, 100, 200)
```

## 30实现instanceof

[参考文章](https://juejin.im/post/5ceb8247e51d455071250a8a)

```js
function new_instance_of(leftVaule, rightVaule) {
  let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
  leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
  while (true) {
    if (leftVaule === null) {
      return false
    }
    if (leftVaule === rightProto) {
      return true
    }
    leftVaule = leftVaule.__proto__
  }
}

new_instance_of([12,23], Array) // true
new_instance_of(Object, Object) // true
new_instance_of(Object, Function) // true
```

## 31大数相加

```js
function bigNumAdd(num1, num2) {
  // 首先检查传来的大数是否是字符串类型，如果传Number类型的大数，在传入的时候已经丢失精度了，
  // 就如 如果传入11111111111111111，处理的时候已经是丢失精度的11111111111111112了，则需要传入
  // 字符串类型的数字 '11111111111111111'
  const checkNum = num => typeof num === 'string' && !isNaN(Number(num))
  if (checkNum(num1) && checkNum(num2)) {
    // 将传入的数据进行反转，从前向后依次加和，模拟个，十，百依次向上加和
    const tmp1 = num1.split('').reverse()
    const tmp2 =  num2.split('').reverse()
    const result = []
    // 格式化函数，主要针对两个大数长度不一致时，超长的数字的格式化为0
    const format = val => {
      if( typeof val === 'number') return val
      if(!isNaN(Number(val))) return Number(val)
      return 0
    }
    let temp = 0
    // 以较长的数字为基准进行从前往后逐个加和，为避免两个数相加最高位进位后，导
    // 致结果长度大于两个数字中的长度，for循环加和长度为最长数字长度加一
    for (let i = 0; i <= Math.max(tmp1.length, tmp2.length); i++) {
      const addTmp = format(tmp1[i]) + format(tmp2[i]) + temp
      // 当加和的数字大于10的情况下，进行进位操作，将要进位的数字赋值给temp，在下一轮使用
      result[i] = addTmp % 10
      temp = addTmp > 9 ? 1 : 0;
    }
    // 计算完成，反转回来
    result.reverse()
    // 将数组for中多加的一位进行处理，如果最高位没有进位则结果第一个数位0，
    // 如果第一个数位1，则发生了进位。 如99+3，最大数字长度位2,结果数长度位3
    // 此时结果的第一位为1，发生了进位，第一位保留，如果是2+94，第一位为0，则不保留第一位
    const resultNum = result[0] > 0
        ? result.join('')
        : result.join('').slice(1)
    console.log('result', resultNum)
    return resultNum
  } else {
    return 'big number type error'
  }
}
```

## 33大数相减

```js
// https://blog.csdn.net/yuzhongchun/article/details/39646073
```

## 34对象模拟类数组

```js
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

## 35权限校验

- 登陆态校验
- 接口权限校验
- 菜单/按钮/功能权限
- 数据权限
