# centos Apache 基本操作

## 安装及启动

```bash
# 安装
yum install httpd
apt-get install apache

# 启动
service https start
service https restart

# 查看状态
service https status
ps -ef | grep httpd
sudo netstat -anpl | grep 'http'

# 停止
service httpd stop

# 防火墙打开 80 端口
```

## 配置

```bash
# 配置文件所在位置 /etc/httpd
# conf conf.d conf.modules.d

# virtual host being defined.
<VirtualHost *:80>
  ServerName www.newming.test
  DocumentRoot /data/www
  <Directory "/data/www">
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
    <IfModule mod_rewrite.c>
      # 伪静态模块
      RewriteEngine On
      RewriteRule ^(.*).htmp$ index.html
    </IfModule>
  </Directory>
</VirtualHost>

# 加载 module
# LoadModule foo_module modules/mod_foo.so
LoadModule rewrite_module modules/mod_rewrite.so

# 查看 log 发现权限不够，加 sudo 不行，切换到 root 用户
sudo su -

# 如果有时候怎么都访问不到，可以试试这个系统的设置
sudo setenforce 0
# 或者
sudo setenforce 1
```