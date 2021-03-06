# 实现indexOf方法

[实现indexOf方法](https://leetcode-cn.com/problems/implement-strstr/)

```
实现 strStr() 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

示例 1:
输入: haystack = "hello", needle = "ll"
输出: 2

示例 2:
输入: haystack = "aaaaa", needle = "bba"
输出: -1

说明:

当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。
```

## 方法一: 双重循环

```js
function indexOf(haystack, needle) {
  if (!needle) {
    return 0
  }
  let strLen = haystack.length
  let needleLen = needle.length
  if (!haystack || needleLen > strLen) {
    return -1
  }
  let i = 0
  let finded = false
  for (; i < strLen; i++) {
    // 如果剩余的字符数不够匹配needle，直接跳出
    if (strLen - i < needleLen) {
      break
    }
    if (haystack[i] === needle[0]) {
      finded = true
      for (let j = 1; j < needleLen; j++) {
        if (haystack[i + j] !== needle[j]) {
          finded = false
          break
        }
      }
    }
    if (finded) {
      break
    }
  }
  return finded ? i : -1
}
```

## 方法二: 暴力匹配，优化方法一

```js
function indexOf1(haystack, needle) {
  if (!needle) {
    return 0
  }
  let M = needle.length
  let N = haystack.length
  for (let i = 0; i <= N - M; i++) {
    let j;
    for (j = 0; j < M; j++) {
      if (needle[j] !== haystack[i + j]) {
        break;
      }
    }
    // needle 全都匹配了
    if (j == M) return i;
  }
  // haystack 中不存在 needle 子串
  return -1;
}
```

## 方法三: Sunday解法

https://leetcode-cn.com/problems/implement-strstr/solution/python3-sundayjie-fa-9996-by-tes/

```js
// 非常强大的一种方法 对比前两种方法，该方法是直接截取 needle 位字符进行比较，而不是一位一位的找
// 每次比较过后，如果不符合，则会计算一个 ids 偏移量，这个非常关键，也不是很好理解，会跳过没有可能符合的位数
// 最后虽然用时增加了，但是思想确实吊
function indexOf2(haystack, needle) {
  let needleLen = needle.length
  let haystackLen = haystack.length
  //  Func: 计算偏移表 细节，相同字母只会记录最靠右的字符的偏移量，保证最完整的可能性
  function calShiftMat(st) {
    let dic = {}
    let len = st.length
    for (let i = len - 1; i > -1; i--) {
      if (!dic[st[i]]) {
        dic[st[i]] = len - i
      }
    }
    dic['ot'] = len + 1 // 仅是一个特殊标记，对于在 needle 中找不到的字符，会跳过 needle length 位
    return dic
  }
  // 其他情况判断
  if (needleLen > haystackLen) {
    return -1
  }
  if (!needle) {
    return 0
  }

  // 偏移表预处理
  let dic = calShiftMat(needle)
  let idx = 0

  while (idx + needleLen <= haystackLen) {
    // console.log(idx + needleLen)
    // 待匹配字符串
    let str_cut = haystack.slice(idx, idx + needleLen)
    // 判断是否匹配
    if (str_cut === needle) {
      return idx
    } else {
      // 边界处理 这里其实只需要判断等于即可，因为能进到 while 中肯定是小于等于了，而且在等于 haystackLen 时也不匹配，说明找不到
      if (idx + needleLen >= haystackLen) {
        return -1
      }
      // 不匹配情况下，根据下一个字符的偏移，移动idx
      // 这里非常重要：根据下一位的字符，决定偏移多少 例如 (hello, ll)，第一次 while he 不等于 ll，这个时候我们往后一位取到 l，我们发现 ll 偏移量最右边的就是 l，所以我们下次偏移结尾是 l 是有可能匹配到的，所以只需要偏移一位，即取 cl 来比较
      let cur_c = haystack[idx + needleLen]
      if (dic[cur_c]) {
        idx += dic[cur_c]
      } else {
        idx += dic["ot"]
      }
    }
  }
  // 这里其实只需要返回 idx 即可，while中已经兜底了
  return idx + needleLen >= haystackLen ? -1 : idx
}
```

## 方法四: KMP算法

https://leetcode-cn.com/problems/implement-strstr/solution/kmp-suan-fa-xiang-jie-by-labuladong/

```js
// B站视频讲解，总体思路和Sunday解法一致，只是回退过程中，跳过了更多无效的位置  https://www.bilibili.com/video/av11866460
// 下边写法是参照B站来的
function indexOf3 (haystack, needle) {
  let strLen = haystack.length
  let subLen = needle.length
  if (subLen === 0) {
    return 0
  }
  if (strLen === 0) {
    return -1
  }
  /**
    * 构建 prefix table: 最大相同前后缀子串，用到了动态规划
    * @params {String} pattern 待匹配的字符串，同 needle
    * @return {number[]} prefix
    * @example 'ababcabaa' => [0, 0, 1, 2, 0, 1, 2, 3, 1]
    */
  function genPrefixTable (pattern) {
    let prefix = []
    prefix[0] = 0
    let patternLen = pattern.length
    let len = 0
    let i = 1
    while (i < patternLen) {
      if (pattern[i] === pattern[len]) {
        len++
        prefix[i] = len
        i++
      } else {
        if (len > 0) {
          len = prefix[len - 1]
        } else {
          prefix[i] = len
          i++
        }
      }
    }
    return prefix
  }

  // 对 genPrefixTable 进行移位，往后移动一位，第一位补-1 例如： [0, 0, 1, 2, 0, 1, 2, 3, 1] => [-1, 0, 0, 1, 2, 0, 1, 2, 3]
  function movePrefixTable (prefix) {
    let len = prefix.length
    for (let i = len - 1; i > 0; i--) {
      prefix[i] = prefix[i - 1]
    }
    prefix[0] = -1
    // return prefix // 直接修改的原数组，不用返回了
  }

  let prefix = genPrefixTable(needle)
  movePrefixTable(prefix)

  let i = 0 // haystack[i]
  let j = 0 // needle[j]

  while (i < strLen) {
    if (haystack[i] === needle[j]) {
      if (j === subLen - 1) {
        // 说明找到一个匹配的子串
        // console.log('found ', i - j)
        return i - j
        // 如果想接着往下找
        // j = prefix[j]
        // if (j === -1) {
        //   i++;
        //   j++
        // }
      } else {
        i++;
        j++
      }
    } else {
      j = prefix[j]
      if (j === -1) {
        i++;
        j++
      }
    }
  }
  return -1
}

// console.log(indexOf("hello", "ll"))
// console.log(indexOf("aaaaa", "bba"))

// console.log(indexOf1("hello", "ll"))
// console.log(indexOf1("aaaaa", "bba"))
// console.log(indexOf1("a", "a"))

// console.log(indexOf2("hello", "ll"))
// console.log(indexOf2("aaaaa", "bba"))
// console.log(indexOf2("a", "a"))

console.log(indexOf3("hello", "ll"))
console.log(indexOf3("aaaaa", "bba"))
console.log(indexOf3("a", "a"))
console.log(indexOf3("a", 'ababcabaa'))
```
