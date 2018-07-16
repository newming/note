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

完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加入待访问顶点列表中。

为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。

广度优先搜索算法和深度优先算法基本上是相同的，只有一点不同，那就是待访问顶点列表的数据结构。

| 算法 | 数据结构 | 描述 |
| ---- | ---- | ---- |
| 广度优先搜索 | 队列 | 通过将顶点存入队列中，最先入队列的顶点先被探索 |
| 深度优先搜索 | 栈 | 通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的邻顶点就去访问 |

### 广度优先搜索

为了区别是否访问，这里定义三种颜色来区别：

- 白色: 表示该顶点还没有被访问
- 灰色: 表示该顶点被访问过，但未被探索过
- 黑色: 表示该顶点被访问过且被完全探索过

```js
import Queue from '../../data-structures/queue';

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
};

const initializeColor = vertices => {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

export const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
    if (callback) {
      callback(u);
    }
  }
};

export const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  const distances = {};
  const predecessors = {};
  queue.enqueue(startVertex);
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        distances[w] = distances[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
  }
  return {
    distances,
    predecessors
  };
};
```