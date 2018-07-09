# 队列

队列是遵循FIFO(先进先出)原则的一组有序的项。(现实生活中的排队)

## 使用 es5 array 创建 Queue

```js
function Queue () {
  this.items = []
}
// 向队列尾部添加一个或多个项
Queue.prototype.enqueue = function (element) {
  this.items.push(element)
}

// 移除队列第一项并返回被移除的元素
Queue.prototype.dequeue = function () {
  return this.items.shift()
}
// 返回队列中的第一个元素
Queue.prototype.front = function () {
  return this.items[0]
}

// isEmpty
Queue.prototype.isEmpty = function () {
  return this.items.length === 0
}

// size
Queue.prototype.size = function () {
  return this.items.length
}
// 打印队列元素
Queue.prototype.print = function () {
  console.log(this.items.toString())
}
```

使用：

```js
let queue = new Queue()
console.log(queue.isEmpty())

queue.enqueue(333)
queue.enqueue(666)

queue.size() // 2

queue.dequeue() // 333
```

## 使用 es6 WeakMap 实现 Queue 类

```js
let Queue = (function () {
  const items = new WeakMap()

  class Queue {
    constructor () {
      items.set(this, [])
    }

    enqueue (element) {
      let q = items.get(this)
      q.push(element)
    }

    dequeue () {
      let q = items.get(this)
      let r = q.shift()
      return r
    }

    front () {
      let q = items.get(this)
      return q[0]
    }

    isEmpty () {
      let q = items.get(this)
      return q.length === 0
    }

    size () {
      let q = items.get(this)
      return q.length
    }

    print () {
      let q = items.get(this)
      console.log(q.toString())
    }
  }

  return Queue
})()
```

## 对象实现 Queue

```js
export default class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    // 注意这里的实现，先进先出，先拿到第一个，在拼接后边的，注意 this.count 比下标大 1
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
```

## 优先队列

元素的添加和移除是基于优先级的。

实现优先队列有两种选项。1. 设置优先级，然后在正确的位置添加元素。2. 或者使用入列操作添加元素。

```js
// 1. 在正确的位置添加元素
function PriorityQueue () {
  let items = []
  function QueueElement (element, priority) {
    // 专门用来生成 items 内部元素的构造函数，需要将 priority 保存下来
    this.element = element
    this.priority = priority
  }
  // 添加元素，根据优先级在正确的位置添加， priority 越小越靠前
  this.enqueue = function (element, priority) {
    let queueElement = new QueueElement(element, priority)
    let added = false

    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement) // 如果 priority 小于当前位置，在这个位置前插入
        added = true
        break
      }
    }

    if (!added) {
      items.push(queueElement)
    }
  }

  this.print = function () {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].element} - ${items[i].priority}`)
    }
  }
  // 其他方法类似
}

```

## 双端队列 Deque

可以向前或向后添加及删除

```js
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = element;
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
```

## 击鼓传花

```js
// 使用的 Queue 为上边 对象实现 Queue
function hotPotato(elementsList, num) {
  const queue = new Queue();
  const elimitatedList = []; // 被淘汰的名单

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]); // 把给定的名单加入到队列
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // 给定一个数字，然后开始迭代队列，从队列开头移除一项，在将其添加到队列末尾，模拟击鼓传花，如果你把花传给了旁边的人，你被淘汰的威胁立刻就解除了
    }
    elimitatedList.push(queue.dequeue()); // 一旦达到了给定的数字，拿着花的人就被淘汰了，从队列中移除，最后只剩一个人就是胜利者
  }

  return {
    eliminated: elimitatedList,
    winner: queue.dequeue()
  };
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);

result.eliminated.forEach(name => {
  console.log(`${name} was eliminated from the Hot Potato game.`);
});

console.log(`The winner is: ${result.winner}`);

// Camila was eliminated from the Hot Potato game.
// Jack was eliminated from the Hot Potato game.
// Carl was eliminated from the Hot Potato game.
// Ingrid was eliminated from the Hot Potato game.
// The winner is: John
```

## 回文检查器

时间复杂度：O(n)，空间复杂度：O(1)

回文，英文palindrome，指一个顺着读和反过来读都一样的字符串，比如madam、我爱我，这样的短句在智力性、趣味性和艺术性上都颇有特色，中国历史上还有很多有趣的回文诗。下面实现判断一个字串是否是回文

```js
// 使用上边的 双端队列 Deque
function palindromeChecker(aString) {
  if (
    aString === undefined ||
    aString === null ||
    (aString !== null && aString.length === 0)
  ) {
    return false;
  }
  const deque = new Deque();
  const lowerString = aString.toLocaleLowerCase().split(' ').join(''); // 将传入的字符串中的 空格 移除拼接起来
  let firstChar;
  let lastChar;
  // 将字符串的每个字母依次放入到队列中，向末尾添加
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }
  // 每次从两边取分别取出来一个字母，比较是否相同，如果只有一个字母，返回 true
  while (deque.size() > 1) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      return false;
    }
  }

  return true;
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));
```