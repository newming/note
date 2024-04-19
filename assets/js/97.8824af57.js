(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{458:function(_,t,v){"use strict";v.r(t);var a=v(40),i=Object(a.a)({},(function(){var _=this,t=_.$createElement,v=_._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"浏览器从输入url到看到页面，中间经历了什么"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器从输入url到看到页面，中间经历了什么"}},[_._v("#")]),_._v(" 浏览器从输入URL到看到页面，中间经历了什么")]),_._v(" "),v("h2",{attrs:{id:"步骤"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#步骤"}},[_._v("#")]),_._v(" 步骤")]),_._v(" "),v("ol",[v("li",[_._v("url解析")]),_._v(" "),v("li",[_._v("缓存检查")]),_._v(" "),v("li",[_._v("DNS解析")]),_._v(" "),v("li",[_._v("TCP三次握手")]),_._v(" "),v("li",[_._v("数据传输")]),_._v(" "),v("li",[_._v("TCP四次挥手")]),_._v(" "),v("li",[_._v("页面渲染")])]),_._v(" "),v("h2",{attrs:{id:"_1-url解析"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-url解析"}},[_._v("#")]),_._v(" 1.URL解析")]),_._v(" "),v("p",[_._v("http://user:pass@www.baidu.com:80/path/?query=1&test=2#hash")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("协议")])]),_._v(" "),v("li",[v("p",[_._v("登陆信息")])]),_._v(" "),v("li",[v("p",[_._v("域名")])]),_._v(" "),v("li",[v("p",[_._v("端口 0~65535 默认 http 80，https 443，ftp 21")])]),_._v(" "),v("li",[v("p",[_._v("请求资源路径 path")])]),_._v(" "),v("li",[v("p",[_._v("查询字符串")])]),_._v(" "),v("li",[v("p",[_._v("hash")])]),_._v(" "),v("li",[v("p",[_._v("encodeURI: 对整个URL进行编码，处理中文、空格")])]),_._v(" "),v("li",[v("p",[_._v("encodeURIComponent: 对传递的参数信息进行编码，处理中文、URL、/、?、:、=等")])])]),_._v(" "),v("h3",{attrs:{id:"uri-url-urn的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#uri-url-urn的区别"}},[_._v("#")]),_._v(" URI/URL/URN的区别")]),_._v(" "),v("p",[_._v("https://zhuanlan.zhihu.com/p/86529196")]),_._v(" "),v("h2",{attrs:{id:"_2-缓存检查"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-缓存检查"}},[_._v("#")]),_._v(" 2.缓存检查")]),_._v(" "),v("p",[_._v("缓存位置")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("Memory Cache: 内存缓存")])]),_._v(" "),v("li",[v("p",[_._v("Disk Cache: 硬盘缓存")])]),_._v(" "),v("li",[v("p",[_._v("打开网页: 查找disk cache中是否有匹配，如果有则使用，如果没有则发送网络请求")])]),_._v(" "),v("li",[v("p",[_._v("普通刷新(F5): 因为TAB没关闭，因此memory cache是可用的，会被优先使用，其次才是disk cache")])]),_._v(" "),v("li",[v("p",[_._v("强制刷新(ctrl+f5): 浏览器不使用缓存，因此发送的请求头均带有 Cache-Control: no-cache，服务器直接返回200和最新内容")])])]),_._v(" "),v("h3",{attrs:{id:"强缓存expires-cache-control"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#强缓存expires-cache-control"}},[_._v("#")]),_._v(" 强缓存Expires/Cache-Control")]),_._v(" "),v("p",[_._v("浏览器对于强缓存的处理，根据第一次请求资源时返回的响应头来确定的。当匹配强缓存时，返回状态码为200")]),_._v(" "),v("ul",[v("li",[_._v("Expires: 缓存过期时间，用来指定资源到期时间(http/1.0)")]),_._v(" "),v("li",[_._v("Cache-Control: cache-control: max-age=2592000 第一次拿到资源后的多少秒内，读取缓存信息，超过时间后再次发送请求(http/1.1)")]),_._v(" "),v("li",[_._v("两者同时存在，Cache-Control优先级高于Expires")])]),_._v(" "),v("h3",{attrs:{id:"协商缓存last-modified-etag"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#协商缓存last-modified-etag"}},[_._v("#")]),_._v(" 协商缓存Last-Modified/ETag")]),_._v(" "),v("ul",[v("li",[_._v("Last-Modified: 资源文件更新的时间(http/1.0)")]),_._v(" "),v("li",[_._v("ETag: 记录的是一个标识，根据资源文件更新生成的，每一次资源更新都会重新生成一个ETag(http/1.1)")])]),_._v(" "),v("p",[_._v("协商缓存是浏览器强缓存失效后，浏览器携带缓存标识(If-Modified-Since/If-None-Match)向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，返回304(协商缓存)或者200。协商缓存总是会和服务端协商，一定会发送http请求")]),_._v(" "),v("h2",{attrs:{id:"_3-dns解析"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-dns解析"}},[_._v("#")]),_._v(" 3.DNS解析")]),_._v(" "),v("ul",[v("li",[_._v("递归查询")]),_._v(" "),v("li",[_._v("迭代查询")])]),_._v(" "),v("p",[_._v("本地查找：客户端->浏览器缓存->本地hosts文件->本地DNS解析器缓存->本地DNS服务器")]),_._v(" "),v("p",[_._v("本地DNS服务器->根域名服务器->顶级域名服务器->权威域名服务器")]),_._v(" "),v("p",[_._v("第一次DNS解析时间预计在20-120毫秒。优化方式")]),_._v(" "),v("ul",[v("li",[_._v("减少DNS请求次数，但是实际可能不会这么操作，资源放在不同服务器可以根据资源不同类型搭配不同机器配置，另外避开浏览器http并发请求(同一个域名同时4~7个)限制")]),_._v(" "),v("li",[_._v("DNS预获取: "),v("link",{ref:"dns-prefetch",attrs:{href:"//static.image.com"}})])]),_._v(" "),v("h2",{attrs:{id:"_4-tcp三次握手"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-tcp三次握手"}},[_._v("#")]),_._v(" 4.TCP三次握手")]),_._v(" "),v("p",[_._v("建立链接通道")]),_._v(" "),v("ul",[v("li",[_._v("SEQ序号，用来标识从TCP资源向目的端发送的字节流，发送方发送数据时对此进行标记")]),_._v(" "),v("li",[_._v("ACK确认序号，只有ack标志位为1时，确认序号字段才有效，ACK=SEQ+1")]),_._v(" "),v("li",[_._v("标志位\n"),v("ul",[v("li",[_._v("ACK: 确认序号有效")]),_._v(" "),v("li",[_._v("SRT: 重置连接")]),_._v(" "),v("li",[_._v("SYN: 发送一个新连接")]),_._v(" "),v("li",[_._v("FIN: 释放一个连接")])])])]),_._v(" "),v("h2",{attrs:{id:"_5-数据传输"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-数据传输"}},[_._v("#")]),_._v(" 5.数据传输")]),_._v(" "),v("h2",{attrs:{id:"_6-tcp四次挥手"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-tcp四次挥手"}},[_._v("#")]),_._v(" 6.TCP四次挥手")]),_._v(" "),v("h3",{attrs:{id:"http-2-0对比"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http-2-0对比"}},[_._v("#")]),_._v(" http/2.0对比")]),_._v(" "),v("ol",[v("li",[_._v("新的二进制格式")]),_._v(" "),v("li",[_._v("header压缩")]),_._v(" "),v("li",[_._v("服务器推送")]),_._v(" "),v("li",[_._v("多路复用")])]),_._v(" "),v("ul",[v("li",[_._v("http/1.0 时期，每次请求都需要建立连接，用完关闭。可以手动设置长链接")]),_._v(" "),v("li",[_._v("http/1.1 长连接，Connection: keep-alive默认建立长连接。若干请求排队传行单线程处理，后面的请求等待前面的请求返回才会获得执行机会，一旦某个请求超时等，后续请求只能被阻塞，毫无办法，也就是人们常说的线头阻塞")]),_._v(" "),v("li",[_._v("http/2.0 多路复用，多个请求可以在一个连接上并行执行，某个请求耗时严重，不会影响其他请求执行")])]),_._v(" "),v("h2",{attrs:{id:"_7-页面渲染"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_7-页面渲染"}},[_._v("#")]),_._v(" 7.页面渲染")]),_._v(" "),v("p",[_._v("当浏览器接收到服务器响应的资源后，首先会对资源进行解析：")]),_._v(" "),v("ul",[v("li",[_._v("查看响应头的信息，根据不同的指示做对应处理，比如重定向，存储cookie，解压gzip，缓存资源等等")]),_._v(" "),v("li",[_._v("查看响应头的 Content-Type的值，根据不同的资源类型采用不同的解析方式")])]),_._v(" "),v("p",[_._v("关于页面的渲染过程如下：")]),_._v(" "),v("ul",[v("li",[_._v("解析HTML，构建 DOM 树")]),_._v(" "),v("li",[_._v("解析 CSS ，生成 CSS 规则树")]),_._v(" "),v("li",[_._v("合并 DOM 树和 CSS 规则，生成 render 树")]),_._v(" "),v("li",[_._v("布局 render 树（ Layout / reflow ），负责各元素尺寸、位置的计算")]),_._v(" "),v("li",[_._v("绘制 render 树（ paint ），绘制页面像素信息")]),_._v(" "),v("li",[_._v("浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（ composite ），显示在屏幕上")])])])}),[],!1,null,null,null);t.default=i.exports}}]);