# 最长递增子序列-中等

[最长递增子序列-中等](https://leetcode-cn.com/problems/longest-increasing-subsequence)

```
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

示例 1：
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。

示例 2：
输入：nums = [0,1,0,3,2,3]
输出：4

示例 3：
输入：nums = [7,7,7,7,7,7,7]
输出：1

提示：
1 <= nums.length <= 2500
-104 <= nums[i] <= 104
```

## 方法1: 动态规划

复杂度分析

- 时间复杂度：O(n^2)，其中 n 为数组 nums 的长度。动态规划的状态数为 n，计算状态 dp[i] 时，需要 O(n) 的时间遍历 dp[0…i−1] 的所有状态，所以总时间复杂度为 O(n^2)。
- 空间复杂度：O(n)O(n)，需要额外使用长度为 nn 的 dpdp 数组。

```js
// https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/zui-chang-shang-sheng-zi-xu-lie-by-leetcode-soluti/
function lengthOfLIS(nums) {
  if(!nums || !nums.length) {
    return 0
  }

  let dp = new Array(nums.length)
  dp[0] = 1
  let maxans = 1

  for(let i = 1; i < nums.length; i++) {
    dp[i] = 1
    for(let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    maxans = Math.max(maxans, dp[i])
  }

  return maxans
}
```

## 方法2: 贪心+二分查找

复杂度分析

- 时间复杂度：O(nlogn)。数组 nums 的长度为 nn，我们依次用数组中的元素去更新 d 数组，而更新 d 数组时需要进行 O(logn) 的二分搜索，所以总时间复杂度为 O(nlogn)。
- 空间复杂度：O(n)，需要额外使用长度为 n 的 d 数组。

```js
// https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/zui-chang-shang-sheng-zi-xu-lie-by-leetcode-soluti/
function lengthOfLIS(nums) {
  let len = 1
  let n = nums.length

  if (n === 0) {
    return 0
  }

  let d = new Array(n + 1)
  d[len] = nums[0]

  for (let i = 1; i < n; i++) {
    if (nums[i] > d[len]) {
      d[++len] = nums[i]
    } else {
      let l = 1, r = len, pos = 0 // 如果找不到说明所有的数都比 nums[i] 大，此时要更新 d[1]，所以这里将 pos 设为 0
      while(l <= r) {
        let mid = Math.floor((l + r) / 2)
        if (d[mid] < nums[i]) {
          pos = mid
          l = mid + 1
        } else {
          r = mid - 1
        }
      }
      d[pos + 1] = nums[i]
    }
  }
  return len;
}
```

## 方法3: 另一种二分查找

```js
var lengthOfLIS = function(nums) {
  let len = nums.length
  if (!len) {
    return 0
  }
  let top = new Array(len)
  // 牌堆数初始化为 0
  let piles = 0
  for (let i = 0; i < len; i++) {
    let poker = nums[i]
    // 搜索左侧边界的二分查找
    let left = 0
    let right = piles
    while (left < right) {
      let mid = Math.floor((left + right) / 2)
      if (top[mid] > poker) {
        right = mid
      } else if (top[mid] < poker) {
        left = mid + 1
      } else {
        right = mid
      }
    }

    if (left === piles) {
      // 没有找到合适的牌堆，新建一个堆
      // 这里注意 left 是从 0 开始，而堆其实是类似 length，即从1开始，所以当 left 加一 === piles，说明一直往右边找没找到合适的位置，需要新增堆
      piles++
    }
    top[left] = poker // 只需要记录每一堆牌最后一张就行
  }

  return piles
};
```
