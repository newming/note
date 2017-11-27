# Socket 基础

创建 Socket 服务器

```js
const net = require('net')

// 创建一个Socket服务器
const server = net.createServer(socketConnect)


function socketConnect(socket) {
  console.log(socket.address()) // 拿到服务端的信息 { port: 12346, family: 'IPv4', address: '127.0.0.1' }
  console.log(socket.remoteAddress, socket.remoteFamily, socket.remotePort) // 客户端的信息

  socket.write('hello' + socket.remotePort);
  socket.on('data', chunk => {
    console.log(chunk.toString())
    socket.write('你说啥')
  })
}

server.listen(8080, err => {
  if (err) {
    console.log('端口被占用')
    return false
  }
  console.log('server is listing on 8080')
})
```

创建 Socket 客户端

```js
const net = require('net');
// 客户端创建一个socket连接，系统会随机分配一个端口给这个进程
// 返回一个socket连接
const client = net.createConnection({ port: 8080 }, () => {
  //'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
```