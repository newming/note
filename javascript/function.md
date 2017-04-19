# 函数

### 参数求和
```js
function sum() {
  var total=null;
  for (var i = 0; i < arguments.length; i++) {
    var val = Number(arguments[i]);
    if (isNaN(val)) {
      continue;
    }
    total+=val
    console.log(total);
  }
  return total;
}
sum(6,8,78,'90')
sum('a',8,'-0','66')
```

js执行循序
- 开辟一个全局作用域(window)
- 在当前作用域(window)下进行预解析(带var和function)，var和function预解释不一样，var只是提前申明，function提前申明和定义都完成了
- 开始执行代码，遇到function定义直接跳过。所以函数定义可以写在后面，预解释已经申明定义了
- 每个函数执行时会形成一个新的私有作用域(栈内存)，在这个作用域内在进行预解释，然后在函数体内从上到下执行。在函数的这个私有作用域中定义的变量都是私有变量。形成的这个作用域保护里面的私有变量不受外界干扰，这种机制叫做闭包。函数执行一次就会形成一个新的私有作用域，重复这次步骤。
- 一般情况下，每一次函数执行完成后，函数新形成的作用域会自定销毁

注意：预解释是发生在当前作用域下的


### 自执行函数
定义和执行同时完成
```js
;(function (name) {
  console.log(name);
})('newming');

~function (name) {
  console.log(name);
}('newming');

-function (name) {
  console.log(name);
}('newming');

!function (name) {
  console.log(name);
}('newming');

+function (name) {
  console.log(name);
}('newming');
```
