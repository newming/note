# 链表

数组是最常用的数据结构，但是数组有一个缺点：在大多数语言中数组的大小是固定的，从数组的起点或者中间插入或移除项的成本很高，因为需要移动元素。

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。

链表的好处是添加或移除元素的时候不需要移动其他元素。然而链表需要使用指针，因此实现链表时需要额外注意。数组的另一个细节是可以直接访问任何位置的任何元素，而要访问链表中间的一个元素，需要从起点开始迭代列表知道找到所需的元素。类似与现实中的火车。

## 创建链表

### es5 实现 普通链表

```js
function LinkedList () {
  let Node = function (element) {
    this.element = element
    this.next = null
  }

  let length = 0
  let head = null // 存储第一个节点的引用

  // 向链表尾部添加一个新的项
  this.append = function (element) {
    let node = new Node(element)
    let current
    if (head === null) {
      // 当前列表为空
      head = node
    } else {
      current = head
      // 循环列表，找到最后一项
      while (current.next) {
        current = current.next
      }
      current.next = node // 找到最后一项，将其 next 赋为 node 建立链接
    }
    // 长度更新
    length++
  }
  // 向链表特定位置插入一个新的项
  this.insert = function (positon, element) {
    if (positon >= 0 && positon <= length) {
      let node = new Node(element)
      let current = head
      let previous
      let index
      if (positon === 0) {
        node.next = current
        head = node
      } else {
        while (index ++ < positon) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      length++
      return true
    } else {
      return false
    }
  }
  // 从链表特定位置移除一项
  this.removeAt = function (position) {
    // 检查越界值
    if (position > -1 && position < length) {
      let current = head
      let previous
      let index = 0
      // 移除第一项
      if (position === 0) {
        head = current.next
      } else {
        while (index++ < position) { // 注意这里的 index++ 先返回值后加
          previous = current
          current = current.next
        }
        // 将 previous 与 current 的下一项链接起来，跳过current，从而移除它
        previous.next = current.next
      }
      length--
      return current.element // 返回被删除的元素
    } else {
      return null
    }
  }
  // 移除特定元素
  this.remove = function (element) {
    let index = this.indexOf(element)
    return this.removeAt(index)
  }
  // 返回元素在链表中的索引，没有为 -1
  this.indexOf = function (element) {
    let current = head
    let index = 0
    while (current) {
      if (element === current.element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }

  this.isEmpty = function () {
    return length === 0
  }

  this.size = function () {
    return length
  }

  this.getHead = function () {
    return head
  }

  this.toString = function () {
    let current = head
    let string = ''
    while (current) {
      string += current.element + (current.next ? 'n' : '')
      current = current.next
    }
    return string
  }

  this.print = function () {
    console.log(this.toString())
  }
}
```

### es6 实现 普通链表

```js
class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? -1 : 1;
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      // catches null && undefined
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
  getHead() {
    return this.head;
  }
  clear() {
    this.head = undefined;
    this.count = 0;
  }
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
```

## 双向链表 DoublyLinkedList

双向链表和普通链表的区别在于，在普通链表中，一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的，一个链向下一个元素，另一个链向前一个元素

### es5 实现 双向链表

```js
function DoublyLinkedList () {
  let Node = function (element) {
    this.element = element
    this.prev = null
    this.next = null
  }
  let length = 0
  let head = null
  let tail = null // 保存末尾的元素

  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      let node = new Node(element)
      let current = head
      let previous
      let index = 0

      if (position === 0) {
        // 在第一个位置添加
        if (!head) {
          head = node
          tail = node
        } else {
          node.next = current
          current.prev = node
          head = node
        }
      } else if (position === length) {
        // 最后一项
        current = tail
        current.next = node
        node.prev = current
        tail = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node

        current.prev = node
        node.prev = previous
      }
      length++
      return true
    } else {
      return false
    }
  }

  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head
      let previous
      let index = 0
      // 移除第一项
      if (position === 0) {
        head = current.next
        if (length === 1) {
          tail = null
        } else {
          head.prev = null
        }
      } else if (position === length -1) {
        // 移除最后一项
        current = tail
        tail = current.prev
        tail.next = null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
        current.next.prev = previous
      }
      length--
      return current.element
    } else {
      return null
    }
  }
  // 其他方法的实现省略。。。
}
```

### es6 实现双向链表

```js
class DoublyNode {
  constructor(element, next, prev) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? -1 : 1;
}

class DoublyLinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = null;
    this.tail = null;
  }
  push(element) {
    const node = new DoublyNode(element);
    if (this.head == null) {
      this.head = node;
      this.tail = node; // NEW
    } else {
      // attach to the tail node // NEW
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.count++;
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) { // NEW
          this.head = node;
          this.tail = node; // NEW
        } else {
          node.next = this.head;
          this.head.prev = node; // NEW
          this.head = node;
        }
      } else if (index === this.count) { // last item NEW
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node; // NEW
        node.prev = previous; // NEW
      }
      this.count++;
      return true;
    }
    return false;
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = this.head.next;
        // if there is only one item, then we update tail as well //NEW
        if (this.count === 1) {
          // {2}
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
      } else if (index === this.count - 1) {
        // last item //NEW
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        // link previous with current's next - skip it to remove
        previous.next = current.next;
        current.next.prev = previous; // NEW
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current != null) {
      if (this.equalsFn(element, current.element)) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }
  getHead() {
    return this.head;
  }
  getTail() {
    return this.tail;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    while (current != null) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
  inverseToString() {
    if (this.tail == null) {
      return '';
    }
    let objString = `${this.tail.element}`;
    let previous = this.tail.prev;
    while (previous != null) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }
    return objString;
  }
}
```

## 循环链表

循环链表可以和普通链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针(tail.next)不是 null，而是指向第一个元素(head)

```js
// 这里以单项引用为例
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? -1 : 1;
}

class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

export default class CircularLinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = null;
  }
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getElementAt(this.size() - 1);
      current.next = node;
    }
    // set node.next to head - to have circular list
    node.next = this.head; // 将末尾的 next 指向 head
    this.count++;
  }
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          // if no node  in list
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.size());
          // update last element
          this.head = node;
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size() - 1);
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        // no need to update last element for circular list
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
  getHead() {
    return this.head;
  }
  clear() {
    this.head = undefined;
    this.count = 0;
  }
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

```

## 双向循环链表

有指向 head 元素的 tail.next 和指向 tail 的 head.prev

## 顺序链表

按照 element 的顺序从小到大插入。

```js
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
function defaultEquals(a, b) {
  return a === b;
}

// 这里的 LinkedList 是上边： es6 实现 普通链表
export default class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn);
    this.equalsFn = equalsFn;
    this.compareFn = compareFn;
  }
  push(element) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }
  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, index === 0 ? index : 0);
    }
    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
}
```

## 栈链表

```js
// 这里的 DoublyLinkedList 为上边：es6 实现双向链表
export default class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList();
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items.removeAt(this.size() - 1);
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getElementAt(this.size() - 1).element;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  size() {
    return this.items.size();
  }
  clear() {
    this.items.clear();
  }
  toString() {
    return this.items.toString();
  }
}
```