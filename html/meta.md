# meta 相关的知识点

```html
<!-- 文本类型 -->
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">

<!-- 如果有 chrome 内核就用 chrome 内核，IE 的话就用最高版本的 edge 渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- 双核浏览器优先使用 webkit 内核 -->
<meta name="renderer" content="webkit">

<!-- dns 预解析 -->
<link rel="dns-prefetch" href="//static.360buyimg.com">
```