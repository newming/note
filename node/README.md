# nodejs 部分学习笔记

进入严格模式

```bash
node --use_strict
```

### 全局变量

- global: 如同浏览器的 window 对象
- process: 获取当前的 Node 进程信息，一般用于获取环境变量之类的信息
- console: 与浏览器相似process.stdin.setEncoding('utf8');

```js
process.stdout.getWindowSize() // node 获取命令行窗口宽高
```