# 关机与重启命令

## shutdown 命令

```bash
shutdown [选项] 时间

# now 代表当前时间
shutdown -r now &

# & 符号可以将该任务放到后台执行，否则命令行会停在当前进程
shutdown -r 05:30 &
```

- -c: 取消前一个关机命令
- -h: 关机
- -r: 重启

## 其他

- half
- poweroff
- init 0

重启

- reboot
- init 6

## 系统运行级别

- 0: 关机
- 1: 单用户
- 2: 不完全多用户，不含 NFS 服务
- 3: 完全多用户
- 4: 未分配
- 5: 图形界面
- 6: 重启

```bash
# 修改系统默认运行级别
cat /etc/inittab
# id:3initdefault:
# 上边的命令发现已经过期了
# 查看默认运行级别
systemctl get-default
# 设置默认运行级别
systemctl set-default Target.target

# 查看系统运行级别
runlevel # 默认为 N 3 其中 N 代表之前的级别，N代表没有，3代表现在的级别
```

## 退出登录

```bash
logout
```