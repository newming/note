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
- instanceof 运算符
- constructor
- Object.prototype.toString.call() 方法

### typeof 用来检测数据类型
注意返回的结果是string类型

返回值有 'number' 'string' 'boolean' 'object' 'undefined' 'function'

不能具体检查 object 下细分的类型，返回的都是 object，比如 null [] {} /^.$/

```js
console.log(typeof typeof typeof []); //string
```
