# leetcode 练习笔记

## 参考链接

- [git上别人的leetcode题解笔记](https://github.com/azl397985856/leetcode)
- [git上别人的leetcode题解笔记](https://github.com/DangoSky/algorithm)
- [算法与数据结构文章列表-不错](https://www.itcodemonkey.com/category/TheAlgorithm/)
- [王争-算法与数据结构专栏](https://github.com/wangzheng0822/algo)
- [labuladong](https://labuladong.gitbook.io/algo/)
- [labuladong](https://github.com/labuladong/fucking-algorithm)
- [LeetCode刷题-知乎专栏](https://zhuanlan.zhihu.com/c_1047791597869199360)
- [算法笔记-碎对象](https://wangyaxing.cn/blog/)

https://leetcode-cn.com/problemset/all/

## String

- [无重复字符的最长子串-中等](string/longest-substring-without-repeating-characters.md)
- [最长回文子串-中等](string/longest-palindromic-substring.md)
- [最长公共子序列LCS-中等-未完成](string/longest-common-subsequence.md)
- [最长上升子序列](string/longest-increasing-subsequence.md)
- [罗马数字转整数](string/roman-to-integer.md)
- [字符串循环左移](string/left-rotate-string.md)
- [字符串的全排列](string/string-permutation.md)
- [去除重复字母-困难](string/remove-duplicate-letters.md)
- [寻找最长公共前缀](string/longest-common-prefix.md)
- [有效的括号(平衡圆括号)-简单](string/valid-parentheses.md)
- [实现字符串方法strStr(indexOf)(这里还涉及到prefixTable动态规划获取)-简单](String/implement-indexof.md)
- [报数-简单](string/count-and-say.md)
- [反转字符串-简单](string/reverse-string.md)
- [字符串中的第一个唯一字符-简单](string/first-unique-character-in-a-string.md)
- [有效的字母异位词-简单](string/valid-anagram.md)
- [验证回文串](string/valid-palindrome.md)
- [验证回文字符串II](string/valid-palindrome-2.md)
- [字符串转换整数(atoi)](string/string-to-integer-atoi.md)
- [版本号比较](string/compare-version-numbers.md)
- [括号生成-中等](string/generate-parentheses.md)


### LCS的定义

- 最长公共子序列，即 Longest Common Subsequnce，LCS
- 一个序列S任意删除若干个字符得到的新序列T，则T叫做S的子序列
- 两个序列X和Y的公共子序列中，长度最长的那个，定义为X和Y的最长公共子序列
  - 字符串13455和245576的最长公共子序列为455
  - 字符串acdfg与adfc的最长公共子序列为adf
- 注意区别最长公共子串(Longest Common Substring)，最长公共子串要求连续

## Array

- [两数之和-简单](array/two-sum.md)
- [两数相加-中等](array/add-two-numbers.md)
- [寻找两个排序数组的中位数-困难](array/median-of-two-sorted-arrays.md)
- [买卖股票的最佳时机](array/best-time-to-buy-and-sell-stock.md)
- [买卖股票的最佳时机II](array/best-time-to-buy-and-sell-stock-ii.md)
- [最大子序和](array/maximum-subarray.md)
- [寻找旋转排序数组中的最小值](array/find-minimum-in-rotated-sorted-array.md)
- [寻找旋转排序数组中的最小值-2](array/find-minimum-in-rotated-sorted-array-2.md)
- [零子数组](array/zero-subarray.md)
- [按奇偶排序数组-简单](array/sort-array-by-parity.md)
- [删除排序数组中的重复项-简单](array/remove-duplicates-from-sorted-array.md)
- [移除元素-简单](array/remove-element.md)
- [搜索插入位置-简单](array/search-insert-position.md)
- [旋转数组-简单](array/rotate-array.md)
- [存在重复元素-简单](array/contains-duplicate.md)
- [存在重复元素2-简单](array/contains-duplicate-2.md)
- [存在重复元素3-简单](array/contains-duplicate-3.md)
- [只出现一次的数字](array/single-number.md)
- [只出现一次的数字II](array/single-number-2.md)
- [只出现一次的数字III](array/single-number-3.md)
- [两个数组的交集-简单](array/intersection-of-two-arrays.md)
- [两个数组的交集2-简单](array/intersection-of-two-arrays-2.md)
- [加一-简单](array/plus-one.md/)
- [移动零-简单](array/move-zeroes.md)
- [有效的数独-中等](array/valid-sudoku.md)
- [旋转图像](array/rotate-image.md)
- [合并两个有序数组-简单](array/merge-sorted-array.md)


## Number

- [整数反转-简单](number/reverse-integer.md)
- [判断一个数字是否是回文数](number/palindrome-number.md)


## 链表

- [合并两个有序链表-简单](linked-list/merge-two-sorted-lists.md)
- [删除链表中的节点](linked-list/delete-node-in-a-linked-list.md)
- [删除链表的倒数第N个节点](linked-list/remove-nth-node-from-end-of-list.md)
- [反转链表](linked-list/reverse-linked-list.md)
- [反转链表II](linked-list/reverse-linked-list-2.md)
- [回文链表](linked-list/palindrome-linked-list.md)
- [环形链表](linked-list/linked-list-cycle.md)
- [链表的中间节点](linked-list/middle-of-the-linked-list.md)

## 树

- [二叉树的最大深度-简单](tree/maximum-depth-of-binary-tree.md)
- [验证二叉搜索树-中等](tree/validate-binary-search-tree.md)
- [对称二叉树-简单](tree/symmetric-tree.md)
- [二叉树的层序遍历-中等](tree/binary-tree-level-order-traversal.md)
- [将有序数组转换为二叉搜索树-简单](tree/convert-sorted-array-to-binary-search-tree.md)

## 回溯算法

- [组合总数-中等](backtracking/combination-sum.md)

## 图算法

- [狄克斯特拉算法-寻找加权图中前往X最短路径](graph/dijkstra.md)
