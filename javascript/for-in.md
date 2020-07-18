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

for in 遍历的是key，for of遍历的是value

- [张鑫旭](https://www.zhangxinxu.com/wordpress/2018/08/for-in-es6-for-of/)
- [区别](https://lq782655835.github.io/blogs/js/different-for-in-for-of.html)

`for in` 的缺点：

- for in 迭代顺序依赖于执行环境，不一定保证顺序
- for in 不仅会遍历当前对象，还包括原型链上的可枚举属性
- for in 没有break中断
- for in 不适合遍历数组，主要应用为对象

`for of`的优点：

- for of 有与for in 一样的简洁语法（这也是两者容易混乱的点），但没有for in的缺点
- for of 保证顺序且不会仅遍历当前对象
- for of 可与break，continue，return配合