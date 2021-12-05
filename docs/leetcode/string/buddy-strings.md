# 亲密字符串

[亲密字符串-简单](https://leetcode-cn.com/problems/buddy-strings)

```
给你两个字符串 s 和 goal ，只要我们可以通过交换 s 中的两个字母得到与 goal 相等的结果，就返回 true ；否则返回 false 。

交换字母的定义是：取两个下标 i 和 j （下标从 0 开始）且满足 i != j ，接着交换 s[i] 和 s[j] 处的字符。

例如，在 "abcd" 中交换下标 0 和下标 2 的元素可以生成 "cbad" 。

示例 1：
输入：s = "ab", goal = "ba"
输出：true
解释：你可以交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 相等。

示例 2：
输入：s = "ab", goal = "ab"
输出：false
解释：你只能交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 不相等。

示例 3：
输入：s = "aa", goal = "aa"
输出：true
解释：你可以交换 s[0] = 'a' 和 s[1] = 'a' 生成 "aa"，此时 s 和 goal 相等。

示例 4：
输入：s = "aaaaaaabc", goal = "aaaaaaacb"
输出：true

提示：
1 <= s.length, goal.length <= 2 * 104
s 和 goal 由小写英文字母组成
```

## 方法 1: 枚举

[官方题解](https://leetcode-cn.com/problems/buddy-strings/solution/qin-mi-zi-fu-chuan-by-leetcode-solution-yyis/)

```js
var buddyStrings = function(s, goal) {
  if (s.length != goal.length) {
    return false;
  }

  if (s === goal) {
    // 如果 s 和 goal 相等，只要找到 s 中存在两个相等的字符即可
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s[i].charCodeAt() - "a".charCodeAt()]++;
      if (count[s[i].charCodeAt() - "a".charCodeAt()] > 1) {
        return true;
      }
    }
    return false;
  } else {
    // s !== goal的时候，两个字符串只有两个位置不想等，其余位置都得想等，first 和 second 分别标记两个不一样的位置
    let first = -1,
      second = -1;
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== goal[i]) {
        if (first === -1) first = i;
        else if (second === -1) second = i;
        else return false;
      }
    }

    return (
      second !== -1 && s[first] === goal[second] && s[second] === goal[first]
    );
  }
};
```

## 方法 2: 模拟

```js
// https://leetcode-cn.com/problems/buddy-strings/solution/gong-shui-san-xie-jian-dan-zi-fu-chuan-m-q056/
function buddyStrings(s, goal) {
  if (s.length !== goal.length) {
    return false;
  }
  // 保存各个字符串中每个字符出现的次数，且统计了按位置比较大小不同的次数
  let cnt1 = new Array(26).fill(0),
    cnt2 = new Array(26).fill(0);
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    let a = s[i].charCodeAt() - "a".charCodeAt();
    let b = goal[i].charCodeAt() - "a".charCodeAt();
    cnt1[a]++;
    cnt2[b]++;
    if (a !== b) {
      sum++;
    }
  }
  let ok = false;
  for (let i = 0; i < 26; i++) {
    if (cnt1[i] !== cnt2[i]) {
      return false;
    }
    if (cnt1[i] > 1) {
      ok = true;
    }
  }
  return sum === 2 || (sum === 0 && ok);
}
```
