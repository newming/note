# for in 循环的顺序问题

for in 通常用来循环遍历对象，对象中有多少键值对就循环多少次

顺序问题：首先循环数字的属性名（按照从小到大），然后把剩下的属性名按照写的顺序循环

```js
var obj = {
  name: 'newming',
  age: 23,
  1: 10086
}

for (var key in obj) {
  console.log(key);
  console.log(obj[key]);//注意获取属性值只能用[key]获取，因为属性名如果是数字的话是无法通过 .key 获取的
}
```

## for...in 与 for...of 的区别

for in 遍历的是key，for of遍历的是value。其中 for in 推荐使用 Object.keys 替代

for of 是基于 iterator 迭代器进行遍历的，返回 value。部分数据结构实现了迭代器的规范 [Symbol.iterator]，例如数组、部分类数组、Set、Map

- for...in... 返回的是所有能够通过对象访问的、可枚举的(enumerable)属性，包含实例属性和原型上的属性
- Object.keys() 方法返回的是一个包含所有可枚举属性的字符串数组。
- Object.getOwnPropertyNames() 返回的是一个包含所有实例属性的数组，不论是否可枚举

- [张鑫旭](https://www.zhangxinxu.com/wordpress/2018/08/for-in-es6-for-of/)
- [区别](https://lq782655835.github.io/blogs/js/different-for-in-for-of.html)

`for in` 的缺点：

- for in 迭代顺序依赖于执行环境，不一定保证顺序
- for in 不仅会遍历当前对象，还包括原型链上的可枚举属性，可以配合 Object.hasOwnProperty 解决
- for in 没有break中断
- for in 不适合遍历数组，主要应用为对象
- for in 无法遍历到 Symbol 属性，Object.keys, Object.getOwnPropertyNames也拿不到，可以使用 Object.getOwnPropertySymbols 拿到 Symbol 属性

`for of`的优点：

- for of 有与for in 一样的简洁语法（这也是两者容易混乱的点），但没有for in的缺点
- for of 保证顺序且仅遍历当前对象
- for of 可与break，continue，return配合

## 各种循环

### Q1 各种循环性能对比

- 基于var声明的时候，for和while循环性能差不多，不确定循环次数的情况下用while
- 基于let声明的时候，for循环性能更好，原因是: 没有创建全局不释放的变量
- for循环中，用let声明时，性能比var好
- forEach之类的方法性能比 for 循环差
- for in 性能最差，需要遍历它的原型链
- for of 性能比 for in 好点，比 for while 慢

```js
for(let i =0; i< 100000; i++) {}
for(var i =0; i< 100000; i++) {} // 需要创建全局不释放的变量

let i = 0
while(i < 10000) {
  // while条件语句中不可以声明变量，只能使用全局变量
  i++
}
```

### Symbol.iterator

```js
var arr = [10, 20, 30]
// Symbol.iterator规范：必须具备next属性，执行一次next方法，拿到结构中的一项的值 {done, value}
arr[Symbol.iterator] = function() {
  let self = this
  let index = 0
  return {
    next() {
      if (index > self.length - 1) {
        return {
          done: true,
          value: undefined
        }
      }
      return {
        done: false,
        value: arr[index++]
      }
    }
  }
}

for(let val of arr) {
  console.log(val)
}

// 实现for of遍历对象
var obj = {
  0: 3,
  1: 1,
  a: 1,
  b: 2,
  length: 1
}
obj[Symbol.iterator] = Array.prototype[Symbol.iterator]
for(let val of obj) {
  console.log(val) // 3
}
```