# 核心模块的意义

- 如果只是在服务器端运行 javascript 代码，意义并不大，因为无法实现任何功能（读写文件，访问网络）
- node 的用处在于它本身还提供了一系列功能模块，用于与操作系统互动
- 这些核心的功能模块在 node 中内置

内置模块如下：

- path: 处理文件路径
- fs: 操作文件系统
- child_process: 新建子进程
- util: 提供一系列实用小工具
- http: 提供 HTTP 服务器功能
- url: 用于解析URL
- querystring: 解析 URL 中的查询字符串
- crypto: 提供加密和解密功能

## npm

```bash
npm config ls
npm config get [prefix]
npm config set prefix [path]
```