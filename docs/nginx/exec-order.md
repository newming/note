# Nginx执行顺序

## Nginx 介绍

Nginx (engine x) 是一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP服务器。Nginx是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler.ru站点（俄文：Рамблер）开发的，第一个公开版本0.1.0发布于2004年10月4日。

其将源代码以类BSD许可证的形式发布，因它的稳定性、丰富的功能集、示例配置文件和低系统资源的消耗而闻名。2011年6月1日，nginx 1.0.4发布。

Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，并在一个BSD-like 协议下发行。其特点是占有内存少，并发能力强

Nginx 是一个很强大的高性能Web和反向代理服务器.

## Nginx执行顺序

```
location /test {
	set $a 32;
	echo $a;

	set $a 56;
	echo $a;
}
```

## Nginx 的阶段
Nginx 处理请求的过程一共划分为 11 个阶段，按照执行顺序依次是 post-read、server-rewrite、find-config、rewrite、post-rewrite、preaccess、access、post-access、try-files、content 以及 log

### post-read

set_real_ip_from、real_ip_header
最先执行的 post-read 阶段在 Nginx 读取并解析完请求头（request headers）之后就立即开始运行。标准模块 ngx_realip 就在 post-read 阶段注册了处理程序，它的功能是迫使 Nginx 认为当前请求的来源地址是指定的某一个请求头的值。下面这个例子就使用了 ngx_realip 模块提供的 set_real_ip_from 和 real_ip_header

```
server {
  listen 8080;
  set_real_ip_from 127.0.0.1;
  real_ip_header   X-My-IP;

  location /test {
    set $addr $remote_addr;
    echo "from: $addr";
  }
}
```

### server-rewrite

ngx_rewrite、set set_by_lua rewrite_by_lua
post-read 阶段之后便是 server-rewrite 阶段。当 ngx_rewrite 模块的配置指令直接书写在 server 配置块中时，基本上都是运行在 server-rewrite 阶段

```
server {
  listen 8080;

  location /test {
      set $b "$a, world";
      echo $b;
  }

  set $a hello;
}
```

### find-config

这个阶段并不支持 Nginx 模块注册处理程序，而是由 Nginx 核心来完成当前请求与 location 配置块之间的配对工作。

```
location /hello {
  echo "hello world";
}
```

### rewrite

set_unescape_uri set_by_lua rewrite_by_lua
由于 Nginx 已经在 find-config 阶段完成了当前请求与 location 的配对，所以从 rewrite 阶段开始，location 配置块中的指令便可以产生作用。当 ngx_rewrite 模块的指令用于 location 块中时，便是运行在这个 rewrite 阶段。另外， ngx_set_misc 模块的指令也是如此，还有 ngx_lua 模块的 set_by_lua 指令和 rewrite_by_lua 指令也不例外。

###post-rewrite

post-rewrite 阶段，不接受 Nginx 模块注册处理程序，而是由 Nginx 核心完成 rewrite 阶段所要求的“内部跳转”操作

```
server {
  listen 8080;

  location /foo {
    set $a hello;
    rewrite ^ /bar;
  }

  location /bar {
    echo "a = [$a]";
  }
}
```

“内部跳转”的工作原理：本质上其实就是把当前的请求处理阶段强行倒退到 find-config 阶段，以便重新进行请求 URI 与 location 配置块的配对。比如上例中，运行在 rewrite 阶段的 rewrite 指令就让当前请求的处理阶段倒退回了 find-config 阶段。由于此时当前请求的 URI 已经被 rewrite 指令修改为了 /bar，所以这一次换成了 location /bar 与当前请求相关联，然后再接着从 rewrite 阶段往下执行。

为什么不直接在 rewrite 指令执行时立即进行跳转呢？
为了在最初匹配的 location 块中支持多次反复地改写 URI

```
location /foo {
  rewrite ^ /bar;
  rewrite ^ /baz;

  echo foo;
}

location /bar {
  echo bar;
}

location /baz {
  echo baz;
}
```

注意的：如果在 server 配置块中直接使用 rewrite 配置指令对请求 URI 进行改写，则不会涉及“内部跳转”

```
server {
  listen 8080;

  rewrite ^/foo /bar;

  location /foo {
    echo foo;
  }

  location /bar {
    echo bar;
  }
}
```

### preaccess

ngx_access-allow deny  ngx_limit_req 和 ngx_limit_zone  ngx_auth_request access_by_lua
注意的是：标准模块 ngx_realip 其实也在这个阶段注册了处理程序

```
server {
  listen 8080;

  location /test {
    set_real_ip_from 127.0.0.1;
    real_ip_header X-Real-IP;

    echo "from: $remote_addr";
  }
}
```

find-config 阶段远远晚于 post-read 阶段执行。

### post-access

不支持 Nginx 模块注册处理程序，而是由 Nginx 核心自己完成一些处理工作

### try-files

实现标准配置指令 try_files 的功能，并不支持 Nginx 模块注册处理程序。
```
location /account {
  try_files $uri $uri/ /index.php$is_args$args;
}
```
由于 try_files 指令在许多 FastCGI 应用的配置中都有用到。
ry_files 指令接受两个以上任意数量的参数，每个参数都指定了一个 URI. 这里假设配置了 N 个参数，则 Nginx 会在 try-files 阶段，依次把前 N-1 个参数映射为文件系统上的对象（文件或者目录），然后检查这些对象是否存在。一旦 Nginx 发现某个文件系统对象存在，就会在 try-files 阶段把当前请求的 URI 改写为该对象所对应的参数 URI（但不会包含末尾的斜杠字符，也不会发生 “内部跳转”）。如果前 N-1 个参数所对应的文件系统对象都不存在，try-files 阶段就会立即发起“内部跳转”到最后一个参数（即第 N 个参数）所指定的 URI.
```
    location /test {
        try_files /foo /bar/ /baz;
        echo "uri: $uri";
    }

    location /foo {
        echo foo;
    }

    location /bar/ {
        echo bar;
    }

    location /baz {
        echo baz;
    }
```

### content

echo proxy_pass content_by_lua balance_by_lua header_filter_by_lua body_filter_by_lua

### log

ngx log-acces error log_by_lua

openresty请求图
![](https://moonbingbing.gitbooks.io/openresty-best-practices/images/openresty_phases.png)

set_by_lua*: 流程分支处理判断变量初始化
rewrite_by_lua*: 转发、重定向、缓存等功能(例如特定请求代理到外网)
access_by_lua*: IP 准入、接口权限等情况集中处理(例如配合 iptable 完成简单防火墙)
content_by_lua*: 内容生成
header_filter_by_lua*: 响应头部过滤处理(例如添加头部信息)
body_filter_by_lua*: 响应体过滤处理(例如完成应答内容统一成大写)
log_by_lua*: 会话完成后本地异步完成日志记录(日志可以记录在本地，还可以同步到其他机器)

来自：
http://blog.sina.com.cn/s/articlelist_1834459124_0_1.html
https://openresty.org/download/agentzh-nginx-tutorials-zhcn.html#02-NginxDirectiveExecOrder01
