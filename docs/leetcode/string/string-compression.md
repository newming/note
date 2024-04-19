# 压缩字符串-中等

[压缩字符串-中等](https://leetcode.cn/problems/string-compression/description/)

```
给你一个字符数组 chars ，请使用下述算法压缩：

从一个空字符串 s 开始。对于 chars 中的每组 连续重复字符 ：

- 如果这一组长度为 1 ，则将字符追加到 s 中。
- 否则，需要向 s 追加字符，后跟这一组的长度。

压缩后得到的字符串 s 不应该直接返回 ，需要转储到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符。

请在 修改完输入数组后 ，返回该数组的新长度。

你必须设计并实现一个只使用常量额外空间的算法来解决此问题。

示例 1：
输入：chars = ["a","a","b","b","c","c","c"]
输出：返回 6 ，输入数组的前 6 个字符应该是：["a","2","b","2","c","3"]
解释："aa" 被 "a2" 替代。"bb" 被 "b2" 替代。"ccc" 被 "c3" 替代。

示例 2：
输入：chars = ["a"]
输出：返回 1 ，输入数组的前 1 个字符应该是：["a"]
解释：唯一的组是“a”，它保持未压缩，因为它是一个字符。

示例 3：
输入：chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
输出：返回 4 ，输入数组的前 4 个字符应该是：["a","b","1","2"]。
解释：由于字符 "a" 不重复，所以不会被压缩。"bbbbbbbbbbbb" 被 “b12” 替代。


提示：
1 <= chars.length <= 2000
chars[i] 可以是小写英文字母、大写英文字母、数字或符号
```

## 方法 1: 双指针

为了实现原地压缩，我们可以使用双指针分别标志我们在字符串中读和写的位置。每次当读指针 read\textit{read}read 移动到某一段连续相同子串的最右侧，我们就在写指针 write 处依次写入该子串对应的字符和子串长度即可。

在实际代码中，当读指针 read 位于字符串的末尾，或读指针 read 指向的字符不同于下一个字符时，我们就认为读指针 read 位于某一段连续相同子串的最右侧。该子串对应的字符即为读指针 read 指向的字符串。我们使用变量 left 记录该子串的最左侧的位置，这样子串长度即为 read−left+1。

特别地，为了达到 O(1) 空间复杂度，我们需要自行实现将数字转化为字符串写入到原字符串的功能。这里我们采用短除法将子串长度倒序写入原字符串中，然后再将其反转即可。

```js
// https://leetcode.cn/problems/string-compression/solutions/948556/ya-suo-zi-fu-chuan-by-leetcode-solution-kbuc/
var compress = function(chars) {
  const n = chars.length;
  let write = 0,
    left = 0;
  for (let read = 0; read < n; read++) {
    if (read === n - 1 || chars[read] !== chars[read + 1]) {
      chars[write++] = chars[read];
      let num = read - left + 1;
      if (num > 1) {
        const anchor = write;
        while (num > 0) {
          // 这里了可以简单点处理，将 num 转 string 然后通过 string length 依次取出来放到 chars 中
          chars[write++] = "" + (num % 10);
          num = Math.floor(num / 10);
        }
        reverse(chars, anchor, write - 1);
      }
      left = read + 1;
    }
  }
  return write;
};

const reverse = (chars, left, right) => {
  while (left < right) {
    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    left++;
    right--;
  }
};
```
