# SSH 工具

## SSH 是什么

- Secure Shell 安全外壳协议
- 建立在应用层基础上的安全协议
- 可靠，专为远程登录会话和其他网络服务提供安全性的协议
- 有效防止远程管理过程中的信息泄漏问题
- SSH 客户端适用于多种平台
- SSH 服务端几乎支持所有 UNIX 平台

## 在服务端上安装 ssh 服务

```bash
# 安装
yum install openssh-server

# 启动
service sshd start

# 查看 ssh 进程
ps -ef |grep ssh

# 设置开机运行
chkconfig sshd on
```

## 在客户端上安装 ssh 工具

- windows: Xshell, Putty, secureCRT
- Linux: yum install openssh-clients (安装 openssh-server 时这个就装了)

## SSH config 命令讲解

- config 为了方便批量管理多个 SSH
- config 存放在 ~/.ssh/config
- config 配置语法

SSH config 语法关键字

| 关键字 | 作用 |
| :----: | :----: |
| Host | 别名 |
| HostName | 主机名 |
| Port | 端口 |
| User | 用户名 |
| IdentityFile | 密钥文件的路径 |

## SSH 安全免密码登录：ssh key

- ssh key 使用非对称加密方式生成 公钥 和 私钥
- 私钥存放在本地 ~/.ssh 目录
- 公钥可以对外公开，放在服务器的 ~/.ssh/authorized_keys

```bash
# 生成密钥
ssh-keygen -t rsa
ssh-keygen -t dsa

# 将开发机的 .ssh/id_rsa.pub 拷贝到服务器 ~/.ssh/authorized_keys
```

## SSH 安全端口

端口安全指的是尽量避免服务器的远程连接端口被不法分子知道，为此而改变默认服务器端口号的操作。只需要修改服务器 /etc/ssh/sshd_config 配置

这个在修改时候出错了，报 `error: Bind to port xxxx on 0.0.0.0 failed: Permission denied.`，后来查了一下，还是比较难解决

[解决文档](https://github.com/zbinlin/blog/blob/master/change-sshd-port-in-centos7.md)

```bash
vi /etc/ssh/sshd_config

# 修改 Port 即可，可以同时监听多个

service sshd restart

# 检查状态
systemctl status sshd.service

journalctl -u sshd.service
```