# find 搜索命令

搜索文件

```bash
find [搜索范围] [搜索条件]
```

> 避免大范围搜索，会非常耗费系统资源

> find是在系统当中搜索符合条件的文件名。如果需要匹配，使用通配符匹配，通配符是完全匹配

通配符：

- *: 匹配任意内容
- ?: 匹配任意一个字符
- []: 匹配任意一个中括号内的字符

```bash
# 包含通配符的需要用括号包起来
find /root -name "install.log*"
```

参数：

find / -name test.text

- name: 按照文件名搜索
- iname: 不区分大小写匹配文件名称
- user: 按所有者搜索 find /root -user root
- nouser: 查找没有所有者的文件，在 linux 中一般为垃圾文件，出了内核运行产生的或者是 U 盘的插入产生的
- mtime: find /var/log -mtine +10 查找10天前修改的文件 -10，十天内，10 正好前第十天
- atime: 文件访问时间
- ctime: 改变文件属性
- size: 按照文件大小搜索 +25k 大于25k，- 代表小于。注意单位区分大小写，k 小写，M 大写。不写单位默认按照 扇区 搜索，一个扇区是 512k
- inum: 查找 i 节点是某个值 find /etc -inum 262411
- a: 逻辑与，两个条件都满足 find /etc/ -size +20k -a -size -50k
- o: 逻辑或，两个条件满足一个即可
- exec/ok: 完整命令 -exec 命令 {} \;，对搜索结果执行的操作，注意结尾 {} \;