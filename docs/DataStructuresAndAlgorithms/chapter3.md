# 栈

栈是一种尊从后进先出(LIFO)原则的有序集合。新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

## 对象形式的 stack

```js
class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  push(element) {
    this.items[this.count] = element; // 属性名为 count
    this.count++;
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
  clear() {
    /* while (!this.isEmpty()) {
        this.pop()
      } */
    this.items = {};
    this.count = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
```

## 数组形式的 stack

```js
export default class StackArray {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  toArray() {
    return this.items;
  }

  toString() {
    return this.items.toString();
  }
}
```

## 十进制转其他进制

```js
// 十进制转二进制
function decimalToBinary(decNumber) {
  let remStack = [];
  let rem;
  let binaryString = "";
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }

  while (remStack.length) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

// 十进制转换为任意进制 （要转换的数字， 基数）
function baseConverter(decNumber, base) {
  const remStack = [];
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let number = decNumber;
  let rem;
  let baseString = "";

  if (!(base >= 2 && base <= 36)) {
    return "";
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (remStack.length) {
    baseString += digits[remStack.pop()];
  }

  return baseString;
}
```

## 平衡圆括号

```js
// 两种写法都是 匹配一对删除一对，第一种方法更好，不需要遍历全部的字符串
// 支持 ([{}])
function parenthesesChecker(symbols) {
  const stack = [];
  const opens = "([{";
  const closers = ")]}";
  let balanced = true;
  let index = 0;
  let symbol;
  let top;

  while (index < symbols.length && balanced) {
    symbol = symbols[index]; // 依次拿出索引为 index 的字符
    if (opens.indexOf(symbol) >= 0) {
      // 如果是 ([{ 说明是左半边的一个符号，放入 stack
      stack.push(symbol);
    } else if (stack.length === 0) {
      // 如果 stack 没有了左半边的符号，但是有右半边的符号，说明不匹配
      balanced = false;
    } else {
      // 拿出 stack 数组中保存左半边的一位，和当前拿到的这位比较，看是否是对应的右半边，如果不是说明不符合，这里注意 while 循环会将连续的左半边一起放入 stack 中，如果某一位不是左半边，那么这位必定和 stack 中最后一位相匹配才行
      top = stack.pop();
      if (!(opens.indexOf(top) === closers.indexOf(symbol))) {
        balanced = false;
      }
    }
    index++;
  }
  return balanced && !stack.length;
}

// 支持 [({})] 另一种写法
function is_balance(str) {
  const [first, ...others] = str;
  const stack = [first];
  while (others.length > 0) {
    const c = stack[stack.length - 1];
    const n = others.shift();
    if (!match(n, c)) {
      stack.push(n);
    } else {
      stack.pop();
    }
  }

  return stack.length === 0;
}

function match(n, c) {
  return (
    (c === "[" && n === "]") ||
    (c === "{" && n === "}") ||
    (c === "(" && n === ")")
  );
}
```

## 汉诺塔

汉诺塔移动规则：

```js
/**
 * 输出汉诺塔移动规则 https://www.cnblogs.com/dmego/p/5965835.html 三根柱子是固定的，盘子一上来从小到大放到 第一根柱子上，移动次数与盘子个数的关系 2^n - 1 (n 为盘子数)
 * plates 盘子个数
 * source 代表第一个柱子
 * helper 代表第中间个柱子
 * dest 代表第三个柱子
 * moves 为最后保存的移动轨迹
 */
function hanoi(plates, source, helper, dest, moves = []) {
  if (plates <= 0) {
    return moves;
  }
  if (plates === 1) {
    moves.push([source, dest]); // 1 个盘子 A -> C
  } else {
    hanoi(plates - 1, source, dest, helper, moves); // 把 n-1 个盘子由 A -> B
    moves.push([source, dest]); // 把第 n 个盘子由 A移到 C
    hanoi(plates - 1, helper, source, dest, moves); // 把 n-1 个盘子由 B 移到 C
  }
  return moves;
}
console.log(hanoi(3, "source", "helper", "dest"));
// [["source","dest"],["source","helper"],["dest","helper"],["source","dest"],["helper","source"],["helper","dest"],["source","dest"]]
```

完善汉诺塔，输出各个柱子上的盘子详情：

```js
/**
 * 原理同上
 */
function towerOfHanoi(
  plates,
  source,
  helper,
  dest,
  sourceName,
  helperName,
  destName,
  moves = []
) {
  if (plates <= 0) {
    return moves;
  }
  if (plates === 1) {
    dest.push(source.pop());
    const move = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move);
  } else {
    towerOfHanoi(
      plates - 1,
      source,
      dest,
      helper,
      sourceName,
      destName,
      helperName,
      moves
    );
    dest.push(source.pop());
    const move = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move);
    towerOfHanoi(
      plates - 1,
      helper,
      source,
      dest,
      helperName,
      sourceName,
      destName,
      moves
    );
  }
  return moves;
}

function hanoiStack(plates) {
  // 初始化，声明三根柱子，并且将 plates 个盘子放到 source 柱子上
  const source = [];
  const dest = [];
  const helper = [];
  for (let i = plates; i > 0; i--) {
    source.push(i);
  }

  return towerOfHanoi(plates, source, helper, dest, "source", "helper", "dest");
}

console.log(hanoiStack(2));
// [{"source":"2","dest":"","helper":"1"},{"source":"","helper":"1","dest":"2"},{"helper":"","source":"","dest":"2,1"}]
```

<!-- done -->
