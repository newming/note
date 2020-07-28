# vim

- 普通模式
- 可视模式: 对一整块内容进行操作，按 v 进入
- 插入模式: 按 i 进入
- 命令模式: 按 : 进入

## 普通模式下的快捷键

### 移动

- h,j,k,l,0,^,$: 左，上，下，右，行首，行尾

### 单词跳转

- w/W: 正向移动到下一个单词开头，大写的不包含特殊字符，比如 ,
- b/B: 反向移动到下一个单词开头
- e/E: 正向移动到下一个单词结尾
- ge:: 反向移动到下一个单词结尾

### 跳转

- Ctrl-f/F: 下一页
- Ctrl-b/B: 上一页
- Ctrl-d/u: 向下/上翻半页
- gg: 跳转到文件首行
- <line_number>gg/G: 跳转到指定行
- G: 跳转到文件最后一行
- {g}+Ctrl-g/G: 查看文件信息，{g} 更加详细

### 缩进(<< 相反)

| 命令 | 功能 |
| --- | ---- |
| >> / :> | 右缩进 |
| m,n> / :m>(n-m+1) | m 到 n 行缩进 |
| m>n 等价于命令 :m,m+n-1> | m 行开始共 n 行缩进一次 |

## 删除、复制与粘贴

对比

| Windows | Vim | 不同处 |
| --------| --- | ------|
| cut | delete | 和剪切相同，而不是直接删除 |
| copy | yank | 等同于复制由于c用于修改(change)被迫选了yank |
| paste | put | 粘贴完全相同 |

### 寄存器

[参考文章](https://harttle.land/2016/07/25/vim-registers.html)

命令模式下输入 :register 或者缩写 :reg 进入寄存器

命令模式下 :h reg 查看寄存器相关帮助

创建一个寄存器 "{name/num} 然后执行操作即可

| 类型 | 含义 | 表示方法 | 举例 | 特点 |
| --- | --- | ----- | ----- | ---- |
| 无名寄存器 | 默认寄存器 | "" | "" p=p | 会被最后一条覆盖 |
| 数字寄存器 | "+{0-9}<br />缓存最近10次操作 | "0<br />"{0-9} | "0P<br />"1P | 0用于复制专用，1-9用于最精9次行删除或修改记录 |
| 有名寄存器 | 26英文字母命名有名寄存器 | "[a-z]/[A\Z] | "ayz | "A会通过^J追加到"a寄存器中 |
| 黑洞寄存器 | 有去无回 | "_ | "_dw | 只想删除而不想覆盖无名寄存器 |

### 基础操作

| 按键操作 | 定义 |
| ------ | --- |
| d=delete=cut | 剪切 |
| y=yank ~= copy | 类似于复制 |
| p/P | 粘贴到光标后/前 |
| u = undo | 撤销之前的操做 |
| Ctrl-r = redo | 重做/恢复之前的操作 |
| yw | 复制当前光标单词 |
| y2w | 复制正向两个单词 |
| p/P = put ~= paste | 粘贴到光标后/前 |
| yy 类似于 dd | 复制当前光标整行 |

普通模式下 f{space} 可以查找当前行的空格

### 组合删除

([count]operation [count]{motion})

| 操作 | 作用 |
| --- | ---- |
| x/X | 删除光标下/前单个字符 |
| dw(d=delete w=word) | 删除一个单词(必须在词首) |
| d{hjkl} | 删除到上下左右一个操作前的字符 |
| d$ = D | 删除光标到行尾的字符 |
| d^ | 删除光标到行首的字符 |
| dd | 删除当前整行 |
| {n}dd | 向下删除n行(包含当前行) |
| {n}dw | 删除争先单词5次 |
| 3w | 正向移动单词三次 |
| D3w | 正向删除3w动作 |
| 2d3w | 正向删除3w动作两次 |

## 修改、查找与替换

### 插入

| 按键操作 | 定义 |
| ------- | --- |
| Shift+i/A | 插入模式并移动到行首/尾 |
| a/i | 光标后/前插入 |
| [n]O/o | 行前/后插入n次 |
| [n]+i | 插入模式重复n次 |

### 转换

| 按键操作 | 定义 |
| ------ | ---- |
| ~ | 单个字符大小写转换 |
| g ~ w | 单词大小写转换 |
| g~$/g~~ | 整行大小写转换 |
| gU/uw | 单词转换成大/小写 |

## vimrc配置文件

默认配置文件位置 /usr/share/vim/vimrc

- vim run command
- 系统级 vimrc 和用户级 vimrc
- 每一行作为一个命令执行
- 通过 " 进行注释

vim 命令模式下输入 :h vimrc 查看 vimrc 帮助信息
:version 查看各个级别 vimrc 所在位置

### set

大多数配置都是通过 set command 来配置，在命令模式下 :set number? 跟上 ? 可以查看是否开启了配置，set number 可以开启配置，set nonumber 可以关闭设置

```vimrc
" 是否与 vi 完全兼容，不兼容好
set nocompatible

" 语法高亮
syntax on

" 命令模式下历史记录条数，默认50
set history=500

" 右下角当前光标所在位置百分比
set ruler

" hightlight search matches 回车时高亮
set hlsearch

" enable incremental searching 边搜索边高亮
set incsearch

" ignore case when searching 忽略大小写
set ignorecase

" override the 'ignorecase' option if the search pattern contains uppercase characters
set smartcase

" turn on file backups
set backup

" don't line wrap mid-word
set lbr

" copy the indentation from the current line
set autoindent

" enable smart autoindenting
set smartindent

" use spaces instead of tabs
set expandtab

" enable smart tabs
set smarttab

" make a tab equal to 4 spaces
set shiftwidth=4
set tabstop=4

" Tell vim what background are using
set bg=light
set bg=dark
```

### map

设置快捷键

```vimrc
" 在标准模式下，<CR> 代表回车换行，<Space> 代表空格 I 代表在行首输入
map <F3> i<ul><CR><Space><Space><li></li><CR><Esc>I</ul><Esc>kcit
```

### let

声明变量

```vimrc
" 设置 leader=","
let mapleader=", "

" quickly save your file，在标准模式下，输入 ,w 就可以保存文件了
map <leader>w :w!<cr>
```
