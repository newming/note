# Socket 基础

### 创建 Socket 服务器

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

### 创建 Socket 客户端

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

### 例子：命令行聊天室

server 端代码

```js
const net = require('net')

var clients = [] // 保存连接的客户端

const server = net.createServer(socket => {
  console.log(`welcome ${socket.remoteAddress} to 8080 chatroom，当前在线${clients.length}`)

  function signin(signal) {
    let username = signal.from
    socket.username = username
    clients.push(socket)
  }

  function boardcast(signal) {
    // console.log('server:', signal)
    let send = JSON.stringify(signal)
    clients.forEach(client => {
      client.write(send)
    })
  }

  function p2p(signal) {
    let index = clients.findIndex( item => item.username === signal.to)
    clients[index].write(JSON.stringify(signal))
  }

  socket.on('data', chunk => {
    // chunk: {"procotol": "boardcast", "from": "zhangsan", "message": "hello world"} 广播
    // chunk: {"procotol": "p2p", "from": "zhangsan", "to": "lisi", "message": "hello world"} 对一个人说
    try {
      let signal = JSON.parse(chunk.toString().trim())
      let {procotol} = signal
      switch (procotol) {
        case 'signin':
          signin(signal)
          break;
        case 'boardcast':
          boardcast(signal)
          break;
        case 'p2p':
          p2p(signal)
          break;
        default:
          socket.write('弄啥咧！数据没传对')
          break;
      }
    } catch (err) {
      socket.write('弄啥咧！数据没传对')
    }
  })

  // 处理断开 end, close 都可以
  socket.on('end', () => {
    clients.splice(clients.indexOf(socket), 1)
    console.log(`${socket.remoteAddress} 断开连接，当前在线${clients.length}`)
  })
  // socket.on('close', err => {
  //   clients.splice(clients.indexOf(socket), 1)
  //   console.log(`${socket.remoteAddress} 断开连接，当前在线${clients.length}`)
  //   console.log(err) // boolean是否有错，false没有
  // })
})

server.listen(8080, err => {
  if (err) {
    console.log('端口被占用')
    return false
  }
  console.log('server is listing on 8080')
})
```

client 端代码

```js
const net = require('net')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', answer => {
  name = answer.trim()
  if (!name) {
    throw new Error('没名字还出来混')
  }
  // 创建与服务端的连接
  const server = net.connect(8080, () => {
    console.log(`welcome ${name} to 8080 chatroom`)
    // 发送客户端用户信息，用户名
    server.write(JSON.stringify({procotol: "signin", from: name}))
    // 监听服务端发过来的消息
    server.on('data', chunk => {
      try {
        let signal = JSON.parse(chunk.toString().trim())
        let {procotol} = signal
        switch (procotol) {
          case 'boardcast':
            console.log('\n 广播：' + signal.from + ' > ' + signal.message)
            rl.prompt()
            break;
          case 'p2p':
            console.log('\n p2p：' + signal.from + ' > ' + signal.message)
            rl.prompt()
            break;
          default:
            server.write('弄啥咧！数据没传对')
            break;
        }
      } catch (err) {
        server.write('弄啥咧！数据没传对')
      }
    })
    rl.setPrompt(name + '> ')
    rl.prompt()

    rl.on('line', input => {
      input = input.toString().trim()
      let temp = input.split(':')
      let send
      if (temp.length === 2) {
        // 点对点 username:message
        send = {procotol: "p2p", from: name, message: temp[1], to: temp[0]}
        rl.prompt()
      } else {
        // 广播消息
        // chunk: {"procotol": "boardcast", "from": "zhangsan", "message": "hello world"} 广播
        send = {procotol: "boardcast", from: name, message: input}
      }
      server.write(JSON.stringify(send))
    }).on('close', () => {
      console.log('bye')
    })

  })
});
```