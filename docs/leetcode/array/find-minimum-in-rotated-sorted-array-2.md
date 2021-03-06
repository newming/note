# 寻找旋转排序数组中的最小值

[寻找旋转排序数组中的最小值-2-Array-中等](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)


```
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

请找出其中最小的元素。

注意数组可能存在重复元素。

示例 1:

输入: [3,4,5,1,2]
输出: 1
示例 2:

示例 2：
输入: [2,2,2,0,1]
输出: 0
```

## 方法1: 双指针

```js
/**
 * 分析
 * 旋转之后的数组实际上可以划分成两个有序的子数组: 前面子数组的大小都大雨后面子数组中的元素
 *    4567012
 *    注意到实际上最小的元素就是两个子数组的分界线
 * 思路: 4567012
 * 用两个指针low, high分别指向数组的第一个元素和最后一个元素。如果是正常的排序数组(元素间不重复)，第一个元素肯定小于最后一个元素
 * 计算中间位置 mid = (low + high) / 2
 *    若: A[mid] > A[low]，则 A[low, low+1, ... mid-1, mid] 是递增序列，最小元素位于子数组 A[mid+1, mid+2, ... high] 中，因此做赋值 low = mid + 1
 *    若: A[mid] < A[low]，则 A[low, low+1, ... mid-1, mid] 不是递增序列，即中间元素在该子数组中，做赋值 high = mid
 * 注意: 对偶的，若观察 A[mid] 与 A[high] 的关系，能够得到相似的结论
 */

/**
  和 I 的做法类似, 都是二分法, 每次进入无序的那部分找出最小值
  但是由于有重复值的情况, 需要加入 mid 元素等于 hi 元素的情况
  此时应该将 hi 减 1 防止重复数字是最小元素
*/

function findMin(arr) {
  let len = arr.length
  let low = 0
  let high = len - 1
  let mid
  while (low < high) {
    mid = Math.floor((low + high) / 2)
    if (arr[mid] < arr[high]) {
      // 最小值在左半部分
      high = mid
    } else if (arr[mid] > arr[high]) {
      // 最小值在右半部分
      low = mid + 1
    } else {
      high--
    }
  }
  return arr[low]
}

let arr = [2, 2, 2, 0, 1]
console.log(findMin(arr))
```
