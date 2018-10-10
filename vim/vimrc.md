# vimrc

默认配置文件位置 /usr/share/vim/vimrc

- vim run command
- 系统级 vimrc 和用户级 vimrc
- 每一行作为一个命令执行
- 通过 " 进行注释

vim 命令模式下输入 :h vimrc 查看 vimrc 帮助信息
:version 查看各个级别 vimrc 所在位置

## set

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

## map

设置快捷键

```vimrc
" 在标准模式下，<CR> 代表回车换行，<Space> 代表空格 I 代表在行首输入
map <F3> i<ul><CR><Space><Space><li></li><CR><Esc>I</ul><Esc>kcit
```

## let

申明变量

```vimrc
" 设置 leader=","
let mapleader=", "

" quickly save your file，在标准模式下，输入 ,w 就可以保存文件了
map <leader>w :w!<cr>
```