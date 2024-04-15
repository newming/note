# 浏览器从输入URL到看到页面，中间经历了什么

## 步骤

1. url解析
2. 缓存检查
3. DNS解析
4. TCP三次握手
5. 数据传输
6. TCP四次挥手
7. 页面渲染


## 1.URL解析

http://user:pass@www.baidu.com:80/path/?query=1&test=2#hash

- 协议
- 登陆信息
- 域名
- 端口 0~65535 默认 http 80，https 443，ftp 21
- 请求资源路径 path
- 查询字符串
- hash

- encodeURI: 对整个URL进行编码，处理中文、空格
- encodeURIComponent: 对传递的参数信息进行编码，处理中文、URL、/、?、:、=等

### URI/URL/URN的区别

https://zhuanlan.zhihu.com/p/86529196

## 2.缓存检查

缓存位置

- Memory Cache: 内存缓存
- Disk Cache: 硬盘缓存

- 打开网页: 查找disk cache中是否有匹配，如果有则使用，如果没有则发送网络请求
- 普通刷新(F5): 因为TAB没关闭，因此memory cache是可用的，会被优先使用，其次才是disk cache
- 强制刷新(ctrl+f5): 浏览器不使用缓存，因此发送的请求头均带有 Cache-Control: no-cache，服务器直接返回200和最新内容

### 强缓存Expires/Cache-Control

浏览器对于强缓存的处理，根据第一次请求资源时返回的响应头来确定的。当匹配强缓存时，返回状态码为200

- Expires: 缓存过期时间，用来指定资源到期时间(http/1.0)
- Cache-Control: cache-control: max-age=2592000 第一次拿到资源后的多少秒内，读取缓存信息，超过时间后再次发送请求(http/1.1)
- 两者同时存在，Cache-Control优先级高于Expires

### 协商缓存Last-Modified/ETag

- Last-Modified: 资源文件更新的时间(http/1.0)
- ETag: 记录的是一个标识，根据资源文件更新生成的，每一次资源更新都会重新生成一个ETag(http/1.1)

协商缓存是浏览器强缓存失效后，浏览器携带缓存标识(If-Modified-Since/If-None-Match)向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，返回304(协商缓存)或者200。协商缓存总是会和服务端协商，一定会发送http请求

## 3.DNS解析

- 递归查询
- 迭代查询

本地查找：客户端->浏览器缓存->本地hosts文件->本地DNS解析器缓存->本地DNS服务器

本地DNS服务器->根域名服务器->顶级域名服务器->权威域名服务器

第一次DNS解析时间预计在20-120毫秒。优化方式

- 减少DNS请求次数，但是实际可能不会这么操作，资源放在不同服务器可以根据资源不同类型搭配不同机器配置，另外避开浏览器http并发请求(同一个域名同时4~7个)限制
- DNS预获取: <link ref="dns-prefetch" href="//static.image.com">

## 4.TCP三次握手

建立链接通道

- SEQ序号，用来标识从TCP资源向目的端发送的字节流，发送方发送数据时对此进行标记
- ACK确认序号，只有ack标志位为1时，确认序号字段才有效，ACK=SEQ+1
- 标志位
  - ACK: 确认序号有效
  - SRT: 重置连接
  - SYN: 发送一个新连接
  - FIN: 释放一个连接

## 5.数据传输

## 6.TCP四次挥手

### http/2.0对比

1. 新的二进制格式
2. header压缩
3. 服务器推送
4. 多路复用
  - http/1.0 时期，每次请求都需要建立连接，用完关闭。可以手动设置长链接
  - http/1.1 长连接，Connection: keep-alive默认建立长连接。若干请求排队传行单线程处理，后面的请求等待前面的请求返回才会获得执行机会，一旦某个请求超时等，后续请求只能被阻塞，毫无办法，也就是人们常说的线头阻塞
  - http/2.0 多路复用，多个请求可以在一个连接上并行执行，某个请求耗时严重，不会影响其他请求执行

## 7.页面渲染

当浏览器接收到服务器响应的资源后，首先会对资源进行解析：

- 查看响应头的信息，根据不同的指示做对应处理，比如重定向，存储cookie，解压gzip，缓存资源等等
- 查看响应头的 Content-Type的值，根据不同的资源类型采用不同的解析方式

关于页面的渲染过程如下：

- 解析HTML，构建 DOM 树
- 解析 CSS ，生成 CSS 规则树
- 合并 DOM 树和 CSS 规则，生成 render 树
- 布局 render 树（ Layout / reflow ），负责各元素尺寸、位置的计算
- 绘制 render 树（ paint ），绘制页面像素信息
- 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（ composite ），显示在屏幕上
