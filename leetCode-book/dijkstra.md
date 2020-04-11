# 狄克斯特拉算法

> 来源: 图解算法第七章

- 寻找加权图中前往X的最短路径
- 图中不可以存在环
- 负权边会导致算法失效

算法实现：

```js
// 问题描述: 寻找从起点到终点最短时间的路径

// 案例1:
let graph = {}
graph['start'] = {}
graph['a'] = {}
graph['b'] = {}
graph['end'] = {}
graph['start']['a'] = 6
graph['start']['b'] = 2
graph['a']['end'] = 1
graph['b']['a'] = 3
graph['b']['end'] = 5
graph['end']['c'] = 8
let res = findShortestMap(graph, 'start', 'end')
console.log(res) // ['start', 'b', 'a', 'end']

// 案例2
let graph = {}
graph['start'] = {}
graph['a'] = {}
graph['b'] = {}
graph['c'] = {}
graph['d'] = {}
graph['end'] = {}
graph['start']['a'] = 5
graph['start']['b'] = 2
graph['a']['c'] = 4
graph['a']['d'] = 2
graph['b']['a'] = 8
graph['b']['d'] = 7
graph['c']['d'] = 6
graph['c']['end'] = 3
graph['d']['end'] = 1
// ['start', 'a', 'd', 'end']
```

```js
// 代码实现
function findShortestMap (data, startKey, endKey) {
  let constGraph = {}
  let parentGraph = {}
  let processed = [] // 已经寻找过的节点
  if (!data[startKey]) {
    return null
  }
  // 初始化 const 数据
  let node = data[startKey]
  let currentKey = startKey
  Object.keys(node).forEach(key => {
    constGraph[key] = node[key]
    parentGraph[key] = currentKey
  })
  constGraph[endKey] = Number.MAX_SAFE_INTEGER - 1

  // 开始
  currentKey = findLowestCostNode()
  node = data[currentKey]
  while (node) {
    if (currentKey === endKey) {
      return getResult()
    }
    let cost = constGraph[currentKey]
    Object.keys(node).forEach(key => {
      let newCost = cost + node[key]
      if (!constGraph[key]) {
        constGraph[key] = newCost
        parentGraph[key] = currentKey
      } else if (constGraph[key] > newCost) {
        constGraph[key] = newCost
        parentGraph[key] = currentKey
      }
    })
    processed.push(currentKey)
    currentKey = findLowestCostNode()
    node = data[currentKey]
  }

  function findLowestCostNode() {
    let lowestCost = Number.MAX_SAFE_INTEGER
    let lowestCostNode = null
    Object.keys(constGraph).forEach(key => {
      if (constGraph[key] < lowestCost && !processed.includes(key)) {
        lowestCostNode = key
        lowestCost = constGraph[key]
      }
    })
    return lowestCostNode
  }

  function getResult() {
    if (parentGraph && parentGraph[endKey]) {
      let res = [endKey]
      let preStep = parentGraph[endKey]
      while (preStep) {
        res.push(preStep)
        preStep = parentGraph[preStep]
      }
      return res.reverse()
    }
    return null
  }

  return getResult()
}
```