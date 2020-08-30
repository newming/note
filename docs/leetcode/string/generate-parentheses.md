# 括号生成

[括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

```
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例：

输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
```

## 方法1: 暴力法

[暴力法](https://leetcode-cn.com/problems/generate-parentheses/solution/gua-hao-sheng-cheng-by-leetcode-solution/)

1. 生成所有序列
2. 检查是否有效
3. 模式识别：子问题和原问题具有相同结构，考虑自上而下的递归

复杂度分析：

- 时间复杂度：O(2^2n * n)
  - 生成序列 O(2^2n)
  - 验证序列 O(n)
- 空间复杂度 O(2n)

```js
function generateParenthesis (n) {
  function generate (A) {
    if (A.length === 2 * n) {
      if (valid(A)) {
        ans.push(A.join(''))
      }
    } else {
      A.push('(')
      generate(A)
      A.pop()
      A.push(')')
      generate(A)
      A.pop()
    }
  }
  function valid (A) {
    let bal = 0
    for (let i = 0; i < A.length; i++) {
      let c = A[i]
      if (c === '(') {
        bal += 1
      } else {
        bal -= 1
      }
      if (bal < 0) {
        return false
      }
    }
    return bal === 0
  }

  let ans = []
  generate([])
  return ans
}

console.log(generateParenthesis(2))
console.log(generateParenthesis(3))
```

## 方法2: 回溯算法-深度优先遍历

[深度优先遍历-回溯算法](https://leetcode-cn.com/problems/generate-parentheses/solution/gua-hao-sheng-cheng-by-leetcode-solution/)

- 关键字：有效序列
- 模式识别：确保每一步都能产生有效序列，利用回溯搜索其他可能的解
- 深度优先遍历

```js
function generateParenthesis (n) {
  let ans = []

  function backtrack (s, left, right) {
    if (s.length === 2 * n) {
      ans.push(s.join(''))
      return
    }
    if (left < n) {
      s.push('(')
      backtrack(s, left + 1, right)
      s.pop()
    }
    if (right < left) {
      s.push(')')
      backtrack(s, left, right + 1)
      s.pop()
    }
  }

  backtrack([], 0, 0)
  return ans
}
console.log(generateParenthesis(2))
```

## 方法3: 回溯算法-深度优先遍历

[回溯算法-深度优先遍历](https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/)

原理同方法2

```js
function generateParenthesis(n) {
  let res = []
  let curStr = ''

  function dfs (curStr, left, right) {
    if (left === 0 && right === 0) {
      res.push(curStr)
      return
    }
    if (right < left) {
      return
    }
    if (left > 0) {
      dfs(curStr + '(', left - 1, right)
    }
    if (right > 0) {
      dfs(curStr + ')', left, right - 1)
    }
  }
  dfs(curStr, n, n)
  return res
}

console.log(generateParenthesis(2))
```

## 方法4: 回溯算法-广度优先遍历

[回溯算法-广度优先遍历](https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/)

暂时跳过先

## 方法5: 动态规划

[回溯算法-广度优先遍历](https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/)

```
思路分析：
dp[i] = "(" + dp[m] + ")" + dp[k]
其中m + k = i - 1

举例 i = 1 => [ '()()', '(())' ]
m + k = 1
dp[0] = [""]
dp[1] = ["()"]

当 m = 0, k = 1 => "(" + "" + ")" + "()" => "()()"
当 m = 1, k = 0 => "(" + "()" + ")" + "" => "(())"
```

```js
function generateParenthesis (n) {
  if (n === 0) {
    return []
  }

  let dp = new Array(n + 1).fill(null)
  dp[0] = [""]

  for (let i = 1; i < n + 1; i++) {
    let cur = []
    for (let j = 0; j < i; j++) {
      left = dp[j]
      right = dp[i- j - 1]
      for (let s1 of left) {
        for (let s2 of right) {
          cur.push('(' + s1 + ')' + s2)
        }
      }
    }
    dp[i] = cur
  }
  return dp[n]
}

console.log(generateParenthesis(2))
```