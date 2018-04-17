# nginx 学习笔记

```bash
# ubuntu
apt-get install nginx

# mac
brew install nginx

# centos 7 [看这里](https://blog.csdn.net/u012486840/article/details/52610320)
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
sudo yum install nginx
```

nginx 是一个开源且高性能、可靠的HTTP中间件、代理服务。

Mac 位置：`/usr/local/etc/nginx`

常用命令清单：

```bash
service nginx start
service nginx reload
service nginx status
service nginx stop

nginx -tc /etc/nginx/nginx.conf # 检测配置文件语法
nginx -s reload -c /etc/nginx/nginx.conf # 重载服务
```

> 重要：测试位置 /opt 文件夹下

### 常见的 HTTP 服务

- HTTPD - Apache基金会
- IIS - 微软
- GWS(google web server) - Google

### 为什么选择 nginx

原因1: IO 多路复用 epoll(解决高并发)

多个描述符的 I/O 操作都能在一个线程内并发交替的顺序完成，这就叫 I/O 多路复用，这里的”复用“指的是复用同一个线程。

##### epoll 和 select 模式

select 模型的缺点

- 能够监视文件描述符的数量存在最大限制
- 线性扫描效率低下

epoll 模型

- 每当 FD 就绪，采用系统的毁掉函数直接将 fd 放入，效率更高
- 最大连接无限制

原因二: 轻量级

- 功能模块少
- 代码模块化

原因三: CPU 亲和(affinity)

CPU 亲和：是一种把CPU核心喝nginx工作进程绑定方式，把每个worker进程固定在一个cpu上执行，减少切换cpu的cache miss，获得更好的性能。

原因四: sendfile 的工作机制

### 安装目录讲解(centos)

| 路径 | 类型 | 作用 |
| --- | --- | --- |
| /etc/logrotate.d/nginx | 配置文件 | Nginx 日志轮转，用于 logrotate 服务的日志切割 |
| /etc/nginx<br />/etc/nginx/nginx.conf<br />/etc/nginx/conf.d<br />/etc/nginx/conf.d/default.conf | 目录、配置文件 | Nginx 主配置文件 |
| /etc/nginx/fastcgi_params<br />/etc/nginx/uwsgi_params<br />/etc/nginx/scgi_params | 配置文件 | cgi配置相关，fastcgi配置 |
| /etc/nginx/koi-utf<br />/etc/nginx/koi-win<br />/etc/nginx/win-utf | 配置文件 | 编码转换映射转化文件(少用) |
| /etc/nginx/mime.types | 配置文件 | 设置http协议的 `Content-Type` 与拓展名对应关系 |
| /usr/lib/systemd/system/nginx-debug.service<br />/usr/lib/systemd/system/nginx.service<br />/etc/sysconfig/nginx<br />/etc/sysconfig/nginx-debug | 配置文件 | 用于配置出系统守护进程管理器管理方式 |
| /usr/lib64/nginx/modules<br />/etc/nginx/modules | 目录 | Nginx 模块目录 |
| /usr/sbin/nginx<br />/usr/sbin/nginx-debug | 命令 | Nginx 服务的启动管理的终端命令 |
| /usr/share/nginx<br />/usr/share/nginx/COPYRIGHT<br />/usr/share/man/man8 | 命令 | Nginx 服务的启动管理的终端命令 |
| /usr/share/nginx<br />/usr/share/nginx/COPYRIGHT<br />/usr/share/man/man8/nginx | 文件、目录 | nginx 的手册和帮助文件 |
| /var/cache/nginx | 目录 | nginx 的缓存目录 |
| /var/log/nginx | 目录 | nginx 的日志目录 |

### 安装编译参数

命令：

```bash
nginx -V
# mac 输出内容
--prefix=/usr/local/Cellar/nginx/1.12.1
--with-http_ssl_module
--with-pcre
--sbin-path=/usr/local/Cellar/nginx/1.12.1/bin/nginx
--with-cc-opt='-I/usr/local/opt/pcre/include -I/usr/local/opt/openssl@1.1/include'
--with-ld-opt='-L/usr/local/opt/pcre/lib -L/usr/local/opt/openssl@1.1/lib'
--conf-path=/usr/local/etc/nginx/nginx.conf
--pid-path=/usr/local/var/run/nginx.pid
--lock-path=/usr/local/var/run/nginx.lock
--http-client-body-temp-path=/usr/local/var/run/nginx/client_body_temp
--http-proxy-temp-path=/usr/local/var/run/nginx/proxy_temp
--http-fastcgi-temp-path=/usr/local/var/run/nginx/fastcgi_temp
--http-uwsgi-temp-path=/usr/local/var/run/nginx/uwsgi_temp
--http-scgi-temp-path=/usr/local/var/run/nginx/scgi_temp
--http-log-path=/usr/local/var/log/nginx/access.log
--error-log-path=/usr/local/var/log/nginx/error.log
--with-http_gzip_static_module
--with-http_v2_module
```

| 编译选项 | 作用 |
| ------ | ---- |
| --prefix<br />--sbin-path<br />--module-path<br />--conf-path<br />--error-log-path<br />--http-log-path<br />--pid-path<br />--lock-path | 安装目录或路径 |
| --http-client-body-temp-path<br />--http-proxy-temp-path<br />--http-fastcgi-temp-path<br />--http-uwsgi-temp-path<br />--http-scgi-temp-path | 执行对应模块时，Nginx所保留的临时性文件 |
| --user=nginx<br />--group=nginx | 设定Nginx进程启动的用户和组用户 |
| --with-cc-opt | 设置额外的参数将被添加到CFLAGS变量 |
| --with-ld-opt | 设置附加的参数，链接系统库 |

### Nginx 配置文件

> /usr/local/etc/nginx/nginx.conf

```nginx
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
  worker_connections  1024;
}

http {
    include       mime.types; # content-type 的配置文件
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main; # 访问日志位置

    sendfile        on; # 发送文件，Nginx的优势
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65; # 客户端与服务端的超时时间 65s

    #gzip  on;

    server {
        listen       80; # server 所监听的端口
        server_name  localhost; # server name

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / { # 首页路径进入到这里，可以有多个location
            root   html; # 首页路径，文件夹
            index  index.html index.htm; # 首页默认返回的文件
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html; # 错误页面
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ { # ~ 开头代表模式匹配
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*; # Nginx 代理规则配置文件所在地址
}
```

### Nginx 日志类型

包括：error.log, access_log。通过 log_format 字段配置。

Syntax: log_format name [escape=default|json] string ...;
Default: log_format combined "...";
Context: http // 只能配置在 http 这个属性下

### Nginx 变量

Nginx 变量都是以 $ 开头

- HTTP 请求变量: arg_PARAMETER, http_HEADER, sent_http_HEADER 例如：$http_user_agent，要将http请求中的 `-` 改为 `_`，并且小写
- 内置变量: Nginx 内置的，比较多。[官方文档](http://nginx.org/en/docs/http/ngx_http_log_module.html#log_format)
- 自定义变量: 自己定义

#### Nginx 模块

- Nginx 官方模块
- 第三方模块

```bash
# 使用的模块查询
nginx -V # --with-* 的为 nginx 开启的模块
```

- http_stub_status_module: [官方](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html) Nginx 的客户端状态，用于监控 Nginx 的当前连接信息。(Mac 开启失败。)
- http_random_index_module: [官方](http://nginx.org/en/docs/http/ngx_http_random_index_module.html) 目录中选择一个随机主页
- http_sub_module: [官方](http://nginx.org/en/docs/http/ngx_http_sub_module.html) HTTP 内容替换，在 Response 的时候替换内容
- http_limit_conn_module: [官方](http://nginx.org/en/docs/http/ngx_http_limit_conn_module.html) 连接频率限制
- http_limit_req_module: [官方](http://nginx.org/en/docs/http/ngx_http_limit_req_module.html) 请求频率限制
- http_access_module: [官方](http://nginx.org/en/docs/http/ngx_http_access_module.html) 限制确定的ip连接或拒绝，局限：可以使用代理绕过ip限制。方案一：http_x_forwarded_for 属性会始终携带经过个层代理的 ip。http_x_forwarded_for = Client IP,Proxy(1)IP,Proxy(2)IP,...方案二：结合geo模块作。方案三：通过HTTP自定义变量传递
- http_auth_basic_module: [官方](http://nginx.org/en/docs/http/ngx_http_auth_basic_module.html) 验证身份。局限性：用户信息依赖文件方式、操作管理机械，效率低下。解决方案：Nginx结合LUA实现高效验证、Nginx和LDAP打通，利用nginx-auth-ldap模块

| HTTP协议版本 | 连接关系 |
| ----------- | ------- |
| HTTP1.0 | TCP 不能复用 |
| HTTP1.1 | 顺序性 TCP 复用 |
| HTTP2.0 | 多路复用，TCP 复用 |

HTTP 请求建立在一次TCP连接基础上

一次 TCP 请求至少产生一次 HTTP 请求

### 调试

```nginx
server {
  listen 80;
  server_name test.com;
  add_header Content-Type "text/plain;charset-utf-8";
  return 200 "$http_host";
}
```

```nginx
upstream cnode {
  server 127.0.0.1:5000;
}

server {
  listen 80;
  server_name example;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://cnode;
    proxy_redirect off;
  }

  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/newming.cn/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/newming.cn/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


  if ($scheme != "https") {
      return 301 https://$host$request_uri;
  } # managed by Certbot
}
```