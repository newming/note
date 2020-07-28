# 搜索插入位置

[搜索插入位置-简单](https://leetcode-cn.com/problems/search-insert-position/)

```
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1:
输入: [1,3,5,6], 5
输出: 2

示例 2:
输入: [1,3,5,6], 2
输出: 1

示例 3:
输入: [1,3,5,6], 7
输出: 4

示例 4:
输入: [1,3,5,6], 0
输出: 0
```

## 方法一: 暴力循环

```js
var searchInsert = function(nums, target) {
  let len = nums.length
  if (!len) {
    return 0
  }
  let i = 0
  while (i < len) {
    if (target > nums[i]) {
      i++
      continue
    }
    if (target <= nums[i]) {
      break
    }
  }
  return i
}
```

## 方法二：二分法

https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/

```js
var searchInsert = function(nums, target) {
  let len = nums.length
  if (!len) {
    return 0
  }
  let left = 0
  let right = len - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2) // 防止数字溢出 (left + right) / 2
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  // 注意这里 返回left
  return left
}

console.log(searchInsert([1, 3, 5, 6], 5))
console.log(searchInsert([1, 3, 5, 6], 2))
console.log(searchInsert([1, 3, 5, 6], 7))
console.log(searchInsert([1, 3, 5, 6], 0))
```
