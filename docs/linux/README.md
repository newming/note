# linux 学习

## 文章目录

- [centos Apache基本操作](apache.md)
- [Linux常用命令](basic-command.md)
- [Linux centos虚拟机](centos.md)
- [crontab定时任务](crontab.md)
- [find搜索命令](find.md)
- [centos防火墙设置](firewall.md)
- [grep搜索字符串](grep.md)
- [man帮助命令](man.md)
- [挂载](mount.md)
- [Shell](shell.md)
- [关机与重启命令](shutdown.md)
- [SSH工具](ssh.md)
- [systemd](systemd.md)
- [tail命令](tail.md)
- [文件压缩与解压缩](tar.md)
- [tmux操作](tmux.md)
- [vim编辑器](vim.md)

## 分区

分区设备文件名：

- /dev/hda1 (IDE硬盘接口)
- /dev/sda1 (SCSI 硬盘接口，SATA 硬盘接口)

必须分区

- / (根分区)
- swap 分区 (交换分区，内存2倍，不超过2GB)

推荐分区

- /boot (启动分区， 200MB)