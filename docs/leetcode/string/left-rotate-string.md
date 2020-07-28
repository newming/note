# 字符串循环左移

```
给定一个字符串S[0, ...N-1]，要求把S的前k个字符移动到S的尾部
如把字符串 'abcdef' 前面的2个字符 'a', 'b' 移动到字符串的尾部
得到新的字符串 'cdefab'，即字符串循环左移k

循环左移k位等价于循环右移n-k位

算法要求: 时间复杂度O(n) 空间复杂度 O(1)
```

## 方法1: 暴力法

```js
/**
 * 方法一：暴力法
 * 每次循环左移一位，调用 k 次即可
 * 时间复杂度O(kN) 空间复杂度 O(1)
 */
```

## 方法2: 三次拷贝

```js
/**
 * 方法二：三次拷贝
 * S[0, ...k] -> T[0, ...k]
 * S[k+1, ...N-1] -> S[0, N-k-1]
 * T[0, ...k] -> S[N-k, ...N-1]
 * 时间复杂度O(N) 空间复杂度 O(K)
 */
```

## 方法3: 翻转

```js
/**
 * 方法三：翻转
 * (X'Y')' = YX
 * 如: abcdef
 * X = ab, X' = ba
 * Y = cdef, Y' = fedc
 * (X'Y')' = (bafedc)' = cdefab
 * 时间复杂度 O(N) 空间复杂度 O(1)
 * 在完美洗牌中还会遇到这个问题
 */

function reverseString(str, from, to) {
  var strAry = str.split('')
  // 字符串从 from 到 to 位置进行翻转
  while (from < to) {
    let t = strAry[from]
    strAry[from++] = strAry[to]
    strAry[to--] = t
  }
  return strAry.join('')
}

function leftRotateString(str, m) {
  // str 前 m 位 移到 str 的尾部
  var len = str.length
  m %= len
  str = reverseString(str, 0, m - 1)
  str = reverseString(str, m, len - 1)
  str = reverseString(str, 0, len - 1)
  return str
}

var a = '123456789'
console.log(leftRotateString(a, 3))
```
