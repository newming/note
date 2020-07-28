# 版本号比较

[版本号比较](https://leetcode-cn.com/problems/compare-version-numbers/)

```
比较两个版本号 version1 和 version2。
如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1， 除此之外返回 0。

你可以假设版本字符串非空，并且只包含数字和 . 字符。

. 字符不代表小数点，而是用于分隔数字序列。

例如，2.5 不是“两个半”，也不是“差一半到三”，而是第二版中的第五个小版本。

你可以假设版本号的每一级的默认修订版号为 0。例如，版本号 3.4 的第一级（大版本）和第二级（小版本）修订号分别为 3 和 4。其第三级和第四级修订号均为 0。

示例 1:
输入: version1 = "0.1", version2 = "1.1"
输出: -1

示例 2:
输入: version1 = "1.0.1", version2 = "1"
输出: 1

示例 3:
输入: version1 = "7.5.2.4", version2 = "7.5.3"
输出: -1

示例 4：
输入：version1 = "1.01", version2 = "1.001"
输出：0
解释：忽略前导零，“01” 和 “001” 表示相同的数字 “1”。

示例 5：
输入：version1 = "1.0", version2 = "1.0.0"
输出：0
解释：version1 没有第三级修订号，这意味着它的第三级修订号默认为 “0”。

提示：
版本字符串由以点 （.） 分隔的数字字符串组成。这个数字字符串可能有前导零。
版本字符串不以点开始或结束，并且其中不会有两个连续的点。
```

[参考链接](https://leetcode-cn.com/problems/compare-version-numbers/solution/bi-jiao-ban-ben-hao-by-leetcode/)

## 方法1 分割+解析，两次遍历，线性空间

```js
function compareVersion (version1, version2) {
  let nums1 = version1.split('.')
  let nums2 = version2.split('.')
  let n1 = nums1.length
  let n2 = nums2.length
  let i1, i2
  for (let i = 0; i < Math.max(n1, n2); i++) {
    i1 = i < n1 ? parseInt(nums1[i]) : 0
    i2 = i < n2 ? parseInt(nums2[i]) : 0
    if (i1 !== i2) {
      return i1 > i2 ? 1 : -1
    }
  }
  return 0
}
```

## 方法2 双指针

```js
// 时间复杂度 O(Max(N, M))
// 空间复杂度 O(1)
function getNextChunk(version, n, p) {
  // if pointer is set to the end of string
  // return 0
  if (p > n - 1) {
    return [0, p]
  }
  // find the end of chunk
  let i, pEnd = p
  while (pEnd < n && version.charAt(pEnd) !== '.') {
    ++pEnd
  }
  // retrieve the chunk
  i = parseInt(version.substring(p, pEnd))

  // find the beginning of next chunk
  p = pEnd + 1

  return [i, p]
}

function compareVersion (version1, version2) {
  let p1 = 0, p2 = 0
  let n1 = version1.length, n2 = version2.length
  // compare versions
  let i1, i2
  let pair
  while (p1 < n1 || p2 < n2) {
    pair = getNextChunk(version1, n1, p1)
    i1 = pair[0]
    p1 = pair[1]

    pair = getNextChunk(version2, n2, p2)
    i2 = pair[0]
    p2 = pair[1]
    if (i1 !== i2) {
      return i1 > i2 ? 1 : -1
    }
  }
  // the versions are equal
  return 0
}

console.log(compareVersion('0.1', '1.1'))
console.log(compareVersion('1.0.1', '1'))
console.log(compareVersion('7.5.2.1', '7.5.3'))
console.log(compareVersion('1.01', '1.001'))
console.log(compareVersion('1.0', '1.0.0'))
```
