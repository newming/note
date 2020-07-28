# 数组去重

## 方法一 双循环
```js
// 每次循环拿出当前项与后边项去比较，当数据很大的时候性能不好

var arr = [1,3,2,5,3,2,4,1];
for (var i = 0; i < arr.length; i++) {
  var cur = arr[i];
  for (var j = i+1; j < arr.length; j++) {
    if (cur == arr[j]) {
      arr.splice(j,1); // 注意这里删除了一位之后数组长度会减少
      j--;
    }
  }
}
console.log(arr);
```

## 方法二 利用对象

一个对象的属性名不可以重复

把数组中的每一项，当作一个新对象的属性名和属性值存起来，在存储的时候判断当前的属性名是否已经存在，存在了就代表数组该项重复了，我们直接删除该项，不存在的话直接存储就行了

```js
var arr = [1,3,2,5,3,2,4,1];
var obj = {};

for (var i = 0; i < arr.length; i++) {
  var cur = arr[i];
  if (obj[cur]==cur) {
    arr.splice(i,1);
    i--;
    continue;
  }
  obj[cur] = cur;
}

obj = null;
console.log(arr);
```

## 方法三 Set 对象

```js
function dedupe (array) {
  return Array.from(new Set(array))
}
```

## 方法四 创建新数组

```js
function dedupe (array){
  if (!array.length) {
    return []
  }
	var newArray = [array[0]]; // 结果数组
	for(var i = 1; i < array.length; i++){
		if(newArray.indexOf(array[i]) === -1){
			newArray.push(array[i]);
		}
	}
	return newArray;
}
```