# Linux 常用命令

## 软件操作命令

软件包管理：yum

```bash
# 安装软件
yum install xxx

# 卸载软件
yum remove xxx

# 搜索软件
yum search xxx

# 清理缓存
yum clear packages

# 列出已安装
yum list

# 软件包信心
yum info xxx
```

## 服务器硬件资源信息

```bash
# 内存
free -m

# 硬盘
df -h

# 负载
w/top

# cpu个数和核数
cat /proc/cpuinfo

# 磁盘操作
fdisk
```

## 文件操作命令

### 文件目录结构

- 根目录 /
- 家目录 /home
- 临时目录 /tmp
- 配置目录 /etc
- 用户程序目录 /usr

## 文件权限

| 权限 | 数字 |
| :---: | :---: |
| r(可读) | 4 |
| w(可写) | 2 |
| x(可执行) | 1 |

## 文件搜索、查找、读取

| 命令 | 解释 |
| :---: | :---: |
| tail | 从文件尾部读取 |
| head | 从文件头部读取 |
| cat | 预览整个文件 |
| more | 分页读取 |
| less | 可控分页 |
| grep | 搜索关键字 |
| find | 查找文件 |
| wc | 统计个数 |

```bash
# 在 file 中查找 text 文本
grep 'text' file

# 在 file 中查找文本并显示行号
grep -n 'text' file

# 统计文件行数
wc -l

# 查找当前文件加下所有以 .conf 结尾的文件
find . -name '*.conf'

# 按类型查找
find . -type d # 文件夹
find . -type f # 文件

# 查找20天内更新过的文件
find . -ctime -20
```

## 文件解压缩

```bash
# 压缩文件
tar -cf file.tar file
tar -czvf file.tar.gz file

# 查看压缩文件内文件
tar -tf file.tar
tar -tvf file.tar

# 解压缩
tar -xf file.tar
tar -xzvf file.tar.gz file
```

## 系统用户操作命令

| 命令 | 解释 |
| :---: | :---: |
| useradd | 添加用户 |
| adduser | 添加用户 |
| userdel | 删除用户 |
| passwd | 设置密码 |

[useradd 与 adduser 区别](https://blog.csdn.net/li_101357/article/details/46778827)

## sudo 提权

给 newming 用户提权

```bash
visudo

# 修改文件，增加一行退出保存就可以了
## Allows people in group wheel to run all commands
%newming ALL=(ALL) ALL
```

## 文件下载上传

```bash
# 服务器文件下载
wget http://www.baidu.com
curl -o test.html http://www.baidu.com

# 本地文件上传到服务器
scp -P port file root@ip:path
# 本地下载服务器文件
scp -P port root@ip:path file
```