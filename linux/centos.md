# Linux centos 虚拟机

## 准备工作

查看 centos 虚拟机版本

```bash
cat /etc/redhat-release
```

### 查看 ip

- ifconfig
- ip addr
- vi /etc/sysconfig/network-scripts/ifcfg-xx
- yum install net-tools

使虚拟机网络 ip 出来。。。

```bash
# 查看 ip 发现没有内网 ip
ip addr

# 修改
vi /etc/sysconfig/network-scripts/ifcfg-enp0s3

ONBOOT=yes

service network restart

# 已经有了内网 ip
ip addr

# 安装 net-tools，之后才有 ifconfig
yum install net-tools

# 关机，设置 -> 网络 -> 网卡 1 -> 桥接网卡(选择 wifi)
ifconfig
# ip 已经变了
# 回到 mac shell 登录虚拟机
ssh root@[虚拟机ip]
```

### 替换默认源

[163 操作说明](http://mirrors.163.com/.help/centos.html)

```bash
# 安装 wget
yum install wget

# 备份默认源
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# 下载对应版本 repo 文件到 /etc/yum.repos.d
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo

yum clean all

yum makecache
```

### 安装 vim

```bash
yum install vim
```