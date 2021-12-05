# 设计循环队列

[设计循环队列](https://leetcode-cn.com/problems/design-circular-queue)

```
设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

你的实现应该支持如下操作：

MyCircularQueue(k): 构造器，设置队列长度为 k 。
Front: 从队首获取元素。如果队列为空，返回 -1 。
Rear: 获取队尾元素。如果队列为空，返回 -1 。
enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
isEmpty(): 检查循环队列是否为空。
isFull(): 检查循环队列是否已满。

示例：

MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
circularQueue.enQueue(1);  // 返回 true
circularQueue.enQueue(2);  // 返回 true
circularQueue.enQueue(3);  // 返回 true
circularQueue.enQueue(4);  // 返回 false，队列已满
circularQueue.Rear();  // 返回 3
circularQueue.isFull();  // 返回 true
circularQueue.deQueue();  // 返回 true
circularQueue.enQueue(4);  // 返回 true
circularQueue.Rear();  // 返回 4

提示：
所有的值都在 0 至 1000 的范围内；
操作数将在 1 至 1000 的范围内；
请不要使用内置的队列库。
```

## 方案 1: 使用数组实现

https://leetcode-cn.com/problems/design-circular-queue/solution/622-she-ji-xun-huan-dui-lie-by-chen-wei-7323t/

```js
var MyCircularQueue = function(k) {
  this.front = 0;
  this.rear = 0;
  this.max = k;
  this.list = Array(k);
};

MyCircularQueue.prototype.enQueue = function(value) {
  if (this.isFull()) {
    return false;
  } else {
    this.list[this.rear] = value;
    this.rear = (this.rear + 1) % this.max;
    return true;
  }
};

MyCircularQueue.prototype.deQueue = function() {
  let v = this.list[this.front];
  this.list[this.front] = undefined;
  if (v !== undefined) {
    this.front = (this.front + 1) % this.max;
    return true;
  } else {
    return false;
  }
};

MyCircularQueue.prototype.Front = function() {
  if (this.list[this.front] === undefined) {
    return -1;
  } else {
    return this.list[this.front];
  }
};

MyCircularQueue.prototype.Rear = function() {
  let rear = this.rear - 1;
  if (this.list[rear < 0 ? this.max - 1 : rear] === undefined) {
    return -1;
  } else {
    return this.list[rear < 0 ? this.max - 1 : rear];
  }
};

MyCircularQueue.prototype.isEmpty = function() {
  return this.front === this.rear && !this.list[this.front];
};

MyCircularQueue.prototype.isFull = function() {
  return this.front === this.rear && !!this.list[this.front];
};
```

## 方法 2: 使用单链表

```js
// https://leetcode-cn.com/problems/design-circular-queue/solution/she-ji-xun-huan-dui-lie-by-leetcode/
class Node {
  constructor(value, nextNode) {
    this.value = value;
    this.next = nextNode;
  }
}

function MyCircularQueue(k) {
  this.capacity = k;
  this.head = null;
  this.tail = null;
  this.count = 0;
}

MyCircularQueue.prototype.enQueue = function(value) {
  if (this.count === this.capacity) {
    return false;
  }
  if (this.count === 0) {
    this.head = new Node(value);
    this.tail = this.head;
  } else {
    let newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.count += 1;
  return true;
};

MyCircularQueue.prototype.deQueue = function() {
  if (this.count === 0) {
    return false;
  }
  this.head = this.head.next; // 这里注意，感觉有点问题，从头删除了一个
  this.count -= 1;
  return true;
};

MyCircularQueue.prototype.Front = function() {
  if (this.count === 0) {
    return -1;
  }
  return this.head.value;
};

MyCircularQueue.prototype.Rear = function() {
  if (this.count === 0) {
    return -1;
  }
  return this.tail.value;
};

MyCircularQueue.prototype.isEmpty = function() {
  return this.count === 0;
};

MyCircularQueue.prototype.isFull = function() {
  return this.count == this.capacity;
};
```
