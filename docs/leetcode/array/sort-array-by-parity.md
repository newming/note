# 按奇偶排序数组

[按奇偶排序数组](https://leetcode-cn.com/problems/sort-array-by-parity/)

```
给定一个非负整数数组 A，返回一个数组，在该数组中， A 的所有偶数元素之后跟着所有奇数元素。

你可以返回满足此条件的任何数组作为答案。

示例：

输入：[3,1,2,4]
输出：[2,4,3,1]
输出 [4,2,3,1]，[2,4,1,3] 和 [4,2,1,3] 也会被接受。
```

## 方法一：创建新数组，一次循环根据当前数字的奇偶依次添加到新的数组中

```js
var sortArrayByParity = function (A) {
  let len = A.length
  let B = new Array(len).fill(0)
  let h = 0 // 左边偶数放置的索引
  let j = len - 1 // 右边奇数放置的索引
  for (let i = 0; i < len; i++) {
    if (A[i] % 2 === 0) {
      B[h++] = A[i]
    } else {
      B[j--] = A[i]
    }
  }
  return B
}
```

## 方法二：一次循环，多次交换。当循环到偶数，和前边的奇数交换位置

```js
var sortArrayByParity = function (A) {
  let i = 0 // 最左边奇数位置
  for (let j = 0; j < A.length; j++) {
    if (A[j] % 2 === 0) {
      let c = A[i]
      A[i] = A[j]
      A[j] = c
      i++
    }
  }
  return A
};
```

## 方法三：双指针，左指针寻找奇数，右指针寻找偶数，只对需要进行交换的数据进行交换

```js
var sortArrayByParity = function (A) {
  let i = 0 // 左指针
  let j = A.length - 1 // 右指针
  while (i < j) {
    if ((A[i] & 1) === 1 && (A[j] & 1) === 0) {
      // 如果左指针对应奇数值，右指针对应偶数值，进行交换
      let tmp = A[i]
      A[i] = A[j]
      A[j] = tmp
    } else if ((A[i] & 1) === 0) {
      // 如果左指针是偶数，符合条件，继续移动左指针
      i++
    } else if ((A[j] & 1) === 1) {
      // 如果右指针是奇数，符合条件，继续移动右指针
      j--
    }
  }
  return A
}
```

## 方法四：同上，但是在实际执行中，奔溃了，循环死掉了吧

```js
var sortArrayByParity = function (A) {
  let i = 0
  let j = A.length - 1
  while (i < j) {
    while (A[i] % 2 === 0 && i < j) i++;
    while (A[i] % 2 === 1 && i < j) j++;
    let tmp = A[i]
    A[i] = A[j]
    A[j] = tmp
  }
}
```

### 测试用例

```js
let x = [
  1827,
  584,
  3670,
  1942,
  669,
  2773,
  220,
  374,
  4749,
  353,
  4695,
  1727,
  2656,
  3619,
  2302,
  3939,
  3943,
  4231,
  117,
  3725,
  2126,
  2327,
  2756,
  1353,
  3959,
  4928
]
console.log(sortArrayByParity(x))
```
