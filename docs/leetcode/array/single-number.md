# 只出现一次的数字

[只出现一次的数字-简单](https://leetcode-cn.com/problems/single-number/)

```
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：
你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:
输入: [2,2,1]
输出: 1

示例 2:
输入: [4,1,2,1,2]
输出: 4
```

## 方法一: hashMap

```js
var singleNumber = function(nums) {
  var numsObj = {}
  var res = null
  nums.forEach(item => {
    numsObj[item] = numsObj[item] ? numsObj[item] + 1 : 1
  })
  Object.keys(numsObj).some(key => {
    if (numsObj[key] === 1) {
      res = key
      return true
    }
    return false
  })
  return res
}
```

## 方法二: hashMap优化

```js
var singleNumber = function (nums) {
  var numsObj = {}
  nums.forEach(item => {
    if (numsObj[item]) {
      delete numsObj[item]
    } else {
      numsObj[item] = 1
    }
  })
  return Object.keys(numsObj)[0]
}
```

## 方法三: 列表

https://leetcode-cn.com/problems/single-number/solution/zhi-chu-xian-yi-ci-de-shu-zi-by-leetcode/

```js
var singleNumber = function (nums) {
  let noDuplicateList = []
  nums.forEach(item => {
    let index = noDuplicateList.indexOf(item)
    if (index <= -1) {
      noDuplicateList.push(item)
    } else {
      noDuplicateList.splice(index, 1)
    }
  })
  return noDuplicateList.pop()
}
```

## 方法四: 数学

https://leetcode-cn.com/problems/single-number/solution/zhi-chu-xian-yi-ci-de-shu-zi-by-leetcode/

```js
    // 概念 2 * (a + b + c) - (a + a + b + b + c) = c
    var singleNumber = function (nums) {
      // 会有溢出风险
      return 2 * sum([...new Set(nums)]) - sum(nums)
    }
    function sum (ary) {
      return ary.reduce((prev, next) => prev + next, 0)
    }
```

## 方法五: 按位异或

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators

```js
// 概念(XOR=异或)
// 如果我们对 0 和二进制位做 异或 运算，得到的仍然是这个二进制位
// a ^ 0 = a
// 如果我们对相同的二进制位做 异或 运算，返回的结果是 0
// a ^ a = 0
// 异或运算 满足交换律和结合律
// a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b
// 所以我们只需要将所有的数进行 异或 操作，得到那个唯一的数字
var singleNumber = function (nums) {
  let a = 0
  nums.forEach(item => a = a ^ item)
  return a
}


console.log(singleNumber([2,2,1]))
console.log(singleNumber([4,1,2,1,2]))
```
