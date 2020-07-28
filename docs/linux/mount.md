# 挂载

```bash
# 查询系统中已经挂载的设备
mount

# 依据配置文件 /etc/fstab 的内容，自动挂载
mount -a
# /etc/fstab 自动挂载的分区，写到这个文件内
```

## 挂载命令格式

```bash
mount [-t 文件系统] [-o 特殊选项] 设备文件名 挂载点
```

选项：

- -t文件系统: 加入文件系统类型来指定挂载的类型，可以 ext3、ext4、iso9660(光盘) 等文件系统
- -o特殊选项: 可以指定挂载的额外选项
  - atime/noation: 更新访问时间/不更新访问时间。访问分区文件时，是否更新文件的访问时间，默认为更新
  - async/sync: 异步/同步，默认为异步
  - auto/noauto: 自动/手动，mount -a 命令执行时，是否自动安装 /etc/fstab 文件内容挂载，默认认为自动
  - defaults: 定义默认值，相当于 rw, suid, dev, exec, auto, nouser, async 着七个选项
  - exec/noexec: 执行/不执行，设定是否允许在文件系统中执行可执行文件，默认是 exec 允许
  - remount: 重新挂载已经挂载的文件系统，一般用于指定修改特殊权限
  - rw/ro: 读写/只读，文件系统挂载时，是否具有读写权限，默认是 rw
  - suid/nosuid: 具有/不具有 SUID 权限，默认是具有
  - user/nouser: 允许/不允许普通用户挂载，设定文件系统是否允许普通用户挂载，默认是不允许，只有 root 可以挂载分区
  - usrquota: 写入代表文件系统支持用户磁盘配额，默认不支持
  - grpquota: 写入代表文件系统支持组磁盘配额，默认不支持

```bash
# 重新挂载 /boot 分区，并使用 noexec 权限
mount -o remount,noexec /home/
```

## 挂载光盘

```bash
# 建立挂载点
mkdir /mnt/cdrom/

# 挂载光盘 /dev/sr0 为 设备文件名，是规定好的
mount -t iso9660 /dev/sr0 /mnt/cdrom/

# 接下来就可以到 /mnt/cdrom/ 查看光盘内容
ls /mnt/cdrom/
```

## 卸载命令

```bash
umount 设备文件名或挂载点

umount /mnt/cdrom
```

## 挂在 U 盘

U 盘类似 硬盘，挂载到 /dev/ 下，硬盘是 sda，U 盘是 sdb1

```bash
# 查看系统安装的硬盘，查看 U 盘设备文件名
fdisk -l

mount -t vfat /dev/sdb1 /mnt/usb/
```

> Linux 默认是不支持 NTFS 文件系统的，可以通过安装 ntfs-3g 这个包来支持 ntfs