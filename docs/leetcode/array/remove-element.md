# 移除元素

[移除元素-简单](https://leetcode-cn.com/problems/remove-element/)

```
给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

示例 1:
给定 nums = [3,2,2,3], val = 3,
函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
你不需要考虑数组中超出新长度后面的元素。

示例 2:
给定 nums = [0,1,2,2,3,0,4,2], val = 2,
函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
注意这五个元素可为任意顺序。
你不需要考虑数组中超出新长度后面的元素。

说明:
为什么返回数值是整数，但输出的答案是数组呢?
请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
你可以想象内部操作如下:

// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```


这个题和 https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/ 删除排序数组中的重复项 一样

## 方法一: for循环，删除元素，最终数组就是去除了val项的数组

```js
function removeElement (nums, val) {
  if (!nums || nums.length === 0) {
    return 0
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1)
      i--
    }
  }
  return nums.length
}
```

## 方法二: 双指针

```js
function removeElement1 (nums, val) {
  if (!nums || nums.length === 0) {
    return 0
  }
  let p = 0
  for (let q = 0; q < nums.length; q++) {
    if (nums[q] !== val) {
      nums[p] = nums[q]
      p++
    }
  }
  return p
}
```

## 方法三: 优化方法二

对于不需要拷贝的位置就不动了 例如输入 ([2, 2, 2, 2], 3)

```js
function removeElement2 (nums, val) {
  if (!nums || nums.length === 0) {
    return 0
  }
  let p = 0
  for (let q = 0; q < nums.length; q++) {
    if (nums[q] !== val) {
      if (p !== q) {
        nums[p] = nums[q]
      }
      p++
    }
  }
  return p
}
```

## 方法四: 官方 双指针 当要删除的元素很少时效果较好

```js
// https://leetcode-cn.com/problems/remove-element/solution/yi-chu-yuan-su-by-leetcode/
// 当我们遇到 nums[i] = valnums[i]=val 时，我们可以将当前元素与最后一个元素进行交换，并释放最后一个元素。这实际上使数组的大小减少了 1
function removeElement3 (nums, val) {
  let i = 0
  let n = nums.length
  while (i < n) {
    if (nums[i] === val) {
      nums[i] = nums[n - 1];
      // reduce array size by one
      n--;
    } else {
      i++
    }
  }
  return n
}


console.log(removeElement([3, 2, 2, 3], 3))
console.log(removeElement1([3, 2, 2, 3], 3))
console.log(removeElement2([2, 2, 2, 3], 3))
console.log(removeElement3([2, 2, 2, 3], 3))
```
