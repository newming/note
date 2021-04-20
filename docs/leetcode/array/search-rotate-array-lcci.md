# 搜索旋转数组

[搜索旋转数组](https://leetcode-cn.com/problems/search-rotate-array-lcci/)

```
搜索旋转数组。给定一个排序后的数组，包含n个整数，但这个数组已被旋转过很多次了，次数不详。请编写代码找出数组中的某个元素，假设数组元素原先是按升序排列的。若有多个相同元素，返回索引值最小的一个。

示例1:
 输入: arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 5
 输出: 8（元素5在该数组中的索引）

示例2:
 输入：arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 11
 输出：-1 （没有找到）

提示:
 arr 长度范围在[1, 1000000]之间
```

## 二分法

[参考](https://leetcode-cn.com/problems/search-rotate-array-lcci/solution/xuan-zhuan-shu-zu-cong-yi-dao-nan-ge-ge-dcv7a/)

```js
// 只需要注意: 若有多个相同元素，返回索引值最小的一个
// 多次旋转毫无意义
function search(arr, target) {
  let len = arr.length
  let left = 0
  let right = len - 1

  while(left <= right) {
    // 重点1：当left符合时直接返回, 因为找的是最小的索引
    if (arr[left] === target) {
      return left
    }
    let mid= Math.floor((left+right) / 2)
    // 重点2：当中间值等于目标值，将右边界移到中间，因为左边可能还有相等的值
    if (arr[mid] === target) {
      right = mid
    } else if (arr[0] < arr[mid]) {
      if (arr[0] <= target && target < arr[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else if (arr[0] > arr[mid]) {
      if (arr[mid] < target && target <= arr[len - 1]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    } else {
      // 重点3：当中间数字与左边数字相等时，将左边界右移
      left += 1
    }
  }

  return -1
}
```