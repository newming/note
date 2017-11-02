# Destructuring Assignment 解构赋值

分类：
- 数组
- 对象
- 字符串
- 函数参数
- 布尔值
- 数值解构赋值

```js
// 1. array，按下标进行匹配赋值
let [a, b, c] = [1, 2] // a 1, b 2, c undefined
let [a, b, c = 3] = [1, 2] // a 1, b 2, c 3
let [a, b, ...rest] = [1, 2, 3, 4]
// 数值交换，之前需要借助一个中间变量
let a = 1, b=2;
[a, b] = [b, a]
console.log(a, b) // 2 1


// 2. object，按照 key, value 进行赋值
let {a, b} = {a: 1, b: 2}
// 对象中使用默认值
let c = {d: 3, e: 4}
let {d, e, f = 5} = c
// 重新命名属性名
let data = {
  title: 'abc',
  test: [{
    title: 'def',
    haha: false
  }]
}
let {title: outTitle, test: [{title: innerTitle}]} = data
console.log(outTitle, innerTitle)

// 3. string
let [a, b, , c, e] = 'hello'

// 4. function parameter
function test ({a}, [b], [c, d], e = 3) {
  console.log(a, b, c, d, e)
}
test({a:1}, [2], 'hi')

// 5,6. boolean, number
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
// 上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```