# 处理命令行中的输入，模拟登陆

```js
// 获取命令行输入，并且输出，官网示例代码
// process.stdin.setEncoding('utf8')

// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read()
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`)
//   }
// })

// process.stdin.on('end', () => {
//   process.stdout.write('end')
// })
```

```js
// 命令行登陆
let q = '请输入用户名：'

let users = {
  admin: '123456',
  user1: '654321'
}

// 输出第一个问题
process.stdout.write(q + '\n')

let username = ''
// 接收用户输入
process.stdin.on('data', (input) => {
  // input 是一个流对象，需要先转换为字符串
  input = input.toString() .trim() // 结尾包含一个回车，需要去掉
  if (!username) {
    if (Object.keys(users).indexOf(input) === -1) {
      // 用户名不存在
      process.stdout.write('用户名不存在' + '\n')
      process.stdout.write(q + '\n')
    } else {
      process.stdout.write('请输入密码： ' + '\n')
      username = input
    }
  } else {
    if (input === users[username]) {
      process.stdout.write('登陆成功 ' + '\n')
    } else {
      process.stdout.write('密码错误，请重新输入：' + '\n')
    }
  }
})
```