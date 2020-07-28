# 存在重复元素2

[存在重复元素2-简单](https://leetcode-cn.com/problems/contains-duplicate-ii/)

```
给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。

示例 1:
输入: nums = [1,2,3,1], k = 3
输出: true

示例 2:
输入: nums = [1,0,1,1], k = 1
输出: true

示例 3:
输入: nums = [1,2,3,1,2,3], k = 2
输出: false
```

## 方法一: 朴素线性查找

- [方法一: 朴素线性查找(for循环遍历查找)【超时】](https://leetcode-cn.com/problems/contains-duplicate-ii/solution/cun-zai-zhong-fu-yuan-su-ii-by-leetcode/)
- 时间复杂度 : O(n^2) 最坏的情况下，需要检查 n * (n - 1) / 2 对整数。因此，时间复杂度为 O(n^2)
- 空间复杂度 : O(1) 只使用了常数额外空间

```js
function containsDuplicate(nums, k) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = Math.max(i - k, 0); j < i; j++) {
      if (nums[j] === nums[i]) {
        return true
      }
    }
  }
  return false
}
```

## 方法二: 使用哈希表(对象)

```js
function containsDuplicate (nums, k) {
  let len = nums.length
  let obj = {}
  for (let i = 0; i < len; i++) {
    if (obj.hasOwnProperty(nums[i]) && i - obj[nums[i]] <= k) {
      // 注意这里 hasOwnProperty 的使用，不能直接 obj[nums[i]]，因为存的是索引，有可能是0，转为false
      return true
    }
    obj[nums[i]] = i
  }
  return false
}

console.log(containsDuplicate([1, 2, 3, 1], 3))
console.log(containsDuplicate([1, 0, 1, 1], 1))
console.log(containsDuplicate([1, 2, 3, 4, 5], 3))
```

## 方法3: 二叉搜索树

略过了暂时
