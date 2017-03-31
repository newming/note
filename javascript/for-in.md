# for in 循环的顺序问题

for in 通常用来循环遍历对象，对象中有多少键值对就循环多少次

顺序问题：首先循环数字的属性名（按照从小到大），然后把剩下的属性名按照我们写的顺序循环

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
