# 只出现一次的数字III

[只出现一次的数字III-中等](https://leetcode-cn.com/problems/single-number-iii/)

```
给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。

示例 :
输入: [1,2,1,3,2,5]
输出: [3,5]

注意：
结果输出的顺序并不重要，对于上面的例子， [5, 3] 也是正确答案。
你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？
```

## 方法1: hashMap

```js
var singleNumber = function(nums) {
  var numObj = {}
  nums.forEach(item => {
    if (numObj[item]) {
      delete numObj[item]
    } else {
      numObj[item] = 1
    }
  })

  return Object.keys(numObj)
}
```

## 方法2: 列表

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
  return noDuplicateList
}
```

## 方法3: 排序

```js
var singleNumber = function (nums) {
  nums.sort((a, b) => a - b)
  let noDuplicateList = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i + 1] !== undefined && nums[i] === nums[i + 1]) {
      i++
      continue
    }
    noDuplicateList.push(nums[i])
  }
  return noDuplicateList
}
```

## 方法4: 分组异或 不是很懂啊

```js
// https://leetcode-cn.com/problems/single-number-iii/solution/cai-yong-fen-zhi-de-si-xiang-jiang-wen-ti-jiang-we/
var singleNumber = function (nums) {
  let a = 0
  nums.forEach(num => {
    a = a ^ num
  })
  let mask = a & (-a)
  let ans = []
  nums.forEach(num => {
    if ((num & mask) === 0) {
      ans[0] ^= num
    } else {
      ans[1] ^= num;
    }
  })
  return ans
}

console.log(singleNumber([1,2,1,3,2,5]))
    console.log(singleNumber([0,0,1,2]))
```
