# 旋转图像-中等

[旋转图像-中等](https://leetcode-cn.com/problems/rotate-image/)

```
给定一个 n × n 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

说明：你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

示例 1:
给定 matrix =
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]

示例 2:

给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
],

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

## 方法1: 位置加翻转

https://leetcode-cn.com/problems/rotate-image/solution/xuan-zhuan-tu-xiang-by-leetcode/

```js
// 时间复杂度 O(N^2) 空间复杂度 O(1)
// 两步 第一次对角位置交换 第二步 每一行翻转
/* 原始
  [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]
*/
/* 第一步 对角位置数据交换
  [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
  ]
*/
/* 第二步 翻转每行
  [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]
*/

var rotate = function (matrix) {
  let n = matrix.length

  // transpose matrix
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let tmp = matrix[j][i];
      matrix[j][i] = matrix[i][j];
      matrix[i][j] = tmp;
      console.log(i, j, JSON.parse(JSON.stringify(matrix)))
    }
  }
  // reverse each row
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      let tmp = matrix[i][j];
      matrix[i][j] = matrix[i][n - j - 1];
      matrix[i][n - j - 1] = tmp;
    }
  }
  return matrix
}
```

## 方法2: 旋转四个矩形

https://leetcode-cn.com/problems/rotate-image/solution/xuan-zhuan-tu-xiang-by-leetcode/

```js
// 时间复杂度：O(N^2) 是两重循环的复杂度
// 空间复杂度：O(1) 由于我们在一次循环中的操作是 就地 完成的，并且我们只用了长度为 4 的临时列表做辅助。
var rotate = function (matrix) {
  let n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2) + n % 2; i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      let tmp = new Array(4);
      let row = i;
      let col = j;
      for (let k = 0; k < 4; k++) {
        tmp[k] = matrix[row][col];
        let x = row;
        row = col;
        col = n - 1 - x;
      }
      for (let k = 0; k < 4; k++) {
        matrix[row][col] = tmp[(k + 3) % 4];
        let x = row;
        row = col;
        col = n - 1 - x;
      }
    }
  }
  return matrix
}
```

## 方法3: 在单次循环中旋转四个数组

https://leetcode-cn.com/problems/rotate-image/solution/xuan-zhuan-tu-xiang-by-leetcode/

```js
// 思想同方法2
// 时间复杂度：O(N^2) 是两重循环的复杂度
// 空间复杂度：O(1) 由于我们在一次循环中的操作是 就地 完成的，并且我们只用了长度为 4 的临时列表做辅助。
var rotate = function (matrix) {
  let n = matrix.length;
  for (let i = 0; i < Math.floor((n + 1) / 2); i ++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      let temp = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - j - 1];
      matrix[n - 1 - i][n - j - 1] = matrix[j][n - 1 -i];
      matrix[j][n - 1 - i] = matrix[i][j];
      matrix[i][j] = temp;
    }
  }
  return matrix
}
```

## 方法4: 使用另一个数组，不符合题意要求

```js
    var rotate = function(matrix) {
      let n = matrix.length
      let mm = JSON.parse(JSON.stringify(matrix))
      //矩阵顺指针旋转
      for(let i = 0; i < n; i++) {
          for(let j = 0; j < n; j++) {
              matrix[i][j] = mm[n-1-j][i]
          }
      }
      return matrix
    };

    let matrix = [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ]
    console.log(rotate(matrix))
```
