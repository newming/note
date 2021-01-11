# 颜色分类

[颜色分类-中等](https://leetcode-cn.com/problems/sort-colors/)

```
给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

示例:
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]

进阶：
1. 一个直观的解决方案是使用计数排序的两趟扫描算法。
2. 首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
你能想出一个仅使用常数空间的一趟扫描算法吗？
```

## 方法一: 计数排序

```js
var sortColors = function(nums) {
  var counts = new Array(3).fill(0)
  nums.forEach(i => {
    counts[i]++
  })
  let sortedIndex = 0
  counts.forEach((element, i) => {
    while (element > 0) {
      nums[sortedIndex++] = i;
      element--;
    }
  });
  return nums;
};
```

## 方法二: 双指针

[官方题解](https://leetcode-cn.com/problems/sort-colors/solution/yan-se-fen-lei-by-leetcode-solution/)

- 时间复杂度: O(n)
- 空间复杂度: O(1)

```js
var sortColors = function(nums) {
  let len = nums.length
  if (len < 2) {
    return
  }

  const swap = (ary, i, j) => {
    let temp = ary[i]
    ary[i] = ary[j]
    ary[j] = temp
  }
  // 循环不变量定义
  // all in [0, p0) == 0
  // all in [p0, i) == 1
  // all in [i, p1) == 2
  let p0 = 0
  let i = 0
  let p1 = len - 1
  // 注意等于场景 [2, 0, 1]
  while (i <= p1) {
    if (nums[i] === 0) {
      swap(nums, i, p0)
      p0++;
      i++;
    } else if (nums[i] === 1) {
      i++;
    } else {
      // nums[i] === 2
      swap(nums, i, p1)
      p1--;
      // 这个时候 i 不需要 ++，因为不知道交换过来的 p1 是0还是1
    }
  }

  return nums
}

// 修改循环不变量定义(区间条件)
var sortColors = function(nums) {
  let len = nums.length
  if (len < 2) {
    return
  }

  const swap = (ary, i, j) => {
    let temp = ary[i]
    ary[i] = ary[j]
    ary[j] = temp
  }
  // all in [0, p0] == 0
  // all in (p0, i) == 1
  // all in [p2, len-1] == 2
  let p0 = -1
  let i = 0
  let p1 = len
  // 注意等于场景 [2, 0, 1]
  while (i < p1) {
    if (nums[i] === 0) {
      p0++;
      swap(nums, i, p0)
      i++;
    } else if (nums[i] === 1) {
      i++;
    } else {
      // nums[i] === 2
      p1--;
      swap(nums, i, p1)
      // 这个时候 i 不需要 ++，因为不知道交换过来的 p1 是0还是1
    }
  }

  return nums
}

```

## 方法三: 单指针

- 时间复杂度: O(n)
- 空间复杂度: O(1)

```js
// 对数组进行两次遍历。在第一次遍历中，将数组中所有的 0 交换到数组的头部。在第二次遍历中，将数组中所有的 1 交换到头部的 0 之后。此时，所有的 2 都出现在数组的尾部，这样就完成了排序。
var sortColors = function(nums) {
  let n = nums.length
  let ptr = 0

  const swap = (ary, i, j) => {
    let temp = ary[i]
    ary[i] = ary[j]
    ary[j] = temp
  }
  // 将所有的0放到头部
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      swap(nums, i, ptr)
      ptr++
    }
  }
  // 将所有的1放到0之后
  for (let i = ptr; i < n; i++) {
    if (nums[i] === 1) {
      swap(nums, i, ptr)
      ptr++
    }
  }
  return nums
}
```

## 方法四: 双指针

我们可以额外使用一个指针，即使用两个指针分别用来交换 0 和 1。

具体地，我们用指针 p0 来交换 0，p1 来交换 1，初始值都为 0。当我们从左向右遍历整个数组时：

- 如果找到了 1，那么将其与 nums[p1] 进行交换，并将 p1 向后移动一个位置，这与方法一是相同的；
- 如果找到了 0，那么将其与 nums[p0] 进行交换，并将 p0 ​向后移动一个位置。这样做是正确的吗？我们可以注意到，因为连续的 0 之后是连续的 1，因此如果我们将 0 与 nums[p0] 进行交换，那么我们可能会把一个 1 交换出去。当 p0 ​< p1 ​时，我们已经将一些 1 连续地放在头部，此时一定会把一个 1 交换出去，导致答案错误。因此，如果 p0 ​< p1​，那么我们需要再将 nums[i] 与 nums[p1] 进行交换，其中 i 是当前遍历到的位置，在进行了第一次交换后， nums[i] 的值为 1，我们需要将这个 1 放到「头部」的末端。在最后，无论是否有 p0 < p1 ​ ，我们需要将 p0​ 和 p1 均向后移动一个位置，而不是仅将 p0 向后移动一个位置。

- 时间复杂度: O(n)
- 空间复杂度: O(1)

```js
// [2，0，2，1，1，0]
var sortColors = function(nums) {
  let n = nums.length
  let p0 = 0
  let p1 = 0

  const swap = (ary, i, j) => {
    let temp = ary[i]
    ary[i] = ary[j]
    ary[j] = temp
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      swap(nums, i, p1)
      p1++
    } else if (nums[i] === 0) {
      swap(nums, i, p0)
      // 注意这里，平p1前边的不是0，就是1，但是p1具体指向的是1，还是2是不确定的，所以当 p0 和 i交换后，且 p0< p1，i 必然是1，但 p1 不确定，所以p1和i需要交换一下，然后p0, p1同时+1
      if (p0 < p1) {
        swap(nums, i, p1)
      }
      p0++;
      p1++;
    }
  }
}
```

## 方法五: 双指针

考虑使用指针 p0 来交换 0，p2 来交换 2。此时，p0 的初始值仍然为 0，而 p2 的初始值为 n−1。在遍历的过程中，我们需要找出所有的 0 交换至数组的头部，并且找出所有的 2 交换至数组的尾部。

由于此时其中一个指针 p2 是从右向左移动的，因此当我们在从左向右遍历整个数组时，如果遍历到的位置超过了 p2，那么就可以直接停止遍历了。

具体地，我们从左向右遍历整个数组，设当前遍历到的位置为 i，对应的元素为 nums[i]；

- 如果找到了 0，那么与前面两种方法类似，将其与 nums[p0] 进行交换，并将 p0 向后移动一个位置；
- 如果找到了 2，那么将其与 nums[p2] 进行交换，并将 p2 向前移动一个位置。

这样做是正确的吗？可以发现，对于第二种情况，当我们将 nums[i] 与 nums[p2] 进行交换之后，新的 nums[i] 可能仍然是 2，也可能是 0。然而此时我们已经结束了交换，开始遍历下一个元素 nums[i+1]，不会再考虑 nums[i] 了，这样我们就会得到错误的答案。

因此，当我们找到 2 时，我们需要不断地将其与 nums[p2] 进行交换，直到新的 nums[i] 不为 2。此时，如果 nums[i] 为 0，那么对应着第一种情况；如果 
nums[i] 为 1，那么就不需要进行任何后续的操作

- 时间复杂度: O(n)
- 空间复杂度: O(1)

```js
var sortColors = function(nums) {
  let n = nums.length
  let p0 = 0
  let p2 = n - 1

  const swap = (ary, i, j) => {
    let temp = ary[i]
    ary[i] = ary[j]
    ary[j] = temp
  }

  for (let i = 0; i <= p2; i++) {
    while (i <= p2 && nums[i] === 2) {
      swap(nums, i, p2)
      p2--
    }
    if (nums[i] === 0) {
      swap(nums, i, p0)
      p0++
    }
  }

  return nums
}
```
