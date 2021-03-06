# 两个数组的交集II

[两个数组的交集II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)

```
给定两个数组，编写一个函数来计算它们的交集。

示例 1:
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]

示例 2:
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [4,9]

说明：
输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
我们可以不考虑输出结果的顺序。

进阶:
如果给定的数组已经排好序呢？你将如何优化你的算法？
如果 nums1 的大小比 nums2 小很多，哪种方法更优？
如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
```

## 方法1: 暴力循环法

```js
var intersect = function(nums1, nums2) {
  let res = []
  let minLen
  let maxLen
  if (nums1.length > nums2.length) {
    minLen = nums2
    maxLen = nums1
  } else {
    minLen = nums1
    maxLen = nums2
  }

  for (let i = 0; i < minLen.length; i++) {
    const element = minLen[i]
    for (let j = 0; j < maxLen.length; j++) {
      if (maxLen[j] === element) {
        res.push(element)
        maxLen.splice(j, 1)
        j--
        break
      }
    }
  }
  return res
}
```

## 方法2: hashMap 遍历法

```js
var intersect = function(nums1, nums2) {
  var dic = {};
  nums1.forEach(x => dic[x] = dic[x] ? dic[x] + 1 : 1)
  return nums2.filter(x => dic[x] ? dic[x]-- : 0)
}
```

## 方法3: 排序后双指针寻找

```js
// https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/solution/liang-ge-shu-zu-de-jiao-ji-ii-by-leetcode/
var intersect = function (nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  let res = []
  let i = 0
  let j = 0
  while(i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      res.push(nums1[i])
      i++
      j++
    } else if (nums1[i] < nums2[j]) {
      i++
    } else {
      j++
    }
  }
  return res
}

// console.log(intersect([1,2,2,1], [2,2]))
// console.log(intersect([4,9,5], [9,4,9,8,4]))
console.log(intersect(
  [61,24,20,58,95,53,17,32,45,85,70,20,83,62,35,89,5,95,12,86,58,77,30,64,46,13,5,92,67,40,20,38,31,18,89,85,7,30,67,34,62,35,47,98,3,41,53,26,66,40,54,44,57,46,70,60,4,63,82,42,65,59,17,98,29,72,1,96,82,66,98,6,92,31,43,81,88,60,10,55,66,82,0,79,11,81],
  [5,25,4,39,57,49,93,79,7,8,49,89,2,7,73,88,45,15,34,92,84,38,85,34,16,6,99,0,2,36,68,52,73,50,77,44,61,48]
))
```
