# RevealingModule 揭示模块模式

```js
var myRevealingModule = function () {
  var privateVar = 'Cherry'
  var publicVar = 'hey there'

  function privateMethod () {
    console.log('Name: ' + privateVar)
  }

  function publicSetName(strName) {
    privateVar = strName
  }

  function publicGetName () {
    privateMethod()
  }

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  }
}
```

> 优点：相比 Module 模式，更加易读

> 缺点：如果一个私有函数引用一个公有函数，在需要打补丁时，公有函数是不能被覆盖的。因为私有函数将继续引用私有实现，该模式不适用于公有成员，只适用于函数
