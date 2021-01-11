# 杨辉三角

[杨辉三角-简单](https://leetcode-cn.com/problems/pascals-triangle)

```
给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

输入: 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```

## 方法1: 动态规划

[官方题解](https://leetcode-cn.com/problems/pascals-triangle/solution/yang-hui-san-jiao-by-leetcode/)

```js
function generate (numRows) {
  let triangle = []
  for (let i = 0; i < numRows; i++) {
    let row = new Array(i + 1)
    row[0] = 1
    row[i] = 1

    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
    }
    triangle.push(row)
  }
  return triangle
}
```

## 方法2: 错位相加法

[题解](https://leetcode-cn.com/problems/pascals-triangle/solution/qu-qiao-jie-fa-cuo-yi-wei-zai-zhu-ge-xiang-jia-28m/)

- 当前一行只比上一行多了一个元素
- 最最关键的一点：本行元素等于上一行元素往后错一位再逐个相加

```js
// 1 3 3 1 0
// 0 1 3 3 1
// 1 4 6 4 1

function generate (numRows) {
  if (numRows === 0) {
    return []
  }
  let res = [
    [1]
  ]

  while (res.length < numRows) {
    let newRow = []
    let preRow = res[res.length - 1]
    let top = [...preRow, 0]
    let bottom = [0, ...preRow]
    for (let i = 0; i < top.length; i++) {
      newRow.push(top[i] + bottom[i])
    }
    res.push(newRow)
  }
  return res
}
```
