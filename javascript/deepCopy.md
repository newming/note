# 深拷贝与浅拷贝

深复制和浅复制只针对像 Object, Array 这样的复杂对象的。简单来说，浅复制只复制一层对象的属性，而深复制则递归复制了所有层级。

对于字符串类型，浅复制是对值的复制，对于对象来说，浅复制是对对象地址的复制，并没有开辟新的栈，也就是复制的结果是两个对象指向同一个地址，修改其中一个对象的属性，则另一个对象的属性也会改变，而深复制则是开辟新的栈，两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。深复制实现代码如下：

**通过递归解析解决**

```js
var china = {
  nation : '中国',
  birthplaces:['北京','上海','广州'],
  skincolr :'yellow',
  friends:['sk','ls']
}
//深复制，要想达到深复制就需要用递归
function deepCopy(o,c){
  var c = c || {}
  for(var i in o){
    if(typeof o[i] === 'object'){
      //要考虑深复制问题了
      if(o[i].constructor === Array){
        //这是数组
        c[i] =[]
      }else{
        //这是对象
        c[i] = {}
      }
      deepCopy(o[i],c[i])
    }else{
      c[i] = o[i]
    }
  }
  return c
}
var result = {name:'result'}
result = deepCopy(china,result)
console.dir(result)
```

**第二种方法：通过JSON解析解决**

```js
var test = {
  name:{
    xing:{
      first:'张',
      second:'李'
    },
    ming:'老头'
  },
  age :40,
  friend :['隔壁老王','宋经纪','同事']
}
var result = JSON.parse(JSON.stringify(test))
result.age = 30
result.name.xing.first = '往'
result.friend.push('fdagldf;ghad')
console.dir(test)
console.dir(result)
```

## 浅拷贝

```js
var obj = { a:1, arr: [2,3] };
var shallowObj = shallowCopy(obj);

function shallowCopy(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}
```