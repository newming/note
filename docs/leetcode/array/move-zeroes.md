# 移动零

[移动零-简单](https://leetcode-cn.com/problems/move-zeroes/)

```
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

说明:
必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。
```

## 方法1: 双指针 记录最左边的0的位置

```js
var moveZeroes = function(nums) {
  let zeroPos
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (zeroPos !== undefined) {
        nums[zeroPos] = nums[i]
        nums[i] = 0
        zeroPos = zeroPos + 1
      }
      continue
    }
    if (zeroPos === undefined) {
      zeroPos = i
    } else {
      zeroPos = Math.min(i, zeroPos)
    }
  }
  return nums
}
```

## 方法2 双指针 优化方法1

https://leetcode-cn.com/problems/move-zeroes/solution/zui-you-by-dxw-2/

```js
var moveZeroes = function (nums) {
  let length = nums.length
  let currentIndex = 0
  for (let i=0; i < length; i++) {
    if (nums[i] !== 0) {
      nums[currentIndex] = nums[i]
      if (currentIndex !== i) {
        nums[i] = 0
      }
      currentIndex++
    }
  }
}
```

## 方法3: 空间局部优化

https://leetcode-cn.com/problems/move-zeroes/solution/yi-dong-ling-by-leetcode/

```js
// 使用了额外的数组
var moveZeroes = function (nums) {
  let n = nums.length

  // Count the zeroes
  let numZeroes = 0
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      numZeroes++
    }
  }

  // Make all the non-zero elements retain their original order.
  let ans = []
  for (let i = 0; i < n; i++) {
    if (nums[i] !== 0) {
      ans.push(nums[i])
    }
  }

  // Move all zeroes to the end
  while (numZeroes--) {
    ans.push(0)
  }

  // Combine the result
  for (let i = 0; i < n; i++) {
    nums[i] = ans[i]
  }
  return nums
}
```

## 方法4: 双指针，几乎同方法2

```js
var moveZeroes = function (nums) {
  let lastNonZeroFoundAt = 0;
  // If the current element is not 0, then we need to
  // append it just in front of last non 0 element we found.
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastNonZeroFoundAt++] = nums[i]
    }
  }
  // After we have finished processing new elements,
  // all the non-zero elements are already at beginning of array.
  // We just need to fill remaining array with 0's.
  for (let i = lastNonZeroFoundAt; i < nums.length; i++) {
    nums[i] = 0
  }
  return nums
}
```

## 方法5: 倒序遍历

```js
var moveZeroes = function(nums) {
  let len = nums.length
  for(let i = 0; len >= 0; i++){
    len--;
    if(nums[i] === 0){
      nums.splice(i, 1);
      nums.push(0)
      i--;
    }
  }
  return nums
}

console.log(moveZeroes([0,1,0,3,12]))
console.log(moveZeroes([0,0,1]))
```
