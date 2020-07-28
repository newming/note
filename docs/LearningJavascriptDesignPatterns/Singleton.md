# Singleton 单例模式

类的实例化次数只能是一次。

```js
var mySingleton = (function () {
  // 实例保持了 singleton 的一个引用
  var instance

  function init () {
    // Singleton
    // 私有方法和变量
    function privateMethod () {
      console.log('i am private')
    }

    var privateVar = 'I am also private'
    var privateRandomNumber = Math.random() // 只会执行一次，声明时被执行，除非再次 init 才会重新初始化

    return {
      publicMethod: function () {
        console.log('the public can see me!')
      },
      publicProperty: 'I am also public',
      getRandomNumber: function () {
        return privateRandomNumber
      }
    }
  }
  return {
    // 获取 Singleton 实例，如果存在就返回，不存在就创建
    getInstance: function () {
      if (!instance) {
        instance = init()
      }
      return instance
    }
  }
})()
```

使用：

```js
var singleA  = mySingleton.getInstance()
var singleB  = mySingleton.getInstance()
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()) // true
console.log(singleA.getRandomNumber()) // 0.8918236967621893
console.log(singleB.getRandomNumber()) // 0.8918236967621893
console.log(singleA.getRandomNumber()) // 0.8918236967621893
console.log(singleB.getRandomNumber()) // 0.8918236967621893
```