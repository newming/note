# 二进制实现加法运算

- [二进制实现加法运算](https://www.cnblogs.com/kingsm/p/9707988.html)
- [按位操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

## 结论

位运算表示不进位加法：不进位加法其实就是一个异或操作
位运算表示进位加法：进位加法其实就是一个与操作的结果左移一位

```js
function sum (a, b) {
  if (b===0) return a;
  return sum(a ^ b, (a & b) << 1)
}
```
