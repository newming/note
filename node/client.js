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
