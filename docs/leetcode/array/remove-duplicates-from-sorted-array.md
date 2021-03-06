# 删除排序数组中的重复项

[删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

```
给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

示例 1:
给定数组 nums = [1,1,2],
函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。
你不需要考虑数组中超出新长度后面的元素。

示例 2:
给定 nums = [0,0,1,1,1,2,2,3,3,4],
函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
你不需要考虑数组中超出新长度后面的元素。

说明:
为什么返回数值是整数，但输出的答案是数组呢?
请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

## 方法一: 循环比较，遍历数组，保存前一位，与当前循环为比较，重复则删除，最终数组剩余项全部不重复

```js
var removeDuplicates = function (nums) {
  let pre = null
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === pre) {
      nums.splice(i, 1)
      i--
    } else {
      pre = nums[i]
    }
  }
  return nums.length
}
```

## 方法二: 双指针

非常好，不破环原数组长度，符合：你不需要考虑数组中超出新长度后面的元素

```js
// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/solution/shan-chu-pai-xu-shu-zu-zhong-de-zhong-fu-xiang-by-/
function removeDuplicates1 (nums) {
  if (nums.length === 0) return 0
  let i = 0
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j]
    }
  }
  // console.log(nums) // [0, 1, 2, 3, 4, 2, 2, 3, 3, 4]
  return i + 1
}
```

## 方法三: 方法二优化

考虑输入[1, 2, 3, 4, 5] 在方法二中会原封不动的复制每一位，其实是没必要的

```js
// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/solution/shuang-zhi-zhen-shan-chu-zhong-fu-xiang-dai-you-hu/
function removeDuplicates2 (nums) {
  if(nums == null || nums.length === 0) return 0;
  let p = 0
  let q = 1
  while (q < nums.length) {
    if(nums[p] !== nums[q]){
      if (q - p > 1) {
        // 增加一个判断，对于不必进行拷贝的跳过
        nums[p + 1] = nums[q]
      }
      p++
    }
    q++
  }
  return p + 1
}

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))
console.log(removeDuplicates1([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))
console.log(removeDuplicates2([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))
```
