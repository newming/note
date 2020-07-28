# let 和 const

### 作用域

es6 之前有全局作用域和函数作用域，es6 新增块级作用域

- let 和 const 存在块级作用域，一个大括号就是一个块级作用域
- 不能重复定义一个变量
- const 声明的常量是只读的

```js
for (let i = 0; i < 10; i ++) {
  console.log(i)
}
console.log(i)

// 循环绑定事件，之前需要将 i 单独保存到私有作用于
for (var index = 0; index < btns.length; index++) {
  (function () {
    var cur = btns[index]
    cur.index = index
    cur.onclick = () => {console.log(this.index)}
  })()
}
// 用 let 不用操心
for (let index = 0; index < array.length; index++) {
  var element = array[index];
  element.onclick = () => console.log(index)
}
```