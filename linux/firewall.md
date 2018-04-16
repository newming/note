# centos 防火墙设置

作用：保护服务器安全

```bash
# 检查是否已经安装防火墙
yum list | grep firewall

# 安装防火墙
yum install firewalld

# 启动防火墙
service firewalld start
service firewalld restart

# 防火墙状态
service firewalld status
ps -ef | grep firewall

# 关闭防火墙
service firewalld stop/disable
```

防火墙命令操作：

```bash
firewall-cmd --version
firewall-cmd --help
firewall-cmd --state

# 区域列表(所有操作如果不加 --zone=public 的话就是在默认区域操作)
firewall-cmd --get-zones
firewall-cmd --get-default-zones
# 所有区域设置
firewall-cmd --list-all-zone
# 查询当前区域所有服务
firewall-cmd --list-service
# 查询某个服务是否启用
firewall-cmd --query-service=ssh
# 移除某个服务
firewall-cmd --remove-service=ssh
# 添加某个服务
firewall-cmd --add-service=ssh

# 列出当前区域所有端口
firewall-cmd --list-ports
firewall-cmd --zone=public --list-ports
# 查询某个端口是否开放
firewall-cmd --query-port=22/tcp
# 增加端口开放
firewall-cmd --add-port=22/tcp
# 移除端口开放
firewall-cmd --remove-port=22/tcp
```