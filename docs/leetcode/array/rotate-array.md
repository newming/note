# 旋转数组

[旋转数组-简单](https://leetcode-cn.com/problems/rotate-array/)

```
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1:
输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]

示例 2:
输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释:
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]

说明:
尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
要求使用空间复杂度为 O(1) 的 原地 算法。
```

## 方法一: 暴力法

https://leetcode-cn.com/problems/rotate-array/solution/xuan-zhuan-shu-zu-by-leetcode/

```js
// 时间复杂度：O(n*k)。每个元素都被移动 1 步（O(n)） k次（O(k)）
// 空间复杂度：O(1) 。没有额外空间被使用。
function rotate (nums, k) {
  let temp
  let previous
  let len = nums.length
  for (let i = 0; i < k; i++) {
    previous = nums[len - 1]
    for (let j = 0; j < len; j++) {
      temp = nums[j]
      nums[j] = previous
      previous = temp
    }
  }
  return nums
}
```

## 方法二: 使用额外的数组

```js
// 时间复杂度： O(n)。将数字放到新的数组中需要一遍遍历，另一边来把新数组的元素拷贝回原数组
// 空间复杂度： O(n)。另一个数组需要原数组长度的空间
function rotate (nums, k) {
  let len = nums.length
  let a = new Array(len)
  for (let i = 0; i < len; i++) {
    a[(i + k) % len] = nums[i]
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = a[i]
  }
  return nums
}
```

## 方法三: 使用环状替换 屌的很

```js
// 时间复杂度：O(n)。只遍历了每个元素一次
// 空间复杂度：O(1)。使用了常数个额外空间
function rotate (nums, k) {
  let len = nums.length
  k = k % len
  let count = 0
  for (let start = 0; count < len; start++) {
    let current = start
    let prev = nums[start]
    do {
      let next = (current + k) % len
      let temp = nums[next]
      nums[next] = prev
      prev = temp
      current = next
      count++
    } while (start !== current) // 当 start !== current 时候继续执行 do，当相等时，回到了出发时的数字，绕了一圈，搞定了一部分数字了，count就是记录搞定了多少数字的
  }
  return nums
}
```

## 方法四: 使用反转 反转三次

```js
// 时间复杂度：O(n)。n个元素被反转了总共 3 次
// 空间复杂度：O(1)。没有使用额外的空间
// 原始数组                  : 1 2 3 4 5 6 7
// 反转所有数字后             : 7 6 5 4 3 2 1
// 反转前 k 个数字后          : 5 6 7 4 3 2 1
// 反转后 n-k 个数字后        : 5 6 7 1 2 3 4 --> 结果

function rotate (nums, k) {
  k = k % nums.length
  reverse(nums, 0, nums.length - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, nums.length - 1)
  return nums
}
function reverse (nums, start, end) {
  while (start < end) {
    let temp = nums[start]
    nums[start] = nums[end]
    nums[end] = temp
    start++;
    end--;
  }
}

console.log(rotate([-1, -100, 3, 99], 2))
```
