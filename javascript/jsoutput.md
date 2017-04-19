# 页面中常用的几种输出方式

- 在浏览器控制台输出
  - console.log('aaa');
  - console.dir(obj) 在控制台输出一个对象的详细信息
  - console.table() 把一个数据(json)按照表格形式输出，查看结构时更加清晰
- 给一个dom元素添加内容
  - innerText innerHTML
- 浏览器弹出框
  - alert('aaa'); 把我们要输出的内容先转化为字符串然后输出
  - confirm('aaa'); 确认选择框
- 在页面中输出内容 document.write() 经常在页面中添加一个广告用这个
