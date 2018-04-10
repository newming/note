<h1 style="font-size: 40px;text-align:center;color: #007cdc;">
    Git和Github基本操作手册
</h1>

Git 及 Github 在工作学习中非常重要，它不仅仅是一个管理存放代码的仓库，更是一个开源的社区。学习Git及Github的操作是首要技能。
[廖雪峰的 Git 教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)

额，文档整理的不一定完全准确，请酌情参考。

## 1.git 安装及默认设置

### 安装 git

在 linux 下直接使用命令：

```
sudo apt-get install git
```

windows 下百度 gitbash ，下载安装即可。

mac 下

```
brew install git
```

### 基本配置

配置个人的用户名称和电子邮件地址：

```
git config --global user.name "newming"
git config --global user.email "977527479@qq.com"
```

可以查看已有的配置信息

```
git config --list
```

## 2.工作流程

- 克隆 Git 仓库作为工作目录（或者自己新建一个工作目录并初始化为Git仓库）。
- 增加资源及修改文件。
- 提交修改。
- 如果他人修改了代码，可以更新资源。

## 3.基本操作命令

### git init

```
mkdir demo && cd demo
git init
```

通过创建 demo 文件夹，`git init` 初始化，新建一个仓库。

### git clone

如果在 github 上已经有了仓库，可以直接通过 `git clone` 将项目 `clone` 到本地。

```
git clone [仓库地址]
```

### git diff

查看做了哪些修改。按 `q` 退出。

```bash
git diff HEAD~ HEAD -- [file]
```

### git add

`git add` 可以将文件添加到缓存去，获得 Git 的跟踪。

```
touch a.html
git add a.html
```
也可以通过加参数，将所有的文件添加到缓存区。下面的三种方式效果相同。

```
git add .
git add -A
git add *
```
### git status

`git status` 可以查看当前版本库各个文件的状态。

```
git status
```

### git commit

`git commit` 将缓存区内容添加到仓库中

```
git commit -m '版本留言，尽量写的语义话'
```

### git log

查看提交记录。

```bash
# 只显示一行并且带分支合并情况
git log --graph --pretty=oneline --abbrev-commit

git log --decorate --graph --oneline --all

# 查看某段文本是在什么时候引入的
git log -S[text] --oneline # 注意 -S后不能有空格

# 查看某段文本的修改记录
git log -G[text] --oneline

# 查看某个文件的详细改变信息
git log -p -- [file] # -- 好像可以省略

# 查看某个文件改版的 commit
git log --oneline [file]

# 查看某段方法在某个文件的改版历史
git log -L :[function]:[filename] # 有的时候 function 识别不出来
git log -L start,end:file # 注意 start 及 end 写法，我是没成功算了
git log -L 2,4:[file] # 第2行到第4行变化
git log -L 2,+4:[file] # 第2行到第6行变化
```

### git reset

取消已经缓存的内容。

```
git reset --hard HEAD
```

也可以通过版本号回滚

```
git reset --hard [版本号]
```

### git rm

git rm 命令把一个文件删除，并把它从git的仓库管理系统中移除。

```
git rm readme.md
```

### git checkout

取消对某个文件的修改，通过 `git status` 查看状态，然后执行 `git checkout`

```
git checkout 文件名
```

创建并切换分支

```bash
# 如果不存在这个分支就就创建
git checkout -b [branchname]

# 切换分支
git checkout [branchname]

# 创建新分支并建立跟踪
git checkout -b [localbranch] -t origin/[remotebranch]
```

## 3.推送代码

首先，要在 github 上新建仓库，然后 clone 下来。

### git push

```
*首次推送*
git push -u origin master
*之后可以省略参数*
git push
```

如果没有通过 clone 现有仓库，而是直接在本地 `git init` 的仓库的话，需要先添加远程仓库地址。

```
*为这个仓库添加一个远程地址*
git remote add origin [你的github上的仓库地址]
```

但是这里还有个问题，就是每次 push 都需要输入用户名和密码，很麻烦。这里需要设置下 ssh 。

### 设置 public key

首先需要在本地机器上生成 key。执行

```
ssh-keygen
```

这时，会在 ~/.ssh/ 文件夹之下生成一对 ssh key ，包括一个 public key 和一个 private key 。（如果是windows用户，这个文件一般会在这里：C:\Users\Administrator\.ssh）

复制 public key

```
cat  ~/.ssh/id_rsa.pub
```

将拷贝的 public key 添加在github账户上：

> 右上角点击头像-> 点击settings-> 点击SSH KEYS-> 点击ADD SSH KEYS-> 将获取的public key粘贴于此

## 4.分支操作

创建新分支

```
git branch [yourbranch]
```

切换分支

```
git checkout [yourbranch]
```

或者直接创建一个分支，并且切换过去

```
git checkout -b [yourbranch]
```

删除分支

```
git branch -d [yourbranch]
```

删除远程分支

```
git push origin :branch
```

推送分支

```
git push origin [remotebranch]

# 将本地的一个分支内容推送到 originname 的 remotebranch 分支
git push [originname] [localbranch]:[remotebranch]
```

跟踪远程分支

```bash
# 1
git branch --set-upstream-to=origin/[branch] [branch]

# 1 的简写
git branch -u origin/[branch] [branch]

# 2 作用同 1
git branch --track [branch] origin/[branch]

# 3 直接修改congif
git config branch.[localbranch].remote origin
git config branch.[localbranch].merge refs/heads/[remotebranch]

# 推送一个新的分支并且建立跟踪
git push -u origin [remotebranch]
```

## 5.分支更新及合并

拉取主分支上的更新

```
git pull origin master
```

合并其他分支代码

```
git merge [otherbranch]
```

## tag

```bash
git tag v1.0 [commit]
# 添加 tag

git tag
# 查看所有 tag

git show [tag]
# 查看 tag 详情

git tag -a v0.1 -m "version 0.1 released" 3628164
# 创建带有说明的 tag

git tag -d v0.1
# 删除 tag

git push origin v1.0
# 推送标签到远程

git push origin --tags
# 一次性推送全部尚未推送到远程的本地标签

git push origin :refs/tags/v0.1
# 删除远端的 tag
```

## 别名 alias

```bash
git config --global alias.st status

git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

## 多源

```bash
# 查看有哪些源
git remote

# 添加源
git remote add upstream [giturl]

# 删除源
git remote remove origin

# 重命名
git remote rename origin new
```

## 配置文件解读

```bash
# 查看仓库 config
git config --list --local
```

```bash
[remote "origin"]
	url = git@github.com:newming/note.git
	fetch = +refs/heads/*:refs/remotes/origin/*

# origin 相当于是 url 的一个别名
# fetch 的格式是 refspec: [+]src:dest  dest 是 push 使用， + 号代表 non-fast-forward
# 可以查看 .git/refs 下的文件夹，有 heads(本地), remotes(远端), tags(标签)

# non-fast-forword 强制更新，即使本地没有远端的 commit，并且会把这次提交当作最新的，干掉了其他同志做的 commit，非常危险
git push origin +master
```

增加一个 remote 命名空间

```bash
# 正常往 master 上提交是这样
git push origin refs/heads/master:refs/heads/master # 后边的那串都是会自动补齐的，可以省略

git remote set-branches --add origin qa/*
# 这样会在 config 配置中增加一条 fetch 记录 fetch = +refs/heads/qa/*:refs/remotes/origin/qa/*

# 之后往 qa/master 上提交的话是这样
git push origin master:qa/master # 这样就提交到了远程 qa/master 的分支

# 也可以在 config 中增加一条 push 配置，方便往 qa/master 上推送，在 fetch 下增加
push = refs/heads/*:refs/heads/qa/*
# 之后 git push origin 就会推到 qa/master
```

## push.default 配置的作用

push.default 配置可以让我们省略 refspec 参数，它包含以下几个模式：

config 配置

```
[push]
  default=[setting]
```

config 修改

```bash
git config push.default nothing
```

五种类型：

- nothing
- current
- upstream
- simple
- matching

**nothing：**除非明确的给了 refspec 参数，否则就不推送任何内容。这个模式主要是为了那些希望显式声明 refspec 参数来避免错误推送的人设计的。最麻烦，最安全

```bash
git push origin master:master
```

**current：**推送当前分支用来更新接收端同名的分支。central 以及 non-central 的工作流都可以使用这个模式。

```bash
# 会将本地的分支推送到 origin 上同名的分支上，如果 origin 没有这个分支，就会创建这个分支，并且建立跟踪关系
git push origin
```

**upstream：**当前分支配置了 [branch] 配置也就是设置了跟踪分支，那么使用这个模式的时候 push 操作把当前分支内容推送到它跟踪的那个远程分支上。只有在推送的 repository 是 pull 操作通常使用的那个 repository 的时候，使用这个模式才合理。

**simple：**在 centralized 工作流里，跟 upstream 模式一样，但是如果你本地当前分支的名称和当前跟踪的远程分支名称不一致的话，Git 将拒绝这个 push 操作。当你 push 的 repository 并不是你通常 pull 的那个 repository，跟 current 模式一样。适合刚接触 Git 的使用者，是 Git 2.0 后的默认值。

**matching：**把在本地和远程都有的同名分支的所有分支内容全部推送至远程 repository。2.0之前的默认值

## git blame 定位代码责任人

```bash
# 整个文件修改的代码责任人
git blame [filename]

# 具体行数的代码责任人
git blame -L 1,3 [filename] # 1-3行的内容
git blame -L 5,+3 [filename] # 5-8行的内容，从第5行开始，包括第5行往后3行
```

## git bisect 查找问题引入版本

git bisect 使用二分法查找问题引入的版本。我们需要指定一个引入问题的版本(例如 c5)，然后指定一个没有该问题的版本(例如 c1)，然后开始查找

```bash
# 一个查找流程
git bisect start
git bisect bad
git bisect good C1
git bisect bad
git bisect good
git bisect reset

# 跳过某个 commit
git bisect skip

# 如果某次标记错误，可以做如下修改
git bisect log > bisect.log # 将 bisect 的记录输出到 bisect.log 这个文件中
vi bisect.log # 将其中标记错误的记录删除
git bisect reset # 退出查找
git bisect replay bisect.log # 重新查找，跟上我们上次查找的历史
```

## git grep 查找指定内容位置

```bash
git grep [text] # 查找指定文本
git grep -n [text] # 查找指定文本并显示行号
git grep --count [text] # 查找指定文本在文件中出现的次数
git grep -p [text] *.c # 在以 .c 为文件后缀名的文件中查找包含 text 文本的函数或方法
git grep -e 'zhangsan' # 按照某个正则查找，这里 'zhangsan' 这个是正则， -e 为参数
git grep -e 'zhangsan' --or -e 'lisi' # 按照某个正则查找，或的关系是默认的，--or 可以省略
git grep -e 'zhangsan' --and \(-e 'wangwu' --or --not -e 'list' \) # 有 张三 并且 (有王五或者没有李四)
git grep -e 'zhangsan' --and \(-e 'wangwu' --or --not -e 'list' \) HEAD~ # 在前一个 commit 中查找 有 张三 并且 (有王五或者没有李四)
```