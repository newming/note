# replace 与 正则

把原有的字符串替换成新的字符，在不使用正则的情况下，每执行一次只会替换一个字符

```js
var str = "new1993new1103";
str = str.replace("new", "newming");
console.log(str); // newming1993new1103
str = str.replace("new", "newming");
console.log(str); // newmingming1993new1103
// 会发现每次都是找到第一个就执行替换了，所以会一直重复替换第一个new为newming

// 接下来用正则去替换
var str = "new1993new1103";
// str = str.replace(/new/, 'newming')
// console.log(str) // newming1993new1103 同样只替换一个

str = str.replace(/new/g, "newming");
console.log(str); // newming1993newming1103 全部替换
```

## replace 原理

replace 方法第一项参数为正则的时候的实现原理：首先同正则的 exec 方法将匹配的内容捕获到，然后将捕获到的内容替换为我们需要的内容

> 语法: str.replace(regexp|substr, newSubStr|function)

```js
var str = "new1993new1103";
str = str.replace(/new/g, function() {
  console.log(arguments); // 打印两次，每次打印的同exec执行几次的结果非常相似
  console.log(RegExp.$1); // 获取第一个分组匹配的内容 这里没有分组，所以空
  return "nweming";
});
console.log(str);

var str = "new1993new1103";
var reg = /(\d+)/g;
str = str.replace(reg, function() {
  console.log(arguments);
  console.log(RegExp.$1); // 1103, 注意不加g是有区别的
  return "ming";
});
console.log(str);
```

## 小案例

```js
// 1.文本替换
var str = "19931103";
var ary = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
str = str.replace(/\d/g, function() {
  // console.log(arguments[0]);
  return ary[arguments[0]];
});
console.log(str);

// 2.获取一个字符串中出现次数最多的字母及次数
var str = "adfdageilkjlioafdmyuyuierhk";
var obj = {};
// 获取每一个字符出现的次数
str.replace(/[a-z]/gi, function() {
  var val = arguments[0];
  obj[val] >= 1 ? (obj[val] += 1) : (obj[val] = 1);
});
// 获取出现次数最多的字母
var maxNum = 0;
for (var k in obj) {
  if (obj.hasOwnProperty(k)) {
    obj[k] > maxNum ? (maxNum = obj[k]) : null;
  }
}
// 把所有出现次数maxNum次的输出
var ary = [];
for (var key in obj) {
  if (obj.hasOwnProperty(key)) {
    obj[key] === maxNum ? ary.push(key) : null;
  }
}
console.log(
  `整个字符串中出现次数最多的字母是${ary.toString()}，出现次数是${maxNum}`
);

// 3.模板引擎初步
var str = "my name is {0}, my age is {1}, my hobby is {2}, i love {3}";
str = str.replace(/{(\d+)}/g, function() {
  return ary[arguments[1]];
});
console.log(str);

// 4.把一个字符串所有单词首字母大写
var str = "my name is newming"; // -> My Name Is Newming
str = str.replace(/(^[a-z]{1}|\s[a-z]{1})/g, function() {
  console.log(arguments);
  return arguments[1].toUpperCase();
});
console.log(str);

// 5.解析url
var str = "https://www.baidu.com/aa?mid=123&cid=456&v=1.2";
var reg = /([^?=&]+)=([^?=&]+)/g;

// method 1 RegExp exec
var obj = {};
var res = reg.exec(str);
while (res) {
  obj[res[1]] = res[2];
  res = reg.exec(str);
}
console.log(obj);
// method 2 replace
var obj = {};
str.replace(reg, function() {
  obj[arguments[1]] = arguments[2];
});
console.log(obj);

// 6.时间格式化
var str = "2017-6/10 16:9:23";
var reg = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})$/g;
var ary = [];
str.replace(reg, function() {
  // console.log(arguments);
  ary = [].slice.call(arguments, 1, 7);
  console.log(ary);
});
var resStr = "{0}年{1}月{2}日 {3}时{4}分{5}秒";
var resReg = /{(\d+)}/g;
resStr = resStr.replace(resReg, function() {
  var num = arguments[1];
  var val = ary[num];
  console.log(arguments, val);
  val = val < 10 ? "0" + val : val;
  return val;
});
console.log(resStr);
```
