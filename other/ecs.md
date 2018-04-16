# 云服务器操作

## 登录服务器

```bash
ssh root@ip
```

## 创建普通用户

```bash
adduser newming --ingroup sudo
```

## 配置免密登录

将自己开发机的公钥拷贝到服务器上用户主目录 .ssh/authorized_keys 文件内

## 更新系统

```bash
sudo apt-get update
sudo apt-get upgrade
```

## 安装 git 和 curl

```bash
sudo apt-get -y install git curl
```

## 解决中文乱码

https://www.centos.bz/2017/12/%E8%A7%A3%E5%86%B3ubuntu%E7%9A%84%E4%B8%AD%E6%96%87%E4%B9%B1%E7%A0%81%E9%97%AE%E9%A2%98/

```bash
sudo apt-get install language-pack-zh-hans

# /etc/environment 添加
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"

# /var/lib/locales/supported.d/local 添加
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8
zh_CN.GBK GBK
zh_CN GB2312

# 命令行执行
sudo locale-gen
# 查看语言
locale

# 后来我又改回来英文
```

## 解决 sudo: unable to resolve host [机器名]

```bash
sudo vi /etc/host
# 127.0.0.1 localhost [机器名]
```

## 安装 nginx

```bash
sudo apt-get install nginx

sudo service nginx start
```

## 修改 ssh 登录

http://www.ruanyifeng.com/blog/2014/03/server_setup.html

```bash
sudo vi /etc/ssh/sshd_config
sudo service ssh restart
# 注意如果修改端口后请到阿里云配置安全组
```

## 修改服务器名称

https://help.aliyun.com/knowledge_detail/41305.html

```bash
sudo vi /etc/hostname # 重启后生效，注意修改 hosts
```

## 自动重启服务

/etc/network/if-up.d

## mongodb

[自动重启mongodb](http://www.jb51.net/os/Ubuntu/181138.html)

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

```bash
sudo service mongod start

sudo service mongod status

sudo service mongod restart

sudo service mongod stop

cat /var/log/mongodb/mongod.log

sudo vi /etc/mongod.conf
```