# 两个排序数组的中位数

[寻找两个排序数组的中位数-Array-困难](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

```
给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

示例 1:

nums1 = [1, 3]
nums2 = [2]
则中位数是 2.0

示例 2:

nums1 = [1, 2]
nums2 = [3, 4]
则中位数是 (2 + 3)/2 = 2.5
```

## 方法1: 排序后寻找

```js
// 1. 我的垃圾答案，如果排序选的是 快速排序的话 O(nlog(n))
var findMedianSortedArrays = function (nums1, nums2) {
  var arr = [...nums1, ...nums2]
  arr = arr.sort(function (a, b) {
    return a - b
  })
  var len = arr.length
  if (len === 0) {
    return
  }
  if (len % 2 === 0) {
    return (arr[len / 2 - 1] + arr[len / 2]) / 2
  } else {
    return arr[(len - 1) / 2]
  }
}
```

## 方法2: 官方答案

```js
/**
  2. 官方答案：
  两个数组A, B长度分别为 m, n，分别从 i, j 的位置切
    将两个数组按左右划分开，左、右组合起来，符合下两个条件即可
        1. len(left_part)=len(right_part)
        2. max(left_part)≤min(right_part)
    中位数 median = (max(left_part) + min(right_part)) / 2
    要实现上边两个条件，需要保证两个条件：
        1. i+j=m−i+n−j（或：m - i + n - j + 1 这里表示当两个数组的长度和为奇数的时候，右边切出来少 1） 如果 n ≥ m，只需要使 i = 0~m, j = (m + n + 1)/2 - i
        2. B[j−1]≤A[i] 以及 A[i-1]≤B[j] 因为 A, B 都是有序的，所以切开后，得保证 A 左边最后一个数，小于 B 右边第一个数，同理 B 左边最后一个数小于 A 右边第一个数
    接下来寻找目标 i(二分查找)，如果找到 i(这里假设了 n ≥ m，否则则找 j)，中位数为：
        1. max(A[i-1], B[j-1]) 当 m + n 为奇数时，左边部分多一个，所以中位数直接为左边最大的
        2. (max(A[i-1], B[j-1]) + min(A[i] , B[j])) / 2 当 m + n 为偶数时，中位数为左边最大加右边最小的和在除以2
    在循环搜索中，我们只会遇到三种情况(时刻牢记 n ≥ m)：
        1. (j = 0 or i = m and A[i-1] ≤ B[j]) 或是 (i = 0 or j = n and B[j−1] ≤ A[i]) 这意味着 i 是完美的，我们可以停止搜索
        2. j>0 and i < m and B[j−1] > A[i] 这意味着 i 太小，我们必须增大它
        3. i>0 and j < n and A[i−1] > B[j] 这意味着 i 太大，我们必须减小它
        这里我理解 2, 3 为什么只做一个判断，正常需要判断 B[j−1]≤A[i] 以及 A[i-1]≤B[j] 两个条件，是因为 比如 i < m, j > 0 的时候，i 有可能为 0，这样 i - 1 是不存在的
    另外 i < m 的时候 j > 0 以及 i > 0 的时候 j < n 始终成立
        m ≤ n,i < m ⟹ j = (m+n+1) / 2 ​− i > (m+n+1) / 2 ​− m ≥ (2m+1) / 2 − m ≥ 0
        m ≤ n,i > 0 ⟹ j = (m+n+1) / 2 ​− i < (m+n+1) / 2 ​≤ (2n+1) / 2 ​≤ n
  */

/**
    复杂度分析
    时间复杂度：O(log(min(m,n)))，首先，查找的区间是 [0, m]。 而该区间的长度在每次循环之后都会减少为原来的一半。 所以，我们只需要执行 log(m) 次循环。由于我们在每次循环中进行常量次数的操作，所以时间复杂度为 O(log(m))。 由于 m ≤ n，所以时间复杂度是 O(log(min(m,n)))。
    空间复杂度：O(1)， 我们只需要恒定的内存来存储 9 个局部变量， 所以空间复杂度为 O(1)。
  */
var findMedianSortedArrays = function (A, B) {
  const [m, n] = [A.length, B.length]
  if (m > n) {
    // 始终假设 n ≥ m，不符合的话就交换一下
    [A, B, m, n] = [B, A, n, m]
  }
  if (n === 0) {
    return new Error('请传入数据')
  }

  let [imin, imax, half_len] = [0, m, Math.floor((m + n + 1) / 2)] // imin, imax 是 i 的查找范围，这里的 half_len 就是 j = (m + n + 1)/2 - i 中的部分
  while (imin <= imax) {
    i = Math.floor((imin + imax) / 2)
    j = half_len - i
    if (i < m && B[j - 1] > A[i]) {
      // i 太小，需要右移 i 左移 j。这里 i < m 可能为0，而 j > 0，所以只判断一个条件 B[j - 1] > A[i]，而 A[i-1]≤B[j] 可能有误
      imin = i + 1
    } else if (i > 0 && A[i - 1] > B[j]) {
      // i 太大，不要左移 i 右移动 j。这里 i > 0, j < n，可能 i = m，这时候 j 有可能等于 0，所以只判断 A[i - 1] > B[j]
      imax = i - 1
    } else {
      var max_of_left
      var min_of_right
      // i is perfect
      if (i === 0) {
        max_of_left = B[j - 1]
      } else if (j === 0) {
        max_of_left = A[i - 1]
      } else {
        max_of_left = Math.max(A[i - 1], B[j - 1])
      }
      if ((m + n) % 2 === 1) {
        return max_of_left
      }

      if (i === m) {
        min_of_right = B[j]
      } else if (j === n) {
        min_of_right = A[i]
      } else {
        min_of_right = Math.min(A[i], B[j])
      }
      return (max_of_left + min_of_right) / 2
    }
  }
};

console.log(findMedianSortedArrays([-5, 2, 4, 7], [1, 3, 8, 15, 36]))
console.log(findMedianSortedArrays([5, 6], [1, 2, 3]))
```
