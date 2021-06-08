# 最小K个数-中等

[最小K个数-中等](https://leetcode-cn.com/problems/smallest-k-lcci)

```
设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

示例：
输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]
提示：

0 <= len(arr) <= 100000
0 <= k <= min(100000, len(arr))
```

## 方法1: 暴力法

复杂度分析

- 时间复杂度：O(nlogn)，其中 n 是数组 arr 的长度。算法的时间复杂度即排序的时间复杂度。
- 空间复杂度：O(logn)，排序所需额外的空间复杂度为 O(logn)。

```js
// 排序后取前k个
var smallestK = function(arr, k) {
  return arr.sort((a, b) => a - b).slice(0, k)
};
```

## 方法2: 快排思想

```js
// https://leetcode-cn.com/problems/smallest-k-lcci/solution/zui-xiao-kge-shu-by-leetcode-solution-o5eg/
function smallestK(arr, k) {
  randomizedSelected(arr, 0, arr.length - 1, k);
  var vec = new Array(k);
  for (let i = 0; i < k; ++i) {
    vec[i] = arr[i];
  }
  return vec;
}

function randomizedSelected(arr, l, r, k) {
  if (l >= r) {
    return;
  }
  let pos = randomizedPartition(arr, l, r);
  let num = pos - l + 1;
  if (k === num) {
    return;
  } else if (k < num) {
    randomizedSelected(arr, l, pos - 1, k);
  } else {
    randomizedSelected(arr, pos + 1, r, k - num);
  }
}

// 基于随机的划分
function randomizedPartition(nums, l, r) {
  let i = l + Math.floor(Math.random() * (r - l));
  swap(nums, r, i);
  return partition(nums, l, r);
}

function partition(nums, l, r) {
  let pivot = nums[r];
  let i = l - 1;
  for (let j = l; j <= r - 1; ++j) {
    if (nums[j] <= pivot) {
      i = i + 1;
      swap(nums, i, j);
    }
  }
  swap(nums, i + 1, r);
  return i + 1;
}

function swap(nums, i, j) {
  let temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}
```