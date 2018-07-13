# 数组排序算法

- 冒泡排序
- 快速排序
- 插入排序

## 冒泡排序

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

## 插入排序(INSERTION-SORT)

插入排序：对于少量元素比较有效。

```js
// 插入排序第一版
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

// 插入排序第二版
function insertionSort (arr) {
  let len = arr.length
  let j, temp
  for (let i = 1; i < length; i++) {
    j = i
    temp = arr[i]
    while (j > 0 && array[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }
    if (j !== i) {
      arr[j] = temp
    }
  }
}
```

## 选择排序

选择排序大致的思路是找到数据结构中的最小值并将其放到第一位，接着找到第二小的值放到第二位。性能不是很好

```js
function swap(arr, index1, index2) {
  let aux = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = aux
}
function selectionSort (array) {
  let length = array.length
  let indexMin // 最小值的索引
  for (let i = 0; i < length - 1; i++) {
    indexMin = i
    for (let j = i + 1; j < length; j++) {
      if (array[indexMin] > array[j]) {
        indexMin = j
      }
    }
    if (i !== indexMin) {
      swap(array, i, indexMin)
    }
  }
}
let arr = [4, 8, 2]
selectionSort(arr)
console.log(arr)
```

## 归并排序

归并排序是第一个可以被实际使用的排序算法。比前几个性能好。复杂度为 O(nlogn)

归并排序是一种分治算法。其思想是将原始的数组切分为较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

```js
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};
function defaultCompare (a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// 归并函数
function merge (left, right, compareFn) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
// 切分大数组
function mergeSort (array, compareFn = defaultCompare) {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, length), compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}

// 上边的简写
// 归并函数，这个函数主要负责将传入的两个数组进行排序
function merge (left, right) {
  let i = 0; // i,j 为 left right 的左右两个指针
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    // 将小的数依次插入到 result 中，同时移动左右指针，知道某个数组遍历完了，即某个数组的指针停到了数组结尾，但是总有一个数组是不会被遍历完的，即指针没有停到数组的结尾，那么剩下的就是大的数据了，所以在 return 处做了一次 concat
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
// 切分大数组
function mergeSort (array) {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle, length));
    array = merge(left, right);
  }
  return array;
}

let arr = [4, 8, 2]
console.log(mergeSort(arr))
```


## 快速排序

快速排序也许是最常用的排序算法了。它的复杂度是 O(nlogn)，且它的性能通常比其他的复杂度为 O(nlogn) 的排序算法要好。

快速排序也是采用分治的方法，将原始数组分为较小的数组。

从数组的中间拿一个值，然后通过这个值挨个和数组里面的值进行比较，如果大于的放一边，小于的放一边，然后把这些合并，再进行比较，如此反复即可。

```js
// 第一种快速排序。不太好， splice 性能较差
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

```js
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}

function partition(array, left, right, compareFn) {
  const pivot = array[Math.floor((right + left) / 2)]; // 取中间值
  let i = left;
  let j = right;

  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++; // 如果左边的指针的值小于中间值，符合条件，移动左指针，最多移动到中间的这个值的位置
    }
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--; // 如果右边的指针的值大于中间值，符合条件，移动右指针，最多移动到中间的这个值的位置
    }
    if (i <= j) { // 如果 i <= j 说明在上边的两个 while 循环中某个地方停住了，交换位置，同时移动指针
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}
function quick(array, left, right, compareFn) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, compareFn);
    if (left < index - 1) {
      quick(array, left, index - 1, compareFn);
    }
    if (index < right) {
      quick(array, index, right, compareFn);
    }
  }
  return array;
}
export function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}
```