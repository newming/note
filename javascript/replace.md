# replace 与 正则

把原有的字符串替换成新的字符，在不使用正则的情况下，每执行一次只会替换一个字符

```js
var str = 'new1993new1103'
str = str.replace('new', 'newming')
console.log(str) // newming1993new1103
str = str.replace('new', 'newming')
console.log(str) // newmingming1993new1103
// 会发现每次都是找到第一个就执行替换了，所以会一直重复替换第一个new为newming

// 接下来用正则去替换
var str = 'new1993new1103'
// str = str.replace(/new/, 'newming')
// console.log(str) // newming1993new1103 同样只替换一个

str = str.replace(/new/g, 'newming')
console.log(str) // newming1993newming1103 全部替换
```

### replace 原理

replace 方法第一项参数为正则的时候的实现原理：首先同正则的exec方法将匹配的内容捕获到，然后将捕获到的内容替换为我们需要的内容

> 语法: str.replace(regexp|substr, newSubStr|function)

```js
var str = 'new1993new1103'

str = str.replace(/new/g, function () {
  console.log(arguments); // 打印两次，每次打印的同exec执行几次的结果非常相似
  return 'nweming'
})
console.log(str);
```
