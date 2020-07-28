# 两个数组的交集

[两个数组的交集-简单](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

```
给定两个数组，编写一个函数来计算它们的交集。

示例 1:
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2]

示例 2:
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [9,4]

说明:
输出结果中的每个元素一定是唯一的。
我们可以不考虑输出结果的顺序。
```

## 方法1: 去重暴力匹配法

```js
var intersection = function(nums1, nums2) {
  let tempAry
  let targetAry
  if (nums1.length > nums2.length) {
    tempAry = nums2
    targetAry = nums1
  } else {
    tempAry = nums1
    targetAry = nums2
  }
  tempAry = [...new Set(tempAry)]
  let res = []
  tempAry.forEach(num => {
    if (targetAry.indexOf(num) > -1) {
      res.push(num)
    }
  })
  return res
}
```

## 方法2: 优化方法1

```js
var intersection = function (nums1, nums2) {
  nums1 = [...new Set(nums1)]
  nums2 = [...new Set(nums2)]
  if (nums1.length < nums2.length) {
    return nums1.filter(num => nums2.includes(num))
  }
  return nums2.filter(num => nums1.includes(num))
}

console.log(intersection([1,2,2,1], [2,2]))
console.log(intersection([4,9,5], [9,4,9,8,4]))
```
