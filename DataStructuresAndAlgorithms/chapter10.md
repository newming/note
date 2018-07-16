# 排序和搜索算法

## 排序

[各种排序](../javascript/arrsort.md)

## 搜索算法

### 顺序搜索

```js
function sequentialSearch(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (value === array[i]) {
      return i;
    }
  }
  return -1;
}
```

### 最大/小值查找

```js
function findMaxValue(array) {
  if (array && array.length > 0) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (max < array[i]) {
        max = array[i];
      }
    }
    return max;
  }
  return undefined;
}
function findMinValue(array) {
  if (array && array.length > 0) {
    let min = array[0];
    for (let i = 1; i < array.length; i++) {
      if (min > array[i]) {
        min = array[i];
      }
    }
    return min;
  }
  return undefined;
}
```

### 二分搜索

首先要求被搜索的数据结构已排序

- 选择数组的中间值
- 如果选中的值是待搜索值，那么算法执行完毕(值找到了)
- 如果待搜索值比选中值要小，则返回步骤1并在选中值左边的子数组中寻找
- 如果待搜索值比选中值要大，则返回步骤1并在选中值右边的子数组中寻找

```js
export function binarySearch(array, value) {
  const sortedArray = quickSort(array); // 这里 quickSort 是拿的 快速排序的代码
  let low = 0;
  let high = sortedArray.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = sortedArray[mid];
    // console.log('mid element is ' + element);
    if (element < value) {
      low = mid + 1;
      // console.log('low is ' + low);
    } else if (element > value) {
      high = mid - 1;
      // console.log('high is ' + high);
    } else {
      // console.log('found it');
      return mid;
    }
  }
  return -1;
}
```

### 插补搜索法

与二分搜索法类似，只是中间值的寻找方式不同。

```js
function interpolationSearch(array, value) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;
  while (low <= high && value >= array[low] && value <= array[high]) {
    delta = (value - array[low]) / (array[high] - array[low]);
    position = low + Math.floor((high - low) * delta);
    if (array[position] === value)) {
      return position;
    }
    if (array[position] < value) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return -1;
}
```

### 递归二分搜索法

```js
function binarySearchRecursive(array, value, low, high) {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];
    if (element < value) {
      return binarySearchRecursive(array, value, mid + 1, high);
    }
    if (element > value) {
      return binarySearchRecursive(array, value, low, mid - 1);
    }
    return mid;
  }
  return -1;
}
// 递归二分搜索法
function binarySearch(array, value) {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length - 1;
  return binarySearchRecursive(array, value, low, high);
}
```