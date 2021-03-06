# 只出现一次的数字II

[只出现一次的数字II-中等](https://leetcode-cn.com/problems/single-number-ii/)

```
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:
输入: [2,2,3,2]
输出: 3

示例 2:
输入: [0,1,0,1,0,1,99]
输出: 99
```

## 方法1: hashMap

```js
var singleNumber = function(nums) {
  var numObj = {}
  nums.forEach(item => {
    if (numObj[item]) {
      numObj[item]++
    } else {
      numObj[item] = 1
    }
  })
  let res
  Object.keys(numObj).some(key => {
    if (numObj[key] === 1) {
      res = key
      return true
    }
  })

  return res
}
```

## 方法2: 数学

```js
// 概念 3 * (a + b) - (a + a + a + b) = 2b
var singleNumber = function (nums) {
  // 会有溢出风险
  return (3 * sum([...new Set(nums)]) - sum(nums)) / 2
}
function sum (ary) {
  return ary.reduce((prev, next) => prev + next, 0)
}
```

## 方法3: 位操作

https://leetcode-cn.com/problems/single-number-ii/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--31/

```js
// 时间复杂度 O(n) 空间复杂度 O(1)
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Unsigned_right_shift
var singleNumber = function (nums) {
  let ans = 0
  //考虑每一位
  for (let i = 0; i < 32; i++) {
    let count = 0
    //考虑每一个数
    for (let j = 0; j < nums.length; j++) {
      //当前位是否是 1
      if ((nums[j] >>> i & 1) == 1) {
        count++
      }
    }
    //1 的个数是否是 3 的倍数
    if (count % 3 != 0) {
      ans = ans | 1 << i
    }
  }
  return ans
}
```

## 方法4: 通用方法

https://leetcode-cn.com/problems/single-number-ii/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--31/

```js
// 暂时放弃
```

## 方法5: 模拟三进制 暂时放弃

```js
// https://leetcode-cn.com/problems/single-number-ii/solution/zhi-chu-xian-yi-ci-de-shu-zi-ii-shu-zi-dian-lu-she/
var singleNumber = function (nums) {
  let one = 0, two = 0, temp = 0
  nums.forEach(num => {
    temp = (two & num) | (one & ~num)
    two = (~one & ~two & num) | (two & ~num)
    one = temp
  })
  return two
  // 这里return two的原因是第二个状态为 01，one 为 0，two 为 1
}


console.log(singleNumber([2, 2, 3, 2]))
console.log(singleNumber([0, 1, 0, 1, 0, 1, 99]))
```
