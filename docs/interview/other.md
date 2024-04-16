# 计算机基础（选 1-2 题）

- 操作系统（二选一）

  - 进程间通信有哪几种方式
  - 死锁是如何形成的，如何避免死锁。

- 组成原理： 计算机指令执行过程中，CPU 如何访问内存？

- 计算机网络（二选一）

  - TCP 如何实现流量控制。
  - 计算机网络： 子网掩码起到什么作用。

- 数据结构 & 算法：给出 1、21、9、18、4、13 这组数构建大根堆的过程。

# 前端基础题目

## JS（选 2-3 题）

- 隐式转换

```js
if ([] == false) {
  console.log(1);
}
if ({} == false) {
  console.log(2);
}
if ([]) {
  console.log(3);
}
if ([1] == [1]) {
  console.log(4);
}
```

- 原型链

function exampleFunc () {}

exampleFunc.prototype.**proto**

exampleFunc.**proto**

exampleFunc.**proto**.**proto**

exampleFunc.**proto**.**proto**.**proto**

- 变量提升

  - 函数提升
  - 变量提升
  - 块级作用域、暂时性死区

```js
function showName() {
  console.log("test1");
}
showName();

function showName() {
  console.log("test2");
}
showName();

//--------------

var myname = "abc";

function showName2() {
  console.log(myname);
  var myname = "aabbcc";
  console.log(myname);
}
showName2();

//--------------

let myname3 = "toutiao";
{
  console.log(myname3);
  let myname3 = "oceanengine";
}
```

- [函数防抖(debounce) & 函数节流(throttle) ](https://juejin.im/post/5a35ed25f265da431d3cc1b1)的概念/应用场景，防抖的实现原理
- 冒泡&捕获、事件监听 https://jsbin.com/meyotuqopu/edit?html,js,output
- [事件循环机制](http://js.jirengu.com/zoyizejuza/2/edit?js,console)、node 事件循环理解
- vue 父子组件生命周期执行顺序 https://segmentfault.com/a/1190000015890245
- javascript 判断 object 是否数组 https://segmentfault.com/a/1190000006150186

<!---->

- TS 了解 & js->ts

```js
let bob = {
  firstName: "Bob",
  lastName: "Zhang",
  age: 27,
};

let jack = {
  firstName: "Jack",
  lastName: "Ma",
};

function doit(people) {
  return `${people.firstName} ${people.lastName} is ${people.age} years old`;
}

doit(bob);
doit(jack);
```

## CSS（选 1-2 题）

- CSS 画气泡对话框（考察：盒模型理解、border 实现三角形、伪元素、定位）
- 三列布局，左右定宽，中间自适应，三列等高：https://wangyaxing.cn/blog/interview/CSS/%E5%B8%B8%E8%A7%81CSS%E5%B8%83%E5%B1%80%E7%9A%84%E5%AE%9E%E7%8E%B0.html#%E4%B8%89%E5%88%97%E5%B8%83%E5%B1%80
- position 与 z-index 的关系 https://www.cnblogs.com/mind/archive/2012/04/01/2198995.html
- 重绘、重排、合成 的理解：https://juejin.cn/post/6976277712453238792
  - 浏览器 渲染流程 的大概过程：构建 DOM 树（DOM）、样式计算（Style）、获取布局树（Layout）、生成图层树（Layer）、图层绘制（Paint）、栅格化处理（Raster）、合成显示（DrawQuad）。

## 其他（选 1-2 题）

- cookie 和 localstorage, sessionstorage 的区别
- 跨域理解
- http/http2/https/websocket 对比
- 常用 http 状态码（200/302/304/404/401/500/502）
- git 基础操作（pull/push/fetch/merge/rebase）
- 判断元素是否在视窗可视 https://imweb.io/topic/5c7bc84ebaf81d7952094978?utm_source=tuicool&utm_medium=referral
  - https://vue3js.cn/interview/JavaScript/visible.html#%E4%B8%80%E3%80%81%E7%94%A8%E9%80%94

# 编程

- 对于任意一个不存在重复字母的集合：

  - 编写求其全排列算法。
  - 如果 1.a 能够完成，再问按照字典顺序给出全排列的算法。

- 对于给定数组，包含的数字个数为 N， 其中出现次数超过 N/2 的数字，称为绝对众数，给出求绝对众数的算法。

  - 暴力给出解也可以。
  - 如果能给出一遍 O(n)的算法，则算优秀。

- 对于给定平衡二叉树

  - 按照从小到大的顺序遍历二叉树。
  - 给出 3.a 的非递归写法。

- 判断出栈队列是否合法

  - 中等，算法：https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/solution/mian-shi-ti-31-zhan-de-ya-ru-dan-chu-xu-lie-mo-n-2/
  - 先问栈、队列理解；手动判断；

```java
class Solution {
    public boolean validateBookSequences(int[] putIn, int[] takeOut) {
        Stack<Integer> stack = new Stack<>();
        int i = 0;
        for(int num : putIn) {
            stack.push(num); // num 入栈
            while(!stack.isEmpty() && stack.peek() == takeOut[i]) { // 循环判断与出栈
                stack.pop();
                i++;
            }
        }
        return stack.isEmpty();
    }
}
// 链接：https://leetcode.cn/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/solutions/215152/mian-shi-ti-31-zhan-de-ya-ru-dan-chu-xu-lie-mo-n-2/

```

- [二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

  - 中等，算法

<!---->

- 参考题解：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/solution/jian-zhi-offer33di-gui-qiu-jie-by-lisa-6/

- 如何判断 npm 包没有循环依赖(有向图找环)

  - 中等，抽象能力、算法
  - 题解参考：https://leetcode-cn.com/problems/course-schedule/solution/tuo-bu-pai-xu-shen-du-you-xian-qiu-ke-cheng-biao-s/

- 【备选简单题】[压缩字符串](https://leetcode-cn.com/problems/string-compression/)

  - 能用原地修改方案解决的加分

```js
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

// https://leetcode.cn/problems/string-compression/solutions/948556/ya-suo-zi-fu-chuan-by-leetcode-solution-kbuc/
```

- 【备选简单题】[打印杨辉三角前 N 行](https://leetcode-cn.com/problems/pascals-triangle/)

  - 第 0 行的容错有考虑加分

# 设计（选 1 题）

> 重点考察设计的 系统性、完整性、鲁棒性 思维能力

- 分布式缓存设计 https://marvel.bytedance.net/#/question/details/108

- 关系系统设计 https://marvel.bytedance.net/#/question/details/489

- 设计一个 DB 系统的文件存储

  - 考虑数据表的存储，主要是数据结构。 如果能考虑到多版本等，加分。
  - 考虑视图表存储。
  - 考虑索引文件的数据结构

- 设计一个记录&上报用户页面停留时长的 SDK https://yq.aliyun.com/articles/635301

<!---->

- 拖拽排序的实现思路 https://segmentfault.com/a/1190000018794763

<!---->

- 在一亿条数据中，找到值最大的前 1000 条记录

# 逻辑题（附加题-选 1 题）

> 不做硬性要求考察，主要考察聪明程度、思维能力

- 概率论： 已知每 10 万人中有 1 人得艾滋病。现在有一种检查，如果被测者患病则一定能查出来。如果被测者没病，有 1%的测试出错也显示阳性。现在一个人检查结果是阳性。问真正得病的概率是 多少？

![](https://tech-proxy.bytedance.net/tos/images/1632645408677_f1b42f6d949a175738c264501324dbab)

- 经典题目： 现在有 7 个装满液体的试管，其中一支有毒，小白鼠只要摄入有毒的液体，则第二天必死。 现在需要在第二天知道 7 个试管中哪一支有毒，至少需要几只小白鼠。
- 对于一个由 N 个整数组成的数组，得到最大和最小的数的最少比较次数

方案一：分别求最大和最小值。这是一种比较常规的解法。可以分别求出数组的最大值和最小值，这样，我们可以采用最基本的冒泡思想遍历两次(2N)就能求解。

方案二：分组求解。由于前面的需要遍历 2N 次。这里为了使其遍历的次数减少，我们可以采用分组。

(1) 按顺序将数组中相邻的两个数分在同一组，逻辑上分组，实际什么都不用做；

(2) 比较同一组的两个数，将大的数放在偶数位上，小的放在奇数位上；

(3) 最后，从偶数位上求最大值，奇数位上求最小值即可。

这样一共需要比较 1.5N 次。这种办法虽然比较次数变少了，但却破坏了原数组，因为我们交换了数组数据的位置。

方案三：改进的分组。此种方法可以避免破坏原数据的顺序。

(1) 用两个变量 max 和 min 分别存储当前的最大值和最小值。

(2) 同一组的两个数比较完之后，不再调整顺序，将其中较大的与当前 max 比较，较小的与 min 比较；

(3) 如此反复，直到遍历完整个数组。

整个过程比较次数也为 1.5N 次，但是没有对原数据进行更改，如果数据是在只读存储区，那么该方法就能派上用场了。

方案四：分治策略。该方法用到归并排序中的 merge()函数，虽然方法不一样，但是可惜的比较的次数还是没有减少，仍然为 1.5N 次。在求解的过程中分别求出前后 N/2 个数的 min 和 max，然后，取较小的 min，较大的 max 即可。

这里主要是提醒一下经常用的两种思路：快排你的 partion()和归并里的 merge()，这两个函数的解决问题的思路十分常用。通常在解决问题的时候，要想到他们，是一种解决的思路。

- 门外三个开关分别对应室内三盏白炽灯，线路良好，在门外控制开关时候不能看到室内灯的情况，现在只允许进门一次，确定开关和灯的对应关系

先开一盏，然后关掉，再重新开另外一盏灯，进去后，摸灯，热的那个是最开始的那个开关控制，亮的是当前打开的开关控制，最后一个则是没有开过的那个

- 进阶问题：四个开关四盏灯呢？
