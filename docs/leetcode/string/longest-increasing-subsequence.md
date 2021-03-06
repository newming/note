# 最长上升子序列

[最长上升子序列-中等](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

```
给定一个无序的整数数组，找到其中最长上升子序列的长度。

示例:
输入: [10,9,2,5,3,7,101,18]
输出: 4
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
说明:
可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
你算法的时间复杂度应该为 O(n2) 。

进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
```

- [参考文章1](https://www.itcodemonkey.com/article/15644.html)
- [参考文章2](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/zui-chang-shang-sheng-zi-xu-lie-by-leetcode/)


## 方法1: 暴力法 递归

leetcode上数据较大时超出时间限制

```js
// 时间复杂度：O(2^n) 递归树的大小将为 2^n
// 空间复杂度：O(n^2)，使用大小为 n*n 的 memomemo 数组
function lengthOfLIS(nums, prev = Number.MIN_SAFE_INTEGER, curpos = 0) {
  if (curpos === nums.length) {
    return 0
  }
  let taken = 0
  if (nums[curpos] > prev) {
    taken = 1 + lengthOfLIS(nums, nums[curpos], curpos + 1)
  }
  let nottaken = lengthOfLIS(nums, prev, curpos + 1)
  return Math.max(taken, nottaken)
}
```

## 方法2: 暴力法 带记忆的递归

返回已有记忆部分有问题没解决掉

```js
// 时间复杂度：O(n^2)。递归树的大小可以达到 n^2
// 空间复杂度：O(n^2)，使用 n*n 的 memomemo 数组。
function lengthOfLIS1 (nums) {
  // 生成一个二维数组 [[-1], [-1]]
  let memo = new Array(nums.length + 1).fill(new Array(nums.length).fill(-1))
  return lengthofLIS(nums, -1, 0, memo)

  function lengthofLIS(nums, previndex, curpos, memo) {
    if (curpos === nums.length) {
      return 0
    }
    // 有问题啊。。。没整明白啊
    // if (memo[previndex + 1][curpos] > 0) {
    //   return memo[previndex + 1][curpos]
    // }
    let taken = 0
    if (previndex < 0 || nums[curpos] > nums[previndex]) {
      taken = 1 + lengthofLIS(nums, curpos, curpos + 1, memo)
    }

    let nottaken = lengthofLIS(nums, previndex, curpos + 1, memo)
    memo[previndex + 1][curpos] = Math.max(taken, nottaken)
    return memo[previndex + 1][curpos]
  }
}
```

## 方法3: 动态规划dp(dynamic programming)


```js
// https://www.itcodemonkey.com/article/15644.html
function lengthOfLIS2 (nums) {
  let len = nums.length
  if (!len) {
    return 0
  }
  let dp = new Array(len).fill(1) // 每一位至少有一个长度

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  let res = Math.max.apply(null, dp) || 0
  return res
}
```

## 方法4: 二分查找法

```js
function lengthOfLIS3 (nums) {
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
}

// console.log(lengthOfLIS([1, 4, 3]))
// console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))

// console.log(lengthOfLIS1([1, 4]))
// console.log(lengthOfLIS1([10, 9, 2, 5, 3, 7, 101, 18]))

// console.log(lengthOfLIS2([1, 4, 3]))
// console.log(lengthOfLIS2([10, 9, 2, 5, 3, 7, 101, 18]))

console.log(lengthOfLIS3([1, 4, 3]))
console.log(lengthOfLIS3([10, 9, 2, 5, 3, 7, 101, 18]))
```
