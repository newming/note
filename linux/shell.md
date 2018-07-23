# Linux 常用命令

## 命令的基本格式

[root@localhost ~]#

- root: 当前登陆用户
- localhost: 主机名
- ~: 当前所在目录(家目录) root 在 /root，其他用户在 /home/username
- #|$: 超级/普通 用户提示符

命令格式：命令 [选项] [参数]

> 个别命令使用不遵循此格式。当有多个选项时，可以写在一起简化选项与完整选项 -a 等于 --all

```bash
ls
ls -[alhdi] # a: 显示文件，包括隐藏文件。l: 显示详细信息。d: 查看目录属性. h:人性化显示文件大小。i: 显示 inode

ls -l
# -rw-r--r--. 1 root root 1426 Jul 18 22:53 anaconda-ks.conf

# 第一位 -: 文件类型，d: 目录类型 l: 软连接
# rw-: u 所有者
# r--: g 所属组
# r--: o 其他人
# . 调调 ACL 权限
# r 读 w 写 x 执行
# 1 代表引用计数
# root 第一个代表所有者
# root 第二个代表所有组
# 1426 大小，字节 b
# 时间：最后一次修改时间
```

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
- 启动目录，保存着用户的启动数据 /boot
- 特殊文件保存目录 /dev
- 普通用户家目录 /home
- 超级用户家目录 /root
- Linux 中函数库保存位置 /lib
- 挂载其他盘符目录例如打印机，USB 等 /media /mnt /misc
- 内存的挂载点，不能直接操作 /proc /sys
- 临时目录 /tmp
- 配置目录 /etc
- 系统相关文档内容 /var
- 用户程序软件资源目录 /usr
- 保存系统命令 /bin /sbin /usr/bin /usr/sbin，其中 bin 目录是所有用户可以执行的命令，sbin 是超级用户才可以执行的命令

## 文件权限

| 权限 | 数字 |
| :---: | :---: |
| r(可读) | 4 |
| w(可写) | 2 |
| x(可执行) | 1 |

```bash
cp -[rpda] # r 复制目录 p 连带文件属性复制 d 若源文件时链接文件，则复制链接属性 a 相当于 pdr
```

## 链接命令 ln

```bash
ln -s [源文件] [目标文件]
# 生成链接文件， -s 创建软链接
```

硬链接特征：

1. 拥有相同的 i 节点和存储 block 块，可以看作是同一个文件
2. 可通过 i 节点识别
3. 不能跨分区
4. 不能针对目录使用

软链接特征：

1. 类似 Windows 快捷方式
2. 软链接拥有自己的 I 节点和 Block 块，但是数据块中只保存原文件的文件名和 I 节点号，并没有实际的文件数据
3. lrwxrwxrwx: l 软链接，软链接的文件权限都为 rwxrwxrwx
4. 修改任意文件，另一个都改变
5. 删除原文件，软链接不能使用

## 文件搜索、查找、读取

| 命令 | 解释 |
| :---: | :---: |
| tail | 从文件尾部读取 |
| head | 从文件头部读取 |
| cat | 预览整个文件 |
| more | 分页读取 |
| less | 可控分页 |
| grep | 搜索关键字 |
| find | 查找文件，比 location 慢，但是非常强大 |
| wc | 统计个数 |
| locate | 文件搜索，yum install mlocate，配置文件在 /etc/updatedb.conf |
| whereis | 系统命令所在路径 |
| which | 系统命令所在路径及别名 |
| whatis | 查看系统命令是干什么的 |

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

locate [文件名]
# 在后台数据库中按文件名搜索，搜索速度快，/var/lib/mlocate 为 locate 命令所搜索的后台数据库，数据库不是实时更新，所以刚新建的文件搜不到
updatedb
# 更新数据库

whereis [命令名]
# 搜索命令所在路径及帮助文档所在位置
# 选项: -b 只查找可执行文件 -m 只查找帮助文件
```

## 环境变量

PATH 环境变量: 定义的是系统搜索命令的路径，通过 `:` 分割

```bash
echo $PATH
# /usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
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

http://www.ruanyifeng.com/blog/2014/03/server_setup.html

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

## chmod

```bash
# 修改文件权限
sudo chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/

# 修改文件所有者
sudo chown -R newming:newming /data
```