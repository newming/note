# 设计循环双端队列

[设计循环双端队列](https://leetcode-cn.com/problems/design-circular-deque)

```
设计实现双端队列。
你的实现需要支持以下操作：

MyCircularDeque(k)：构造函数,双端队列的大小为k。
insertFront()：将一个元素添加到双端队列头部。 如果操作成功返回 true。
insertLast()：将一个元素添加到双端队列尾部。如果操作成功返回 true。
deleteFront()：从双端队列头部删除一个元素。 如果操作成功返回 true。
deleteLast()：从双端队列尾部删除一个元素。如果操作成功返回 true。
getFront()：从双端队列头部获得一个元素。如果双端队列为空，返回 -1。
getRear()：获得双端队列的最后一个元素。 如果双端队列为空，返回 -1。
isEmpty()：检查双端队列是否为空。
isFull()：检查双端队列是否满了。
示例：

MyCircularDeque circularDeque = new MycircularDeque(3); // 设置容量大小为3
circularDeque.insertLast(1);			        // 返回 true
circularDeque.insertLast(2);			        // 返回 true
circularDeque.insertFront(3);			        // 返回 true
circularDeque.insertFront(4);			        // 已经满了，返回 false
circularDeque.getRear();  				// 返回 2
circularDeque.isFull();				        // 返回 true
circularDeque.deleteLast();			        // 返回 true
circularDeque.insertFront(4);			        // 返回 true
circularDeque.getFront();				// 返回 4

提示：
所有值的范围为 [1, 1000]
操作次数的范围为 [1, 1000]
请不要使用内置的双端队列库。
```

## 方案 1: 使用数组

```js
// https://leetcode-cn.com/problems/design-circular-deque/solution/wei-rao-li-lun-shu-zu-mo-ni-xun-huan-dui-nrpj/
// 注意多申请了一位空间，为了省去计算 count，判断是空还是 full
/**
 * @param {number} k
 */
var MyCircularDeque = function(k) {
  this.capacity = k + 1;
  this.queue = new Array(k + 1);
  this.front = 0;
  this.rear = 0;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {
  if (this.isFull()) return false;
  this.front--;
  this.front += this.capacity;
  this.front %= this.capacity;
  this.queue[this.front] = value;
  return true;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
  if (this.isFull()) return false;
  this.queue[this.rear] = value;
  this.rear++;
  this.rear %= this.capacity;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
  if (this.isEmpty()) return false;
  this.front++;
  this.front %= this.capacity;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
  if (this.isEmpty()) return false;
  this.rear--;
  this.rear += this.capacity;
  this.rear %= this.capacity;
  return true;
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
  if (this.isEmpty()) return -1;
  return this.queue[this.front];
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {
  if (this.isEmpty()) return -1;
  return this.queue[(this.rear - 1 + this.capacity) % this.capacity];
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
  return this.front == this.rear;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
  return (this.rear + 1) % this.capacity == this.front;
};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
```

## 方案 2: 双链表实现

```js
// https://leetcode-cn.com/problems/design-circular-deque/solution/wei-rao-li-lun-shu-zu-mo-ni-xun-huan-dui-nrpj/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/**
 * @param {number} k
 */
var MyCircularDeque = function(k) {
  this.capacity = k; // 容量
  this.size = 0; // 当前的大小
  this.rear = new Node(-1);
  this.front = new Node(-1);
  this.rear.prev = this.front;
  this.front.next = this.rear;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {
  if (this.isFull()) return false;
  let n = new Node(value);
  let next = this.front.next;
  this.front.next = n;
  n.next = next;
  next.prev = n;
  n.prev = this.front;
  this.size++;
  return true;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
  if (this.isFull()) return false;
  let n = new Node(value);
  let prev = this.rear.prev;
  this.rear.prev = n;
  n.prev = prev;
  prev.next = n;
  n.next = this.rear;
  this.size++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
  if (this.isEmpty()) return false;

  this.front.next = this.front.next.next;
  this.front.next.prev = this.front;
  this.size--;

  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
  if (this.isEmpty()) return false;

  this.rear.prev = this.rear.prev.prev;
  this.rear.prev.next = this.rear;
  this.size--;

  return true;
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
  return this.front.next.val;
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {
  return this.rear.prev.val;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
  return this.size == 0;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
  return this.size == this.capacity;
};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
```
