# 堆

堆(heap)是计算机中一类特殊的数据结构的统称，通常是一个可以被看作一个树的数组对象。堆总是一个完全二叉树。堆是优先队列的一种实现方式，优先队列还可使用链表实现

堆适合维护：集合最值

- 大根堆(大顶堆): 任意一个父节点大于子节点
- 小根堆(小顶堆): 任意一个父节点小于子节点

## 操作

### 尾部插入调整

例如大根堆

1. 尾部插入元素(满足完全二叉树)
2. 如果大于父节点，就和父节点交换位置

### 头部弹出(向上调整)

例如大根堆

- 头部弹出元素
- 用尾元素填充头部位置。（堆是一颗完全二叉树，中间不可以断，且弹出后尾部元素下标超界）
- 如果此元素小于子元素，就和子元素中最大的交换位置

shiftUp 或者 shiftDown 是一个递归的过程，所以它的时间复杂度是 O(log n)。

### 堆排序

- 将堆顶元素与队尾元素交换
- 将此操作看做是堆顶元素弹出操作
- 按照头部弹出以后的策略调整堆
- 一轮操作后尾部元素不属于堆的合法位置，但是属于数组的有效空间。尾部元素向前推一位，在此重复 1-3 步

## 小顶堆实现

```js
class Heap {
  constructor(data = []) {
    this.data = data;
    this.heapify();
  }

  get size() {
    return this.data.length;
  }

  heapify() {
    const size = this.size;
    // 将数组调整为符合小顶堆格式的数据
    if (size < 2) {
      return;
    }

    for (let i = 0; i < size; i++) {
      this.bubbleUp(i); // 将最小的值调整上来
    }
  }

  // 尾部插入元素
  offer(val) {
    this.data.push(val);
    this.bubbleUp(this.size - 1);
  }

  // 头部弹出
  poll() {
    if (!this.size) {
      return nulll;
    }
    const res = this.data[0];
    this.data[0] = this.data.pop(); // 将尾部元素放到头部
    if (this.size) {
      this.bubbleDown(0);
    }

    return res;
  }
  // 交换元素
  swap(i, j) {
    if (i === j) {
      return;
    }
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  // 向上调整
  bubbleUp(index) {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);

      if (this.data[index] > this.data[parentIndex]) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex; // 接着循环
    }
  }

  // 向下调整
  bubbleDown(index) {
    let lastIndex = this.size - 1;
    while (index < lastIndex) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;

      // 比较当前值是否大于左右子节点的值
      let findIndex = index; // findIndex 为 index 和 left, right 中最小的
      if (this.data[leftIndex] < this.data[findIndex]) {
        findIndex = leftIndex;
      }
      if (this.data[rightIndex] < this.data[findIndex]) {
        findIndex = rightIndex;
      }
      if (index === findIndex) {
        break;
      }
      this.swap(index, findIndex);
      index = findIndex;
    }
  }
}

let arr = [10, 12, 1, 14, 6, 5, 8, 15, 3, 9, 7];
const minHeap = new Heap(arr);
console.log(minHeap.data);
console.log(minHeap.poll());
console.log(minHeap.poll());
console.log(minHeap.data);
minHeap.offer(4);
minHeap.offer(16);
console.log(minHeap.data);
```
