# 有效的数独-中等

[有效的数独-中等](https://leetcode-cn.com/problems/valid-sudoku/)

```
判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

1. 数字 1-9 在每一行只能出现一次。
2. 数字 1-9 在每一列只能出现一次。
3. 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
```

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

```
上图是一个部分填充的有效的数独。

数独部分空格内已填入了数字，空白格用 '.' 表示。

示例 1:
输入:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: true


示例 2:
输入:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: false
解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
    但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。

说明:

1. 一个有效的数独（部分已被填充）不一定是可解的。
2. 只需要根据以上规则，验证已经填入的数字是否有效即可。
3. 给定数独序列只包含数字 1-9 和字符 '.' 。
4. 给定数独永远是 9x9 形式的。
```

## 方法1: 3次暴力循环法

```js
var isValidSudoku = function (board) {
  let isValid = true
  // 行/列内有没有重复
  for (let i = 0; i < 9; i++) {
    let lineObj = {}
    let columnObj = {}
    for (let j = 0; j < 9; j++) {
      // 行
      if (board[i][j] !== '.') {
        if (lineObj[board[i][j]]) {
          isValid = false
          return false
        } else {
          lineObj[board[i][j]] = 1
        }
      }
      // 列
      if (board[j][i] !== '.') {
        if (columnObj[board[j][i]]) {
          isValid = false
          return false
        } else {
          columnObj[board[j][i]] = 1
        }
      }
    }
  }

  // 子数独 3*3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let crossMap = {}
      for (let k = 0; k < 3; k++) {
        for (let m = 0; m < 3; m++) {
          if (board[i * 3 + k][j * 3 + m] !== '.') {
            if (crossMap[board[i * 3 + k][j * 3 + m]]) {
              isValid = false
              return false
            } else {
              crossMap[board[i * 3 + k][j * 3 + m]] = 1
            }
          }
        }
      }
    }
  }
  return isValid
}
```

## 方法2: 一次循环

```js
// 时间复杂度：O(1)，因为我们只对 81 个单元格进行了一次迭代。
// 空间复杂度：O(1)
var isValidSudoku = function (board) {
  // init data
  let rows = {}
  let columns = {}
  let boxes = {}

  for (let i = 0; i < 9; i++) {
    rows[i] = {}
    columns[i] = {}
    boxes[i] = {}
  }

  // validate a board
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let num = board[i][j]
      if (num !== '.') {
        let n = parseInt(num)
        let boxIndex = Math.floor(i / 3 ) * 3 + Math.floor(j / 3)

        // keep the current cell value
        rows[i][n] = rows[i][n] ? rows[i][n] + 1 : 1
        columns[j][n] = columns[j][n] ? columns[j][n] + 1 : 1
        boxes[boxIndex][n] = boxes[boxIndex][n] ? boxes[boxIndex][n] + 1 : 1

        // check if this value has been already seen before
        if (rows[i][n] > 1 || columns[j][n] > 1 || boxes[boxIndex][n] > 1) {
          return false
        }
      }
    }
  }
  return true
}
```

## 方法3: 一次遍历 使用位运算标识某个位置是否多次出现

```js
// 真的吊啊
// https://leetcode-cn.com/problems/valid-sudoku/solution/java-wei-yun-suan-xiang-jie-miao-dong-zuo-biao-bia/
var isValidSudoku = function (board) {
  for(let i = 0; i < 9; i ++){
    // hori, veti, sqre分别表示行、列、小宫
    let hori = 0, veti = 0, sqre = 0
    for(let j = 0; j < 9; j++){
      // 由于传入为char，需要转换为int，减48
      // 传入的是字符串，转化为 int，通过 charCodeAt，同时将 '.' 排除了出去， '1' 的 charCode 为49
      let h = board[i][j].charCodeAt() - 48
      let v = board[j][i].charCodeAt() - 48
      let s = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + j % 3].charCodeAt() - 48
      // "."的ASCII码为46，故小于0代表着当前符号位"."，不用讨论
      if (h > 0) {
        hori = sodokuer(h, hori)
      }
      if (v > 0) {
        veti = sodokuer(v, veti)
      }
      if (s > 0) {
        sqre = sodokuer(s, sqre)
      }
      if (hori === -1 || veti === -1 || sqre === -1) {
        return false
      }
    }
  }
  return true
}

function sodokuer (n, val) {
  return ((val >> n) & 1) === 1 ? -1 : val ^ (1 << n)
}

let sudoku = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
console.log(isValidSudoku(sudoku))
```
