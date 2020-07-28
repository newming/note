# tmux操作

- tmux list-sessions 显示当前创建的 session
- tmux new-session -s [name] 创建一个名为name的新的 session
- ctrl + b + d 退出当前session，并保存session进程
- tmux a -t [name] 切换到一个已存在的session
- tmux kill-session -t [name] 杀死一个session进程
- tmux kill-sever 杀死所有session
- tmux a 只剩一个session的时候就不需要指定名字了
- 在一个session里边 ctrl + b + c 开启多个窗口
- 在一个session里切换窗口 ctrl + b + [0] ,切换到第0个窗口
- 在一个session里边分为两个窗格 ， ctrl + b + %
- 删除window Ctrl+b &
