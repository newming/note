# 化栈为队

[化栈为队-简单](https://leetcode-cn.com/problems/implement-queue-using-stacks-lcci)

```
实现一个MyQueue类，该类用两个栈来实现一个队列。


示例：

MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false

说明：

你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。
```

## 方案 1: 两个栈模拟

```js
var MyQueue = function() {
  this.stackIn = [];
  this.stackOut = [];
};

MyQueue.prototype.push = function(x) {
  this.stackIn.push(x);
};

MyQueue.prototype.pop = function() {
  while (this.stackIn.length > 1) {
    this.stackOut.push(this.stackIn.pop());
  }
  let ans = this.stackIn.pop();
  while (this.stackOut.length) {
    this.stackIn.push(this.stackOut.pop());
  }
  return ans;
};

MyQueue.prototype.peek = function() {
  while (this.stackIn.length) {
    this.stackOut.push(this.stackIn.pop());
  }
  let ans = this.stackOut[this.stackOut.length - 1];
  while (this.stackOut.length) {
    this.stackIn.push(this.stackOut.pop());
  }
  return ans;
};

MyQueue.prototype.empty = function() {
  return !this.stackIn.length && !this.stackOut.length;
};
```
