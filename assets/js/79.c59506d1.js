(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{440:function(t,v,e){"use strict";e.r(v);var _=e(40),T=Object(_.a)({},(function(){var t=this,v=t.$createElement,e=t._self._c||v;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"http"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http"}},[t._v("#")]),t._v(" http")]),t._v(" "),e("h2",{attrs:{id:"什么是-http"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-http"}},[t._v("#")]),t._v(" 什么是 http")]),t._v(" "),e("p",[t._v("超文本传输协议（HTTP，HyperText Transfer Protocol）是互联网上应用最广泛的一种网络协议。所有的 www 文件都必须遵守这个标准。设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法")]),t._v(" "),e("h2",{attrs:{id:"http-状态码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-状态码"}},[t._v("#")]),t._v(" HTTP 状态码")]),t._v(" "),e("ul",[e("li",[t._v("1**: 信息，服务器收到请求，需要请求者继续执行操作")]),t._v(" "),e("li",[t._v("2**: 成功，操作被成功接收并处理")]),t._v(" "),e("li",[t._v("3**: 重定向，需要进一步的操作以完成请求")]),t._v(" "),e("li",[t._v("4**: 客户端错误，请求包含语法错误或无法完成请求")]),t._v(" "),e("li",[t._v("5**: 服务器错误，服务器在处理请求的过程中发生了错误")])]),t._v(" "),e("p",[t._v("常见的几个状态码:")]),t._v(" "),e("ul",[e("li",[t._v("100: Continue 继续。客户端应继续其请求")]),t._v(" "),e("li",[t._v("101: Switching Protocols 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到 HTTP 的新版本协议")]),t._v(" "),e("li",[t._v("200: OK。请求成功。一般用于 GET 与 POST 请求")]),t._v(" "),e("li",[t._v("202: Accepted 已接受。已经接受请求，但未处理完成")]),t._v(" "),e("li",[t._v("203: Non-Authoritative Information 非授权信息。请求成功。但返回的 meta 信息不在原始的服务器，而是一个副本")]),t._v(" "),e("li",[t._v("204: No Content 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档")]),t._v(" "),e("li",[t._v("205: Reset Content 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域")]),t._v(" "),e("li",[t._v("206: Partial Content 部分内容。服务器成功处理了部分 GET 请求")]),t._v(" "),e("li",[t._v("300: Multiple Choices 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择")]),t._v(" "),e("li",[t._v("301: Moved Permanently 永久移动。请求的资源已被永久的移动到新 URI，返回信息会包括新的 URI，浏览器会自动定向到新 URI。今后任何新的请求都应使用新的 URI 代替")]),t._v(" "),e("li",[t._v("302: Found 临时移动。与 301 类似。但资源只是临时被移动。客户端应继续使用原有 URI")]),t._v(" "),e("li",[t._v("303: See Other 查看其它地址。与 301 类似。使用 GET 和 POST 请求查看")]),t._v(" "),e("li",[t._v("304: Not Modified 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源")]),t._v(" "),e("li",[t._v("400: Bad Request 客户端请求的语法错误，服务器无法理解")]),t._v(" "),e("li",[t._v("401: Unauthorized 请求要求用户的身份认证")]),t._v(" "),e("li",[t._v("402: Payment Required 保留，将来使用")]),t._v(" "),e("li",[t._v("403: Forbidden 服务器理解请求客户端的请求，但是拒绝执行此请求")]),t._v(" "),e("li",[t._v('404: Not Found 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面')]),t._v(" "),e("li",[t._v("500: Internal Server Error 服务器内部错误，无法完成请求")]),t._v(" "),e("li",[t._v("501: Not Implemented 服务器不支持请求的功能，无法完成请求")]),t._v(" "),e("li",[t._v("502: Bad Gateway 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应")]),t._v(" "),e("li",[t._v("503: Service Unavailable 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的 Retry-After 头信息中")]),t._v(" "),e("li",[t._v("504: Gateway Time-out 充当网关或代理的服务器，未及时从远端服务器获取请求")]),t._v(" "),e("li",[t._v("505: HTTP Version not supported 服务器不支持请求的 HTTP 协议的版本，无法完成处理")])]),t._v(" "),e("h2",{attrs:{id:"http-请求方法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-请求方法"}},[t._v("#")]),t._v(" Http 请求方法")]),t._v(" "),e("p",[t._v("HTTP/1.1 定义的请求方法有 8 种:GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS、TRACE。")]),t._v(" "),e("p",[t._v("最常的两种 GET 和 POST，如果是 RESTful 接口的话一般会用到 GET、POST、DELETE、PUT。")]),t._v(" "),e("ul",[e("li",[t._v("OPTIONS 返回服务器针对特定资源所支持的 HTTP 请求方法，也可以利用向 web 服务器发送'*'的请求来测试服务器的功能性")]),t._v(" "),e("li",[t._v("HEAD 向服务器请求与 GET 请求相一致的响应，只不过响应体将不会被返回，这一方法可以在不必传输整个响应内容的情况下，就可以获取包含在响应体消息头中的元信息")]),t._v(" "),e("li",[t._v("GET 向特定的资源发出请求。注意:GET 方法不应当被用于产生'副作用'的操作中，例如在 WebApplication 中，其中一个原因是 GET 可能会被网络蜘蛛等随意访问。Loadrunner 中对应 get 请求函数: web1link 和 weburl")]),t._v(" "),e("li",[t._v("POST 向指定资源提交数据进行处理请求（例如提交表单或者上传文件)。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和已有资源的修改。Loadrunner 中对应 POST 请求函数: websubmitdata,websubmitform")]),t._v(" "),e("li",[t._v("PUT 向指定资源位置上传其最新内容")]),t._v(" "),e("li",[t._v("DELETE 请求服务器删除 Request-URL 所标识的资源")]),t._v(" "),e("li",[t._v("TRACE 回显服务器收到的请求，主要用于测试或诊断")]),t._v(" "),e("li",[t._v("CONNECT HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器")]),t._v(" "),e("li",[t._v("PATCH 这个方法是新引入的，是对 PUT 方法的补充，用来对已知资源进行局部更新")])]),t._v(" "),e("blockquote",[e("p",[t._v("注意方法名称是区分大小写的，当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码 405 (Mothod Not Allowed) ;当服务器不认识或者不支持对应的请求方法时，应返回状态码 501 (Not Implemented)。HTTP 服务器至少应该实现 GET 和 HEAD/POST 方法，其他方法都是可选的，此外除上述方法，特定的 HTTP 服务器支持扩展自定义的方法。")])]),t._v(" "),e("h2",{attrs:{id:"客户端如何发送-http-请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#客户端如何发送-http-请求"}},[t._v("#")]),t._v(" 客户端如何发送 http 请求")]),t._v(" "),e("p",[t._v("请求大体过程：")]),t._v(" "),e("p",[t._v("域名解析---\x3e发起 TCP 的 3 次握手---\x3e建立 TCP 连接后发起 http 请求---\x3e服务器响应 http 请求，浏览器得到 html 代码---\x3e浏览器解析 html 代码，并请求 html 代码中的资源(如 js、CSS、图片等) ---\x3e 浏览器对页面进行渲染呈现给用户")]),t._v(" "),e("h2",{attrs:{id:"http-工作原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-工作原理"}},[t._v("#")]),t._v(" HTTP 工作原理")]),t._v(" "),e("ul",[e("li",[t._v("HTTP 协议定义 Web 客户端如何从 Web 服务器请求 Web 页面，以及服务器如何把 Web 页面传送给客户端。")]),t._v(" "),e("li",[t._v("HTTP 协议采用了请求/响应模型。客户端向服务器发送一个请求报文，请求报文包含请求的方法、URL、 协议版本、请求头部和请求数据。")]),t._v(" "),e("li",[t._v("服务器以一个状态行作为响应，响应的内容包括协议的版本、成功或者错误代码、服务器信息、响应头部和响应数据。")])]),t._v(" "),e("h3",{attrs:{id:"http-请求-响应的步骤"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-请求-响应的步骤"}},[t._v("#")]),t._v(" HTTP 请求/响应的步骤")]),t._v(" "),e("p",[t._v("客户端连接到 Web 服务器---\x3e发送 HTTP 请求---\x3e服务器接受请求并返回 HTTP 响应---\x3e释放连接 TCP 连接---\x3e客户端浏览器解析 HTML 内容")]),t._v(" "),e("ol",[e("li",[t._v("客户端连接到 Web 服务器。一个 HTTP 客户端， 通常是浏览器，与 web 服务器的 HTTP 端口(默认为 80)建立一个 TCP 套接字连接。例如，http://www.baidu.com")]),t._v(" "),e("li",[t._v("发送 HTTP 请求。通过 TCP 套接字，客户端向 Web 服务器发送一个文本的请求报文，一个请求报文由请求行、请求头部、 空行和请求数据四部分组成")]),t._v(" "),e("li",[t._v("服务器接受请求并返回 HTTP 响应。Web 服务器解析请求，定位请求资源。服务器将资源复本写到 TCP 套接字，由客户端读取。一个响应由状态行、响应头部、空行和响应数据四部分组成。")]),t._v(" "),e("li",[t._v("释放连接 TCP 连接。若 connection 模式为 close， 则服务器主动关闭 TCP 连接，客户端被动关闭连接，释放 TCP 连接；若 connection 模式为 keepalive，则该连接会保持一段时间，在该时间内可以继续接收请求")]),t._v(" "),e("li",[t._v("客户端浏览器解析 HTML 内容。客户端浏览器首先解析状态行，查看表明请求是否成功的状态代码。然后解析每一个响应头，响应头告知以下为若干字节的 HTML 文档和文档的字符集。客户端浏览器读取响应数据 HTML，根据 HTML 的语法对其进行格式化，并在浏览器窗口中显示")])]),t._v(" "),e("h2",{attrs:{id:"http-连接是如何复用的"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-连接是如何复用的"}},[t._v("#")]),t._v(" HTTP 连接是如何复用的")]),t._v(" "),e("p",[t._v("HTTP 持久连接(HTTP persistent connection，也称作 HTTP keep-alive 或 HTTP connection reuse ，翻译过来是保持连接或者连接复用)是使用同一个 TCP 连接来发送和接收多个 HTTP 请求/应答，而不是为每一个新的请求/应答打开新的连接的方式")]),t._v(" "),e("p",[t._v("HTTP 协议采用请求-应答模式，当使用普通模式，即非 KeepAlive 模式时，每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开连接(HTTP 协议为无连接的协议)，每次请求都会经过三次握手四次挥手过程，效率较低；当使用 Keep-Alive 模式时，客户端到服务器端的连接不会断开，当出现对服务器的后续请求时，客户端就会复用已建立的连接")]),t._v(" "),e("p",[t._v("在 HTTP1.0 中，Keep-Alive 是没有官方支持的，但是也有一些 Server 端支持")]),t._v(" "),e("p",[t._v("HTTP1.1 以后，Keep-Alive 已经默认支持并开启。客户端(包括但不限于浏览器)发送请求时会在 Header 中增加一个请求头 Connection: Keep-Alive，当服务器收到附带有 Connection: Keep-Alive 的请求时，也会在响应头中添加 Keep-Alive。这样一来，客户端和服务器之间的 HTTP 连接就会被保持，不会断开，当客户端发送另外一个请求时，就可以复用已建立的连接")]),t._v(" "),e("p",[t._v("现在的 HTTP 协议基本都是 HTTP 1.1 版本了，不太需要考虑 1.0 的兼容问题")]),t._v(" "),e("h3",{attrs:{id:"keep-alive-的优缺点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#keep-alive-的优缺点"}},[t._v("#")]),t._v(" Keep-Alive 的优缺点")]),t._v(" "),e("p",[t._v("优点:")]),t._v(" "),e("ul",[e("li",[t._v("节省了服务端 CPU 和内存适用量")]),t._v(" "),e("li",[t._v("降低拥塞控制(TCP 连接减少)")]),t._v(" "),e("li",[t._v("减少了后续请求的延迟(无需再进行握手)")])]),t._v(" "),e("p",[t._v("缺点:")]),t._v(" "),e("ul",[e("li",[t._v("Keep-Alive 可能会非常影响性能，因为它在文件被请求之后还保持不必要的连接很长时间，额外占用了服务端的连接数")])]),t._v(" "),e("h3",{attrs:{id:"连接复用后怎样断开连接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#连接复用后怎样断开连接"}},[t._v("#")]),t._v(" 连接复用后怎样断开连接")]),t._v(" "),e("p",[t._v("通过 Keep-Alive 已经做到连接复用了，但复用之后什么时候断开连接呢，不然一直保持连接，造成资源的浪费。")]),t._v(" "),e("p",[t._v("HTTP 协议规定了两种关闭复用连接的方式：")]),t._v(" "),e("ol",[e("li",[t._v("通过 Keep-Alive Timeout 标识。如果服务端 Response Header 设置了 Keep-Alive:timeout=${timeout}，客户端就会保持此连接 timeout (单位秒)时间，超时之后关闭连接。")]),t._v(" "),e("li",[t._v("通过 Connection close 标识。接收端通常在 Response Header 中增加 Connection close 标识，来主动告诉发送端，连接已经断开了，不能再复用了；客户端接收到此标示后会销毁连接，再次请求时会重新建立连接。注意：配置 close 配置后， 并不是说每次都新建连接，而是约定此连接可以用几次，达到这个最大次数时，接收端就会返回 close 标识")])]),t._v(" "),e("h2",{attrs:{id:"http2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http2"}},[t._v("#")]),t._v(" http2")]),t._v(" "),e("p",[t._v("HTTP2 的优势")]),t._v(" "),e("ul",[e("li",[t._v("采用二进制协议：二进制更易于 frame(帧 数据包)的实现")]),t._v(" "),e("li",[t._v("头部压缩：HTTP2 消息头采用 HPACK 格式进行压缩传输，并对消息头建立索引表，相同的消息头只发送索引号，从而提高效率和速度。")]),t._v(" "),e("li",[t._v('多路复用：在 HTTP2 中，不用按照次序一一对应，而且并发的多个请求或响应中任何一个请求阻塞了不会影响其他的请求或者响应，这样就避免了"队头阻塞"')]),t._v(" "),e("li",[t._v("服务器推送：在 HTTP2 中服务器未经请求可以主动给客户推送资源，大大提高了网页加载的速度")]),t._v(" "),e("li",[t._v("安全：HTTPS 将是未来的趋势，HTTP2 基于 HTTPS 也是未来的趋势，安全也是 HTTP2 的重要特性之一")])]),t._v(" "),e("h2",{attrs:{id:"http2-的工作流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http2-的工作流程"}},[t._v("#")]),t._v(" http2 的工作流程")]),t._v(" "),e("p",[t._v("http2 协议是一个二进制协议，二进制更易于 frame(帧 数据包)的实现，http2 有十个不同 frame 定义，其中两个最基础的对应于 HTTP1.1 的---Data 数据和 HEADE 头部")]),t._v(" "),e("ul",[e("li",[t._v("frame 是包含几个部分：类型 Type，长度 Length，标记 Flags，流标识 Stream 和 frame payload 有效载荷")]),t._v(" "),e("li",[t._v("流标识是描述二进制 frame 的格式，使得每个 frame 能够基于 http2 发送，与流标识联系的是一个流，每个流都是一个逻辑联系，一个独立的双向的 frame 存在于客户端和服务器端之间的 http2 连接中。一个 http2 连接上可包含多个并发打开的流，这个并发流的数量能够由客户端设置，这些流可能是打散了通过物理连接传输。")])]),t._v(" "),e("p",[e("strong",[t._v("头部压缩")]),t._v("\nHTTP 是一个无态协议，也就是说，每个请求必须携带更多细节，以便服务器能够识别从而服务这个请求，这些都无需服务器自己保存太多信息以及先前请求的元数据信息，HTTP2 没有改变这个范式。但是这种方式会产生重复信息，当一个客户端向相同服务器请求许多资源时，像来自同一个网页的图像，将会有大量的请求看上几乎同样的，这就需要压缩技术对付这种几乎相同的信息。HTTPS 和 SPDY 的压缩被发现容易导致 BREACH4 和 CRIME 攻击。因此压缩不是一个简单的课题，HPACK6 是 HTTP/2 的头部压缩。")]),t._v(" "),e("p",[e("strong",[t._v("随时复位")]),t._v("\nHTTP1.1 一个缺点就是当 HTTP 信息有一定长度大小数据传输时，你不能方便地随时停止它，中断 TCP 连接的代价是昂贵的。使用 HTTP2 的 RST_STREAM 将能方便停止一个信息传输，启动新的信息，在不中断连接的情况下提高带宽利用效率。")]),t._v(" "),e("p",[e("strong",[t._v("服务器端推")]),t._v("\n客户端请求一个资源 X，服务器端判断也许客户端还需要资源 z，在无需事先询问客户端情况下将资源 z 推送到客户端，客户端接收到后，可以缓存起来已备后用。")]),t._v(" "),e("p",[e("strong",[t._v("流程控制")]),t._v("\nHTTP2 的每个独立流都有自己的流程控制 flow controller，每个流两端都必须告诉对方自己有更多空间适合数据存放，另外一端只能允许发送更多数据直至流 flow 窗口被扩展，类似 SSH 工作风格，只有 DATA frame 是流程控制的。")]),t._v(" "),e("p",[e("strong",[t._v("多路复用")]),t._v("\n多路复用代替原来的序列和阻塞机制，所有就是请求的都是通过一个 TCP 连接并发完成。同时也很好的解决了浏览器限制同一域名下的请求数量问题。在 HTTP2.0 中，有了二进制分帧之后，HTTP2.0 不在依赖 TCP 链接去实现多留并行了。")]),t._v(" "),e("p",[t._v("在 HTTP2.0 中：")]),t._v(" "),e("ul",[e("li",[t._v("同域名下所有通信都在单个连接上完成，同个域名只需要占用一个 TCP 连接，使用一个连接并行发送多个请求和响应")]),t._v(" "),e("li",[t._v("单个连接可以承载任意数量的双向数据流，单个连接上可以并行交错的请求和响应，之间互不干扰")]),t._v(" "),e("li",[t._v("数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装。每个请求都可以带一个 31bit 的优先值，0 表示最高优先值，数值越大优先级越低")])]),t._v(" "),e("h2",{attrs:{id:"帧和流"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#帧和流"}},[t._v("#")]),t._v(" 帧和流")]),t._v(" "),e("p",[t._v("在 HTTP2.0 中，有两个非常重要的概念：帧和流")]),t._v(" "),e("h3",{attrs:{id:"帧-frame"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#帧-frame"}},[t._v("#")]),t._v(" 帧(frame)")]),t._v(" "),e("p",[t._v("HTTP2.0 中数据传输的最小单位，因此帧不仅要细分表达 HTTP1.x 中的各个部分，也优化了 HTTP1.x 表达不好的地方，同时还增加了 HTTP1.x 表达不了的方式。每一帧都包含几个字段：length、type、flags、stream identifier、frame playload 等等，其中 type 代表帧的类型，在 HTTP2 的标准中定义了 10 中类型。")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("HEADERS frame\nDATA frame\nPRIORITY (设置流的优先级)\nRST_STREAM (终止流)\nSETTINGs (设置此连接的参数)\nPUSH_PROMISE (服务器推送)\nPING (测量RTT)\nGOAWAY (终止连接)\nWINDOW_UPDATE (流量控制)\nCONTINUATION (继续传输头部数据)\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br")])]),e("p",[t._v("在 HTTP2.0 中，它把数据报的两大部分分成了 header frame 和 data frame，也就是头部帧和数据体帧。")]),t._v(" "),e("h3",{attrs:{id:"流-stream"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#流-stream"}},[t._v("#")]),t._v(" 流(stream)")]),t._v(" "),e("p",[t._v("流：存在于连接中的一个虚拟通道。流可以承载双向消息，每个流都有一个唯一的整数 ID。HTTP2 长连接中的数据是不按请求响应顺序发送的，一个完整的请求或响应可能会分成非连续多次发送，有以下几个特点:")]),t._v(" "),e("ul",[e("li",[t._v("双向性：同一个流内，可以同时发送和接收数据")]),t._v(" "),e("li",[t._v("有序性：流中被传输的数据就是二进制帧。帧在流上的被发送与被接收都是按照顺序进行的")]),t._v(" "),e("li",[t._v("并行性：流中的二进制帧都是被并行传输的，无需按照顺序等待")]),t._v(" "),e("li",[t._v("流的创建：流可以被客户端或服务器单方面建立、使用或共享")]),t._v(" "),e("li",[t._v("流的关闭：流也可以被任意一方关闭")]),t._v(" "),e("li",[t._v("HEADERS 帧在 DATA 帧前面")]),t._v(" "),e("li",[t._v("流的 ID 都是奇数，说明是由客户端发起的，这是标准规定的，那么服务端发起的就是偶数啦")])]),t._v(" "),e("h2",{attrs:{id:"发展历程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#发展历程"}},[t._v("#")]),t._v(" 发展历程")]),t._v(" "),e("p",[t._v("从 HTTP0.9 到 HTTP2 要发送多个请求，从多个 TCP 连接---keep-alive---管线化---多路复用，不断地减少多次创建 TCP 等等带来地性能损耗。")]),t._v(" "),e("h3",{attrs:{id:"多个-tcp-连接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#多个-tcp-连接"}},[t._v("#")]),t._v(" 多个 TCP 连接")]),t._v(" "),e("p",[t._v("在最早的候没有 keep-alive 只能创建多个 TCP 连接来做多次请求。一次请求完成就会关闭本次的 TCP 连接，下个请求又要重新建立 TCP 连接传输完成数据再关闭，这样造成很大的性能损耗。")]),t._v(" "),e("h3",{attrs:{id:"keep-alive"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#keep-alive"}},[t._v("#")]),t._v(" keep-alive")]),t._v(" "),e("p",[t._v("keep-alive 解决问题是：在一定时间内，同一域名多次请求数据，只建立一次 HTTP 请求，其他请求可复用每一次建立的连接通道，来达到提高请求效率的问题。这里面所说的时间是可以配置的，不管你用的是 Apache 还是 nginx。")]),t._v(" "),e("p",[t._v("以往，浏览器判断响应数据是否接收完毕，看连接是否关闭。在使用持久连接后就不能这样了，这就要求服务器对持久连接的响应头部一定要返回 content-length 标识 body 的长度，供浏览器判断界限。有时，content-length 的方法并不是很准确，也可以根据 Transfer-Encoding:chunked 头部发送一串一串的数据，最后由长度为 0 的 chunked 标识结束。")]),t._v(" "),e("p",[t._v("但是 keep-alive 还是存在问题：串行的文件传输；同域并行请求限制带来的阻塞")]),t._v(" "),e("h3",{attrs:{id:"管线化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#管线化"}},[t._v("#")]),t._v(" 管线化")]),t._v(" "),e("p",[t._v("HTTP 管线化可以克服同域并行请求限制带来的阻塞，它是建立在持久连接之上，是把所有请求一并发给服务器，但是服务器需要按照顺序一个一个去响应，而不是等到一个响应回来才能发下一个请求，这样就节省了很多请求到服务器的时间。不过，HTTP 管线化仍旧有阻塞的问题，若上一响应迟迟不回，后面的响应都会被阻塞到。")]),t._v(" "),e("h3",{attrs:{id:"多路复用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#多路复用"}},[t._v("#")]),t._v(" 多路复用")]),t._v(" "),e("p",[t._v("多路复用代替原来的序列和阻塞机制。所有就是请求的都是通过一个 TCP 连接并发完成。因为在多路复用之前所有的传输是基于基础文本的，在多路复用中是基于二进制数据帧的传输、消息、流，所以可以做到乱序的传输。多路复用对同一域名下所有请求都是基于流，所以不存在同域并行的阻塞。")]),t._v(" "),e("p",[t._v("HTTP1.1 默认开启持久连接，在一个 TCP 连接可以传送多个 HTTP 请求和响应，减少了建立和关闭连接的消耗和延迟。")]),t._v(" "),e("p",[t._v("HTTP/2.0 支持多路复用，这是 HTTP1.x 持久连接的升级版。多路复用，就是在一个 TCP 连接中可以存在多条流，也就是可以发送多个请求，服务端则可以通过帧中的标识知道该帧属于哪个流(请求)，通过重新排序还原请求。多路复用允许并发的发起多个请求，每个请求及该请求的响应不需要等待其他的请求或响应，避兔了线头阻塞问题。这样某个请求任务耗时严重，不会影响到其它连接的正常执行，极大的提高传输性能。")]),t._v(" "),e("h2",{attrs:{id:"_301、302-的-https-被挟持怎么办"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_301、302-的-https-被挟持怎么办"}},[t._v("#")]),t._v(" 301、302 的 https 被挟持怎么办")]),t._v(" "),e("p",[e("strong",[t._v("合理使用 HSTS")]),t._v("\n什么是 HSTS 呢?HSTS(HTTP Strict Transport Security,HTTP 严格传输安全协议)表明网站已经实现了 TLS，要求浏览器对用户明文访问的 URL 重写成了 HTTPS，避免始终强制 302 重定向的延时开销。")]),t._v(" "),e("p",[e("strong",[t._v("HSTS 的实现原理")]),t._v("\n当浏览器第一次 HTTP 请求服务器时，返回的响应头中增加 Strict-Transport-Security，告诉浏览器指定时间内，这个网站必须通过 HTTPS 协议来访问。也就是对于这个网站的 HTTP 地址，浏览器需要现在本地替换为 HTTPS 之后再发送请求。")]),t._v(" "),e("h2",{attrs:{id:"与-http-相关的协议有哪些"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#与-http-相关的协议有哪些"}},[t._v("#")]),t._v(" 与 HTTP 相关的协议有哪些")]),t._v(" "),e("p",[t._v("在互联网中，任何协议都不会单独的完成信息交换，HTTP 也一样。虽然 HTTP 属于应用层的协议，但是它仍然需要其他层次的协议的配合完成信息的交换，那么在完成一次 HTTP 请求和响应的过程中，需要哪些协议呢？")]),t._v(" "),e("p",[e("strong",[t._v("TCP/IP")])]),t._v(" "),e("p",[t._v("TCP/IP 协议一定听说过，TCP/IP 我们称之为协议簇，什么意思呢？就是 TCP/IP 协议簇中不仅仅只有 TCP 协议和 IP 协议，它是一系列网络通信协议的统称。而其中最核心的两个协议就是 TCP/IP 协议，其他的还有 UDP、ICMP、ARP 等等，共同构成了一个复杂但有层次的协议栈")]),t._v(" "),e("p",[t._v("TCP 协议的全称是 Transmission Control Protocol 的缩写，意思是传输控制协议，HTTP 使用 TCP 作为通信协议，这是因为 TCP 是一种可靠的协议，而可靠能保证数据不丢失。")]),t._v(" "),e("p",[t._v("IP 协议的全称是 Internet Protocol 的缩写，它主要解决的是通信双方寻址的问题。IP 协议使用 IP 地址来标识互联网上的每一台计算机，可以把 IP 地址想象成你的手机号码，你要与别人通话必须要知道他人的手机号码，计算机网络中信息交换必须先要知道对方的 IP 地址")]),t._v(" "),e("p",[e("strong",[t._v("DNS")])]),t._v(" "),e("p",[t._v("有没有想过为什么你可以输入 www.baidu.com 就能获取到你想要的网站？是因为计算机网络中的每个端系统都有一个 IP 地址存在，而把 IP 地址转换为便于人类记忆的协议的就是 DNS 协议")]),t._v(" "),e("p",[t._v("DNS 的全称是域名系统(Domain Name System),它作为将域名和 IP 地址相互映射的一个分布式数据库，能够使人更方便地访问互联网")]),t._v(" "),e("p",[e("strong",[t._v("URI/URL")])]),t._v(" "),e("p",[t._v("我们可以输入 www.baidu.com 地址来访问百度官网，那么这个地址有什么规定么？可以随意输入么？我们输入的地址格式必须要满足 URI 的规范")]),t._v(" "),e("p",[t._v("URI 的全称 Uniform Resource Identifier，中文名称是统一资源标识符，使用它就能够唯一地标记互联网上的资源")]),t._v(" "),e("p",[t._v("URL 的全称是 Uniform Resource Locator，中文名称是统一资源定位符，也就是我们俗称的网址，实际上就是 URI 的一个子集")]),t._v(" "),e("p",[t._v("URI 不仅包括 URL，还包括 URN(统一资源名称)")]),t._v(" "),e("p",[e("strong",[t._v("HTTPS")])]),t._v(" "),e("p",[t._v("HTTP 一般是明文传输，很容易被攻击者窃取重要信息，鉴于此，HTTPS 应运而生。HTTPS 的全称为 Hyper Text Transfer Protocol over SecureSocket Layer，HTTPS 和 HTTP 有很大的不同在于 HTTPS 是以安全为目标的 HTTP 通道，在 HTTP 的基础上通过传输加密和身份认证保证了传输过程的安全性。HTTPS 在 HTTP 的基础上增加了 SSL 层，也就是说 HTTPS = HTTP + SSL")])])}),[],!1,null,null,null);v.default=T.exports}}]);