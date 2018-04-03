# mongodb 安装升级的各种错误解决

## 更新

```bash
sudo apt-get upgrade mongodb-org*
```

## ubuntu 14 升级 16 后

报错：Failed to start mongod.service: Unit mongod.service not found

```bash
sudo systemctl unmask mongodb

sudo service mongod start

# 可以通过日志来查看状态
cat /var/log/mongodb/mongod.log
```

## 安装

创建列表文件，官方ubuntu16.04安装代码如下：

```bash
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

执行 `sudo apt-get update` 后报错

```
Some index files failed to download. They have been ignored, or old ones used instead.
```

解决办法，将镜像地址改为阿里云的：

```bash
echo "deb http://mirrors.aliyun.com/mongodb/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

查看 ubuntu 内核版本

```bash
cat /etc/issue
```