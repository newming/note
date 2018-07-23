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

## 真正的深拷贝

[参考文章](https://juejin.im/post/5abb55ee6fb9a028e33b7e0a)

```js
// 特殊对象类型判断
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};
// 获取正则对象的 flags 修饰符
const getRegExp = re => {
  return re.flags;
};

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      if (parent.hasOwnProperty(i)) {
        // 递归
        child[i] = _clone(parent[i]);
      }
    }

    return child;
  };
  return _clone(parent);
};
```