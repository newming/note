# leetcode 练习笔记

## 参考链接

- [git 上别人的 leetcode 题解笔记](https://github.com/azl397985856/leetcode)
- [git 上别人的 leetcode 题解笔记](https://github.com/DangoSky/algorithm)
- [算法与数据结构文章列表-不错](https://www.itcodemonkey.com/category/TheAlgorithm/)
- [王争-算法与数据结构专栏](https://github.com/wangzheng0822/algo)
- [labuladong](https://labuladong.gitbook.io/algo/)
- [labuladong 的算法小抄](https://github.com/labuladong/fucking-algorithm)
- [LeetCode 刷题-知乎专栏](https://zhuanlan.zhihu.com/c_1047791597869199360)
- [算法笔记-碎对象](https://wangyaxing.cn/blog/)
- [常见算法面试题](https://techinterviewhandbook.org/algorithms/introduction/)
- [可视化数据结构和算法演示](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
- [字节跳动最爱考的 64 道算法题（JS 版）](https://juejin.cn/post/6947842412102287373)
- [代码随想录](https://www.programmercarl.com/)
- [LeetCode 题解 Js 版](https://webbj97.github.io/leetCode-Js/)
- [LeetCodeCookbook](https://books.halfrost.com/leetcode/)
- [视频讲解](https://xiaochen1024.com/)

https://leetcode-cn.com/problemset/all/

## String

- [无重复字符的最长子串-中等](string/longest-substring-without-repeating-characters.md)
- [最长回文子串-中等](string/longest-palindromic-substring.md)
- [最长公共子序列 LCS-中等-未完成](string/longest-common-subsequence.md)
- [最长上升子序列](string/longest-increasing-subsequence.md)
- [罗马数字转整数](string/roman-to-integer.md)
- [字符串循环左移](string/left-rotate-string.md)
- [字符串的全排列](string/string-permutation.md)
- [去除重复字母-困难](string/remove-duplicate-letters.md)
- [寻找最长公共前缀](string/longest-common-prefix.md)
- [有效的括号(平衡圆括号)-简单](string/valid-parentheses.md)
- [实现字符串方法 strStr(indexOf)(这里还涉及到 prefixTable 动态规划获取)-简单](String/implement-indexof.md)
- [报数-简单](string/count-and-say.md)
- [反转字符串-简单](string/reverse-string.md)
- [字符串中的第一个唯一字符-简单](string/first-unique-character-in-a-string.md)
- [有效的字母异位词-简单](string/valid-anagram.md)
- [验证回文串](string/valid-palindrome.md)
- [验证回文字符串 II](string/valid-palindrome-2.md)
- [字符串转换整数(atoi)](string/string-to-integer-atoi.md)
- [版本号比较](string/compare-version-numbers.md)
- [括号生成-中等](string/generate-parentheses.md)
- [千位分割数-简单](string/thousand-separator.md)
- [亲密字符串](string/buddy-strings.md)

### LCS 的定义

- 最长公共子序列，即 Longest Common Subsequnce，LCS
- 一个序列 S 任意删除若干个字符得到的新序列 T，则 T 叫做 S 的子序列
- 两个序列 X 和 Y 的公共子序列中，长度最长的那个，定义为 X 和 Y 的最长公共子序列
  - 字符串 13455 和 245576 的最长公共子序列为 455
  - 字符串 acdfg 与 adfc 的最长公共子序列为 adf
- 注意区别最长公共子串(Longest Common Substring)，最长公共子串要求连续

## Array/队列

- [两数之和-简单](array/two-sum.md)
- [两数相加-中等](array/add-two-numbers.md)
- [寻找两个排序数组的中位数-困难](array/median-of-two-sorted-arrays.md)
- [买卖股票的最佳时机](array/best-time-to-buy-and-sell-stock.md)
- [买卖股票的最佳时机 II](array/best-time-to-buy-and-sell-stock-ii.md)
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
- [存在重复元素 2-简单](array/contains-duplicate-2.md)
- [存在重复元素 3-简单](array/contains-duplicate-3.md)
- [只出现一次的数字](array/single-number.md)
- [只出现一次的数字 II](array/single-number-2.md)
- [只出现一次的数字 III](array/single-number-3.md)
- [两个数组的交集-简单](array/intersection-of-two-arrays.md)
- [两个数组的交集 2-简单](array/intersection-of-two-arrays-2.md)
- [加一-简单](array/plus-one.md/)
- [移动零-简单](array/move-zeroes.md)
- [有效的数独-中等](array/valid-sudoku.md)
- [旋转图像](array/rotate-image.md)
- [合并两个有序数组-简单](array/merge-sorted-array.md)
- [颜色分类-中等](array/sort-colors.md)
- [杨辉三角-简单](array/pascals-triangle.md)
- [搜索旋转排序数组-中等](array/search-in-rotated-sorted-array.md)
- [搜索旋转排序数组 II-中等](array/search-in-rotated-sorted-array-ii.md)
- [搜索旋转数组-中等](array/search-rotate-array-lcci.md)
- [寻找数组的中心下标-简单](array/find-pivot-index.md)
- [盛最多水的容器-中等](array/container-with-most-water.md)
- [最小 K 个数-中等](array/smallest-k-lcci.md)
- [最长连续递增序列-简单](array/longest-continuous-increasing-subsequence.md)
- [最长递增子序列-中等](array/longest-increasing-subsequence.md)
- [设计循环队列-中等](array/design-circular-queue.md)
- [设计循环双端队列-中等](array/design-circular-deque.md)
- [最近的请求次数](array/number-of-recent-calls.md)

## Number

- [整数反转-简单](number/reverse-integer.md)
- [判断一个数字是否是回文数](number/palindrome-number.md)
- [计数质数](number/count-primes.md)

## 链表

- [合并两个有序链表-简单](linked-list/merge-two-sorted-lists.md)
- [删除链表中的节点](linked-list/delete-node-in-a-linked-list.md)
- [删除链表的倒数第 N 个节点](linked-list/remove-nth-node-from-end-of-list.md)
- [反转链表](linked-list/reverse-linked-list.md)
- [反转链表 II](linked-list/reverse-linked-list-2.md)
- [回文链表](linked-list/palindrome-linked-list.md)
- [环形链表](linked-list/linked-list-cycle.md)
- [链表的中间节点](linked-list/middle-of-the-linked-list.md)
- [删除排序链表中的重复元素](linked-list/remove-duplicates-from-sorted-list.md)
- [旋转链表](linked-list/rotate-list.md)
- [两两交换链表中的节点](linked-list/swap-nodes-in-pairs.md)
- [分隔链表](linked-list/partition-list.md)

## 树

- [二叉树的最大深度-简单](tree/maximum-depth-of-binary-tree.md)
- [验证二叉搜索树-中等](tree/validate-binary-search-tree.md)
- [对称二叉树-简单](tree/symmetric-tree.md)
- [二叉树的层序遍历-中等](tree/binary-tree-level-order-traversal.md)
- [二叉树的后序遍历](tree/binary-tree-postorder-traversal.md)
- [将有序数组转换为二叉搜索树-简单](tree/convert-sorted-array-to-binary-search-tree.md)

## 回溯算法

- [组合总数-中等](backtracking/combination-sum.md)

## 动态规划

- [爬楼梯-简单](dp/climbing-stairs.md)
- [买卖股票的最佳时机](array/best-time-to-buy-and-sell-stock.md)
- [最大子序和](array/maximum-subarray.md)
- [打家劫舍](dp/house-robber.md)

## 图算法

- [狄克斯特拉算法-寻找加权图中前往 X 最短路径](graph/dijkstra.md)

## 搜索 search

- [第一个错误的版本-简单](search/first-bad-version.md)
