# 算法相关代码

## 栈

栈是一种尊从后进先出(LIFO)原则的有序集合。新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

```js
class Stack {
  constructor() {
    this.count = 0
    this.items = {}
  }
  push(element) {
    this.items[this.count] = element
    this.count++
  }
  pop() {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }
  isEmpty() {
    return this.count === 0
  }
  size() {
    return this.count
  }
  clear() {
    /* while (!this.isEmpty()) {
        this.pop()
      } */
    this.items = {}
    this.count = 0
  }
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
```

## 十进制转其他进制

```js
// 十进制转二进制
function decimalToBinary(decNumber) {
  let remStack = []
  let rem
  let binaryString = ''
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2)
  }

  while (remStack.length) {
    binaryString += remStack.pop().toString()
  }

  return binaryString
}

// 十进制转换为任意进制 （要转换的数字， 基数）
function baseConverter (decNumber, base) {
  const remStack = []
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let baseString = ''

  if (!(base >= 2 && base <= 36)) {
    return ''
  }

  while (number > 0) {
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }

  while (remStack.length) {
    baseString += digits[remStack.pop()]
  }

  return baseString
}
```

## 平衡圆括号

```js
// 两种写法都是 匹配一对删除一对，第一种方法更好，不需要遍历全部的字符串
// 支持 ([{}])
function parenthesesChecker (symbols) {
  const stack = []
  const opens = '([{'
  const closers = ')]}'
  let balanced = true
  let index = 0
  let symbol
  let top

  while (index < symbols.length && balanced) {
    symbol = symbols[index] // 依次拿出索引为 index 的字符
    if (opens.indexOf(symbol) >= 0) {
      // 如果是 ([{ 说明是左半边的一个符号，放入 stack
      stack.push(symbol)
    } else if (stack.length === 0) {
      // 如果 stack 没有了左半边的符号，但是有右半边的符号，说明不匹配
      balanced = false
    } else {
      // 拿出 stack 数组中保存左半边的一位，和当前拿到的这位比较，看是否是对应的右半边，如果不是说明不符合，这里注意 while 循环会将连续的左半边一起放入 stack 中，如果某一位不是左半边，那么这位必定和 stack 中最后一位相匹配才行
      top = stack.pop()
      if (!(opens.indexOf(top) === closers.indexOf(symbol))) {
        balanced = false
      }
    }
    index++
  }
  return balanced && !stack.length
}

// 支持 [({})] 另一种写法
function is_balance (str) {
  const [first, ...others] = str
  const stack = [first]
  while (others.length > 0) {
    const c = stack[stack.length - 1]
    const n = others.shift()
    if (!match(n, c)) {
      stack.push(n)
    } else {
      stack.pop()
    }
  }

  return stack.length === 0
}

function match (n, c) {
  return (c === '[' && n === ']') || (c === '{' && n === '}') || (c === '(' && n === ')')
}
```