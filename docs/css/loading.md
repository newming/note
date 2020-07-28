# 使用 css 实现 loading

- [CSS3实现进度条的几个姿势](https://syean.cn/2017/02/16/CSS3%E5%AE%9E%E7%8E%B0%E8%BF%9B%E5%BA%A6%E6%9D%A1%E7%9A%84%E5%87%A0%E4%B8%AA%E5%A7%BF%E5%8A%BF/)

使用 css 变量实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <style>
    .box {
      width: 200px;
      height: 200px;
      background: greenyellow;
      padding: 20px;
      position: relative;
      --percent: 0;
    }
    .container {
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      background: white;
      position: absolute;
    }
    .circle {
      border-radius: 50%;
      overflow: hidden;
    }
    .left,
    .right {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      background: green;
    }
    .left-mask {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      left: 0;
      background: greenyellow;
      display: calc(50 - var(--percent));
    }
    .left {
      left: 0;
      transform-origin: right center;
      transform: rotate(calc(var(--percent) / 50 * 180deg));
    }
    .right {
      left: 50%;
      transform-origin: left center;
      transform: rotate(calc(var(--percent) / 50 * 180deg - 180deg));
    }
  </style>
  <body>
    <div class="box circle">
      <div id="left" class="left"></div>
      <div id="right" class="right"></div>
      <div id="mask" class="left-mask"></div>
      <div class="container circle"></div>
    </div>

    <div>
      <button onclick="ro()">rotate</button>
      <p id="txt"></p>
    </div>

    <script>
      function ro() {
        const random = Math.round(Math.random() * 100)
        console.log(random)
        document.getElementById('txt').innerText = random
        if (random > 50) {
          document.getElementById('mask').style.display = 'none'
        } else {
          document.getElementById('mask').style.display = 'block'
        }
        document
          .getElementById('left')
          .setAttribute('style', `--percent:${random <= 50 ? random : 50};`)
        document
          .getElementById('right')
          .setAttribute('style', `--percent:${random - 100};`)
      }
    </script>
  </body>
</html>
```