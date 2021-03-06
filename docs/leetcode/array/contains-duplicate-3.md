# 存在重复元素3

[存在重复元素3](https://leetcode-cn.com/problems/contains-duplicate-iii/)

```
给定一个整数数组，判断数组中是否有两个不同的索引 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值最大为 t，并且 i 和 j 之间的差的绝对值最大为 ķ。

示例 1:
输入: nums = [1,2,3,1], k = 3, t = 0
输出: true

示例 2:
输入: nums = [1,0,1,1], k = 1, t = 2
输出: true

示例 3:
输入: nums = [1,5,9,1,5,9], k = 2, t = 3
输出: false
```


## 方法一: 朴素线性查找

- [朴素线性查找(for循环遍历查找)【超时】](https://leetcode-cn.com/problems/contains-duplicate-iii/solution/cun-zai-zhong-fu-yuan-su-iii-by-leetcode/)
- 时间复杂度 : O(n^2) 最坏的情况下，需要检查 n * (n - 1) / 2 对整数。因此，时间复杂度为 O(n^2)
- 空间复杂度 : O(1) 只使用了常数额外空间

```js
function containsDuplicate(nums, k, t = 0) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = Math.max(i - k, 0); j < i; j++) {
      if (Math.abs(nums[j] - nums[i]) <= t) {
        return true
      }
    }
  }
  return false
}
```

## 方法二: 桶

[桶](https://leetcode-cn.com/problems/contains-duplicate-iii/solution/li-yong-tong-de-yuan-li-onpython3-by-zhou-pen-chen/)

```js
// 非常棒
function containsNearbyAlmostDuplicate(nums, k, t) {
  if (t < 0 || k < 0) {
    return false
  }
  let allBuckets = {}
  let bucketSize = t + 1
  let len = nums.length
  for (let i = 0; i < len; i++) {
    // m is bucket Index for nums[i]
    let m = Math.floor(nums[i] / bucketSize)
    // if there is a bucket already present corresponding to current number
    if (allBuckets[m] !== undefined) {
      return true
    }
    // checking two adjacent buckets  m, m-1
    if (allBuckets[m - 1] !== undefined && Math.abs(nums[i] - allBuckets[m - 1]) < bucketSize) {
      return true
    }
    // checking two adjacent buckets m, m+1
    if (allBuckets[m + 1] !== undefined && Math.abs(nums[i] - allBuckets[m + 1]) < bucketSize) {
      return true
    }
    allBuckets[m] = nums[i]
    // console.log(JSON.stringify(allBuckets), i)
    // removing the bucket corresponding to number out of our k sized window
    if (i >= k) {
      // console.log(Math.floor(nums[i - k] / bucketSize));
      delete allBuckets[Math.floor(nums[i - k] / bucketSize)]
      // console.log(JSON.stringify(allBuckets), i)
    }
  }
  return false
}

console.log(containsDuplicate([1, 2, 3, 1], 3, 0))
console.log(containsDuplicate([-3, 0, 6, 12], 1, 2))
console.log(containsDuplicate([1, 2, 3, 4, 5], 3, 2))
console.log(containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3))
console.log(containsNearbyAlmostDuplicate([2, 0, -2, 2], 2, 1))
console.log(containsNearbyAlmostDuplicate([3, 6, 0, 2], 2, 2))
```

## 方法三: 二叉搜索树

暂未实现
