# 图

图是网络结构的抽象模型。图是一组由边连续的节点(或顶点)。

- 相邻顶点: 由一条边连接在一起的顶点
- 度: 一个顶点的度是其相邻顶点的数量
- 路径: 路径是顶点 v1, v2 ... vk 的一个连续序列，其中 vi 和 vi+1 是相邻的
- 简单路径: 简单路径要求不包含重复的顶点，环也是一个简单路径
- 如果图中不存在环，则称该图是无环的。如果图中每两个顶点间都存在路径，则该图是连通的
- 图可以是无向的或是有向的。如果图中每两个顶点间在双向上都存在路径，则该图是强连通的
- 图可以是未加权的或是加权的(加权图的边被赋予了权值)

## 图的表示

### 邻接矩阵

### 邻接表

### 关联矩阵

## 创建 Graph 类

```js
// 使用的是上边 邻接表
import Dictionary from './dictionary'; // 第七章 字典

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected; // 是否是有方向的
    this.vertices = []; // 存放所有顶点名字
    this.adjList = new Dictionary(); // 存放邻接表
  }
  // 添加新的顶点，实例化后为空
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []); // initialize adjacency list with array as well;
    }
  }
  // 建立链接 a <---> b
  addEdge(a, b) {
    if (!this.adjList.get(a)) {
      this.addVertex(a);
    }
    if (!this.adjList.get(b)) {
      this.addVertex(b);
    }
    this.adjList.get(a).push(b); // 将 a -> b
    if (this.isDirected !== true) {
      // 如果是没有方向的 b -> a
      this.adjList.get(b).push(a);
    }
  }
  getVertices() {
    return this.vertices;
  }
  getAdjList() {
    return this.adjList;
  }
  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += '\n';
    }
    return s;
  }
}
```

```js
// 使用
const graph = new Graph();

const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log('********* printing graph ***********');

console.log(graph.toString());
// ********* printing graph ***********
// index.html:253 A -> B C D
// B -> A E F
// C -> A D G
// D -> A C G H
// E -> B I
// F -> B
// G -> C D
// H -> D
// I -> E
```

## 图的遍历

和树数据结构类似，我们可以访问图的所有节点。有两种算法可以对图进行遍历: 广度优先搜索(Breadth-First Search, BFS) 和 深度优先搜索(Depth-First Search, DFS)。图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，是否含有环等。

图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。对于两种图遍历算法，都需要明确指出第一个被访问的顶点。

