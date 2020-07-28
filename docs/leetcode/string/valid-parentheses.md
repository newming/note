# 有效的括号(平衡圆括号)

[有效的括号(平衡圆括号)](https://leetcode-cn.com/problems/valid-parentheses/)

```
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:
输入: "()"
输出: true

示例 2:
输入: "()[]{}"
输出: true

示例 3:
输入: "(]"
输出: false

示例 4:
输入: "([)]"
输出: false

示例 5:
输入: "{[]}"
输出: true
```

## 方法一 更优，栈

```js
function parenthesesChecker (symbols) {
  const stack = []
  const opens = '([{'
  const closers = ')]}'
  let balanced = true
  let len = symbols.length
  let index = 0
  let symbol
  let top
  if (len % 2 !== 0) {
    // 如果是奇数位直接返回false
    balanced = false
  }

  while (index < len && balanced) {
    symbol = symbols[index] // 依次拿出索引为 index 的字符
    if (opens.indexOf(symbol) >= 0) {
      // 如果是 ([{ 说明是左半边的一个符号，放入 stack
      stack.push(symbol)
      // 并且判断一下stack中长度，如果大于了剩余位数，说明不平衡
      if (stack.length > len - 1 - index) {
        balanced = false
      }
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
```

## 方法二 思路同方法一

```js
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

## 方法三：字符串替换

```js
function isValid (s) {
  if (s && s.length % 2 !== 0) {
    return false
  }
  while (s.includes('{}') || s.includes('()') || s.includes('[]')) {
    s = s.replace('{}', '')
    s = s.replace('()', '')
    s = s.replace('[]', '')
  }

  return s === ''
}
console.log(isValid('()'))
```
