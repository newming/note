# 数据类型转换规则总结

- 如果只有一个值，判断这个值是真还是假，遵循只有 0 NaN '' null undefined 这五个值是假的，其余都是真。(!null == true)
- 如果是两个值比较是否相等，如果可能不是同一个数据类型，如果是==比较的话，会进行默认的数据类型转换。
  1. 对象==对象 永远是false 例如({}=={})，[]=[],(function(){}==function(){})
  2. 对象==字符串 先将对象转换为字符串，调用toString()的方法，然后在进行比较。
  3. 对象==布尔类型 对象现转化为字符串，在转数字，布尔在转数字，进行比较
  4. 对象==数字
  5. 数字==布尔
  6. 数字==字符串 字符串转数字
  7. 字符串==布尔 都转为数字
  8. null==undefined // true
  9. null,undefined和任何其他类型不相等
- === 绝对比较，数据类型不同肯定不同

# 基本数据类型和引用数据类型
基本数据类型：null undefined number boolean string(比较特殊)

引用数据类型： function object array

先看两个例子：
```js
// 1基本数据类型没有跟着变
var num1 = 10;
var num2 = num1;
num ++ ;
console.log(num1);// 10
console.log(num2);

// 2引用数据类型跟着改变了
var obg1 = {name: 'test'}
var obg2 = obg1
obg2.name = 'testtest'
console.log(obg1); // testtest
console.log(obg2); // testtest
```
区别：JS基本数据类型的变量存放的是基本类型数据的实际值；而引用数据类型的变量保存对它的引用，即指针。

# 数据类型检测方式
- typeof 运算符
- instanceof 运算符，检测某一个实例是否属于某个类
- constructor
- Object.prototype.toString.call() 方法

### typeof 用来检测数据类型
注意返回的结果是string类型

> 返回值有 'number' 'string' 'boolean' 'object' 'undefined' 'function'

不能具体检查 object 下细分的类型，返回的都是 object，比如 null [] {} /^.$/

```js
console.log(typeof typeof typeof []); //string
console.log(typeof 1) // number
console.log(typeof new Number(1)) // object
```

### instanceof 检测某一个实例是否属于某个类，局限性很多比如：
1. 不能用来检测通过字面量方式创建出来的基本数据类型
2. 在类的原型继承中，最后检测出来的结果未必准确

```js
// 1. 对于基本数据类型来说通过创建字面量方式与实例创建方式创建出来的是有区别的，字面量方式返回 false，实例方式返回 true。从严格意义上来说，只有实例创建出来的结果才是标准的对象数据类型值，也是标准的 Number 的类的一个实例。对于字面量方式创建出来的结果是基本的数据类型值，不是严谨的实例，但是由于 js 的松散特点，导致了可以使用 Number.prototype 上的提供的方法
console.log(1 instanceof Number) // false
console.log('1' instanceof String) // false
console.log(false instanceof Boolean) // false
console.log(new Number(1) instanceof Number) // true

// 2. 只要在当前实例的原型链上，结果都是 true
var obj = [2, 3, 4]
console.log(obj instanceof Array) // true
console.log(obj instanceof Object) // true

function fn () {}
console.log(fn instanceof Function) // true
console.log(fn instanceof Object) // true

// dom 原型链
div -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype -> Node.prototype -> EventTarget.prototype -> Object.prototype
```

### constructor 构造函数，作用同 instanceof 非常类似

constructor 可以检测基本数据类型

局限性：我们可以把类的原型进行重写，在重写的过程中很有可能把之前的 constructor 覆盖，这样检测出来的就不准确了

```js
var obj = []
console.log(obj.constructor === Array) // true
console.log(obj.constructor === RegExp) // false
console.log(obj.constructor === Object) // false

(1).instructor === Number // true

// 局限性
function fn () {}
var ary = new Array()
fn.prototype = ary
var f = new fn
console.log(f.constructor) // Array
```

### Object.prototype.toString.call(obj)

最准确最常用的方式。首先获取 Object 原型上的方法，并且让其执行，并且改变方法内的 this 指向

##### toString() 方法的理解

不仅仅是转换字符串。Object.prototype 的特殊，它的作用是返回当前方法执行主体(this)的所属类的信息

```js
console.log((1).toString()) // "1"  拿到的是 Number 原型上的 toString，将数字转字符串
console.log((1).__proto__.__proto__.toString()) // "[object Object]" 拿到的是 Object 原型上的 toString 方法

// Number, Boolean, String, Array, RegExp, Date, Function 的字面量的 toString 是转字符串
// null, undefined 无 toString 方法
// Math.toString() // "[object Math]" 第一个 object 代表当前执行体的数据类型是 object(固定的)，第二个代表它所属的类是 Math
// ({}).toString() // "[object Object]"
// ({}).__proto__.toString.call(10) // "[object Number]" 同 Object.prototype.toString.call(10)
```