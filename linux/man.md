# man 帮助命令

获取指定命令的帮助文档

format and display the on-line manual pages

```bash
man ls

man man
```

man 的级别

- 1: 查看命令的帮助
- 2: 查看可被内核调用的函数的帮助
- 3: 查看函数和函数库的帮助
- 4: 查看特殊文件的帮助(主要是 /dev 目录下的文件)
- 5: 查看配置文件的帮助
- 6: 查看游戏的帮助
- 7: 查看其他杂项的帮助
- 8: 查看系统管理员可用命令的帮助
- 9: 查看和内核相关文件的帮助

```bash
man -f [ls] # 相当于 whatis
man 1 passwd # 得到的是 1 级别的帮助文档
man -1 passwd # 得到的是 1 级别的帮助文档

man -k passwd # 所有包含 passwd 的帮助文档
```

## 其他帮助信息

```bash
[命令] --help # 获取某个命令的帮助信息

help [shell 内部命令] # help cd

info [命令]
```
