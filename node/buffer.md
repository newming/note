# Buffer

- Buffer 是用于处理二进制数据流
- 实例类似整数数组，大小固定
- C++ 代码在 V8 堆外分配物理内存

创建 buffer:

- Buffer.alloc(len, content) 创建一个长度为 len 的使用 content 的 buffer
- Buffer.allocUnsafe(len) 创建一个长度为 len 内容随机的 buffer
- Buffer.from(array | string, encoding)

Buffer 静态方法:

- Buffer.byteLength(string, [encoding]) 英文1个字节 汉字三个字节
- Buffer.isBuffer(obj)
- Buffer.concat(list[, totalLength])

实例的常用方法属性：

- buf.length
- buf.toString()
- buf.fill()
- buf.equals()
- buf.indexOf()
- buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

```js
// 解决中文乱码
const buf = Buffer.from('中文字符串！')

for (let i = 0; i < buf.length; i += 5) {
  let b = Buffer.allocUnsafe(5)
  buf.copy(b, 0, i)
  console.log(b.toString()) // 打印乱码，因为中文一个字是三个字节，而上边给 b 分配了 5 个字节
}

const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf8')

for (let i = 0; i < buf.length; i += 5) {
  let b = Buffer.allocUnsafe(5)
  buf.copy(b, 0, i)

  console.log(decoder.write(b))
}
```