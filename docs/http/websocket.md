# WebSocket

- WebSockets_API 规范定义了一个 API 用以在网页浏览器和服务器建立一个 socket 连接。通俗地讲：在客户端和服务器保有一个持久的连接，两边可以在任意时间开始发送数据。
- HTML5 开始提供的一种浏览器与服务器进行全双工通讯的网络技术
- 属于应用层协议，它基于 TCP 传输协议，并复用 HTTP 的握手通道。

## websocket 优势

- 支持双向通信，实时性更强。
- 更好的二进制支持。
- 较少的控制开销。连接创建后，ws 客户端、服务端进行数据交换时，协议控制的数据包头部较小。

## WebSocket 与 HTTP 有什么关系

WebSocket 是一种与 HTTP 不同的协议。两者都位于 OSI 模型的应用层，并且都依赖于传输层的 TCP 协议。虽然它们不同，但是 RFC 6455 中规定: WebSocket 被设计为在 HTTP 80 和 443 端口上工作，并支持 HTTP 代理和中介，从而使其与 HTTP 协议兼容。为了实现兼容性，WebSocket 握手使用 HTTP Upgrade 头，从 HTTP 协议更改为 WebSocket 协议

## http 的特点

- HTTP 是半双工协议，也就是说，在同一时刻数据只能单向流动，客户端向服务器发送请求(单向的)，然后服务器响应请求(单向的)
- 服务器不能主动推送数据给浏览器

http 场景下实现持久连接方式:

1. 轮询（polling）
2. 长轮询（long-polling）
3. iframe 流（streaming）: 通过在 HTML 页面里嵌入一个隐藏的 iframe,然后将这个 iframe 的 src 属性设为对一个长连接的请求,服务器端就能源源不断地往客户推送数据
4. EventSource 流

无状态的优缺点

和许多人想象的不同，会话(Session) 支持其实并不是一个缺点，反而是无状态协议的优点，因为对于有状态协议来说，如果将会话状态与连接绑定在一起，那么如果连接意外断开，整个会话就会丢失，重新连接之后一般需要从头开始(当然这也可以通过吸收无状态协议的某些特点进行改进)；而 HTTP 这样的无状态协议，使用元数据(如 Cookies 头)来维护会话，使得会话与连接本身独立起来，这样即使连接断开了，会话状态也不会受到严重伤害,保持会话也不需要保持连接本身。另外，无状态的优点还在于对中间件友好，中间件不需要完全理解通信双方的交互过程，只需要能正确分片消息即可，而且中间件可以很方便地将消息在不同的连接上传输而不影响正确性，这就方便了负载均衡等组件的设计。

无状态协议的主要缺点在于：单个请求需要的所有信息都必须要包含在请求中一次发送到服务端，这导致单个消息的结构需要比较复杂，必须能够支持大量元数据,因此 HTTP 消息的解析要比其他许多协议都要复杂得多。同时，这也导致了相同的数据在多个请求上往往需要反复传输，例如同一个连接上的每个请求都需要传输 Host、Authentication、 Cookies、 Server 等往往是完全重复的元数据，在一定程度上降低了协议的效率。

### EventSource

- HTML5 规范中提供了服务端事件 EventSource，浏览器在实现了该规范的前提下创建一个 EventSource 连接后，便可收到服务端的发送的消息，这些消息需要遵循一定的格式，对于前端开发人员而言，只需在浏览器中侦听对应的事件皆可
- SSE 的简单模型是：一个客户端去从服务器端订阅一条流，之后服务端可以发送消息给客户端直到服务端或者客户端关闭该“流”，所以 eventsource 也叫作"server-sent-event`
- EventSource 流的实现方式对客户端开发人员而言非常简单，兼容性良好
- 对于服务端，它可以兼容老的浏览器，无需 upgrade 为其他协议，在简单的服务端推送的场景下可以满足需求

与 WebSockets,不同的是，服务端推送是单向的。数据信息被单向从服务端到客户端分发. 当不需要以消息形式将数据从客户端发送到服务器时，这使它们成为绝佳的选择。例如，对于处理社交媒体状态更新，新闻提要或将数据传递到客户端存储机制（如 IndexedDB 或 Web 存储）之类的，EventSource 无疑是一个有效方案。

## 如何建立连接

WebSocket 复用了 HTTP 的握手通道。具体指的是，客户端通过 HTTP 请求与 WebSocket 服务端协商升级协议。协议升级完成后，后续的数据交换则遵照 WebSocket 的协议。

1. 客户端：申请协议升级

首先，客户端发起协议升级请求。可以看到，采用的是标准的 HTTP 报文格式，且只支持 GET 方法。

```
GET ws://localhost:8888/ HTTP/1.1
Host: localhost:8888
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: IHfMdf8a0aQXbwQO1pkGdA==
```

- Connection: Upgrade：表示要升级协议
- Upgrade: websocket：表示要升级到 websocket 协议
- Sec-WebSocket-Version: 13：表示 websocket 的版本
- Sec-WebSocket-Key：与后面服务端响应首部的 Sec-WebSocket-Accept 是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。

2. 服务端：响应协议升级

服务端返回内容如下，状态代码 101 表示协议切换。到此完成协议升级，后续的数据交互都按照新的协议来。

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: aWAY+V/uyz5ILZEoWuWdxjnlb7E=
```

## socket.io

Socket.IO 是一个 WebSocket 库，包括了客户端的 js 和服务器端的 nodejs，它的目标是构建可以在不同浏览器和移动设备上使用的实时应用

- 易用性：socket.io 封装了服务端和客户端，使用起来非常简单方便
- 跨平台：socket.io 支持跨平台，这就意味着你有了更多的选择，可以在自己喜欢的平台下开发实时应用
- 自适应：它会自动根据浏览器从 WebSocket、AJAX 长轮询、Iframe 流等等各种方式中选择最佳的方式来实现网络实时应用，非常方便和人性化，而且支持的浏览器最低达 IE5.5
