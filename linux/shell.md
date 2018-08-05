# Shell

Shell 是一个命令行解释器，它为用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序，用户可以用 Shell 来启动、挂载、停止甚至是编写一些程序

Shell 还是一个功能相当强大的编程语言，易编写，易调试，灵活性较强。Shell 是解释执行的脚步语言，在 Shell 中可以直接调用 Linux 系统命令

## Shell 的分类

语法类型：

- Bourne Shell: 从 1979 起 Unix 就开始使用 Bourne Shell，Bourne Shell 的主文件名为 sh
- C Shell: C Shell 主要在 BSD 版的 Unix 系统中使用，其语法和 C 语言类似而得名

Shell 的两种主要语法类型有 Bourne 和 C，这两种语法彼此不兼容。Bourne 家族主要包括 sh, ksh, Bash, psh, zsh。 C 家族主要包括 csh, tcsh

检测当前系统用的是什么 Shell:

```bash
echo $SHELL
```

Bash: Bash 与 sh 兼容，现在使用的 Linux 就是使用 Bash 作为用户的基本 Shell。可以查看 /etc/shells 查看 Linux 支持的 Shell

## echo 输出命令

```bash
echo [选项] [输出内容]
```

选项：

- -e: 支持反斜线控制的字符转换(mac 可以省略)

| 控制字符 | 作用 |
| ---- | --- |
| \a | 输出警告音 |
| \b | 退格键，就是想做删除键 |
| \n | 换行符 |
| \r | 回车键 |
| \t | 制表符，也就是 Tab 键 |
| \v | 垂直制表符 |
| \0nnn | 按照八进制 ASCLL 码表输出字符。其中0为数字零，nnn为三位八进制数 |
| \xhh | 按照十六进制 ASCLL 码表输出字符。其中 hh 是两位十六进制数 |

颜色输出：

```bash
echo -e "\e[1;31m嫁人就要嫁\e[0m"
# \e[1; 开启颜色， \e[0m 关闭颜色
```

- 30m: 黑色
- 31m: 红色
- 32m: 绿色
- 33m: 黄色
- 34m: 蓝色
- 35m: 洋红色
- 36m: 青色
- 37m: 白色

## Shell 脚本执行

编写第一个脚本，编写 hello.sh

```bash
#!/bin/bash
# the first program

echo "hello world"
```

脚本执行方式：

- 赋予执行权限，直接运行
  - chmod 755 hello.sh
  - ./hello.sh
- 通过Bash调用执行脚本
  - bash hello.sh

## Bash 的基本功能

- 命令别名与快捷键
- 历史命令
- 输出重定向
- 多命令顺序执行
- Shell中特殊符号

### 别名查看与设置

```bash
# 查看本机已经设置的别名
alias

# 设置别名，临时生效
alias ls='ls --color=never'

# 永久生效别名
vi ~/.bashrc # 增加别名
source ~/.bashrc

# 临时删除别名
unalias [别名]
```

命令生效顺序：

1. 第一顺位执行用绝对路径或相对路径执行的命令
2. 第二顺位执行别名
3. 第三顺位执行 Bash 的内部命令
4. 第四顺位执行按照 $PATH 环境变量定义的目录查找顺序找到的第一个命令

#### 常用快捷键

- ctrl+c: 强制终止当前命令
- ctrl+l: 清屏
- ctrl+a: 光标移动到命令行首
- ctrl+e: 光标移动到命令行尾
- ctrl+u: 从光标所在位置删除到行首
- ctrl+z: 把命令放入后台
- ctrl+r: 在历史命令中搜索

## 历史命令

```bash
history [选项] [历史命令保存文件]

history

# 默认的历史命令保存 1000 条，可以修改 /etc/profile
```

选项：

- -c: 清空历史命令
- -w: 把缓存中的历史命令写入历史命令问价 ~/.bash_history

历史命令的调用：

- 使用上下箭头调用以前的历史命令
- 使用 !n 重复执行第 n 条历史命令
- 使用 !! 重复执行上一条命令
- 使用 !字符串 重复执行最后一条以该字符串开头的命令

## 输出重定向

