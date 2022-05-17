# 跨域&处理

CORS（Cross-Origin Resource Sharing，跨域资源共享）: 浏览器的一种基于 http 头机制的安全策略。[mdn 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

- 协议
- 域名
- 端口

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## 跨域场景

- cookie, localStorage
- DOM 的同源策略，例如 iframe, drawImage, web 字体
- ajax 不支持跨域

## 处理方式

- cors
- jsonp
- postMessage
- document.domain: 由于 JavaScript 同源策略的限制，脚本只能读取和所属文档来源相同的窗口和文档的属性。设置 document.domain 为根域名后，x = window.open(other.xx.com) 可以拿到 other.xx.com 的 window 属性。包括读取 iframe 的 window 也需要该属性
- window.name
- location.hash
- proxy
- nginx
- websocket: 本身无 http 响应头，所以无跨域限制
