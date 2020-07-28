# 报数

[报数-简单](https://leetcode-cn.com/problems/count-and-say/)

```
报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

1.     1
2.     11
3.     21
4.     1211
5.     111221

1 被读作  "one 1"  ("一个一") , 即 11。
11 被读作 "two 1s" ("两个一"）, 即 21。
21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。

注意：整数顺序将表示为一个字符串。

示例 1:
输入: 1
输出: "1"

示例 2:
输入: 4
输出: "1211"

注意题目意思：要往上看一个 比如 2 "11"，说的是 1的时候的"1"， 3是"21"，即两个一，说的是2: "11"
```

## 方法一：递归

https://leetcode-cn.com/problems/count-and-say/solution/xin-shou-di-yi-ci-xie-ti-jie-by-quan-wang-zui-xiu/

```js
function countAndSay (n) {
  if (n === 1) { // n=1时，直接返回1
    return '1'
  }
  let newString = countAndSay(n - 1) // 递归，通过第n-1个字符串获取第n个
  let builder = ''
  let begin = newString[0] // 获取字符串的第一个元素为比较对象
  let count = 1 // count用来计数，拿第一个字符作为比较对象，比较的时候至少有一个匹配，所以count从1 开始计数
  for (let i = 1; i < newString.length; i++) {
    if (newString[i] === begin) {
      count++
    } else {
      builder = builder + (count + begin)
      begin = newString[i] // newString[i]把当做比较对象
      count = 1 // 重新开始计数
    }
  }
  // 最后一个字符
  if (begin === newString[newString.length - 1]) {
    builder = builder + (count + begin)
  }
  return builder
}
```

## 方法二: 正则

https://leetcode-cn.com/problems/count-and-say/solution/tong-guo-zheng-ze-he-bing-xiang-tong-yuan-su-wan-c/

```js
// \1 表示反向引用 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references
var countAndSay = function(n) {
  let prev = '1'
  for(let i = 1; i < n; i++){
    prev = prev.replace(/(\d)\1*/g, item =>`${item.length}${item[0]}`)
  }
  return prev
}

// 方法三: https://leetcode-cn.com/problems/count-and-say/solution/ji-su-jie-bu-di-gui-zhi-ji-lu-qian-hou-liang-ren-p/
// 不递归，只记录前后两人
function countAndSay (n) {
  let prev_person = '1'
  for (let i = 1; i < n; i++) {
    let next_person = ''
    let num = prev_person[0]
    let count = 1
    for (let j = 1; j < prev_person.length; j++) {
      if (prev_person[j] === num) {
        count += 1
      } else {
        next_person += (count + num)
        num = prev_person[j]
        count = 1
      }
    }
    next_person += (count + num)
    prev_person = next_person
  }
  return prev_person
}

console.log(countAndSay(2))
console.log(countAndSay(3))
console.log(countAndSay(4))
console.log(countAndSay(6))
```
