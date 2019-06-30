# xss

- [如何防止xss攻击](https://juejin.im/post/5bad9140e51d450e935c6d64)
- [xsrf或者csrf攻击防御](https://juejin.im/post/5bc009996fb9a05d0a055192)
- [字符串<script></script>为啥不行](https://stackoverflow.com/questions/28259389/how-to-put-script-in-a-javascript-string)
- [innerHTML不执行script标签](https://juejin.im/entry/58cb529244d90400682e6012)
- [document.write](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/write)

```html
<body>
    <input type="text" id="text">
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