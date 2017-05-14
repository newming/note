# 对象(Object)

### 单例模式
在项目中，为了避免使用全局的变量或方法导致的冲突，我们通常把需要的方法和变量当作一个对象数据类型的属性名和属性值保存起来。我们把创建的对象的名称为命名空间。

对象字面量只是用于创建单例的方法之一，并非所有的对象字面量都是单体。如果它是用来模仿关联数组或容纳数据的话，就显然不是单例。如果它用来组织一批相关方法和属性，那就可能是单例。这主要区别在于设计的意图。

1. 使用单例模式可以很好的组织代码，使代码的调试和维护更高效。
2. 但就对创建对象的生产方式而言，显然，这种生产方式是很落后的。相应的，在js中创建对象数据类型也是这样的，纯粹的用对象直接量来单次的描述对象在编程中非常的不方便，需要改进这种创建对象数据类型的方式，工厂模式可以提高这种落后的“生产方式” 。

```js
// 单例模式(一)
var obj = {
  name: 'aaa',
  check: function () {

  }
}
// 全局
var name = 'aaa';
function check() {

}
// (二)
var obj = (function () {
  function check() {

  }
  function submit() {

  }
  return {
    check,submit
  }
})()
obj.check()
```

### 工厂模式

```js
function factory(material){
	var obj = {};
	obj.material = meterial;//原料
	obj.attr1 = '';
	obj.attr2 = '';
	obj.fn = function(){};//流程
	return obj;//产品
}
var p1 = factory('aaa')
var p2 = factory('aaadd')
var p3 = factory('aaaee')
```
### 构造函数

```js
function FE(name, age){
	this.name = name;
	this.age = age;
	this.writeCss = function(){
    console.log(this.name);
  };
}
FE.prototype.writeJs = function () {
  console.log(this.age);
};
var p1 = new FE('aa',34)
var p2 = new FE('aaaa',34)
console.log(p1.writeCss==p2.writeCss); // false
console.log(p1.writeJs==p2.writeJs); // true
// 注意私有方法属性不相同，公共的相同
```
