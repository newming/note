# 最长连续递增序列-简单

[最长连续递增序列-简单](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence)

```
给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

示例 1：
输入：nums = [1,3,5,4,7]
输出：3
解释：最长连续递增序列是 [1,3,5], 长度为3。
尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。

示例 2：
输入：nums = [2,2,2,2,2]
输出：1
解释：最长连续递增序列是 [2], 长度为1。

提示：
1 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
```

## 方法1: 贪心

复杂度分析

- 时间复杂度：O(n)，其中 n 是数组 nums 的长度。需要遍历数组一次。
- 空间复杂度：O(1)。额外使用的空间为常数。

```js
// https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/solution/zui-chang-lian-xu-di-zeng-xu-lie-by-leet-dmb8/
// 也有点类似与滑动窗口，动态规划
var findLengthOfLCIS = function(nums) {
  let ans = 0;
  const n = nums.length;
  let start = 0;
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] <= nums[i - 1]) {
      start = i;
    }
    ans = Math.max(ans, i - start + 1);
  }
  return ans;
};
```
