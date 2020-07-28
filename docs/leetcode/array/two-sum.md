# 两数之和

[两数之和-Array-简单](https://leetcode-cn.com/problems/two-sum/)

```
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
示例:
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9

所以返回 [0, 1]
```


## 方法1: 我写的最垃圾的写法，时间复杂度 O(n^2) 空间复杂度 O(1)

```js
var twoSum = function (nums, target) {
  let len = nums.length
  for (let i = 0; i < len - 1; i++) {
    const x = nums[i];
    for (let j = i + 1; j < len; j++) {
      const y = nums[j];
      if (x + y === target) {
        return [i, j]
      }
    }
  }
  return null
};
```

## 方法2: 两遍哈希表

时间复杂度 O(n)但是遍历了两次，空间复杂度 O(n)

```js
    var twoSum1 = function (nums, target) {
      var hasMap = {}
      for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        hasMap[element] = i
      }
      for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        const complement = target - element
        if (hasMap[complement] !== undefined && hasMap[complement] !== i) {
          return [i, hasMap[complement]]
        }
      }
      return null
    }
```

## 方法3: 一遍哈希表

时间复杂度 O(n) 空间复杂度 O(n)

```js
var twoSum2 = function (nums, target) {
  var hasMap = {}
  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    const complement = target - element
    if (hasMap[complement] !== undefined) {
      return [hasMap[complement], i]
    }
    hasMap[element] = i
  }
  return null
}

var nums = [2, 7, 11, 8]
var target = 15
console.log(twoSum1(nums, target))
```
