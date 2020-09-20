# 合并两个有序数组

[合并两个有序数组-简单](https://leetcode-cn.com/problems/merge-sorted-array/)

```
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

示例:

输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3

输出: [1,2,2,3,5,6]
```

## 方法1: 合并后排序

复杂度分析

时间复杂度 : O((n+m)log(n+m))。
空间复杂度 : O(1)。

```js
// 注意必须是修改原始数组，所以不要使用 concat 等不修改原始数据的操作
var merge = function(nums1, m, nums2, n) {
  nums1.length = m
  nums2.length = n
  nums1.push(...nums2)
  nums1.sort((a, b) => a - b)
};
```

## 方法2: 双指针/从前往后

复杂度分析

- 时间复杂度 : O(n+m)。
- 空间复杂度 : O(m)。

```js
var merge = function (nums1, m, nums2, n) {
  var nums1Copy = nums1.slice(0, m)

  let p1 = 0
  let p2 = 0

  // set pointer for nums1
  let p = 0

  while ((p1 < m) && (p2 < n)) {
    nums1[p++] = (nums1Copy[p1] < nums2[p2]) ? nums1Copy[p1++] : nums2[p2++]
  }

  if (p1 < m) {
    nums1.splice(p1 + p2, m + n - p1 - p2, ...nums1Copy.slice(p1))
  }
  if (p2 < n) {
    nums1.splice(p1 + p2, m + n - p1 - p2, ...nums2.slice(p2))
  }
}
```

## 方法3: 双指针/从后往前

复杂度分析

- 时间复杂度 : O(n+m)。
- 空间复杂度 : O(1)。

```js
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1
  let p2 = n - 1
  let p = m + n - 1

  while ((p1 >= 0) && (p2 >= 0)) {
    nums1[p--] = (nums1[p1] < nums2[p2]) ? nums2[p2--] : nums1[p1--]
  }

  nums1.splice(0, p2 + 1, ...nums2(0, p2))
}
```