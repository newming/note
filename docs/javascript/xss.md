# xss&csrf

- [如何防止 xss 攻击](https://juejin.im/post/5bad9140e51d450e935c6d64)
- [xsrf 或者 csrf 攻击防御](https://juejin.im/post/5bc009996fb9a05d0a055192)
- [字符串<script></script>为啥不行](https://stackoverflow.com/questions/28259389/how-to-put-script-in-a-javascript-string)
- [innerHTML 不执行 script 标签](https://juejin.im/entry/58cb529244d90400682e6012)
- [document.write](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/write)

## xss

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全

- 存储型
- 反射型
- DOM 型

```html
<body>
  <input type="text" id="text" />
  <div id="app"></div>
  <script>
    document.write('<script>alert(1234);<\/script
    var str = '<script>console.log(123)<' + '/script>'
    document.write(str)
    text.oninput = function () {
        // app.innerHTML = text.value
        app.innerHTML = str
        // document.write(text.value)
        document.write(str)
    }
  </script>
</body>
```

## csrf

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

CSRF 的两个特点：

- CSRF（通常）发生在第三方域名。
- CSRF 攻击者不能获取到 Cookie 等信息，只是使用。

防护策略:

- 阻止不明外域的访问
  - 同源检测
  - Samesite Cookie
- 提交时要求附加本域才能获取的信息
  - CSRF Token
  - 双重 Cookie 验证
