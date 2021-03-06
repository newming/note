# 存在重复元素

[存在重复元素-简单](https://leetcode-cn.com/problems/contains-duplicate/)

```
给定一个整数数组，判断是否存在重复元素。

如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。

示例 1:
输入: [1,2,3,1]
输出: true

示例 2:
输入: [1,2,3,4]
输出: false

示例 3:
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
```

## 方法1: 使用set去重判断长度

```js
function containsDuplicate (nums) {
  return [...new Set(nums)].length !== nums.length
}
```

## 方法2: 排序后进行遍历

```js
function containsDuplicate (nums) {
  nums.sort((a, b) => a - b) // 原数组被修改
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      return true
    }
  }
  return false
}
```

## 方法三: 朴素线性查找

- [朴素线性查找(for循环遍历查找)【超时】](https://leetcode-cn.com/problems/contains-duplicate/solution/cun-zai-zhong-fu-yuan-su-by-leetcode/)
- 时间复杂度: O(n^2)最坏的情况下，需要检查 n * (n - 1) / 2 对整数。因此，时间复杂度为 O(n^2)
- 空间复杂度: O(1) 只使用了常数额外空间

```js
function containsDuplicate(nums) {
  for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[j] === nums[i]) {
          return true
        }
      }
  }
  return false
}
```

## 方法四: 使用哈希表(对象)

```js
function containsDuplicate (nums) {
  let len = nums.length
  let obj = {}
  for (let i = 0; i < len; i++) {
    if (obj[nums[i]]) {
      return true
    }
    obj[nums[i]] = 1
  }
  return false
}

console.log(containsDuplicate([1, 2, 3, 1]))
console.log(containsDuplicate([1, 2, 3, 4, 5]))
```
