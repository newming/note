# 命令行动画

主要利用全局对象 process 的两个方法

```js
let frames = []
frames[frames.length] = `
～(￣▽￣～)(～￣▽￣)～
`
frames[frames.length] = `
▃▃▃▅▆▇▉
`
frames[frames.length] = `
┏━━━━━━━┓
┃　   〣       ┃
┃━━ ▁ ━━　┃
┗━━━━━━━┛
`
frames[frames.length] = `
┏┓　　　┏┓
　　　┏┛┻━━━┻┗┓
　　　┃　　　　　　　┃
　　　┃　　　━　　　┃
　　　┃　┳┛　┗┳　┃
　　　┃　　　　　　　┃
　　　┃　　　┻　　　┃
　　　┗━┓　 　 ┏━┛
　　　　　┃　 　 ┃
　┏━━━┛　 　 ┃
┏┫围观,是种态度 ┃
┗┓　 　 　      ┃
　┗┓┏┳━┓┏┏┛
　　┣┣┃　┣┣┃
　　┗┻┛　┗┻┛
`

let fps = 10
let current = 0

let render = () => {
  // 将当前控制台清空
  var height = process.stdout.getWindowSize()[1]
  for (let i = 0; i < height; i++) {
    process.stdout.write('\n')
  }
  // 输出新的内容
  if (current === frames.length) {
    current = 0
  }
  process.stdout.write(frames[current++])
}

setInterval(render, 1000/fps)
```