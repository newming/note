# js中浏览器异常捕获机制

在js中默认的情况下，上面的代码报错，下面的代码就不执行了
```js
console.log(num); // Uncaught ReferenceError: num is not defined
console.log('aaa');
```

try catch finally 是js中浏览器异常信息捕获机制

作用：
- 捕获浏览器的异常信息，捕获后就不会在浏览器中报错，并且后面的代码可以继续执行
- 检测和处理浏览器兼容性


```js
try {
  // 执行的代码
} catch (e) { // 型参一定要有，存储当前浏览器的异常信息，e.message
  // 当try中的代码报错后会自动执行catch中的代码
} finally {
  // 不论是否报错，都会执行，一般不加
}
```

也可以手动抛出错误，阻止代码执行
```js
throw new Error('抱歉错处了');
throw new ReferenceError('引用错误')
throw new TypeError('类型错误')
throw new RangeError('引用错误')
```
