# this 指向
this 是谁和在哪定义、在哪里执行没有关系，和函数执行时候的主体有关系，而且this只出现在function中或者全局作用域下

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
