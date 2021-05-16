# 千位分割数

[千位分割数-简单](https://leetcode-cn.com/problems/thousand-separator)

```js
给你一个整数 n，请你每隔三位添加点（即 "." 符号）作为千位分隔符，并将结果以字符串格式返回。

示例 1：
输入：n = 987
输出："987"

示例 2：
输入：n = 1234
输出："1.234"

示例 3：
输入：n = 123456789
输出："123.456.789"

示例 4：
输入：n = 0
输出："0"

提示：
0 <= n < 2^31
```

## 方法1: 正则表达式

```js
var thousandSeparator = function(n) {
  return n.toString()
    .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, '.'))
};

// 上边的搞复杂了
var thousandSeparator = function(n) {
  return n.toString().replace(/(?=(?!\b)(\d{3})+$)/g, '.')
};
```

## 方法2: 数学

```js
// https://leetcode-cn.com/problems/thousand-separator/solution/qian-wei-fen-ge-shu-by-leetcode-solution/
var thousandSeparator = function(n) {
  let count = 0;
  let ans = "";
  do {
    let cur = n % 10;
    n = Math.floor(n / 10);
    ans += cur.toString();
    ++count;
    if (count % 3 == 0 && n) {
      ans += '.';
    }
  } while (n);
  return ans.split('').reverse().join('');
};
```


## 方法3: 字符串遍历

```js
var thousandSeparator = (n) => {
  let res = ''
  for (let str = '' + n , i = str.length - 1, j = 1; i >= 0; i--, j++){
    res = (!(j % 3) && i ? '.' : '') + str[i] + res
  }
  return res
}
```

