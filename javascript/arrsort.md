# 数组排序算法

- 冒泡排序
- 快速排序
- 插入排序

### 冒泡排序
```js
var arr = [12,10,13,8,4];
// target: [4,8,10,12,13] 从小到大排序
// 思想：当前项和后一项进行比较，如果当前项大于后一项，两者交换位置
/*
  第一轮比较四次，将最大的已经放到最后了，接下来下一轮，一共需要arr.length-1轮
  [10,12,13,8,4]
  [10,12,13,8,4]
  [10,12,8,13,4]
  [10,12,8,4,13]
  接下来第二轮比较三次

  i控制轮数，从0开始的话
  i=0第一轮 比较arr.length-1-0次
  i=1第一轮 比较arr.length-1-1次
  i=2第一轮 比较arr.length-1-2次
  ...
  i=n第n轮 比较arr.length-1-n次

  当当前项大于后一下交换位置
  var a = 12;
  var b = 13;
  var c = null;
  c = a;
  a = b;
  b = c
*/

function sortAry(ary){
  // i代表轮数，比较ary.length-1次
  for (var i = 0; i < ary.length-1; i++) {
    // 比较arr.length-1-i次，j代表每一轮比较的次数,不用和自己比，不用和上一轮最后一项的最大值比较
    for (var j = 0; j < ary.length-1-i; j++) {
      var cur = ary[j],next = ary[j+1];
      if (cur>next) {
        // 如果当前项大于下一项，交换位置
        var temp = null;
        temp = ary[j];
        ary[j] = ary[j+1];
        ary[j+1] = temp;
      }
    }
  }
}
sortAry(arr)
console.log(arr);
```

### 快速排序

从数组的中间拿一个值，然后通过这个值挨个和数组里面的值进行比较，如果大于的放一边，小于的放一边，然后把这些合并，再进行比较，如此反复即可。

```js
var arr = [3,1,4,2,5,21,6,15,63];
function sortA(arr){
  // 如果只有一位，就没有必要比较
  if(arr.length<=1){
      return arr;
  }
  // 获取中间值的索引
  var len = Math.floor(arr.length/2);
  // 截取中间值
  var cur = arr.splice(len,1);
  // 小于中间值放这里面
  var left = [];
  // 大于的放着里面
  var right = [];
  for(var i=0;i<arr.length;i++){
      // 判断是否大于
      if(cur>arr[i]){
          left.push(arr[i]);
      }else{
          right.push(arr[i]);
      }
  }
  // 通过递归，上一轮比较好的数组合并，并且再次进行比较。
  console.log(sortA(left).concat(cur,sortA(right)))
  return sortA(left).concat(cur,sortA(right))
}
console.log(sortA(arr));
```
额，理解起来比较难，画了个图
![quicksort](../images/quicksort.png)

### 插入排序(INSERTION-SORT)

插入排序：对于少量元素比较有效。

```js
function sort(elements){
  //假设第0个元素是一个有序的数列，第1个以后的是无序的序列，
  //所以从第1个元素开始将无序数列的元素插入到有序数列中
  for(var i = 1; i < elements.length; i++){
    //升序
    if(elements[i] < elements[i-1]){
      //取出无序数列中的第i个作为被插入元素
      var guard = elements[i];
      //记住有序数列的最后一个位置，并且将有序数列位置扩大一个
      var j = i - 1;
      // elements[i] = elements[j]; // 我发现这句是多余的

      //比大小，找到被插入元素所在的位置
      while(j >= 0 && guard < elements[j]){
        elements[j+1] = elements[j];
        j--;
      }

      //插入
      elements[j+1] = guard;
    }
  }
}

var elements = [10, 9, 8, 7, 6, 5];
console.log('before: ' + elements);
sort(elements);
console.log(' after: ' + elements);
```
