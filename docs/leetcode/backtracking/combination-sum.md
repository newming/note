# 组合总数

[组合总数-中等](https://leetcode-cn.com/problems/combination-sum/)

```
给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：

所有数字（包括 target）都是正整数。
解集不能包含重复的组合。

示例 1:
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]

示例 2:
输入: candidates = [2,3,5], target = 8,
所求解集为:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

## 方法1: 回溯加剪枝

```js
// https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/
var combinationSum = function (candidates, target) {
  let size = candidates.length
  if (size === 0) {
    return []
  }

  // 剪枝的前提是数组元素排序
  // 深度深的边不能比深度浅的边还小
  // 要排序的理由：1、前面用过的数后面不能再用；2、下一层边上的数不能小于上一层边上的数。
  candidates.sort()
  // 在遍历的过程中记录路径，一般而言它是一个栈
  let path = []
  let res = []

  // 注意要传入 size ，在 range 中， size 取不到
  dfs(candidates, 0, size, path, res, target)
  return res
}

function dfs (candidates, begin, size, path, res, target) {
  // 先写递归终止的情况
  if (target === 0) {
    // js 中可变对象是引用传递，因此需要将当前 path 里的值拷贝出来，避免后续修改 path 影响 res，但是不能丢掉 res 的饮用
    res.push([...path])
  }

  for (let index = begin; index < size; index++) {
    let residue = target - candidates[index]
    // “剪枝”操作，不必递归到下一层，并且后面的分支也不必执行
    if (residue < 0) {
      break
    }
    path.push(candidates[index])
    // 因为下一层不能比上一层还小，起始索引还从 index 开始
    dfs(candidates, index, size, path, res, residue)
    path.pop() // dfs 后，不论成功与否都将上一个结果的值删除
  }
}
```

## 方法2: 将两个方法何为一个

```js
var combinationSum = function (candidates, target) {
  let size = candidates.length
  if (size === 0) {
    return []
  }

  // 剪枝的前提是数组元素排序
  // 深度深的边不能比深度浅的边还小
  // 要排序的理由：1、前面用过的数后面不能再用；2、下一层边上的数不能小于上一层边上的数。
  candidates.sort((a, b) => a - b)
  // 在遍历的过程中记录路径，一般而言它是一个栈
  let path = []
  let res = []

  function dfs(path, target, begin) {
    // 先写递归终止的情况
    if (target === 0) {
      // js 中可变对象是引用传递，因此需要将当前 path 里的值拷贝出来，避免后续修改 path 影响 res，但是不能丢掉 res 的饮用
      res.push([...path])
    }

    for (let index = begin; index < size; index++) {
      let residue = target - candidates[index]
      // “剪枝”操作，不必递归到下一层，并且后面的分支也不必执行
      if (residue < 0) {
        break
      }
      path.push(candidates[index])
      // 因为下一层不能比上一层还小，起始索引还从 index 开始
      dfs(path, residue, index)
      path.pop() // dfs 后，不论成功与否都将上一个结果的值删除
    }
  }
  // 注意要传入 size ，在 range 中， size 取不到
  dfs(path, target, 0)
  return res
}

console.log(combinationSum([2,3,6,7], 7))
console.log(combinationSum([2,3,5], 8))
```
