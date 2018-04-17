# nginx 常见中间架构

- 静态资源 WEB 服务
- 代理服务
- 负载均衡调度器SLB
- 动态缓存

### 静态资源 WEB 服务

部分语法：

```
Syntax: sendfile on|off;
Default: sendfile off;
Context: http,location,if in location

Syntax: tcp_nopush on|off;
Default: tcp_nopush off;
Context: http,location,server
作用：sendfile开启的情况下，提高网络包的传输效率

Syntax: tcp_nodelay on|off;
Default: tcp_nodelay off;
Context: http,location,server
作用：在keepalive开启的情况下，提高网络包的传输实时性

Syntax: gzip on|off;
Default: gzip off;
Context: http, server, location, if in location
传输压缩

Syntax: gzip_comp_level level;
Default: gzip_comp_level 1;
Context: http, server, location
传输压缩等级

Syntax: gzip_http_version 1.0|1.1;
Default: gzip_http_version 1.1;
Context: http, server, location
传输压缩协议版本，当前主流的是 1.1

http://nginx.org/en/docs/http/ngx_http_autoindex_module.html
目录浏览

rewrite
重定向
```

##### 拓展Nginx压缩模块：

- http_gzip_static_module 预读gzip功能
- http_gunzip_module 应用支持gunzip的压缩方式


##### 缓存

浏览器访问一个页面时会查看本地是否有缓存，如果有则进行缓存是否过期的校验，如果没有过期，则直接 304 到浏览器缓存，如果过期了，则重新向服务器请求。

校验过期机制：

- 校验是否过期：Expires, Cache-Control(max-age)
- 协议中Etag头信息校验：Etag
- Last-Modified头信息校验：Last-Modified

配置语法 - expires

添加 Cache-Control, Expires 头

```
Syntax: expires [modified] time;
        expires epoch|max|off;
Default: expires off;
Context: http, server, location, if in location
```

##### 跨域访问

浏览器禁止跨域访问，防止 CSRF 攻击，nginx 通过添加响应头信息来允许跨域访问

```
Syntax: add_header name value [always];
Default: --
Context: http, server, location, if in location

例如：
add_header Access-Control-Allow-Origin http://newming.cn
add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS
```

##### 防盗链

目的：防止资源被盗用

方式：区别哪些请求是非正常的用户请求

nginx 基于 http_refer 防盗链配置模块

```
Syntax: valid_referers none|blocked|server_names|string...;
Default: --
Context: server, location
其中 none 表示没有携带 refer 的允许，比如直接访问的第一个请求是没有带的。blocked 是表示通过相对路径引用的。

valid_referers  none blocked 123.56.18.42 ~/newming\.cn/;
if ($invalid_referer) {
  return 403;
}
额，这个我这边没有成功。
```

### 代理服务

##### 正向代理

客户端 <---> 代理 <--|--> 服务端

常见的应用比如翻墙。

##### 反向代理

客户端 --|-> 代理 <---> 服务端

代理的区别在于代理的对象不一样，正向代理代理的对象是客户端，反向代理代理的对象是服务端。

```
Syntax: proxy_pass URL;
Default: --
Context: location, if in location, limit_except

缓存区
Syntax: proxy_buffering on|off;
Default: proxy_buffering on;
Context: server, location
拓展：proxy_buffer_size, proxy_buffers, proxy_busy_buffers_size

跳转重定向
Syntax: proxy_redirect default;
proxy_redirect off;proxy_redirect redirect replacement;
Default: proxy_redirect default;
Context: http, server, location

头信息
Syntax: proxy_set_header field value;
Default: proxy_set_header Host $proxy_host;
          proxy_set_header Connection close;
Context: http, server, location
拓展：proxy_hide_header, proxy_set_body

超时(nginx 作为代理到后端的时间)
Syntax: proxy_connect_timeout time;
Default: proxy_connect_timeout 60s;
Context: http, server, location
拓展：proxy_read_timeout, proxy_send_timeout
```