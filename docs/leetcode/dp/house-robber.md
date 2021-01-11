# 打家劫舍

[打家劫舍-简单](https://leetcode-cn.com/problems/house-robber/)

```
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

示例 1：
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

示例 2：
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。

提示：

0 <= nums.length <= 100
0 <= nums[i] <= 400
```

## 解法1: 动态规划

[题解](https://leetcode-cn.com/problems/house-robber/solution/da-jia-jie-she-by-leetcode-solution/)

复杂度分析

- 时间复杂度： O(n)，其中 n 是数组长度。只需要对数组遍历一次。
- 空间复杂度： O(n)。其中 n 为数组长度，存储每天的最大金额

```js
// 转移方程
// dp[i]=max(dp[i−2]+nums[i],dp[i−1])
function rob (nums) {
  if (!nums || nums.length === 0) {
    return 0
  }
  const length = nums.length
  if (length === 1) {
    return nums[0]
  }
  let dp = new Array(length)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }
  return dp[length - 1]
}
```

## 解法2: 动态规划+滚动数组

复杂度分析

- 时间复杂度： O(n)，其中 n 是数组长度。只需要对数组遍历一次。
- 空间复杂度： O(1)。使用滚动数组，可以只存储前两间房屋的最高总金额，而不需要存储整个数组的结果，因此空间复杂度是 O(1)。

```js
// 方案1优化，只存储前两间房屋的最高总金额
function rob (nums) {
  if (!nums || nums.length === 0) {
    return 0
  }
  const length = nums.length
  if (length === 1) {
    return nums[0]
  }
  let first = nums[0]
  let second = Math.max(nums[0], nums[1])

  for (let i = 2; i < length; i++) {
    let temp = second
    second = Math.max(first + nums[i], second)
    first = temp
  }
  return second
}
```